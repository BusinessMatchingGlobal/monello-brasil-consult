import type { DisplayLang, DisplayRoute } from "./displayLang";
import { displayPathFor, parseDisplayPath } from "./displayLang";
import { portugueseToItalian } from "./displayAliases";

/**
 * Swaps rendered Italian/Portuguese text for the verified DE/ES/FR catalogue.
 * Catalogue keys are hashes of the whitespace-normalised source text, so the
 * same lookup serves body text, attributes, the document title, meta tags and
 * JSON-LD. Untranslated strings are left as they are.
 */
type Catalogue = Record<string, string>;
type InlinePlan = {
  sourceParts: string[];
  targets: Record<DisplayLang, string[]>;
};

let catalogue: Catalogue | null = null;
let inlinePlans: Record<string, InlinePlan> | null = null;
let route: DisplayRoute | null = null;
const lastSet = new WeakMap<Node, string>();

const loaders: Record<DisplayLang, () => Promise<{ default: Catalogue }>> = {
  de: () => import("@/data/displayTranslations/de.json"),
  es: () => import("@/data/displayTranslations/es.json"),
  fr: () => import("@/data/displayTranslations/fr.json"),
};

export function sourceKey(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16) + "." + text.length.toString(16);
}

const normalise = (text: string) => text.replace(/\s+/g, " ").trim();

export function lookup(text: string): string | null {
  if (!catalogue) return null;
  const n = normalise(text);
  if (!n || !/\p{L}/u.test(n)) return null;
  const direct = catalogue[sourceKey(n)];
  if (direct) return direct;
  if (route?.contentLang === "pt") {
    const it = portugueseToItalian().get(n);
    if (it) return catalogue[sourceKey(it)] ?? null;
  }
  return null;
}

/** Keeps leading/trailing whitespace of the original string. */
function withSpacing(original: string, translated: string) {
  const lead = original.match(/^\s*/)?.[0] ?? "";
  const trail = original.match(/\s*$/)?.[0] ?? "";
  return lead + translated + trail;
}

export async function loadCatalogue(pathname: string): Promise<boolean> {
  route = parseDisplayPath(pathname);
  if (!route) { catalogue = null; inlinePlans = null; return false; }
  const [base, revisions, inline] = await Promise.all([
    loaders[route.display](),
    import("@/data/displayTranslations/revisions.json"),
    import("@/data/displayTranslations/inlineRevisions.json"),
  ]);
  catalogue = { ...base.default, ...revisions.default[route.display] };
  inlinePlans = inline.default;
  return true;
}

const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE", "SVG"]);
const INLINE = new Set(["A", "STRONG", "B", "EM", "I", "SPAN", "U", "SMALL", "SUP", "SUB", "BR", "MARK", "ABBR", "CITE", "Q"]);
const ATTRS = ["alt", "title", "aria-label", "placeholder"];

function setText(node: Text, value: string) {
  if (node.data !== value) node.data = value;
  lastSet.set(node, value);
}

function translateTextNode(node: Text) {
  if (lastSet.get(node) === node.data) return;
  const t = lookup(node.data);
  if (t) setText(node, withSpacing(node.data, t));
}

/** Approved sentence-specific segments preserve nested links and emphasis. */
function placeVerifiedInline(el: Element, full: string): boolean {
  const plan = inlinePlans?.[sourceKey(normalise(full))];
  if (!plan || !route) return false;
  const walker = el.ownerDocument.createTreeWalker(el, 4);
  const all: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) all.push(node as Text);
  const texts = all.filter(n => normalise(n.data));
  const target = plan.targets[route.display];
  if (texts.length !== plan.sourceParts.length || texts.length !== target.length) return false;
  if (!texts.every((n, i) => normalise(n.data) === plan.sourceParts[i])) return false;
  all.filter(n => !normalise(n.data)).forEach(n => setText(n, ""));
  texts.forEach((n, i) => setText(n, target[i]));
  return true;
}

/** Element whose whole text is a catalogue entry but is split across several nodes. */
function translateElementText(el: Element) {
  const children = Array.from(el.childNodes);
  if (children.length < 2) return;
  if (!children.every(c => c.nodeType === 3 || (c.nodeType === 1 && INLINE.has((c as Element).tagName)))) return;
  const full = el.textContent ?? "";
  if (placeVerifiedInline(el, full)) return;
  // <br> joins lines without a space: try the sentence-spaced form as well.
  const t = lookup(full) ?? lookup(full.replace(/([.!?…])(?=\p{Lu})/gu, "$1 "));
  if (!t) return;
  const elements = children.filter(c => c.nodeType === 1) as Element[];
  const texts = children.filter(c => c.nodeType === 3) as Text[];
  if (!elements.length) {
    setText(texts[0], withSpacing(full, t));
    texts.slice(1).forEach(n => setText(n, ""));
    return;
  }
  // Keep links and emphasis: place each inline child's own translation where it occurs in the sentence.
  let cursor = 0;
  const plan: Array<{ node: ChildNode; value: string }> = [];
  let pending: Text[] = [];
  let ok = true;
  for (const child of children) {
    if (child.nodeType === 3) { pending.push(child as Text); continue; }
    const inner = (child as Element).textContent ?? "";
    const innerT = lookup(inner) ?? (t.includes(normalise(inner)) ? normalise(inner) : null);
    const at = innerT ? t.indexOf(innerT, cursor) : -1;
    if (!innerT || at < 0) { ok = false; break; }
    const before = t.slice(cursor, at);
    if (pending.length) { plan.push({ node: pending[0], value: before }); pending.slice(1).forEach(n => plan.push({ node: n, value: "" })); }
    else if (before.trim()) { ok = false; break; }
    plan.push({ node: child, value: innerT });
    cursor = at + innerT.length;
    pending = [];
  }
  const tail = t.slice(cursor);
  if (ok && pending.length) { plan.push({ node: pending[0], value: tail }); pending.slice(1).forEach(n => plan.push({ node: n, value: "" })); }
  else if (ok && tail.trim()) ok = false;
  if (!ok) {
    if (placeBySentence(children, t)) return;
    // No safe mapping for the inline markup: keep the original rather than lose links.
    reportMiss(full);
    return;
  }
  for (const { node, value } of plan) {
    if (node.nodeType === 3) setText(node as Text, value);
    else if (lookup(node.textContent ?? "")) translateSubtree(node as Element);
  }
}

const sentences = (text: string) => normalise(text).split(/(?<=[.!?…])\s+(?=\S)/).filter(Boolean);

/** Gives every text segment and inline child as many translated sentences as its source holds. */
function placeBySentence(children: ChildNode[], t: string): boolean {
  const parts = children.filter(c => normalise(c.textContent ?? ""));
  const counts = parts.map(c => sentences(c.textContent ?? "").length);
  const target = sentences(t);
  if (parts.length < 2 || counts.reduce((a, b) => a + b, 0) !== target.length) return false;
  let at = 0;
  parts.forEach((part, n) => {
    const value = target.slice(at, at + counts[n]).join(" ");
    at += counts[n];
    if (part.nodeType === 3) { setText(part as Text, withSpacing(part.textContent ?? "", value) ); return; }
    const texts: Text[] = [];
    const doc = part.ownerDocument;
    if (!doc) return;
    const w = doc.createTreeWalker(part, 4);
    let x: Node | null; while ((x = w.nextNode())) if (normalise((x as Text).data)) texts.push(x as Text);
    texts.forEach((tn, i) => setText(tn, i === 0 ? withSpacing(tn.data, value) : ""));
  });
  return true;
}

const misses = new Set<string>();
function reportMiss(text: string) {
  misses.add(normalise(text));
}
/** Sentences with inline markup that could not be mapped safely (used by checks). */
export function translatorMisses(): string[] {
  return [...misses];
}

function rewriteHref(el: Element) {
  if (!route) return;
  const href = el.getAttribute("href");
  if (!href) return;
  const m = href.match(/^(?:https?:\/\/(?:www\.)?businessmatching\.global)?(\/[^?#]*)?([?#].*)?$/);
  if (!m || (!m[1] && !href.startsWith("http"))) return;
  const path = m[1] ?? "/";
  const suffix = m[2] ?? "";
  let next: string | null = null;
  if (/^\/brasilexportacao\/?$/i.test(path)) next = displayPathFor(route.display, "pt", "/brasilexportacao");
  else if (/^\/it(\/|$)/.test(path) && route.contentLang === "it") next = displayPathFor(route.display, "it", path.slice(3) || "/");
  else if (/^\/pt(\/|$)/.test(path) && route.contentLang === "pt") next = displayPathFor(route.display, "pt", path.slice(3) || "/");
  if (next && next + suffix !== href) el.setAttribute("href", next + suffix);
}

function translateAttributes(el: Element) {
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (v) { const t = lookup(v); if (t && t !== v) el.setAttribute(a, t); }
  }
  if (el.tagName === "INPUT" && /^(submit|button)$/i.test(el.getAttribute("type") ?? "")) {
    const v = el.getAttribute("value"); const t = v && lookup(v); if (t) el.setAttribute("value", t);
  }
  if (el.tagName === "A") rewriteHref(el);
}

export function translateSubtree(root: Node) {
  if (!catalogue) return;
  if (root.nodeType === 3) { if (root.parentElement) translateElementText(root.parentElement); translateTextNode(root as Text); return; }
  if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
  const doc = (root.ownerDocument ?? root) as Document;
  const walker = doc.createTreeWalker(root, 1 | 4);
  const elements: Element[] = [];
  const texts: Text[] = [];
  let node: Node | null = root;
  while (node) {
    if (node.nodeType === 1) {
      const el = node as Element;
      if (SKIP.has(el.tagName.toUpperCase())) { node = walker.nextSibling() ?? nextOutside(walker); continue; }
      elements.push(el);
      translateAttributes(el);
    } else if (node.nodeType === 3) texts.push(node as Text);
    node = walker.nextNode();
  }
  // Whole sentences first, outermost first so a sentence wins over the words inside it; then single text nodes.
  elements.forEach(translateElementText);
  texts.forEach(translateTextNode);
}

function nextOutside(walker: TreeWalker): Node | null {
  while (walker.parentNode()) { const n = walker.nextSibling(); if (n) return n; }
  return null;
}

function translateJsonLd(value: unknown): unknown {
  if (typeof value === "string") return lookup(value) ?? value;
  if (Array.isArray(value)) return value.map(translateJsonLd);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k.startsWith("@") || /url|image|logo|sameAs/i.test(k) ? v : translateJsonLd(v)]));
  }
  return value;
}

export function translateHead(doc: Document = document) {
  if (!catalogue) return;
  const title = lookup(doc.title);
  if (title && title !== doc.title) doc.title = title;
  doc.head.querySelectorAll("meta[content]").forEach(meta => {
    const name = meta.getAttribute("name") ?? meta.getAttribute("property") ?? "";
    if (!/description|title|image:alt/i.test(name)) return;
    const v = meta.getAttribute("content") ?? ""; const t = lookup(v);
    if (t && t !== v) meta.setAttribute("content", t);
  });
  doc.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    if (lastSet.get(script) === script.textContent) return;
    try {
      const next = JSON.stringify(translateJsonLd(JSON.parse(script.textContent ?? "")));
      if (next !== script.textContent) script.textContent = next;
      lastSet.set(script, next);
    } catch { /* leave malformed data untouched */ }
  });
}

/** Translates the document now and keeps translating whatever React renders next. */
export function startPageTranslator(doc: Document = document) {
  if (!catalogue) return;
  translateSubtree(doc.body);
  translateHead(doc);
  const observer = new MutationObserver(records => {
    let head = false;
    for (const r of records) {
      if (doc.head.contains(r.target)) { head = true; continue; }
      if (r.type === "characterData") translateSubtree(r.target);
      else if (r.type === "attributes") translateAttributes(r.target as Element);
      else r.addedNodes.forEach(n => { translateSubtree(n); if (n.parentElement) translateElementText(n.parentElement); });
      if (r.type === "childList" && r.target.nodeType === 1) translateElementText(r.target as Element);
    }
    if (head) translateHead(doc);
  });
  observer.observe(doc.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...ATTRS, "href", "content", "value"] });
  return observer;
}

import type { JSDOM } from "jsdom";

export type RenderTarget = { url: string; file: string };

const HEAD_SELECTORS = [
  'meta[name="description"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'link[rel="canonical"]',
  'link[rel="alternate"]',
  'script#article-jsonld',
];

export function composeHtml(
  template: string,
  result: { html: string; head: string; title: string },
  JSDOMCtor: typeof JSDOM,
): string {
  const out = new JSDOMCtor(template);
  const doc = out.window.document;
  const src = new JSDOMCtor(`<head>${result.head}</head>`).window.document;

  if (result.title) {
    let titleEl = doc.querySelector("title");
    if (!titleEl) {
      titleEl = doc.createElement("title");
      doc.head.appendChild(titleEl);
    }
    titleEl.textContent = result.title;
  }

  for (const selector of HEAD_SELECTORS) {
    doc.head.querySelectorAll(selector).forEach((el) => el.remove());
    src.head.querySelectorAll(selector).forEach((el) => doc.head.appendChild(doc.importNode(el, true)));
  }

  const html = doc.querySelector("html");
  const lang = src.head.querySelector('meta[property="og:locale"]')?.getAttribute("content");
  if (html && lang) html.setAttribute("lang", lang.split("_")[0]);

  const root = doc.getElementById("root");
  if (root) root.innerHTML = result.html;

  return `<!doctype html>\n${doc.documentElement.outerHTML}`;
}

export function installGlobals(dom: JSDOM) {
  const win = dom.window as unknown as Record<string, unknown> & { document: Document };
  const g = globalThis as unknown as Record<string, unknown>;
  const define = (key: string, value: unknown) => {
    try {
      g[key] = value;
    } catch {
      Object.defineProperty(g, key, { value, configurable: true, writable: true });
    }
  };
  define("window", win);
  define("document", win.document);
  define("navigator", win.navigator);
  define("location", win.location);
  define("history", win.history);
  define("localStorage", win.localStorage);
  define("sessionStorage", win.sessionStorage);
  g.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0) as unknown as number;
  g.cancelAnimationFrame = (id: number) => clearTimeout(id);
  for (const key of [
    "HTMLElement",
    "Element",
    "Node",
    "Event",
    "CustomEvent",
    "MutationObserver",
    "getComputedStyle",
    "DOMParser",
    "SVGElement",
    "Image",
    "CSS",
  ]) {
    if (g[key] === undefined) g[key] = (win as Record<string, unknown>)[key];
  }
  if (g.matchMedia === undefined) {
    g.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      onchange: null,
      dispatchEvent: () => false,
    });
  }
  (win as Record<string, unknown>).matchMedia = g.matchMedia;
  if ((win as Record<string, unknown>).IntersectionObserver === undefined) {
    class IO {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    (win as Record<string, unknown>).IntersectionObserver = IO;
    g.IntersectionObserver = IO;
  }
  if ((win as Record<string, unknown>).ResizeObserver === undefined) {
    class RO {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    (win as Record<string, unknown>).ResizeObserver = RO;
    g.ResizeObserver = RO;
  }
  win.document.body.scrollTo = () => {};
  (win as unknown as { scrollTo: () => void }).scrollTo = () => {};
}

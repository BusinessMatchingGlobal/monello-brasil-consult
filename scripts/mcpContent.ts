import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { ANALYSIS_ARTICLES, getGroupSlug } from "../src/lib/analysis";

const SITE = "https://businessmatching.global";
const ANALYSIS_DIR = path.resolve(process.cwd(), "src/pages/analysis");

type Lang = "it" | "en" | "pt";

export type ArticleContent = {
  slug: string; // shared (group) slug, e.g. "pix"
  lang: Lang;
  title: string;
  date: string;
  updated?: string;
  url: string;
  text: string;
  authors?: string[];
  credit?: string;
};

function unescapeLiteral(raw: string): string {
  return raw
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\");
}

/** Extracts the `{ h: "..." }` / `{ p: "..." }` blocks from an article source file. */
function extractBlocks(source: string): string[] {
  const out: string[] = [];
  const re = /\{\s*(h|p):\s*(?:"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)\s*\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    const text = unescapeLiteral(m[2] ?? m[3] ?? "").trim();
    if (!text) continue;
    out.push(m[1] === "h" ? `\n## ${text}\n` : text);
  }
  return out;
}

/** Splits a multi-language `Record<"it"|"en"|"pt", ...>` source into per-language chunks. */
function splitByLanguage(source: string): Partial<Record<Lang, string>> | null {
  const markers: Array<{ lang: Lang; index: number }> = [];
  for (const lang of ["it", "en", "pt"] as Lang[]) {
    const idx = source.search(new RegExp(`^\\s{2}${lang}:\\s*\\{`, "m"));
    if (idx >= 0) markers.push({ lang, index: idx });
  }
  if (markers.length < 2) return null;
  markers.sort((a, b) => a.index - b.index);
  const chunks: Partial<Record<Lang, string>> = {};
  markers.forEach((marker, i) => {
    const end = i + 1 < markers.length ? markers[i + 1].index : source.length;
    chunks[marker.lang] = source.slice(marker.index, end);
  });
  return chunks;
}

function langFromFilename(file: string): Lang {
  if (/_IT\.tsx$/i.test(file)) return "it";
  if (/_BR\.tsx$/i.test(file)) return "pt";
  return "en";
}

function slugFromFilename(file: string): string {
  return file.replace(/\.tsx$/i, "").replace(/_(IT|BR)$/i, "").toLowerCase();
}

export function buildArticleContent(): ArticleContent[] {
  if (!fs.existsSync(ANALYSIS_DIR)) return [];
  const files = fs
    .readdirSync(ANALYSIS_DIR)
    .filter((f) => f.endsWith(".tsx") && f !== "LocalizedArticle.tsx");

  const byKey = new Map<string, ArticleContent>();

  for (const file of files) {
    const source = fs.readFileSync(path.join(ANALYSIS_DIR, file), "utf8");
    const slug = slugFromFilename(file);
    const meta =
      ANALYSIS_ARTICLES.find((a) => getGroupSlug(a).toLowerCase() === slug) ??
      ANALYSIS_ARTICLES.find((a) => a.slug.toLowerCase() === slug);
    if (!meta) continue;

    const chunks = splitByLanguage(source);
    const perLang: Array<{ lang: Lang; blocks: string[] }> = chunks
      ? (Object.entries(chunks) as Array<[Lang, string]>).map(([lang, chunk]) => ({
          lang,
          blocks: extractBlocks(chunk),
        }))
      : [{ lang: langFromFilename(file), blocks: extractBlocks(source) }];

    for (const { lang, blocks } of perLang) {
      if (!blocks.length) continue;
      const key = `${slug}:${lang}`;
      const existing = byKey.get(key);
      const text = blocks.join("\n\n").trim();
      if (existing && existing.text.length >= text.length) continue;
      byKey.set(key, {
        slug,
        lang,
        title: meta.title[lang],
        date: meta.date,
        updated: meta.updated,
        url: `${SITE}/${slug}`,
        text,
        authors: meta.authors,
        credit: meta.credit,
      });
    }
  }

  return Array.from(byKey.values()).sort((a, b) =>
    a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1,
  );
}

/**
 * Writes public/mcp/articles.json — the content archive the MCP server reads at
 * runtime so ChatGPT/Claude can answer from the published BMG analyses.
 */
export function mcpContentPlugin(): Plugin {
  const write = () => {
    const dir = path.resolve(process.cwd(), "public/mcp");
    fs.mkdirSync(dir, { recursive: true });
    const write1 = (file: string, payload: unknown) => {
      const target = path.join(dir, file);
      const json = `${JSON.stringify(payload, null, 0)}\n`;
      const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
      if (current !== json) fs.writeFileSync(target, json);
    };
    write1("articles.json", { generatedAt: null, articles: buildArticleContent() });
    write1("services.json", { generatedAt: null, services: buildServiceContent() });
    write1("method.json", { generatedAt: null, method: buildMethodContent() });
  };
  return {
    name: "bmg-mcp-content",
    buildStart: write,
    configureServer: write,
  };
}

/* ------------------------------------------------------------------ */
/* Services catalogue as retrievable documents                         */
/* ------------------------------------------------------------------ */

import { servicesIntro, serviceGroups } from "../src/data/servicesCatalog";
import { servicesIntroEN, serviceGroupsEN } from "../src/data/servicesCatalog.en";
import { servicesIntroPT, serviceGroupsPT } from "../src/data/servicesCatalog.pt";

const SERVICE_CATALOGS: Record<Lang, { intro: typeof servicesIntro; groups: typeof serviceGroups }> = {
  it: { intro: servicesIntro, groups: serviceGroups },
  en: { intro: servicesIntroEN as typeof servicesIntro, groups: serviceGroupsEN },
  pt: { intro: servicesIntroPT as typeof servicesIntro, groups: serviceGroupsPT },
};

export function buildServiceContent(): ArticleContent[] {
  const today = new Date().toISOString().slice(0, 10);
  return (Object.keys(SERVICE_CATALOGS) as Lang[]).map((lang) => {
    const { intro, groups } = SERVICE_CATALOGS[lang];
    const parts: string[] = [`## ${intro.title}`, intro.intro, intro.markets];
    for (const group of groups) {
      parts.push(`\n## ${group.num} — ${group.label}`);
      if (group.note) parts.push(group.note);
      for (const item of group.items) {
        parts.push(
          [
            `### ${item.name} — ${item.price}`,
            item.tagline,
            item.bullets.map((b) => `- ${b}`).join("\n"),
            item.audience?.length ? `${intro.forWhom} ${item.audience.join("; ")}` : "",
            item.examples ?? "",
          ]
            .filter(Boolean)
            .join("\n"),
        );
      }
    }
    return {
      slug: "services",
      lang,
      title: intro.title,
      date: today,
      url: `${SITE}/Our_Services`,
      text: parts.join("\n\n").trim(),
    };
  });
}

/* ------------------------------------------------------------------ */
/* Method pages (How we work, Partner Program, phase zero) as documents */
/* ------------------------------------------------------------------ */

const PAGES_DIR = path.resolve(process.cwd(), "src/pages");

function readPage(rel: string): string {
  const file = path.join(PAGES_DIR, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

/** Slices a source file into the chunk that starts at `marker` and ends at the next one. */
function chunkBetween(source: string, markers: string[], index: number): string {
  const start = source.indexOf(markers[index]);
  if (start < 0) return "";
  let end = source.length;
  for (let i = index + 1; i < markers.length; i++) {
    const next = source.indexOf(markers[i]);
    if (next > start) {
      end = next;
      break;
    }
  }
  return source.slice(start, end);
}

/** Collects the values of the given object keys, in source order. */
function keyStrings(chunk: string, keys: string[]): string[] {
  const re = new RegExp(`\\b(?:${keys.join("|")}):\\s*"((?:[^"\\\\]|\\\\.)*)"`, "g");
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(chunk))) {
    const text = unescapeLiteral(m[1]).trim();
    if (text) out.push(text);
  }
  return out;
}

function arrayStrings(chunk: string, key: string): string[] {
  const m = new RegExp(`\\b${key}:\\s*\\[([\\s\\S]*?)\\]`).exec(chunk);
  if (!m) return [];
  const out: string[] = [];
  const re = /"((?:[^"\\]|\\.)*)"/g;
  let s: RegExpExecArray | null;
  while ((s = re.exec(m[1]))) {
    const text = unescapeLiteral(s[1]).trim();
    if (text) out.push(text);
  }
  return out;
}

const HOW_WE_WORK_MARKERS = ["const blocksEn", "const blocksIt", "const blocksPt"];
const PARTNER_MARKERS = ["const en: Content", "const it: Content", "const pt: Content"];
const LANGS: Lang[] = ["en", "it", "pt"];

const HOW_WE_WORK_TITLE: Record<Lang, string> = {
  en: "How we work — Business Matching Global",
  it: "Come lavoriamo — Business Matching Global",
  pt: "Como trabalhamos — Business Matching Global",
};
const PARTNER_TITLE: Record<Lang, string> = {
  en: "Partner Program — Business Matching Global",
  it: "Partner Program — Business Matching Global",
  pt: "Partner Program — Business Matching Global",
};
const PHASE_ZERO_TITLE: Record<Lang, string> = {
  en: "Phase zero — Business Matching",
  it: "Fase zero — Business Matching",
  pt: "Fase zero — Business Matching",
};
const PHASE_ZERO_PAGES: Record<Lang, string> = {
  en: "services/BusinessMatching.tsx",
  it: "servizi/BusinessMatching.tsx",
  pt: "servicos/BusinessMatching.tsx",
};
const PHASE_ZERO_URLS: Record<Lang, string> = {
  en: `${SITE}/services/business-matching`,
  it: `${SITE}/servizi/business-matching`,
  pt: `${SITE}/servicos/business-matching`,
};

function howWeWorkText(source: string, index: number): string {
  const chunk = chunkBetween(source, HOW_WE_WORK_MARKERS, index);
  if (!chunk) return "";
  const parts: string[] = [];
  const blockRe = /\{\s*title:\s*"((?:[^"\\]|\\.)*)"([\s\S]*?)highlight:\s*"((?:[^"\\]|\\.)*)"/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(chunk))) {
    parts.push(`## ${unescapeLiteral(m[1]).trim()}`);
    parts.push(...keyStrings(m[2], ["text"]));
    parts.push(unescapeLiteral(m[3]).trim());
  }
  return parts.join("\n\n").trim();
}

function partnerText(source: string, index: number): string {
  let chunk = chunkBetween(source, PARTNER_MARKERS, index);
  if (!chunk) return "";
  const seo = chunk.search(/^\s{2}seo:\s*\{/m);
  if (seo > 0) chunk = chunk.slice(0, seo);
  const parts: string[] = [];
  parts.push(...keyStrings(chunk, ["pageTitle", "heroSub", "top", "mid", "bottom", "whiteLabel"]));
  const cardsStart = chunk.indexOf("cardsTitle:");
  const phaseStart = chunk.indexOf("phaseTitle:");
  if (cardsStart >= 0 && phaseStart > cardsStart) {
    parts.push(`## ${keyStrings(chunk.slice(cardsStart), ["cardsTitle"])[0] ?? ""}`);
    parts.push(...keyStrings(chunk.slice(cardsStart, phaseStart), ["title", "text", "cta"]));
  }
  if (phaseStart >= 0) {
    const phase = chunk.slice(phaseStart);
    parts.push(`## ${keyStrings(phase, ["phaseTitle"])[0] ?? ""}`);
    parts.push(...keyStrings(phase, ["phaseText"]));
    parts.push(`## ${keyStrings(phase, ["audienceTitle"])[0] ?? ""}`);
    parts.push(...arrayStrings(phase, "audience").map((a) => `- ${a}`));
    parts.push(...keyStrings(phase, ["closingTitle", "closingText"]));
  }
  return parts.filter((p) => p && p !== "## ").join("\n\n").trim();
}

function phaseZeroText(source: string): string {
  const m = /mb-3">(Fase zero|Phase zero)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/.exec(source);
  if (!m) return "";
  const body = m[2].replace(/\s+/g, " ").trim();
  return `## ${m[1]}\n\n${body}`;
}

/**
 * Builds public/mcp/method.json: the method and partnership pages
 * (How we work, Partner Program, the phase-zero step of Business Matching)
 * so the MCP server and Ask BMG can answer from them.
 */
export function buildMethodContent(): ArticleContent[] {
  const today = new Date().toISOString().slice(0, 10);
  const howWeWork = readPage("HowWeWork.tsx");
  const partner = readPage("PartnerProgram.tsx");
  const docs: ArticleContent[] = [];

  LANGS.forEach((lang, i) => {
    const text = howWeWorkText(howWeWork, i);
    if (text) {
      docs.push({
        slug: "how-we-work",
        lang,
        title: HOW_WE_WORK_TITLE[lang],
        date: today,
        url: `${SITE}/How_we_work`,
        text,
      });
    }
    const partnerBody = partnerText(partner, i);
    if (partnerBody) {
      docs.push({
        slug: "partner-program",
        lang,
        title: PARTNER_TITLE[lang],
        date: today,
        url: `${SITE}/Partner_Program`,
        text: partnerBody,
      });
    }
    const phase = phaseZeroText(readPage(PHASE_ZERO_PAGES[lang]));
    if (phase) {
      docs.push({
        slug: "business-matching-phase-zero",
        lang,
        title: PHASE_ZERO_TITLE[lang],
        date: today,
        url: PHASE_ZERO_URLS[lang],
        text: phase,
      });
    }
  });

  return docs;
}

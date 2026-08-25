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

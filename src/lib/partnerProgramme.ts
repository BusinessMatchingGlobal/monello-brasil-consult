import raw from "@/content/partner-programme.md?raw";

export type PPLink = { text?: string; href: string };
export type PPSection = { num: number; title: string; lines: string[] };
export type PPLang = "en" | "it" | "pt";

export type PPContent = {
  title: string;
  description: string;
  sections: Record<number, PPSection>;
};

const MARKERS: Record<PPLang, string> = {
  en: "ENGLISH VERSION",
  it: "ITALIAN VERSION",
  pt: "BRAZILIAN PORTUGUESE VERSION",
};

function block(lang: PPLang): string[] {
  const all = raw.split(/\r?\n/);
  const start = all.findIndex((l) => l.startsWith(MARKERS[lang]));
  const out: string[] = [];
  for (let i = start + 2; i < all.length; i++) {
    if (/^=+$/.test(all[i].trim()) && Object.values(MARKERS).some((m) => (all[i + 1] || "").startsWith(m))) break;
    out.push(all[i]);
  }
  return out;
}

function parse(lang: PPLang): PPContent {
  const lines = block(lang);
  let title = "";
  let description = "";
  const sections: Record<number, PPSection> = {};
  let cur: PPSection | null = null;
  let expected = 1;
  for (const l of lines) {
    const t = l.trim();
    if (!t) continue;
    if (t.startsWith("Page title (browser tab):")) { title = t.split(":").slice(1).join(":").trim(); continue; }
    if (t.startsWith("Meta description:")) { description = t.slice("Meta description:".length).trim(); continue; }
    const m = t.match(/^(\d+)\.\s+(.*)$/);
    if (m && Number(m[1]) === expected) {
      cur = { num: expected, title: m[2], lines: [] };
      sections[expected] = cur;
      expected++;
      continue;
    }
    if (/^\(.*\)$/.test(t)) continue; // editorial notes
    cur?.lines.push(t);
  }
  return { title, description, sections };
}

const cache: Partial<Record<PPLang, PPContent>> = {};
export function getPartnerProgramme(lang: PPLang): PPContent {
  return (cache[lang] ??= parse(lang));
}

/** "Key: value" helper */
export function field(lines: string[], key: string): string | undefined {
  const l = lines.find((x) => x.startsWith(key + ":"));
  return l ? l.slice(key.length + 1).trim() : undefined;
}

/** Parses "Link text: Label → URL" or "Link: URL" */
export function parseLink(lines: string[]): PPLink | undefined {
  const lt = field(lines, "Link text");
  if (lt) {
    const [text, href] = lt.split("→").map((s) => s.trim());
    return { text, href };
  }
  const l = field(lines, "Link");
  return l ? { href: l } : undefined;
}

export const isMeta = (l: string) => /^(Link text|Link|Intro|Closing line|Text|Button|Headline|Epigraph):/.test(l) || l === "Epigraph:" || l === "Text:";

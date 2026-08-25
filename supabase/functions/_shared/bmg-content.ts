/**
 * Runtime access to the published BMG content archive.
 * Mirrors src/lib/mcp/content.ts (loadDocuments) so edge functions can read the
 * same published analyses and guides without importing frontend code.
 */

export type Lang = "it" | "en" | "pt";

export type ArticleContent = {
  kind?: "analysis" | "guide";
  slug: string;
  lang: Lang;
  title: string;
  date: string;
  updated?: string;
  url: string;
  text: string;
  source?: string;
  pages?: number;
  authors?: string[];
  credit?: string;
};

export const DEFAULT_AUTHOR = "Enzo Aldo Stobbione";
export const PUBLISHER = "Business Matching Global";
export const SITE_URL = "https://businessmatching.global";

export function citation(article: ArticleContent): string {
  const authors = article.authors?.length ? article.authors.join(", ") : DEFAULT_AUTHOR;
  const credit = article.credit ? ` · Source/partner: ${article.credit}` : "";
  const date = article.updated ?? article.date;
  return `${authors} — ${PUBLISHER}, "${article.title}"${date ? `, ${date}` : ""}${credit} — ${article.url}`;
}

let cache: { at: number; documents: ArticleContent[] } | null = null;
const TTL_MS = 10 * 60 * 1000;

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SITE_URL}${path}`, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Everything BMG has published: analyses + ebooks/guides/dossiers. */
export async function loadDocuments(): Promise<ArticleContent[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.documents;
  const [a, g] = await Promise.all([
    fetchJson<{ articles?: ArticleContent[] }>("/mcp/articles.json"),
    fetchJson<{ guides?: ArticleContent[] }>("/mcp/guides.json"),
  ]);
  const documents: ArticleContent[] = [
    ...((a?.articles ?? []).map((x) => ({ ...x, kind: x.kind ?? ("analysis" as const) }))),
    ...((g?.guides ?? []).map((x) => ({ ...x, kind: "guide" as const }))),
  ];
  cache = { at: Date.now(), documents };
  return documents;
}

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function scoreArticle(article: ArticleContent, query: string): number {
  const terms = normalize(query).split(/\s+/).filter((t) => t.length > 2);
  if (!terms.length) return 0;
  const title = normalize(article.title);
  const text = normalize(article.text);
  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 5;
    const matches = text.split(term).length - 1;
    score += Math.min(matches, 10);
  }
  return score;
}

export type Coverage = "covered" | "partial" | "not_covered";

export function classifyCoverage(
  article: ArticleContent | undefined,
  query: string,
  topScore: number,
): Coverage {
  if (!article || topScore <= 0) return "not_covered";
  const terms = Array.from(new Set(normalize(query).split(/\s+/).filter((t) => t.length > 3)));
  if (!terms.length) return topScore >= 8 ? "partial" : "not_covered";
  const haystack = `${normalize(article.title)} ${normalize(article.text)}`;
  const hits = terms.filter((t) => haystack.includes(t)).length;
  const ratio = hits / terms.length;
  if (ratio >= 0.6 && topScore >= 8) return "covered";
  if (ratio >= 0.3 || topScore >= 6) return "partial";
  return "not_covered";
}

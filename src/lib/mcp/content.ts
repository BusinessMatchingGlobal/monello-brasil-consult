/**
 * Runtime access to the published BMG content archive.
 * The archive is generated at build time into `public/mcp/articles.json` and
 * served from the published site, so the MCP function stays small and always
 * reads the currently published content.
 */

export type Lang = "it" | "en" | "pt";

export type ArticleContent = {
  slug: string;
  lang: Lang;
  title: string;
  date: string;
  updated?: string;
  url: string;
  text: string;
};

export const SITE_URL = "https://businessmatching.global";

let cache: { at: number; articles: ArticleContent[] } | null = null;
const TTL_MS = 10 * 60 * 1000;

export async function loadArticles(): Promise<ArticleContent[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.articles;
  const res = await fetch(`${SITE_URL}/mcp/articles.json`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Could not load the BMG content archive (HTTP ${res.status})`);
  const data = (await res.json()) as { articles?: ArticleContent[] };
  const articles = Array.isArray(data.articles) ? data.articles : [];
  cache = { at: Date.now(), articles };
  return articles;
}

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Simple keyword scoring over title + body. */
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

/** Returns a short excerpt around the first match of the query. */
export function excerpt(article: ArticleContent, query: string, size = 500): string {
  const terms = normalize(query).split(/\s+/).filter((t) => t.length > 2);
  const text = normalize(article.text);
  let index = -1;
  for (const term of terms) {
    const found = text.indexOf(term);
    if (found >= 0 && (index < 0 || found < index)) index = found;
  }
  if (index < 0) return article.text.slice(0, size);
  const start = Math.max(0, index - Math.floor(size / 3));
  return `${start > 0 ? "…" : ""}${article.text.slice(start, start + size)}…`;
}

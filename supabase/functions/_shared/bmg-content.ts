/**
 * Runtime access to the published BMG content archive.
 * Mirrors src/lib/mcp/content.ts (loadDocuments) so edge functions can read the
 * same published analyses and guides without importing frontend code.
 */

export type Lang = "it" | "en" | "pt";

export type ArticleContent = {
  kind?: "analysis" | "guide" | "service" | "method";
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
  const [a, g, s, m] = await Promise.all([
    fetchJson<{ articles?: ArticleContent[] }>("/mcp/articles.json"),
    fetchJson<{ guides?: ArticleContent[] }>("/mcp/guides.json"),
    fetchJson<{ services?: ArticleContent[] }>("/mcp/services.json"),
    fetchJson<{ method?: ArticleContent[] }>("/mcp/method.json"),
  ]);
  const documents: ArticleContent[] = [
    ...((a?.articles ?? []).map((x) => ({ ...x, kind: x.kind ?? ("analysis" as const) }))),
    ...((g?.guides ?? []).map((x) => ({ ...x, kind: "guide" as const }))),
    ...((s?.services ?? []).map((x) => ({ ...x, kind: "service" as const }))),
    ...((m?.method ?? []).map((x) => ({ ...x, kind: "method" as const }))),
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

/** Very common words in EN/IT/PT that carry no retrieval signal. */
const STOPWORDS = new Set([
  "the","and","for","are","que","com","como","para","nao","dos","das","uma","por","mais",
  "che","con","per","del","della","dei","delle","sono","gli","alla","alle","degli","nel",
  "nella","sul","sui","sugli","una","uno","suo","sua","what","how","does","which","why",
  "who","when","from","with","this","that","have","has","was","were","about","into","cosa",
  "quali","quale","quando","perche","porque","quais","sobre","seus","suas","mio","tua",
]);

export function scoreArticle(article: ArticleContent, query: string): number {
  const terms = Array.from(
    new Set(
      normalize(query)
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((t) => t.length > 2 && !STOPWORDS.has(t)),
    ),
  );
  if (!terms.length) return 0;
  const title = normalize(article.title);
  const slug = normalize(article.slug);
  const text = normalize(article.text);
  let score = 0;
  for (const term of terms) {
    // Longer terms are rarer and more discriminating.
    const weight = term.length >= 6 ? 2 : 1;
    if (slug.includes(term)) score += 10 * weight;
    if (title.includes(term)) score += 5 * weight;
    const matches = text.split(term).length - 1;
    // Presence matters more than raw frequency, so long ebooks do not swamp
    // shorter but more on-topic documents. A low cap keeps common words
    // (e.g. "significa") from saturating and tying with documents that
    // actually contain the query's rare terms.
    if (matches > 0) score += (3 + Math.min(matches, 3)) * weight;
  }
  if (article.kind === "service" && isServiceQuery(query)) score += 40;
  return score;
}

/** Detects questions about what BMG offers / prices / how to hire it. */
const SERVICE_INTENT = [
  "servizi","servizio","offrite","offrono","costa","costo","prezzo","prezzi","tariffe",
  "consulenza","preventivo","aiutarmi","aiutate","service","services","offer","offers",
  "price","pricing","cost","quote","hire","help me","packages","servico","servicos",
  "servicos","preco","precos","custa","orcamento","ajudar","contratar","ask brazil",
  "ask europe","due diligence","business matching",
];

export function isServiceQuery(query: string): boolean {
  const q = normalize(query);
  return SERVICE_INTENT.some((k) => q.includes(k));
}

export type Coverage = "covered" | "partial" | "not_covered";

export function classifyCoverage(
  article: ArticleContent | undefined,
  query: string,
  topScore: number,
): Coverage {
  if (!article || topScore <= 0) return "not_covered";
  if (article.kind === "service" && isServiceQuery(query)) return "covered";
  const terms = Array.from(new Set(normalize(query).split(/\s+/).filter((t) => t.length > 3)));
  if (!terms.length) return topScore >= 8 ? "partial" : "not_covered";
  const haystack = `${normalize(article.title)} ${normalize(article.text)}`;
  const hits = terms.filter((t) => haystack.includes(t)).length;
  const ratio = hits / terms.length;
  if (ratio >= 0.6 && topScore >= 8) return "covered";
  if (ratio >= 0.3 || topScore >= 6) return "partial";
  return "not_covered";
}

import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { excerpt, loadArticles, scoreArticle, type Lang } from "../content";

export default defineTool({
  name: "search_brazil_knowledge",
  title: "Search Brazil/Europe knowledge base",
  description:
    "Search the Business Matching Global research archive (published #CustoEuropa analyses on Brazil–Europe trade, regulation, import/export, market access) and return the most relevant excerpts with source URLs. Use this to answer questions about doing business, exporting or importing between Brazil and Europe.",
  inputSchema: {
    query: z.string().describe("The question or keywords to search for."),
    language: z
      .enum(["it", "en", "pt"])
      .nullable()
      .describe("Preferred content language: it, en or pt. Null searches all languages."),
    limit: z.number().nullable().describe("Maximum number of results (default 5)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, language, limit }) => {
    const articles = await loadArticles();
    const lang = (language ?? null) as Lang | null;
    const pool = lang ? articles.filter((a) => a.lang === lang) : articles;
    const max = Math.min(Math.max(limit ?? 5, 1), 10);

    const ranked = pool
      .map((article) => ({ article, score: scoreArticle(article, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, max);

    if (!ranked.length) {
      return {
        content: [
          {
            type: "text",
            text: `No published Business Matching Global analysis matches "${query}". For a bespoke answer, the "Ask Brazil / Ask Europe" service delivers a sourced 1–2 page answer in 48–72h: https://businessmatching.global/Our_Services`,
          },
        ],
      };
    }

    const text = ranked
      .map(
        ({ article }) =>
          `### ${article.title} (${article.lang}, ${article.updated ?? article.date})\n${article.url}\n\n${excerpt(article, query)}`,
      )
      .join("\n\n---\n\n");

    return {
      content: [{ type: "text", text }],
      structuredContent: {
        results: ranked.map(({ article, score }) => ({
          slug: article.slug,
          lang: article.lang,
          title: article.title,
          url: article.url,
          date: article.updated ?? article.date,
          score,
        })),
      },
    };
  },
});

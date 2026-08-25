import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { citation, loadArticles, type Lang } from "../content";

export default defineTool({
  name: "list_articles",
  title: "List published analyses",
  description:
    "List the published Business Matching Global analyses (#CustoEuropa) with title, date, language and URL, most recent first.",
  inputSchema: {
    language: z
      .enum(["it", "en", "pt"])
      .nullable()
      .describe("Filter by language: it, en or pt. Null returns all languages."),
    limit: z.number().nullable().describe("Maximum number of articles (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ language, limit }) => {
    const articles = await loadArticles();
    const lang = (language ?? null) as Lang | null;
    const list = (lang ? articles.filter((a) => a.lang === lang) : articles).slice(
      0,
      Math.min(Math.max(limit ?? 20, 1), 100),
    );
    const text = list
      .map((a) => `- [${a.lang}] ${citation(a)}`)
      .join("\n");
    return {
      content: [{ type: "text", text: text || "No articles published yet." }],
      structuredContent: {
        articles: list.map((a) => ({ ...a, citation: citation(a) })).map(({ slug, lang: l, title, date, updated, url, citation: cite, authors, credit }) => ({
          slug,
          lang: l,
          title,
          date,
          updated: updated ?? null,
          url,
          authors: authors ?? null,
          credit: credit ?? null,
          citation: cite,
        })),
      },
    };
  },
});

import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { loadArticles, type Lang } from "../content";

export default defineTool({
  name: "get_article",
  title: "Read a published analysis",
  description:
    "Return the full text of one published Business Matching Global analysis, by slug (e.g. 'pix', 'bahia', 'amapa') and language.",
  inputSchema: {
    slug: z.string().describe("Article slug, as returned by list_articles or search_brazil_knowledge."),
    language: z
      .enum(["it", "en", "pt"])
      .nullable()
      .describe("Language of the version to read. Null picks the first available."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug, language }) => {
    const articles = await loadArticles();
    const key = slug.trim().toLowerCase().replace(/^\//, "");
    const matches = articles.filter((a) => a.slug === key);
    if (!matches.length) {
      throw new ToolError(`No article found for slug "${slug}". Use list_articles to see the available slugs.`);
    }
    const lang = (language ?? null) as Lang | null;
    const article = (lang && matches.find((a) => a.lang === lang)) || matches[0];
    return {
      content: [
        {
          type: "text",
          text: `# ${article.title}\n\nPublished: ${article.date}${article.updated ? ` · Updated: ${article.updated}` : ""}\nSource: ${article.url}\n\n${article.text}\n\n— Business Matching Global (businessmatching.global)`,
        },
      ],
      structuredContent: {
        slug: article.slug,
        lang: article.lang,
        title: article.title,
        url: article.url,
        date: article.date,
        updated: article.updated ?? null,
      },
    };
  },
});

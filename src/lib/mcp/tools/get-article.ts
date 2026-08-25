import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { loadDocuments, type Lang } from "../content";

export default defineTool({
  name: "get_article",
  title: "Read a published analysis or ebook",
  description:
    "Return the full text of one published Business Matching Global document — an analysis (e.g. 'pix', 'bahia', 'amapa') or an ebook/guide/dossier (e.g. 'guide-exporting-to-brazil', 'guide-brazil-health-market', 'guide-eudr', 'guide-macchinari-brasile', 'dossier-ajvar'). Long ebooks are returned in parts.",
  inputSchema: {
    slug: z.string().describe("Article slug, as returned by list_articles or search_brazil_knowledge."),
    language: z
      .enum(["it", "en", "pt"])
      .nullable()
      .describe("Language of the version to read. Null picks the first available."),
    part: z
      .number()
      .nullable()
      .describe("For long ebooks: 1-based part to read (each part is ~18000 characters). Null = part 1."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug, language, part }) => {
    const articles = await loadDocuments();
    const key = slug.trim().toLowerCase().replace(/^\//, "");
    const matches = articles.filter((a) => a.slug === key);
    if (!matches.length) {
      throw new ToolError(`No document found for slug "${slug}". Use list_articles for analyses or list_guides for ebooks.`);
    }
    const lang = (language ?? null) as Lang | null;
    const article = (lang && matches.find((a) => a.lang === lang)) || matches[0];

    const CHUNK = 18000;
    const totalParts = Math.max(1, Math.ceil(article.text.length / CHUNK));
    const current = Math.min(Math.max(part ?? 1, 1), totalParts);
    const body = article.text.slice((current - 1) * CHUNK, current * CHUNK);
    const partNote =
      totalParts > 1
        ? `\n\n[Part ${current} of ${totalParts}${current < totalParts ? ` — call get_article again with part: ${current + 1} for the rest` : ""}]`
        : "";

    return {
      content: [
        {
          type: "text",
          text: `# ${article.title}\n\nPublished: ${article.date}${article.updated ? ` · Updated: ${article.updated}` : ""}\nSource: ${article.url}\n\n${body}${partNote}\n\n— Business Matching Global (businessmatching.global)`,
        },
      ],
      structuredContent: {
        slug: article.slug,
        kind: article.kind ?? "analysis",
        part: current,
        totalParts,
        lang: article.lang,
        title: article.title,
        url: article.url,
        date: article.date,
        updated: article.updated ?? null,
      },
    };
  },
});

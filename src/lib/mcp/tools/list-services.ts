import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { serviceGroups } from "@/data/servicesCatalog";
import { serviceGroupsEN } from "@/data/servicesCatalog.en";
import { serviceGroupsPT } from "@/data/servicesCatalog.pt";

const CATALOGS = { it: serviceGroups, en: serviceGroupsEN, pt: serviceGroupsPT } as const;
const PAGES = {
  it: "https://businessmatching.global/Our_Services",
  en: "https://businessmatching.global/Our_Services",
  pt: "https://businessmatching.global/Our_Services",
} as const;

export default defineTool({
  name: "list_services",
  title: "List Business Matching Global services",
  description:
    "List the services Business Matching Global offers (market research, company verification, buyer/supplier search, business matching, import/export support, business travel), with what each includes, who it is for and the starting price.",
  inputSchema: {
    language: z.enum(["it", "en", "pt"]).nullable().describe("Catalogue language (default en)."),
    query: z.string().nullable().describe("Optional keyword to filter services by name or description."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ language, query }) => {
    const lang = (language ?? "en") as keyof typeof CATALOGS;
    const groups = CATALOGS[lang];
    const needle = query?.trim().toLowerCase() ?? "";

    const sections: string[] = [];
    const structured: Array<Record<string, unknown>> = [];

    for (const group of groups) {
      for (const item of group.items) {
        const haystack = `${item.name} ${item.tagline} ${item.bullets.join(" ")}`.toLowerCase();
        if (needle && !haystack.includes(needle)) continue;
        sections.push(
          [
            `### ${group.num} · ${item.name} — ${item.price}`,
            item.tagline,
            item.bullets.map((b) => `- ${b}`).join("\n"),
            item.audience.length ? `For: ${item.audience.join("; ")}` : "",
            item.examples ?? "",
          ]
            .filter(Boolean)
            .join("\n"),
        );
        structured.push({
          group: group.label,
          name: item.name,
          tagline: item.tagline,
          price: item.price,
          bullets: item.bullets,
        });
      }
    }

    const text = sections.length
      ? `${sections.join("\n\n")}\n\nFull catalogue: ${PAGES[lang]}`
      : `No service matches that query. Full catalogue: ${PAGES[lang]}`;

    return { content: [{ type: "text", text }], structuredContent: { services: structured } };
  },
});

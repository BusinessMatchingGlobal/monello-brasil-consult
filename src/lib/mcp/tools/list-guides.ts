import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const GUIDES = [
  {
    title: "Exporting to Brazil — EU operator manual",
    topics: ["customs", "import duties", "certifications", "distribution", "Custo Brasil"],
    url: "https://businessmatching.global/news",
    note: "Free download after registration.",
  },
  {
    title: "EU–Mercosur & SACE guide",
    topics: ["EU-Mercosur agreement", "export finance", "insurance", "tariff schedules"],
    url: "https://businessmatching.global/sace",
    note: "Free download after registration.",
  },
  {
    title: "Pharma & health market in Brazil",
    topics: ["ANVISA", "registration", "health market", "distribution"],
    url: "https://businessmatching.global/pharma",
    note: "Free download after registration.",
  },
  {
    title: "EUDR — deforestation regulation guide",
    topics: ["EUDR", "traceability", "coffee", "smallholders", "due diligence"],
    url: "https://businessmatching.global/eudr",
    note: "Free download after registration.",
  },
  {
    title: "Doing business in Brazil — guide",
    topics: ["company setup", "taxes", "labour", "market entry"],
    url: "https://businessmatching.global/guides/doing-business-in-brazil",
    note: "Open guide.",
  },
  {
    title: "Sample dossier (example report)",
    topics: ["report format", "methodology", "example output"],
    url: "https://businessmatching.global/sample-report",
    note: "Example of the depth and format of BMG reports.",
  },
];

export default defineTool({
  name: "list_guides",
  title: "List BMG guides and reports",
  description:
    "List the practical guides, ebooks and sample reports published by Business Matching Global (exporting to Brazil, EU–Mercosur/SACE, pharma/ANVISA, EUDR, doing business in Brazil), with topics and download URLs.",
  inputSchema: {
    topic: z.string().nullable().describe("Optional keyword to filter guides by topic."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ topic }) => {
    const needle = topic?.trim().toLowerCase() ?? "";
    const list = needle
      ? GUIDES.filter((g) =>
          `${g.title} ${g.topics.join(" ")}`.toLowerCase().includes(needle),
        )
      : GUIDES;
    const text = list.length
      ? list.map((g) => `- ${g.title} — ${g.topics.join(", ")} — ${g.url} (${g.note})`).join("\n")
      : "No guide matches that topic. Full list: https://businessmatching.global/news";
    return { content: [{ type: "text", text }], structuredContent: { guides: list } };
  },
});

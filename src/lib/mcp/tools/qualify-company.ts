import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { serviceGroups } from "@/data/servicesCatalog";
import { serviceGroupsEN } from "@/data/servicesCatalog.en";
import { serviceGroupsPT } from "@/data/servicesCatalog.pt";

const CATALOGS = { it: serviceGroups, en: serviceGroupsEN, pt: serviceGroupsPT } as const;

/** Keyword → service-name hints used to point at the most relevant BMG service. */
const HINTS: Array<{ terms: string[]; match: RegExp }> = [
  { terms: ["verifica", "due diligence", "affidabil", "fornitore sospetto", "check", "verify", "fraud", "truffa"], match: /verif|due diligence|company check/i },
  { terms: ["cliente", "buyer", "compratore", "distributore", "vendere", "sell", "export", "esportare"], match: /buyer|clienti|compratori|search|matching/i },
  { terms: ["fornitore", "supplier", "importare", "import", "acquistare", "sourcing"], match: /supplier|fornitor|sourcing|import/i },
  { terms: ["mercato", "market", "ricerca", "research", "studio", "settore", "concorrenza"], match: /market|mercat|research|ricerca|pesquisa/i },
  { terms: ["viaggio", "travel", "fiera", "agenda", "visita", "missione", "trip"], match: /travel|viaggi|agenda|missione/i },
  { terms: ["domanda", "question", "informazione", "quick", "dubbio"], match: /ask brazil|ask europe/i },
];

export default defineTool({
  name: "qualify_company",
  title: "Qualify a company and suggest the right BMG service",
  description:
    "Collect the profile of a company interested in the Brazil–Europe corridor (sector, country, objective, stage, timing) and return a structured qualification plus the Business Matching Global service that fits best, with its starting price. Read-only: it does not create a lead — call request_consultation for that.",
  inputSchema: {
    company_name: z.string().nullable().describe("Company name, if known."),
    country: z.string().nullable().describe("Country where the company is based."),
    sector: z.string().nullable().describe("Sector / products or services."),
    objective: z
      .string()
      .nullable()
      .describe("What the company wants to achieve (export to Brazil, find buyers, verify a partner, import, market study...)."),
    stage: z
      .string()
      .nullable()
      .describe("Current stage: exploring, already exporting, has a counterpart to verify, etc."),
    timing: z.string().nullable().describe("Timeframe or urgency, if known."),
    language: z.enum(["it", "en", "pt"]).nullable().describe("Answer language (default en)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ company_name, country, sector, objective, stage, timing, language }) => {
    const lang = (language ?? "en") as keyof typeof CATALOGS;
    const groups = CATALOGS[lang];
    const all = groups.flatMap((g) => g.items.map((item) => ({ group: g.label, ...item })));

    const haystack = `${objective ?? ""} ${sector ?? ""} ${stage ?? ""}`.toLowerCase();
    const hint = HINTS.find((h) => h.terms.some((t) => haystack.includes(t)));
    const recommended =
      (hint && all.find((s) => hint.match.test(s.name))) ??
      all.find((s) => /ask brazil|ask europe/i.test(s.name)) ??
      all[0];

    const missing = [
      !country && "country",
      !sector && "sector",
      !objective && "objective",
      !timing && "timing",
    ].filter(Boolean) as string[];

    const profile = [
      company_name && `Company: ${company_name}`,
      country && `Country: ${country}`,
      sector && `Sector: ${sector}`,
      objective && `Objective: ${objective}`,
      stage && `Stage: ${stage}`,
      timing && `Timing: ${timing}`,
    ]
      .filter(Boolean)
      .join("\n");

    const text = [
      "## Qualification",
      profile || "No profile data provided yet.",
      missing.length
        ? `\nStill missing (ask the user before creating a lead): ${missing.join(", ")}.`
        : "\nProfile complete — you can propose creating a contact request with `request_consultation` (always ask the user for consent and for their email before calling it).",
      recommended
        ? `\n## Suggested Business Matching Global service\n**${recommended.name}** — ${recommended.price}\n${recommended.tagline}\n${recommended.bullets.map((b) => `- ${b}`).join("\n")}\n\nFull catalogue: https://businessmatching.global/Our_Services`
        : "",
      "\nThis suggestion is based on the published BMG service catalogue; do not invent prices, delivery times or guarantees.",
    ].join("\n");

    return {
      content: [{ type: "text", text }],
      structuredContent: {
        qualification: {
          company_name: company_name ?? null,
          country: country ?? null,
          sector: sector ?? null,
          objective: objective ?? null,
          stage: stage ?? null,
          timing: timing ?? null,
        },
        missing_fields: missing,
        recommended_service: recommended
          ? { name: recommended.name, price: recommended.price, tagline: recommended.tagline }
          : null,
        services_url: "https://businessmatching.global/Our_Services",
      },
    };
  },
});

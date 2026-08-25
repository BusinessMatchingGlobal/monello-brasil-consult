import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const INFO = {
  name: "Business Matching Global",
  legalName: "ENZO ALDO STOBBIONE LTDA",
  taxID: "67.589.228/0001-30",
  website: "https://businessmatching.global",
  email: "info@businessmatching.global",
  phone: "+55 31 3400-1031",
  address: "Avenida Getúlio Vargas 671, Sala 500, Savassi, Belo Horizonte, MG, CEP 30.112-021, Brasil",
  areaServed: ["Brazil", "Italy", "European Union", "Latin America"],
  languages: ["Italian", "English", "Portuguese"],
  memberships: ["Italcam — Câmara de Comércio Italiana", "Export Strategist"],
  social: [
    "https://www.linkedin.com/company/business-matching-global",
    "https://www.instagram.com/business_matching_global/",
    "https://www.facebook.com/businessmatchingglobal",
    "https://www.youtube.com/@Business_Matching_Global",
  ],
  keyPages: {
    services: "https://businessmatching.global/Our_Services",
    about: "https://businessmatching.global/About_us",
    analyses: "https://businessmatching.global/analysis",
    guidesAndEbooks: "https://businessmatching.global/news",
    businessTravel: "https://businessmatching.global/BT",
    sampleReport: "https://businessmatching.global/sample-report",
    privacy: "https://businessmatching.global/privacy",
  },
};

export default defineTool({
  name: "get_company_info",
  title: "Business Matching Global — company & contacts",
  description:
    "Return who Business Matching Global is, what it does, the markets it covers, contact details and the main pages of the website (services, analyses, guides, business travel).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: `${INFO.name} (${INFO.legalName}) — independent business intelligence on Brazil and Europe: market research, counterpart verification, buyer/supplier search, business matching, import/export and business travel support.

Website: ${INFO.website}
Email: ${INFO.email}
Phone: ${INFO.phone}
Address: ${INFO.address}
Markets: ${INFO.areaServed.join(", ")}
Languages: ${INFO.languages.join(", ")}
Memberships: ${INFO.memberships.join(", ")}

Key pages:
${Object.entries(INFO.keyPages)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}`,
      },
    ],
    structuredContent: INFO as unknown as Record<string, unknown>,
  }),
});

export const _schemaGuard = z;

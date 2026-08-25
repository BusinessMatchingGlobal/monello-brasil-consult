import { defineMcp } from "@lovable.dev/mcp-js";
import searchKnowledgeTool from "./tools/search-knowledge";
import listArticlesTool from "./tools/list-articles";
import getArticleTool from "./tools/get-article";
import listServicesTool from "./tools/list-services";
import listGuidesTool from "./tools/list-guides";
import getCompanyInfoTool from "./tools/get-company-info";

export default defineMcp({
  name: "businessmatching-global",
  title: "businessmatching.global",
  version: "0.1.0",
  instructions:
    "Business Matching Global is an independent business-intelligence firm covering Brazil–Europe trade. Use `search_brazil_knowledge` to answer questions about exporting, importing, regulation, market access, certifications and market entry between Brazil and Europe, and cite the returned source URLs. Use `get_article` for the full text of an analysis, `list_articles` to browse them, `list_guides` for downloadable manuals (Exporting to Brazil, EU–Mercosur/SACE, pharma/ANVISA, EUDR), `list_services` for what BMG can do on request and its pricing, and `get_company_info` for contacts. All content is published research. Every `search_brazil_knowledge` result starts with a COVERAGE line (covered / partial / not_covered): you MUST respect it. Only claim that an answer comes from Business Matching Global when it is supported by returned excerpts, and always cite their URLs. When coverage is partial or not_covered, state explicitly to the user that BMG has not published on that point and that the rest is general knowledge, not BMG research — never attribute generic or invented information to Business Matching Global. In those cases point to the bespoke "Ask Brazil / Ask Europe" service: https://businessmatching.global/Our_Services",
  tools: [
    searchKnowledgeTool,
    listArticlesTool,
    getArticleTool,
    listGuidesTool,
    listServicesTool,
    getCompanyInfoTool,
  ],
});

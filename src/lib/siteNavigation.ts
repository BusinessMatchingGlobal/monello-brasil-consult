import type { Lang } from "@/lib/lang";
import { getServicesCatalog } from "@/data/servicesCatalog";
import { familyPath, type ServiceFamilyKey } from "@/data/serviceFamilyMetadata";
import { STARTING_POINT, hasSituations, situationContent } from "@/data/situations";

export const SERVICE_ANCHORS = ["get-an-answer", "verify", "assess", "find", "make-contact", "enter", "stay", "training"] as const;
export const SERVICE_GROUP_FAMILIES: ServiceFamilyKey[] = ["decide", "verify", "prepare", "find", "find", "prepare", "stay", "training"];

export type SiteLink = { href: string; label: string; internal?: boolean; external?: boolean; externalIcon?: boolean };
export type SiteNavItem = SiteLink & { children?: SiteLink[] };

const labels = {
  en: { situation: "Your situation", services: "Services", method: "How we work", phase: "Method and phase zero", transfer: "Transfer the method", ethics: "Code of ethics", resources: "Resources", analysis: "Analysis", guides: "Guides", sample: "Sample report", advisers: "For advisers", about: "About", contact: "Contact", all: "All services", company: "Company", travel: "Business Travel", privacy: "Privacy & Data Protection", policy: "Privacy Policy", cookies: "Cookie Policy", terms: "Terms and Conditions", already: "Already in Brazil", tried: "Tried before" },
  it: { situation: "La vostra situazione", services: "Servizi", method: "Come lavoriamo", phase: "Metodo e fase zero", transfer: "Trasferire il metodo", ethics: "Codice etico", resources: "Risorse", analysis: "Analisi", guides: "Guide", sample: "Esempio di report", advisers: "Per consulenti", about: "Chi siamo", contact: "Contatti", all: "Tutti i servizi", company: "Azienda", travel: "Business Travel", privacy: "Privacy e protezione dei dati", policy: "Informativa privacy", cookies: "Informativa sui cookie", terms: "Termini e condizioni", already: "Già in Brasile", tried: "Ci avete già provato" },
  pt: { situation: "A sua situação", services: "Serviços", method: "Como trabalhamos", phase: "Método e fase zero", transfer: "Transferir o método", ethics: "Código de ética", resources: "Recursos", analysis: "Análises", guides: "Guias", sample: "Exemplo de relatório", advisers: "Para consultores", about: "Quem somos", contact: "Contato", all: "Todos os serviços", company: "Empresa", travel: "Business Travel", privacy: "Privacidade e proteção de dados", policy: "Política de Privacidade", cookies: "Política de Cookies", terms: "Termos e Condições", already: "Já estão no Brasil", tried: "Já tentaram antes" },
} as const;

const internal = (href: string, label: string): SiteLink => ({ href, label, internal: true });
const beauty: SiteLink = { href: "https://www.brazilbeautydesk.com", label: "Brazil Beauty Desk", external: true };
const newsletter: SiteLink = { href: "https://www.linkedin.com/company/businessmatchingglobal", label: "#CustoBrasil newsletter", external: true, externalIcon: true };

export function getSiteNavigation(lang: Lang): SiteNavItem[] {
  const c = labels[lang];
  const matching = internal(lang === "it" ? "/servizi/business-matching" : lang === "pt" ? "/servicos/business-matching" : "/services/business-matching", "Business Matching");
  return [
    { href: "__situation__", label: c.situation, children: [
      internal("/Our_Services", STARTING_POINT[lang].notYet.title),
      ...(hasSituations(lang) ? [
        internal(situationContent("already-in-brazil", lang).slug, situationContent("already-in-brazil", lang).cardTitle),
        internal(situationContent("back-to-brazil", lang).slug, situationContent("back-to-brazil", lang).cardTitle),
      ] : []),
    ] },
    { href: "__services__", label: c.services, children: [
      ...getServicesCatalog(lang).groups.map((g, i) => internal(familyPath(SERVICE_GROUP_FAMILIES[i], lang), g.label)),
      matching, beauty, internal("/Our_Services", c.all),
    ] },
    { href: "__method__", label: c.method, children: [
      internal("/How_we_work", c.phase), internal("/Transfer_the_method", c.transfer), internal("/ethics", c.ethics),
    ] },
    { href: "__resources__", label: c.resources, children: [internal("/analysis", c.analysis), internal("/news", c.guides), internal("/sample-report", c.sample), newsletter] },
    internal("/Partner_Program", c.advisers), internal("/About_us", c.about),
  ];
}

export function getFooterNavigation(lang: Lang): SiteNavItem[] {
  const c = labels[lang];
  const nav = getSiteNavigation(lang);
  const policyId = { en: "22477622", it: "32646575", pt: "16979386" }[lang];
  const policy = `https://www.iubenda.com/privacy-policy/${policyId}`;
  const terms = lang === "it" ? "termini-e-condizioni" : lang === "pt" ? "termos-e-condicoes" : "terms-and-conditions";
  return [
    nav[0],
    { href: "__services__", label: c.services, children: [internal("/Our_Services", c.all), ...((nav[1].children ?? []).filter(l => l.label === "Business Matching" || l.label === beauty.label))] },
    nav[2], nav[3],
    { href: "__company__", label: c.company, children: [nav[5], nav[4], { href: "#contact", label: c.contact }, internal("/BT", c.travel), internal("/privacy", c.privacy), { href: policy, label: c.policy }, { href: `${policy}/cookie-policy`, label: c.cookies }, { href: `https://www.iubenda.com/${terms}/${policyId}`, label: c.terms }] },
  ];
}
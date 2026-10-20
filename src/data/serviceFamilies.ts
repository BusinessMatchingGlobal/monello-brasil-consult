import { getServicesCatalog, type ServiceItem } from "./servicesCatalog";
import { SERVICE_FAMILIES, familyPath, type ServiceFamilyKey } from "./serviceFamilyMetadata";
import type { Lang } from "../lib/lang";

export { SERVICE_FAMILIES, familyPath };
export type { ServiceFamilyKey };
export const FAMILY_ITEM_POSITIONS = [
  [[2, 1], [0, 0]],
  [[1, 0], [1, 1], [1, 2], [1, 3]],
  [[2, 0], [2, 2], [2, 3], [5, 0]],
  [[3, 0], [3, 1], [3, 2], [4, 0], [4, 2], [4, 1]],
  [[6, 0]],
  [[7, 0], [7, 1]],
] as const;

export function getServiceFamilies(lang: Lang) {
  const { groups } = getServicesCatalog(lang);
  return SERVICE_FAMILIES.map((family, i) => ({
    ...family,
    title: family.titles[lang],
    intro: family.intros[lang],
    path: family.paths[lang],
    items: FAMILY_ITEM_POSITIONS[i].map(([group, item]) => groups[group].items[item]),
    levels: family.key === "stay" ? groups[6].items.slice(1) : [],
  }));
}

export function serviceDestination(name: string, lang: Lang): string {
  if (/Company Check|Supplier Check|Due Diligence/.test(name)) return familyPath("verify", lang);
  if (/Competitor|Market Analysis|Analisi di Mercato|Análise de Mercado|Briefing|Market Entry/.test(name)) return familyPath("prepare", lang);
  if (/Buyer|Supplier Finder|Matching|Agenda B2B|B2B Agenda/.test(name)) return familyPath("find", lang);
  if (/Desk|Support|Representation/.test(name)) return familyPath("stay", lang);
  if (/Webinar|Workshop|Training|Treinamento/.test(name)) return familyPath("training", lang);
  return familyPath("decide", lang) + (/Check-up/.test(name) ? "#check-up" : "");
}

export const familyCopy = {
  en: { overview: "Six families, in the order a project usually follows.", start: "Not sure where to start? Start with the Brazil Check-up.", checkup: "The first step of every project: a data-based answer before you spend more.", matching: "How business matching works →", desk: "One desk on the Brazilian side, at the level you need: from local support to a full export desk.", levels: ["Level 1 — Local support", "Level 2 — Representation Light", "Level 3 — Representation Full", "Level 4 — Fractional Export Desk"] },
  it: { overview: "Sei famiglie, nell'ordine che un progetto di solito segue.", start: "Non sapete da dove partire? Partite dal Brazil Check-up.", checkup: "Il primo passo di ogni progetto: una risposta basata sui dati prima di spendere di più.", matching: "Come funziona il business matching →", desk: "Un desk dal lato brasiliano, al livello che vi serve: dal supporto locale a un ufficio export completo.", levels: ["Livello 1 — Supporto locale", "Livello 2 — Rappresentanza Light", "Livello 3 — Rappresentanza Full", "Livello 4 — Fractional Export Desk"] },
  pt: { overview: "Seis famílias, na ordem que um projeto costuma seguir.", start: "Não sabem por onde começar? Comecem pelo Check-up Europa.", checkup: "O primeiro passo de todo projeto: uma resposta baseada em dados antes de gastar mais.", matching: "Como funciona o business matching →", desk: "Uma base do outro lado do corredor, no nível de que vocês precisam: do apoio local a um departamento de exportação completo.", levels: ["Nível 1 — Apoio local", "Nível 2 — Representação Light", "Nível 3 — Representação Full", "Nível 4 — Fractional Export Desk"] },
};

export function serviceCardId(item: ServiceItem): string {
  return /Check-up/.test(item.name) ? "check-up" : item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
}
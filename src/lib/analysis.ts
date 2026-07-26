import type { Lang } from "./i18n";

export type AnalysisArticle = {
  slug: string; // route path without leading slash, e.g. "pix"
  date: string; // ISO date, used for "most recent first"
  title: Record<Lang, string>;
  group?: string; // variants of the same article share the same group slug
};

// Most recent first (sorted by date desc at read time).
export const ANALYSIS_ARTICLES: AnalysisArticle[] = [
  {
    slug: "aiJus",
    group: "aiJus",
    date: "2026-07-26",
    title: {
      it: "Il testo bianco su fondo bianco: come il Brasile è diventato il laboratorio mondiale della frode processuale nell'era dell'IA",
      en: "White text on white background: how Brazil became the world's laboratory for procedural fraud in the age of AI",
      pt: "O texto branco sobre fundo branco: como o Brasil virou o laboratório mundial da fraude processual na era da IA",
    },
  },
  {
    slug: "aiJus_br",
    group: "aiJus",
    date: "2026-07-26",
    title: {
      it: "O texto branco sobre fundo branco: como o Brasil virou o laboratório mundial da fraude processual na era da IA",
      en: "O texto branco sobre fundo branco: como o Brasil virou o laboratório mundial da fraude processual na era da IA",
      pt: "O texto branco sobre fundo branco: como o Brasil virou o laboratório mundial da fraude processual na era da IA",
    },
  },
  {
    slug: "amaro",
    group: "amaro",
    date: "2026-07-26",
    title: {
      it: "The Commander Who Could Price What Accountants Couldn't See",
      en: "The Commander Who Could Price What Accountants Couldn't See",
      pt: "The Commander Who Could Price What Accountants Couldn't See",
    },
  },
  {
    slug: "amaro_it",
    group: "amaro",
    date: "2026-07-26",
    title: {
      it: "Il Comandante che sapeva dare un prezzo a ciò che i contabili non vedevano",
      en: "Il Comandante che sapeva dare un prezzo a ciò che i contabili non vedevano",
      pt: "Il Comandante che sapeva dare un prezzo a ciò che i contabili non vedevano",
    },
  },
  {
    slug: "amaro_br",
    group: "amaro",
    date: "2026-07-26",
    title: {
      it: "O Comandante que sabia precificar o que os contadores não enxergavam",
      en: "O Comandante que sabia precificar o que os contadores não enxergavam",
      pt: "O Comandante que sabia precificar o que os contadores não enxergavam",
    },
  },
  {
    slug: "Embraer",
    group: "Embraer",
    date: "2026-07-25",
    title: {
      it: "Embraer 2026: il monopolio, il paradosso e il metodo",
      en: "Embraer 2026: The Monopoly, the Paradox, and the Method",
      pt: "Embraer 2026: o monopólio, o paradoxo e o método",
    },
  },
  {
    slug: "suja",
    group: "suja",
    date: "2026-07-24",
    title: {
      it: "Stesso crimine, due architetture",
      en: "Same crime, two architectures",
      pt: "Mesmo crime, duas arquiteturas",
    },
  },
  {
    slug: "pix",
    group: "pix",
    date: "2026-07-23",
    title: {
      it: "Il primo dazio su un metodo",
      en: "The First Tariff on a Method",
      pt: "A primeira tarifa sobre um método",
    },
  },
];

function getGroupSlug(article: AnalysisArticle): string {
  return article.group ?? article.slug;
}

export function getSortedArticles(): AnalysisArticle[] {
  return [...ANALYSIS_ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRecentArticles(max = 6): AnalysisArticle[] {
  return getSortedArticles().slice(0, max);
}

export function getArticleBySlug(slug: string): AnalysisArticle | undefined {
  return ANALYSIS_ARTICLES.find((a) => a.slug === slug);
}

// Returns one article per group, picking the language variant that matches the
// requested language when available, falling back to the base (no-suffix) variant.
export function getLocalizedArticles(lang: Lang, max = 6): AnalysisArticle[] {
  const suffix = lang === "it" ? "_it" : lang === "pt" ? "_br" : "";
  const grouped = new Map<string, AnalysisArticle[]>();
  for (const article of getSortedArticles()) {
    const group = getGroupSlug(article);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group)!.push(article);
  }
  const result: AnalysisArticle[] = [];
  for (const groupArticles of grouped.values()) {
    const localized =
      groupArticles.find((a) => a.slug === `${getGroupSlug(a)}${suffix}`) ??
      groupArticles.find((a) => !a.slug.includes("_")) ??
      groupArticles[0];
    result.push(localized);
  }
  return result.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, max);
}

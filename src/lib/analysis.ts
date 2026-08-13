import type { Lang } from "./i18n";

export type AnalysisArticle = {
  slug: string; // route path without leading slash, e.g. "pix"
  date: string; // ISO date, used for "most recent first"
  updated?: string; // ISO date of the latest rewrite/update, when applicable
  title: Record<Lang, string>;
  group?: string; // variants of the same article share the same group slug
};

// Most recent first (sorted by date desc at read time).
export const ANALYSIS_ARTICLES: AnalysisArticle[] = [
  {
    slug: "asuncion",
    group: "asuncion",
    date: "2026-08-13",
    title: {
      it: "The Backdoor to Brazil",
      en: "The Backdoor to Brazil",
      pt: "The Backdoor to Brazil",
    },
  },
  {
    slug: "amapa",
    group: "amapa",
    date: "2026-08-13",
    title: {
      it: "L'isola che non è un'isola",
      en: "The Island That Isn't",
      pt: "A ilha que não é ilha",
    },
  },
  {
    slug: "amapa_br",
    group: "amapa",
    date: "2026-08-13",
    title: {
      it: "L'isola che non è un'isola",
      en: "The Island That Isn't",
      pt: "A ilha que não é ilha",
    },
  },
  {
    slug: "amapa_it",
    group: "amapa",
    date: "2026-08-13",
    title: {
      it: "L'isola che non è un'isola",
      en: "The Island That Isn't",
      pt: "A ilha que não é ilha",
    },
  },
  {
    slug: "rare",
    group: "rare",
    date: "2026-08-13",
    title: {
      it: "Rare Earths in Brazil: The Geology Is Settled. Everything Else Is Being Fought Over.",
      en: "Rare Earths in Brazil: The Geology Is Settled. Everything Else Is Being Fought Over.",
      pt: "Terras raras no Brasil: a geologia está resolvida. Todo o resto está em disputa.",
    },
  },
  {
    slug: "rare_br",
    group: "rare",
    date: "2026-08-13",
    title: {
      it: "Terras raras no Brasil: a geologia está resolvida. Todo o resto está em disputa.",
      en: "Terras raras no Brasil: a geologia está resolvida. Todo o resto está em disputa.",
      pt: "Terras raras no Brasil: a geologia está resolvida. Todo o resto está em disputa.",
    },
  },
  {
    slug: "rare_it",
    group: "rare",
    date: "2026-08-13",
    title: {
      it: "Terre rare in Brasile: la geologia è assodata. Tutto il resto è conteso.",
      en: "Terre rare in Brasile: la geologia è assodata. Tutto il resto è conteso.",
      pt: "Terre rare in Brasile: la geologia è assodata. Tutto il resto è conteso.",
    },
  },


  {
    slug: "lima",
    group: "lima",
    date: "2026-08-13",
    title: {
      it: "La rotta che esiste già",
      en: "The Route That Already Exists",
      pt: "A rota que já existe",
    },
  },
  {
    slug: "lima_it",
    group: "lima",
    date: "2026-08-13",
    title: {
      it: "La rotta che esiste già",
      en: "La rotta che esiste già",
      pt: "La rotta che esiste già",
    },
  },
  {
    slug: "lima_br",
    group: "lima",
    date: "2026-08-13",
    title: {
      it: "A rota que já existe",
      en: "A rota que já existe",
      pt: "A rota que já existe",
    },
  },
  {
    slug: "economist",
    group: "economist",
    date: "2026-08-02",
    title: {
      it: "Ten-Fold, and Still Not Attacking: The Embraer Lesson in Constraint Capital",
      en: "Ten-Fold, and Still Not Attacking: The Embraer Lesson in Constraint Capital",
      pt: "Ten-Fold, and Still Not Attacking: The Embraer Lesson in Constraint Capital",
    },
  },
  {
    slug: "economist_it",
    group: "economist",
    date: "2026-08-02",
    title: {
      it: "Dieci volte in borsa, e ancora nessun attacco: la lezione Embraer sul capitale del vincolo",
      en: "Dieci volte in borsa, e ancora nessun attacco: la lezione Embraer sul capitale del vincolo",
      pt: "Dieci volte in borsa, e ancora nessun attacco: la lezione Embraer sul capitale del vincolo",
    },
  },
  {
    slug: "economist_br",
    group: "economist",
    date: "2026-08-02",
    title: {
      it: "Dez vezes na bolsa, e ainda sem atacar: a lição da Embraer sobre o capital da restrição",
      en: "Dez vezes na bolsa, e ainda sem atacar: a lição da Embraer sobre o capital da restrição",
      pt: "Dez vezes na bolsa, e ainda sem atacar: a lição da Embraer sobre o capital da restrição",
    },
  },
  {
    slug: "ceuta",
    group: "ceuta",
    date: "2026-08-02",
    updated: "2026-08-08",
    title: {
      it: "Voting with Their Feet",
      en: "Voting with Their Feet",
      pt: "Voting with Their Feet",
    },
  },
  {
    slug: "ceuta_br",
    group: "ceuta",
    date: "2026-08-02",
    updated: "2026-08-08",
    title: {
      it: "Votando com os pés",
      en: "Votando com os pés",
      pt: "Votando com os pés",
    },
  },
  {
    slug: "ceuta_it",
    group: "ceuta",
    date: "2026-08-02",
    updated: "2026-08-08",
    title: {
      it: "Votare con i piedi",
      en: "Votare con i piedi",
      pt: "Votare con i piedi",
    },
  },
  {
    slug: "lorenzetti",
    group: "lorenzetti",
    date: "2026-08-01",
    title: {
      it: "The Shower That Decides How Brazil Washes",
      en: "The Shower That Decides How Brazil Washes",
      pt: "The Shower That Decides How Brazil Washes",
    },
  },
  {
    slug: "lorenzetti_it",
    group: "lorenzetti",
    date: "2026-08-01",
    title: {
      it: "La doccia che decide come si lava il Brasile",
      en: "La doccia che decide come si lava il Brasile",
      pt: "La doccia che decide come si lava il Brasile",
    },
  },
  {
    slug: "lorenzetti_br",
    group: "lorenzetti",
    date: "2026-08-01",
    title: {
      it: "O chuveiro que decide como o Brasil se lava",
      en: "O chuveiro que decide como o Brasil se lava",
      pt: "O chuveiro que decide como o Brasil se lava",
    },
  },
  {
    slug: "aiJus",
    group: "aiJus",
    date: "2026-07-26",
    title: {
      it: "White Text on a White Background: How Brazil Became the World's Laboratory for Procedural Fraud in the Age of AI",
      en: "White Text on a White Background: How Brazil Became the World's Laboratory for Procedural Fraud in the Age of AI",
      pt: "White Text on a White Background: How Brazil Became the World's Laboratory for Procedural Fraud in the Age of AI",
    },
  },
  {
    slug: "aiJus_it",
    group: "aiJus",
    date: "2026-07-26",
    title: {
      it: "Il testo bianco su fondo bianco: come il Brasile è diventato il laboratorio mondiale della frode processuale nell'era dell'IA",
      en: "Il testo bianco su fondo bianco: come il Brasile è diventato il laboratorio mondiale della frode processuale nell'era dell'IA",
      pt: "Il testo bianco su fondo bianco: come il Brasile è diventato il laboratorio mondiale della frode processuale nell'era dell'IA",
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
    updated: "2026-08-01",
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
    // Expose the shared (group) URL so every language shares one direct link.
    result.push({ ...localized, slug: getGroupSlug(localized) });
  }
  return result.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, max);
}

// Localized "updated" label + date, or the publication date.
export function formatArticleDate(article: AnalysisArticle, lang: Lang): string {
  if (!article.updated) return article.date;
  const label = lang === "it" ? "aggiornato" : lang === "pt" ? "atualizado" : "updated";
  return `${label} ${article.updated}`;
}

import type { Lang } from "./i18n";

export type AnalysisArticle = {
  slug: string; // route path without leading slash, e.g. "pix"
  date: string; // ISO date, used for "most recent first"
  title: Record<Lang, string>;
};

// Most recent first (sorted by date desc at read time).
export const ANALYSIS_ARTICLES: AnalysisArticle[] = [
  {
    slug: "suja",
    date: "2026-07-24",
    title: {
      it: "Stesso crimine, due architetture",
      en: "Two Construction Sites, One Crime, Two Architectures",
      pt: "Dois canteiros, um crime, duas arquiteturas",
    },
  },
  {
    slug: "pix",
    date: "2026-07-23",
    title: {
      it: "PIX: il sistema di pagamenti istantanei del Brasile",
      en: "PIX: Brazil's instant payment system",
      pt: "PIX: o sistema de pagamentos instantâneos do Brasil",
    },
  },
];

export function getSortedArticles(): AnalysisArticle[] {
  return [...ANALYSIS_ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRecentArticles(max = 6): AnalysisArticle[] {
  return getSortedArticles().slice(0, max);
}

export function getArticleBySlug(slug: string): AnalysisArticle | undefined {
  return ANALYSIS_ARTICLES.find((a) => a.slug === slug);
}

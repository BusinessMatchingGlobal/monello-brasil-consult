import { ANALYSIS_ARTICLES, getGroupSlug } from "../src/lib/analysis";

export const SITE = "https://businessmatching.global";
export const LANGS = ["en", "it", "pt"] as const;
export type SiteLang = (typeof LANGS)[number];

export type RouteEntry = {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

/** Public, language-neutral routes. Article URLs are appended automatically. */
const STATIC_ROUTES: RouteEntry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/About_us", changefreq: "monthly", priority: "0.8" },
  { loc: "/Our_Services", changefreq: "monthly", priority: "0.9" },
  { loc: "/How_we_work", changefreq: "monthly", priority: "0.9" },
  { loc: "/Partner_Program", changefreq: "monthly", priority: "0.8" },
  { loc: "/ethics", changefreq: "yearly", priority: "0.5" },
  { loc: "/custo-brasil", changefreq: "weekly", priority: "0.8" },
  { loc: "/analysis", changefreq: "weekly", priority: "0.9" },
  { loc: "/news", changefreq: "monthly", priority: "0.8" },
  { loc: "/sace", changefreq: "monthly", priority: "0.7" },
  { loc: "/pharma", changefreq: "monthly", priority: "0.7" },
  { loc: "/eudr", changefreq: "monthly", priority: "0.7" },
  { loc: "/BT", changefreq: "monthly", priority: "0.8" },
  { loc: "/sample-report", changefreq: "monthly", priority: "0.7" },
  { loc: "/guides/doing-business-in-brazil", changefreq: "monthly", priority: "0.8" },
  { loc: "/servizi/business-matching", changefreq: "monthly", priority: "0.8" },
  { loc: "/servicos/business-matching", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/business-matching", changefreq: "monthly", priority: "0.8" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/unsubscribe", changefreq: "yearly", priority: "0.2" },
];

export function publicRoutes(): RouteEntry[] {
  const seen = new Set(STATIC_ROUTES.map((r) => r.loc));
  const routes = [...STATIC_ROUTES];
  const articles = [...ANALYSIS_ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
  for (const article of articles) {
    const loc = `/${getGroupSlug(article)}`;
    if (seen.has(loc)) continue;
    seen.add(loc);
    routes.push({
      loc,
      lastmod: article.updated ?? article.date,
      changefreq: "monthly",
      priority: "0.8",
    });
  }
  return routes;
}

/** English lives at the root, Italian under /it, Portuguese under /pt. */
export function localizedPath(lang: SiteLang, loc: string): string {
  const p = loc.startsWith("/") ? loc : `/${loc}`;
  if (lang === "en") return p;
  return p === "/" ? `/${lang}` : `/${lang}${p}`;
}

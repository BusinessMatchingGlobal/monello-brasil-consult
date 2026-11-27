import { ANALYSIS_ARTICLES, getGroupSlug } from "../src/lib/analysis";
import { EXPORT_SERVICES_PATH } from "../src/lib/langPath";
import { SITUATIONS } from "../src/data/situations";
import { SERVICE_FAMILIES } from "../src/data/serviceFamilyMetadata";

export const SITE = "https://businessmatching.global";
export const LANGS = ["en", "it", "pt"] as const;
export type SiteLang = (typeof LANGS)[number];

export type RouteEntry = {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
  /** Per-language slugs, when the URL differs by language. Missing = not published. */
  slugs?: Partial<Record<SiteLang, string>>;
  /** Per-language full paths, when they don't follow the language-prefix convention. */
  urls?: Partial<Record<SiteLang, string>>;
};

/** Public, language-neutral routes. Article URLs are appended automatically. */
const STATIC_ROUTES: RouteEntry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/About_us", changefreq: "monthly", priority: "0.8" },
  { loc: "/Our_Services", changefreq: "monthly", priority: "0.9" },
  { loc: EXPORT_SERVICES_PATH, urls: { pt: EXPORT_SERVICES_PATH }, changefreq: "monthly", priority: "0.8" },
  ...SERVICE_FAMILIES.map(family => ({ loc: family.paths.en, slugs: family.paths, changefreq: "monthly", priority: "0.8" })),
  { loc: "/How_we_work", changefreq: "monthly", priority: "0.9" },
  { loc: "/before-entrusting-brazil", slugs: { en: "/before-entrusting-brazil", it: "/before-entrusting-brazil" }, changefreq: "monthly", priority: "0.8", lastmod: "2026-11-03" },
  { loc: "/Transfer_the_method", changefreq: "monthly", priority: "0.8" },

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
  ...SITUATIONS.map((s) => ({
    loc: s.content.en?.slug ?? `/${s.key}`,
    changefreq: "monthly",
    priority: "0.8",
    slugs: Object.fromEntries(
      Object.entries(s.content).map(([lang, c]) => [lang, c!.slug]),
    ) as Partial<Record<SiteLang, string>>,
  })),
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

/** URL of a route in one language, or null when that language is not published. */
export function routePath(lang: SiteLang, route: RouteEntry): string | null {
  if (route.urls) return route.urls[lang] ?? null;
  const slug = route.slugs ? route.slugs[lang] : route.loc;
  if (!slug) return null;
  return localizedPath(lang, slug);
}

/** DE/ES/FR display languages and the catalogued pages they are published for. */
export const DISPLAY_LANGS = ["de", "es", "fr"] as const;
export type DisplaySiteLang = (typeof DISPLAY_LANGS)[number];
/** Italian pages (prefix-free) covered by the verified DE/ES/FR catalogue: Europe → Brazil offer. */
export const DISPLAY_EU_PATHS = new Set(["/", "/About_us", "/Our_Services", "/How_we_work", "/Partner_Program", "/gia-in-brasile", "/riprendere-il-brasile", "/servizi/business-matching", "/ethics", "/Transfer_the_method", "/before-entrusting-brazil", "/BT", "/privacy", "/news", "/analysis", "/Embraer", "/aiJus", "/amapa", "/amaro", "/asuncion", "/bahia", "/ceuta", "/custo-brasil", "/economist", "/eudr", "/guides/doing-business-in-brazil", "/lima", "/lorenzetti", "/pharma", "/pix", "/rare", "/sace", "/sample-report", "/servizi/formazione", "/servizi/il-brasile-conviene", "/servizi/preparare-ingresso", "/servizi/presidiare-il-mercato", "/servizi/trovare-e-contattare", "/servizi/verificare", "/suja", "/unsubscribe"]);
/** Portuguese pages (prefix-free) covered by the catalogue: Brazil → Europe offer, published under /<lang>/br. */
export const DISPLAY_BR_PATHS = new Set(["/", "/Our_Services", "/How_we_work", "/Partner_Program", "/analysis", "/BT", "/servicos/a-europa-vale-a-pena", "/servicos/preparar-a-entrada", "/servicos/verificar", "/servicos/business-matching", "/servicos/estar-presente", "/servicos/encontrar-e-contatar", "/servicos/treinamento"]);

const stripPrefix = (url: string, lang: string) => (url === `/${lang}` ? "/" : url.slice(lang.length + 1));

/** DE/ES/FR twin of the Italian (Europe → Brazil) version of a route, or null. */
export function displayEuPath(lang: DisplaySiteLang, route: RouteEntry): string | null {
  const it = routePath("it", route);
  if (!it || !it.startsWith("/it")) return null;
  const rest = stripPrefix(it, "it");
  if (!DISPLAY_EU_PATHS.has(rest)) return null;
  return rest === "/" ? `/${lang}` : `/${lang}${rest}`;
}

/** DE/ES/FR twin of the Portuguese (Brazil → Europe) version of a route, or null. */
export function displayBrPath(lang: DisplaySiteLang, route: RouteEntry): string | null {
  if (route.loc === EXPORT_SERVICES_PATH) return `/${lang}${EXPORT_SERVICES_PATH}`;
  const pt = routePath("pt", route);
  if (!pt || !pt.startsWith("/pt")) return null;
  const rest = stripPrefix(pt, "pt");
  if (!DISPLAY_BR_PATHS.has(rest)) return null;
  return rest === "/" ? `/${lang}/br` : `/${lang}/br${rest}`;
}

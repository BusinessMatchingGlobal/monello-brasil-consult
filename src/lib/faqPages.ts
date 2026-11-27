import type { SiteLang } from "./displayLang";

/** One public FAQ page per site language; slugs differ, so language switching maps through this table. */
export const FAQ_PATHS: Record<SiteLang, string> = {
  it: "/domande-frequenti",
  en: "/frequently-asked-questions",
  pt: "/pt/perguntas-frequentes",
  de: "/de/haeufig-gestellte-fragen",
  es: "/es/preguntas-frecuentes",
  fr: "/fr/foire-aux-questions",
};

export const FAQ_LABELS: Record<SiteLang, string> = {
  it: "Domande frequenti",
  en: "Frequently asked questions",
  pt: "Perguntas frequentes",
  de: "Häufig gestellte Fragen",
  es: "Preguntas frecuentes",
  fr: "Foire aux questions",
};

export const FAQ_HREFLANG: Record<SiteLang, string> = { en: "en", it: "it", pt: "pt-BR", de: "de", es: "es", fr: "fr" };

/** Site language of an FAQ URL, or null when the path is not one of the six FAQ pages. */
export function faqLangForPath(pathname: string): SiteLang | null {
  const clean = (pathname || "/").replace(/\/+$/, "").toLowerCase();
  const hit = (Object.keys(FAQ_PATHS) as SiteLang[]).find(l => FAQ_PATHS[l] === clean);
  return hit ?? null;
}

/** Route path inside the router basename for that language (IT and EN live at the root). */
export function faqRoutePath(lang: SiteLang): string {
  const full = FAQ_PATHS[lang];
  return lang === "it" || lang === "en" ? full : full.replace(/^\/[a-z]{2}/, "");
}

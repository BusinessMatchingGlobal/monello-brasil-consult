import type { Lang } from "./lang";
import { currentDisplayRoute, displayPathFor, parseDisplayPath, DISPLAY_LANGS, type SiteLang } from "./displayLang";

/** Languages that live under a URL prefix. English is served at the root. */
export const PREFIXED_LANGS: Lang[] = ["it", "pt"];

export const EXPORT_SERVICES_PATH = "/brasilexportacao";
/** Former address of the export page; redirects to EXPORT_SERVICES_PATH. */
export const LEGACY_EXPORT_SERVICES_PATH = "/servicos-exportacao-brasil";
/** Public links to the export page use this exact www address, as requested by the owner. */
export const EXPORT_SERVICES_PUBLIC_URL = "https://www.businessmatching.global/brasilexportacao";

export function isLegacyExportServicesPath(pathname: string): boolean {
  return pathname.replace(/\/+$/, "") === LEGACY_EXPORT_SERVICES_PATH;
}

/** This Portuguese-only page is published outside the usual /pt basename. */
export function isExportServicesPath(pathname: string): boolean {
  if (parseDisplayPath(pathname)?.variant === "export") return true;
  return pathname.replace(/\/+$/, "") === EXPORT_SERVICES_PATH;
}

/** Editorial pages must not offer unpublished language versions. */
export function availablePageLanguages(pathname: string): SiteLang[] {
  if (isExportServicesPath(pathname)) return ["pt", ...DISPLAY_LANGS];
  const rest = stripLangPrefix(pathname).toLowerCase();
  if (rest === "/before-you-choose") return ["pt"];
  return rest === "/before-entrusting-brazil"
    ? ["en", "it", ...DISPLAY_LANGS]
    : ["en", "it", "pt", ...DISPLAY_LANGS];
}

export const OG_LOCALE: Record<Lang, string> = {
  en: "en_US",
  it: "it_IT",
  pt: "pt_BR",
};

export const HREFLANG: Record<Lang, string> = {
  en: "en",
  it: "it",
  pt: "pt-BR",
};

/** "/it/About_us" → "it"; "/About_us" → "en" */
export function detectLangFromPath(pathname: string): Lang {
  const display = parseDisplayPath(pathname);
  if (display) return display.contentLang;
  const seg = (pathname.split("/")[1] ?? "").toLowerCase();
  if (seg === "it") return "it";
  if (seg === "pt") return "pt";
  return "en";
}

/** Router basename for a language ("/" for English). */
export function basenameForLang(lang: Lang): string {
  const display = currentDisplayRoute();
  if (display && display.contentLang === lang) return display.basename;
  return lang === "en" ? "/" : `/${lang}`;
}

/** "/it/About_us" → "/About_us" */
export function stripLangPrefix(pathname: string): string {
  const display = parseDisplayPath(pathname);
  if (display) return display.rest;
  const lang = detectLangFromPath(pathname);
  if (lang === "en") return pathname || "/";
  const rest = pathname.slice(3);
  if (!rest || rest === "/") return "/";
  return rest.startsWith("/") ? rest : `/${rest}`;
}

/** Language-qualified version of a prefix-free path. */
export function pathForLang(lang: Lang, path: string): string {
  // On a DE/ES/FR page, links in the page's own content language stay in the display language.
  const display = currentDisplayRoute();
  if (display && display.contentLang === lang) return displayPathFor(display.display, lang, path);
  return rawPathForLang(lang, path);
}

/** Language-qualified path ignoring the current display language (hreflang, language switching). */
export function rawPathForLang(lang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return p;
  return p === "/" ? `/${lang}` : `/${lang}${p}`;
}



import type { Lang } from "./lang";

/** Languages that live under a URL prefix. English is served at the root. */
export const PREFIXED_LANGS: Lang[] = ["it", "pt"];

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
  const seg = (pathname.split("/")[1] ?? "").toLowerCase();
  if (seg === "it") return "it";
  if (seg === "pt") return "pt";
  return "en";
}

/** Router basename for a language ("/" for English). */
export function basenameForLang(lang: Lang): string {
  return lang === "en" ? "/" : `/${lang}`;
}

/** "/it/About_us" → "/About_us" */
export function stripLangPrefix(pathname: string): string {
  const lang = detectLangFromPath(pathname);
  if (lang === "en") return pathname || "/";
  const rest = pathname.slice(3);
  if (!rest || rest === "/") return "/";
  return rest.startsWith("/") ? rest : `/${rest}`;
}

/** Language-qualified version of a prefix-free path. */
export function pathForLang(lang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return p;
  return p === "/" ? `/${lang}` : `/${lang}${p}`;
}

import type { Lang } from "./lang";

/**
 * German, Spanish and French are display languages: each page renders its
 * existing content language (Italian for the Europe → Brazil offer,
 * Portuguese for the Brazil → Europe offer) and the page translator swaps the
 * text for the verified catalogue translation.
 *
 * URL layout:
 *   /de/…                 Europe → Brazil offer (mirrors /it/…)
 *   /de/br/…              Brazil → Europe offer (mirrors /pt/…)
 *   /de/brasilexportacao  export services page (mirrors /brasilexportacao)
 */
export type DisplayLang = "de" | "es" | "fr";
export type SiteLang = Lang | DisplayLang;
export const DISPLAY_LANGS: DisplayLang[] = ["de", "es", "fr"];
export const SITE_LANGS: SiteLang[] = ["en", "it", "pt", "de", "es", "fr"];

export const SITE_LANG_LABEL: Record<SiteLang, string> = {
  en: "EN", it: "IT", pt: "PT-BR", de: "DE", es: "ES", fr: "FR",
};
export const DISPLAY_HREFLANG: Record<DisplayLang, string> = { de: "de", es: "es", fr: "fr" };
export const DISPLAY_OG_LOCALE: Record<DisplayLang, string> = { de: "de_DE", es: "es_ES", fr: "fr_FR" };

const EXPORT_PATH = "/brasilexportacao";

export type DisplayVariant = "eu" | "br" | "export";
export type DisplayRoute = {
  display: DisplayLang;
  variant: DisplayVariant;
  contentLang: Lang;
  basename: string;
  /** Prefix-free path inside the content language's route set. */
  rest: string;
};

export function isDisplayLang(value: string): value is DisplayLang {
  return (DISPLAY_LANGS as string[]).includes(value);
}

export function parseDisplayPath(pathname: string): DisplayRoute | null {
  const parts = (pathname || "/").split("/");
  const seg = (parts[1] ?? "").toLowerCase();
  if (!isDisplayLang(seg)) return null;
  const after = "/" + parts.slice(2).join("/");
  const clean = after.replace(/\/+$/, "") || "/";
  if (clean.toLowerCase() === EXPORT_PATH) {
    return { display: seg, variant: "export", contentLang: "pt", basename: `/${seg}`, rest: EXPORT_PATH };
  }
  const sub = (parts[2] ?? "").toLowerCase();
  if (sub === "br") {
    const rest = "/" + parts.slice(3).join("/");
    return { display: seg, variant: "br", contentLang: "pt", basename: `/${seg}/br`, rest: rest === "/" ? "/" : rest.replace(/\/+$/, "") || "/" };
  }
  return { display: seg, variant: "eu", contentLang: "it", basename: `/${seg}`, rest: after === "/" ? "/" : after.replace(/\/+$/, "") || "/" };
}

/** Display-language URL for a prefix-free path of the given content language. */
export function displayPathFor(display: DisplayLang, contentLang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p.replace(/\/+$/, "") === EXPORT_PATH) return `/${display}${EXPORT_PATH}`;
  const base = contentLang === "pt" ? `/${display}/br` : `/${display}`;
  return p === "/" ? base : `${base}${p}`;
}

export function currentDisplayRoute(): DisplayRoute | null {
  if (typeof window === "undefined") return null;
  return parseDisplayPath(window.location.pathname);
}

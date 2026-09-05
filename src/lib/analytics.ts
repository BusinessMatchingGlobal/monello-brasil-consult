import { getConsent } from "@/lib/consent";
import { detectLangFromPath } from "@/lib/langPath";

/**
 * Lightweight GA4 event helper. Events are only sent when the visitor has
 * accepted cookies (GDPR/LGPD) and gtag has actually loaded.
 * Every event carries the interface language so reports can be split per language.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag;
  if (typeof gtag !== "function") return;

  const lang = detectLangFromPath(window.location.pathname);
  gtag("event", name, {
    language: lang,
    page_path: window.location.pathname,
    ...params,
  });
}

export type LinkArea = "nav_desktop" | "nav_mobile" | "nav_dropdown" | "footer" | "cta";

/** Click on a main navigation / footer / CTA link. */
export function trackLinkClick(label: string, href: string, area: LinkArea) {
  trackEvent("link_click", { link_label: label, link_url: href, link_area: area });
}

/** Contact form lifecycle: "submit" | "success" | "error" | "validation_error". */
export function trackContactForm(
  status: "submit" | "success" | "error" | "validation_error",
  source: string,
  extra: Record<string, unknown> = {}
) {
  trackEvent(`contact_form_${status}`, { form_source: source, ...extra });
}

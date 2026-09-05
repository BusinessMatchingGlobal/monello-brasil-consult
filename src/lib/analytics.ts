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

/** Where a clicked link lives on the page. */
function areaForElement(el: HTMLElement): LinkArea {
  const explicit = el.closest<HTMLElement>("[data-track-area]")?.dataset.trackArea;
  if (explicit) return explicit as LinkArea;
  if (el.closest("footer")) return "footer";
  if (el.closest("header, nav")) {
    return window.matchMedia("(max-width: 1023px)").matches ? "nav_mobile" : "nav_desktop";
  }
  return "cta";
}

/**
 * Global click + SPA page_view tracking. Installed once from App so every page
 * (nav, footer, CTA links and buttons) reports to GA4 without per-page wiring.
 */
export function initAutoTracking() {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.__bmgAutoTracking) return;
  w.__bmgAutoTracking = true;

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("a[href], button");
      if (!el) return;
      const label = (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 80);
      if (!label) return;
      const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") || "" : "";
      if (el instanceof HTMLAnchorElement) {
        trackLinkClick(label, href, areaForElement(el));
      } else {
        trackEvent("button_click", { link_label: label, link_area: areaForElement(el) });
      }
    },
    true
  );

  let last = window.location.pathname + window.location.search;
  const sendPageView = () => {
    const current = window.location.pathname + window.location.search;
    if (current === last) return;
    last = current;
    trackEvent("page_view", { page_location: window.location.href, page_title: document.title });
  };
  const patch = (name: "pushState" | "replaceState") => {
    const orig = history[name].bind(history);
    history[name] = ((...args: unknown[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = (orig as any)(...args);
      setTimeout(sendPageView, 0);
      return r;
    }) as typeof history.pushState;
  };
  patch("pushState");
  patch("replaceState");
  window.addEventListener("popstate", () => setTimeout(sendPageView, 0));
}

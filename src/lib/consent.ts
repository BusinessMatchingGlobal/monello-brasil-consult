const STORAGE_KEY = "bmg-cookie-consent"; // "accepted" | "declined"
export const NEWSLETTER_FALLBACK_KEY = "bmg-newsletter-fallback";
const GA_ID = "G-R1WPY0LSNM";
const LI_PARTNER_ID = "10524913";

export type ConsentState = "accepted" | "declined" | null;

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function setConsent(v: "accepted" | "declined") {
  localStorage.setItem(STORAGE_KEY, v);
  if (v === "accepted") loadTrackers();
  window.dispatchEvent(new CustomEvent("bmg-consent-change", { detail: v }));
}

export function openConsentBanner() {
  window.dispatchEvent(new CustomEvent("bmg-open-consent"));
}

export function openIubendaNewsletter() {
  if (typeof window === "undefined") return;
  const w = window as any;
  let initialized = false;
  let fallbackOpened = false;

  const ensureNewsletterCss = () => {
    if (document.getElementById("bmg-iubenda-newsletter-css")) return;
    const style = document.createElement("style");
    style.id = "bmg-iubenda-newsletter-css";
    style.textContent = `
      .iub-newsletter-widget-bottom-right,
      #iub-email-pref {
        z-index: 2147483647 !important;
      }
      @media (max-width: 640px) {
        .iub-newsletter-widget-bottom-right {
          right: 12px !important;
          left: 12px !important;
          bottom: 12px !important;
          width: auto !important;
          max-width: calc(100vw - 24px) !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const focusNewsletterWidget = () => {
    ensureNewsletterCss();
    const focus = () => {
      const widget = document.querySelector<HTMLElement>(
        "#iub-email-pref, .iub-newsletter-widget, .iub-newsletter-widget-bottom-right"
      );
      if (!widget) return;
      widget.style.zIndex = "2147483647";
      widget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      const input = document.getElementById("iub-newsletter-email-input") as HTMLInputElement | null;
      input?.focus({ preventScroll: true });
    };
    [150, 500, 1000, 1800].forEach((delay) => window.setTimeout(focus, delay));
  };
  const openFallback = () => {
    if (fallbackOpened) return;
    fallbackOpened = true;
    try {
      sessionStorage.setItem(NEWSLETTER_FALLBACK_KEY, "1");
    } catch {}
    if (w.location.pathname === "/custo-brasil") {
      if (w.location.hash !== "#newsletter") {
        w.history.pushState(null, "", "/custo-brasil?newsletter=1#newsletter");
      }
      w.dispatchEvent(new CustomEvent("bmg-show-newsletter-fallback"));
      setTimeout(() => {
        document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
      return;
    }
    w.location.href = "/custo-brasil?newsletter=1#newsletter";
  };
  const getNewsletter = () => {
    const iub = w._iub;
    return iub?.cs?.newsletter || iub?.cs?.api?.emailMarketing?.();
  };
  const showWidget = () => {
    const newsletter = getNewsletter();
    if (!newsletter || typeof newsletter.init !== "function" || initialized) return;
    initialized = true;
    try {
      if (newsletter.configuration && typeof newsletter.configuration === "object") {
        newsletter.configuration.showFromPageView = 0;
      }
      newsletter.init();
      focusNewsletterWidget();
    } catch {
      openFallback();
    }
  };

  let attempts = 0;
  const poll = window.setInterval(() => {
    attempts += 1;
    const newsletter = getNewsletter();
    if (!newsletter || typeof newsletter.init !== "function") {
      if (attempts >= 30) {
        window.clearInterval(poll);
        openFallback();
      }
      return;
    }
    try {
      if (newsletter.configuration && typeof newsletter.configuration === "object") {
        newsletter.configuration.showFromPageView = 0;
      }
      if (!newsletter.loaded && typeof newsletter.load === "function") {
        newsletter.load();
      }
    } catch {}
    if (newsletter.loaded) {
      window.clearInterval(poll);
      showWidget();
    } else if (attempts >= 30) {
      window.clearInterval(poll);
      showWidget();
      window.setTimeout(() => {
        if (!document.querySelector("#iub-email-pref, .iub-newsletter-widget-bottom-right")) {
          openFallback();
        }
      }, 800);
    }
  }, 200);
  showWidget();
}

let loaded = false;
export function loadTrackers() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  // Google Analytics 4 (with IP anonymization)
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtagScript);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).dataLayer = (window as any).dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });

  // LinkedIn Insight Tag
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w._linkedin_partner_id = LI_PARTNER_ID;
  w._linkedin_data_partner_ids = w._linkedin_data_partner_ids || [];
  w._linkedin_data_partner_ids.push(LI_PARTNER_ID);
  (function () {
    if (!w.lintrk) {
      w.lintrk = function (a: unknown, b: unknown) {
        (w.lintrk.q = w.lintrk.q || []).push([a, b]);
      };
      w.lintrk.q = [];
    }
    const s = document.getElementsByTagName("script")[0];
    const b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode?.insertBefore(b, s);
  })();
}

export function initConsent() {
  if (getConsent() === "accepted") loadTrackers();
}
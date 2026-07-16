const STORAGE_KEY = "bmg-cookie-consent"; // "accepted" | "declined"
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
  const iub = w._iub;
  const newsletter = iub?.cs?.api?.emailMarketing?.();
  if (!newsletter || typeof newsletter.init !== "function") {
    w.location.href = "/custo-brasil#newsletter";
    return;
  }
  const showWidget = () => {
    try {
      const original = newsletter.configuration?.showFromPageView;
      if (newsletter.configuration && typeof newsletter.configuration === "object") {
        newsletter.configuration.showFromPageView = 0;
      }
      newsletter.init();
      if (original !== undefined) newsletter.configuration.showFromPageView = original;
    } catch {
      w.location.href = "/custo-brasil#newsletter";
    }
  };
  if (newsletter.loaded) {
    showWidget();
    return;
  }
  const onReady = () => {
    try { newsletter.off("iub.newsletter.load", onReady); } catch {}
    showWidget();
  };
  try {
    newsletter.on("iub.newsletter.load", onReady);
  } catch {}
  if (typeof newsletter.load === "function") {
    newsletter.load();
  }
  setTimeout(() => {
    try { newsletter.off("iub.newsletter.load", onReady); } catch {}
    if (!newsletter.loaded) {
      w.location.href = "/custo-brasil#newsletter";
    }
  }, 3000);
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
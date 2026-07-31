import { useEffect } from "react";
import ogDefault from "@/assets/og-default.jpg.asset.json";

export const SITE = "https://businessmatching.global";
export const CALLIPHORA_SITE = "https://www.calliphora.flights";
const CALLIPHORA_PATHS = ["/voli", "/formfly"];

/** Calliphora-branded pages canonicalize to calliphora.flights, everything else to BMG. */
function siteForPath(path: string) {
  return CALLIPHORA_PATHS.includes(path.toLowerCase()) ? CALLIPHORA_SITE : SITE;
}
export const DEFAULT_OG_IMAGE = SITE + ogDefault.url;

type SEO = {
  title?: string;
  description?: string;
  image?: string; // absolute or site-relative URL
  type?: "website" | "article";
};

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useCanonical(path: string, seo?: SEO) {
  useEffect(() => {
    const base = siteForPath(path);
    const url = base + path;

    // Canonical
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;

    // og:url — always self-referential
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      base === CALLIPHORA_SITE ? "Calliphora Travel" : "Business Matching Global",
    );
    upsertMeta('meta[property="og:type"]', "property", "og:type", seo?.type ?? "website");
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");

    const rawImg = seo?.image ?? DEFAULT_OG_IMAGE;
    const absImg = rawImg.startsWith("http") ? rawImg : base + (rawImg.startsWith("/") ? rawImg : "/" + rawImg);
    upsertMeta('meta[property="og:image"]', "property", "og:image", absImg);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", absImg);

    if (seo?.title) {
      document.title = seo.title;
      upsertMeta('meta[property="og:title"]', "property", "og:title", seo.title);
      upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    }
    if (seo?.description) {
      upsertMeta('meta[name="description"]', "name", "description", seo.description);
      upsertMeta('meta[property="og:description"]', "property", "og:description", seo.description);
      upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.description);
    }
  }, [path, seo?.title, seo?.description, seo?.image, seo?.type]);
}
import { useEffect } from "react";
import ogDefault from "@/assets/og-default.jpg.asset.json";

export const SITE = "https://businessmatching.global";
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
    const url = SITE + path;

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
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", "Business Matching Global");
    upsertMeta('meta[property="og:type"]', "property", "og:type", seo?.type ?? "website");
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");

    const rawImg = seo?.image ?? DEFAULT_OG_IMAGE;
    const absImg = rawImg.startsWith("http") ? rawImg : SITE + (rawImg.startsWith("/") ? rawImg : "/" + rawImg);
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
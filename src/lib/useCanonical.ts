import { useEffect } from "react";

const SITE = "https://businessmatching.global";

type SEO = {
  title?: string;
  description?: string;
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
  }, [path, seo?.title, seo?.description]);
}
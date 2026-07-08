import { useEffect } from "react";

const SITE = "https://businessmatching.global";

export function useCanonical(path: string) {
  useEffect(() => {
    const url = SITE + path;

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;

    let og = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", "og:url");
      document.head.appendChild(og);
    }
    og.content = url;
  }, [path]);
}
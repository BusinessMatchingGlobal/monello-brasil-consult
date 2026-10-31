import { test, expect } from "bun:test";
import { JSDOM } from "jsdom";
import { composeHtml } from "./prerender-shared";

test("homepage output excludes unshown global FAQ and preserves organization and Portuguese locale", () => {
  const template = '<html><head><script type="application/ld+json" id="ld-faq-sitewide">{"@type":"FAQPage"}</script></head><body><div id="root"></div></body></html>';
  const html = composeHtml(template, {
    html: '<main><h1>Seu projeto na Europa.</h1></main>', title: "Consultoria para exportar à Europa | BMG",
    head: '<meta property="og:locale" content="pt_BR"><link rel="canonical" href="https://businessmatching.global/pt"><script type="application/ld+json">{"@type":"Organization","name":"Business Matching Global"}</script>',
  }, JSDOM);
  const doc = new JSDOM(html).window.document;
  expect(doc.getElementById("ld-faq-sitewide")).toBeNull();
  expect(doc.documentElement.lang).toBe("pt-BR");
  expect(doc.querySelector('link[rel="canonical"]').href).toBe("https://businessmatching.global/pt");
  expect(JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)["@type"]).toBe("Organization");
});

test("prerender retains internal article and page-specific FAQ schemas", () => {
  const head = '<script type="application/ld+json" id="article-jsonld">{"@type":"Article"}</script><script type="application/ld+json" id="ld-partner-program-faq">{"@type":"FAQPage"}</script>';
  const html = composeHtml('<html><head></head><body><div id="root"></div></body></html>', { html: '<main></main>', head, title: 'Internal page' }, JSDOM);
  const doc = new JSDOM(html).window.document;
  expect(JSON.parse(doc.getElementById("article-jsonld").textContent)["@type"]).toBe("Article");
  expect(JSON.parse(doc.getElementById("ld-partner-program-faq").textContent)["@type"]).toBe("FAQPage");
});
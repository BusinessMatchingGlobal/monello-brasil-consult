import { expect, test } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { JSDOM } from "jsdom";
import { FAQ_CONTENT } from "../src/data/faqContent";
import { FAQ_LABELS, FAQ_PATHS } from "../src/lib/faqPages";
import { renderTargets } from "./prerender-render";

const HTML_LANG = { it: "it", en: "en", pt: "pt-BR", de: "de", es: "es", fr: "fr" };
const LANGS = ["it", "en", "pt", "de", "es", "fr"];

for (const lang of LANGS) test(`FAQ ${lang} prerender has exact approved copy, closed accordions, one matching FAQPage and reciprocal hreflang`, async () => {
  const FREQUENT_QUESTIONS = FAQ_CONTENT[lang];
  const url = FAQ_PATHS[lang];
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "bmg-frequent-questions-"));
  fs.copyFileSync("index.html", path.join(outDir, "index.html"));
  const file = path.join(outDir, url.slice(1), "index.html");
  const rendered = await renderTargets([{ url, file }], outDir);
  expect(rendered).toBe(1);

  const doc = new JSDOM(fs.readFileSync(file, "utf8")).window.document;
  const questions = FREQUENT_QUESTIONS.sections.flatMap(section => section.items);
  expect(questions).toHaveLength(22);
  expect(doc.documentElement.lang).toBe(HTML_LANG[lang]);
  expect(doc.querySelector("main h1")?.textContent).toBe(FREQUENT_QUESTIONS.title);
  expect(doc.querySelector("main header p")?.textContent).toBe(FREQUENT_QUESTIONS.subtitle);
  expect([...doc.querySelectorAll("main section > h2")].map(el => el.textContent)).toEqual(FREQUENT_QUESTIONS.sections.map(section => section.title));
  expect(doc.querySelector("#faq-section-4")?.nextElementSibling?.textContent).toBe(FREQUENT_QUESTIONS.sections[4].intro);
  expect(FREQUENT_QUESTIONS.sections.map(s => s.items.length)).toEqual([5, 6, 4, 1, 6]);

  const buttons = [...doc.querySelectorAll("main h3 button[aria-controls]")];
  const answers = [...doc.querySelectorAll('main div[role="region"]')];
  expect(buttons).toHaveLength(22);
  expect(answers).toHaveLength(22);
  buttons.forEach((button, index) => {
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.querySelector("span")?.textContent).toBe(questions[index].q);
    expect(button.id).toBe(answers[index].getAttribute("aria-labelledby"));
    expect(button.getAttribute("aria-controls")).toBe(answers[index].id);
    expect(answers[index].hasAttribute("hidden")).toBe(true);
    expect(answers[index].querySelector("p")?.textContent).toBe(questions[index].a);
  });

  const canonical = "https://businessmatching.global" + url;
  expect(doc.querySelector('link[rel="canonical"]')?.href).toBe(canonical);
  expect(doc.querySelector('meta[property="og:url"]')?.content).toBe(canonical);
  expect(doc.querySelector('meta[name="description"]')?.content).toBe(FREQUENT_QUESTIONS.subtitle);
  const alternates = Object.fromEntries([...doc.querySelectorAll('link[rel="alternate"][data-hreflang]')].map(l => [l.hreflang, l.href]));
  expect(alternates).toEqual({ en: "https://businessmatching.global/frequently-asked-questions", it: "https://businessmatching.global/domande-frequenti", "pt-BR": "https://businessmatching.global/pt/perguntas-frequentes", de: "https://businessmatching.global/de/haeufig-gestellte-fragen", es: "https://businessmatching.global/es/preguntas-frecuentes", fr: "https://businessmatching.global/fr/foire-aux-questions", "x-default": "https://businessmatching.global/frequently-asked-questions" });
  const faqLinks = [...doc.querySelectorAll("footer a")].filter(a => Object.values(FAQ_PATHS).includes(a.getAttribute("href")));
  expect(faqLinks.map(a => [a.getAttribute("href"), a.textContent])).toEqual([[url, FAQ_LABELS[lang]]]);
  expect(doc.title).toBe(`${FREQUENT_QUESTIONS.title} | Business Matching Global`);
  expect(doc.querySelector("main #contact")?.textContent).toBe(FREQUENT_QUESTIONS.contact);
  expect(doc.querySelector("main #contact a")?.href).toBe("mailto:info@businessmatching.global");
  expect(doc.querySelector("main #contact a")?.textContent).toBe("info@businessmatching.global");
  expect(doc.querySelector("main > p:last-child")?.textContent).toBe(FREQUENT_QUESTIONS.closing);
  expect(doc.querySelector("main form")).toBeNull();

  const schema = JSON.parse(doc.getElementById("ld-frequent-questions")?.textContent ?? "null");
  expect(schema).toEqual({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: canonical,
    mainEntity: questions.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });
  const faqSchemas = [...doc.querySelectorAll('script[type="application/ld+json"]')]
    .map(script => JSON.parse(script.textContent))
    .filter(value => value["@type"] === "FAQPage");
  expect(faqSchemas).toHaveLength(1);
}, 60000);

test("FAQ content is the approved editorial files verbatim", () => {
  const files = { en: "en", pt: "pt-BR", de: "de", es: "es", fr: "fr" };
  for (const [lang, name] of Object.entries(files)) {
    expect(FAQ_CONTENT[lang]).toEqual(JSON.parse(fs.readFileSync(`editorial-review/faq/${name}.json`, "utf8")));
  }
});

test("FAQ sitemap cluster lists the six URLs with x-default English", async () => {
  const { buildSitemap } = await import("./sitemap");
  const xml = buildSitemap();
  for (const url of Object.values(FAQ_PATHS)) expect(xml.split(`<loc>https://businessmatching.global${url}</loc>`).length - 1).toBe(1);
  expect(xml).toContain('hreflang="x-default" href="https://businessmatching.global/frequently-asked-questions"');
});

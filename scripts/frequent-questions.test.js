import { expect, test } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { JSDOM } from "jsdom";
import { FREQUENT_QUESTIONS } from "../src/data/frequentQuestions";
import { renderTargets } from "./prerender-render";

test("Italian FAQ prerender has exact copy, closed accessible accordions and matching JSON-LD", async () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "bmg-frequent-questions-"));
  fs.copyFileSync("index.html", path.join(outDir, "index.html"));
  const file = path.join(outDir, "domande-frequenti", "index.html");
  const rendered = await renderTargets([{ url: "/domande-frequenti", file }], outDir);
  expect(rendered).toBe(1);

  const doc = new JSDOM(fs.readFileSync(file, "utf8")).window.document;
  const questions = FREQUENT_QUESTIONS.sections.flatMap(section => section.items);
  expect(questions).toHaveLength(22);
  expect(doc.documentElement.lang).toBe("it");
  expect(doc.querySelector("main h1")?.textContent).toBe(FREQUENT_QUESTIONS.title);
  expect(doc.querySelector("main header p")?.textContent).toBe(FREQUENT_QUESTIONS.subtitle);
  expect([...doc.querySelectorAll("main section > h2")].map(el => el.textContent)).toEqual(FREQUENT_QUESTIONS.sections.map(section => section.title));
  expect(doc.querySelector("#faq-section-4")?.nextElementSibling?.textContent).toBe(FREQUENT_QUESTIONS.sections[4].intro);

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

  const canonical = "https://businessmatching.global/domande-frequenti";
  expect(doc.querySelector('link[rel="canonical"]')?.href).toBe(canonical);
  expect(doc.querySelector('meta[property="og:url"]')?.content).toBe(canonical);
  expect(doc.querySelector('meta[name="description"]')?.content).toBe(FREQUENT_QUESTIONS.subtitle);
  expect(doc.querySelectorAll('link[rel="alternate"][data-hreflang]')).toHaveLength(0);
  expect(doc.querySelector('a[href="/domande-frequenti"]')?.textContent).toBe("Domande frequenti");
  expect(doc.querySelector('a[href="/it/domande-frequenti"]')).toBeNull();
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

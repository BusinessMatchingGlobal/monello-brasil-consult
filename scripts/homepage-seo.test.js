import { test, expect } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { JSDOM } from "jsdom";
import { renderTargets } from "./prerender-render";

test("existing prerender produces all three complete localized homepages", async () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "bmg-homepage-seo-"));
  fs.copyFileSync("index.html", path.join(outDir, "index.html"));
  const urls = ["/", "/it", "/pt"];
  const targets = urls.map(url => ({ url, file: path.join(outDir, url === "/" ? "index.html" : url.slice(1), url === "/" ? "" : "index.html") }));
  const rendered = await renderTargets(targets, outDir);
  expect(rendered).toBe(3);
  for (const [i, target] of targets.entries()) {
    const doc = new JSDOM(fs.readFileSync(target.file, "utf8")).window.document;
    expect(doc.querySelectorAll("main h1").length).toBe(1);
    expect(doc.querySelectorAll("#services article").length).toBe(6);
    expect(doc.querySelectorAll("#how h3").length).toBe(3);
    expect(doc.querySelectorAll("#contact form").length).toBe(1);
    expect(doc.documentElement.lang).toBe(["en", "it", "pt-BR"][i]);
    expect(doc.title).toBe(["Brazil Market Entry & Europe Expansion | BMG", "Consulenza export Europa e Brasile | BMG", "Consultoria para exportar à Europa | BMG"][i]);
    expect(doc.querySelector('link[rel="canonical"]').href).toBe("https://businessmatching.global" + target.url);
    expect(doc.querySelector('meta[property="og:url"]').content).toBe("https://businessmatching.global" + target.url);
    expect(doc.querySelector('meta[name="description"]').content).toBe([
      "Market research, partner checks and local coordination for European companies in Brazil and Brazilian companies in Europe. Based in Belo Horizonte.",
      "Analisi di mercato, verifica di partner e supporto operativo tra Europa e Brasile. Da Belo Horizonte, BMG affianca imprese ed export manager.",
      "Apoio a empresas brasileiras na Europa: análise de mercado, verificação de parceiros e coordenação local. BMG, com sede em Belo Horizonte.",
    ][i]);
    expect(doc.querySelectorAll('link[rel="alternate"][data-hreflang]').length).toBe(4);
    expect(doc.getElementById("ld-faq-sitewide")).toBeNull();
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent));
    expect(schemas.some(s => s["@graph"]?.some(e => e["@type"] === "Organization"))).toBe(true);
    expect(JSON.stringify(schemas)).not.toContain("ESG");
    expect(doc.querySelector('a[href="https://www.brazilbeautydesk.com/"]')).not.toBeNull();
  }
  console.log(`Validated 3/3 prerendered homepages: ${outDir}`);
}, 60000);
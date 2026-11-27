import { test, expect } from "bun:test";
import { JSDOM } from "jsdom";
import { loadCatalogue, translateSubtree } from "./pageTranslator";

test("translating nested inline copy preserves the original link and consent state", async () => {
  const dom = new JSDOM('<body><p><span>Não começamos entregando uma lista de importadores tirada de um banco de dados. Começamos com um </span><span><a href="/pt/servicos/a-europa-vale-a-pena#check-up">Check-up Europa</a>: dados de comércio atualizados sobre os produtos do seu cliente (fluxos de importação, preços, origem dos concorrentes, os países onde a demanda realmente está), lidos à luz da capacidade do seu cliente. Se a Europa não vale a pena agora, você recebe essa resposta por escrito, e seu cliente evita pagar para descobrir do jeito mais caro.</span></p><input type="checkbox">');
  const doc = dom.window.document;
  const link = doc.querySelector("a");
  const checkbox = doc.querySelector("input");
  const before = doc.querySelector("p").textContent;
  await loadCatalogue("/de/br/Partner_Program");
  translateSubtree(doc.body);
  expect(doc.querySelector("a")).toBe(link);
  expect(link.getAttribute("href")).toBe("/de/br/servicos/a-europa-vale-a-pena#check-up");
  expect(doc.querySelector("input")).toBe(checkbox);
  expect(checkbox.checked).toBe(false);
  expect(doc.querySelector("p").textContent).not.toBe(before);
  const after = doc.querySelector("p").textContent;
  translateSubtree(doc.body);
  expect(doc.querySelector("p").textContent).toBe(after);
});

test("source-language pages are not translated", async () => {
  const dom = new JSDOM('<body><a href="/pt/privacy">Contato</a></body>');
  const before = dom.window.document.body.textContent;
  await loadCatalogue("/pt");
  translateSubtree(dom.window.document.body);
  expect(dom.window.document.body.textContent).toBe(before);
  expect(dom.window.document.querySelector("a").getAttribute("href")).toBe("/pt/privacy");
});
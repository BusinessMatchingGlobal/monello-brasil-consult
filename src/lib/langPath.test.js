import { describe, expect, test } from "bun:test";
import { availablePageLanguages, detectLangFromPath, pathForLang } from "./langPath";
import { displayBrPath, displayEuPath, publicRoutes, routePath } from "../../scripts/routes";
import { buildSitemap } from "../../scripts/sitemap";

describe("language-exclusive pages", () => {
  test("FAQ is published once per language at its exact localized address", () => {
    const route = publicRoutes().find(route => route.loc === "/frequently-asked-questions");
    expect(route).toBeDefined();
    expect(routePath("it", route)).toBe("/domande-frequenti");
    expect(routePath("en", route)).toBe("/frequently-asked-questions");
    expect(routePath("pt", route)).toBe("/pt/perguntas-frequentes");
    expect(displayEuPath("de", route)).toBe("/de/haeufig-gestellte-fragen");
    expect(displayEuPath("es", route)).toBe("/es/preguntas-frecuentes");
    expect(displayEuPath("fr", route)).toBe("/fr/foire-aux-questions");
    for (const lang of ["de", "es", "fr"]) expect(displayBrPath(lang, route)).toBeNull();
    expect(detectLangFromPath("/domande-frequenti")).toBe("it");
    expect(availablePageLanguages("/domande-frequenti")).toEqual(["en", "it", "pt", "de", "es", "fr"]);
    expect(publicRoutes().filter(r => r.loc === "/domande-frequenti")).toHaveLength(0);
  });

  test("Before entrusting Brazil is published and switchable in English, Italian and the DE/ES/FR display languages, never Portuguese", () => {
    const route = publicRoutes().find(route => route.loc === "/before-entrusting-brazil");
    expect(route).toBeDefined();
    expect(routePath("en", route)).toBe("/before-entrusting-brazil");
    expect(routePath("it", route)).toBe("/it/before-entrusting-brazil");
    expect(routePath("pt", route)).toBeNull();
    expect(availablePageLanguages("/before-entrusting-brazil")).toEqual(["en", "it", "de", "es", "fr"]);
    expect(availablePageLanguages("/it/before-entrusting-brazil")).toEqual(["en", "it", "de", "es", "fr"]);
  });
});

import { displayPathFor, parseDisplayPath } from "./displayLang";

describe("DE/ES/FR addresses keep the commercial direction", () => {
  test("/de mirrors the Italian Europe → Brazil offer", () => {
    expect(parseDisplayPath("/de/Our_Services")).toMatchObject({ display: "de", variant: "eu", contentLang: "it", basename: "/de", rest: "/Our_Services" });
  });
  test("/fr/br mirrors the Portuguese Brazil → Europe offer", () => {
    expect(parseDisplayPath("/fr/br/servicos/verificar")).toMatchObject({ variant: "br", contentLang: "pt", basename: "/fr/br", rest: "/servicos/verificar" });
  });
  test("the export page has its own address in each new language", () => {
    expect(parseDisplayPath("/es/brasilexportacao")).toMatchObject({ variant: "export", contentLang: "pt", basename: "/es" });
    expect(displayPathFor("de", "pt", "/brasilexportacao")).toBe("/de/brasilexportacao");
    expect(availablePageLanguages("/brasilexportacao")).toEqual(["pt", "de", "es", "fr"]);
  });
  test("existing languages are untouched", () => {
    expect(parseDisplayPath("/it/About_us")).toBeNull();
    expect(parseDisplayPath("/pt")).toBeNull();
    expect(parseDisplayPath("/About_us")).toBeNull();
  });
});

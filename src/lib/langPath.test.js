import { describe, expect, test } from "bun:test";
import { localizePagePath, detectLangFromPath, basenameForLang, pathForLang, availablePageLanguages } from "./langPath";
import { publicRoutes, routePath } from "../../scripts/routes";

describe("webinar language navigation", () => {
  test("Before entrusting Brazil is published and switchable only in English and Italian", () => {
    const route = publicRoutes().find(route => route.loc === "/before-entrusting-brazil");
    expect(route).toBeDefined();
    expect(routePath("en", route)).toBe("/before-entrusting-brazil");
    expect(routePath("it", route)).toBe("/it/before-entrusting-brazil");
    expect(routePath("pt", route)).toBeNull();
    expect(availablePageLanguages("/before-entrusting-brazil")).toEqual(["en", "it"]);
    expect(availablePageLanguages("/it/before-entrusting-brazil")).toEqual(["en", "it"]);
  });
  test("Italian webinar variants select a URL with the Italian router basename", () => {
    for (const path of ["/webinar-brasile", "/it/webinar-brasile", "/en/webinar-brazil", "/pt/webinar-brasil"]) {
      const target = localizePagePath(path, "it");
      expect(target).toBe("/it/webinar-brasile");
      expect(basenameForLang(detectLangFromPath(target))).toBe("/it");
      expect(pathForLang(detectLangFromPath(target), "/About_us")).toBe("/it/About_us");
    }
  });
  test("the published Italian webinar route agrees with the language switcher", () => {
    const route = publicRoutes().find(route => route.loc === "/webinar-brazil");
    expect(route).toBeDefined();
    expect(routePath("it", route)).toBe("/it/webinar-brasile");
  });
  test("English and Portuguese webinar targets remain unchanged", () => {
    expect(localizePagePath("/webinar-brasile", "en")).toBe("/en/webinar-brazil");
    expect(localizePagePath("/webinar-brasile", "pt")).toBe("/pt/webinar-brasil");
  });
});
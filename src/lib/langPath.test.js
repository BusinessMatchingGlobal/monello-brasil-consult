import { describe, expect, test } from "bun:test";
import { localizePagePath, detectLangFromPath, basenameForLang, pathForLang } from "./langPath";
import { publicRoutes, routePath } from "../../scripts/routes";

describe("webinar language navigation", () => {
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
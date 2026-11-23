import { describe, expect, test } from "bun:test";
import { availablePageLanguages } from "./langPath";
import { publicRoutes, routePath } from "../../scripts/routes";

describe("language-exclusive pages", () => {
  test("Before entrusting Brazil is published and switchable only in English and Italian", () => {
    const route = publicRoutes().find(route => route.loc === "/before-entrusting-brazil");
    expect(route).toBeDefined();
    expect(routePath("en", route)).toBe("/before-entrusting-brazil");
    expect(routePath("it", route)).toBe("/it/before-entrusting-brazil");
    expect(routePath("pt", route)).toBeNull();
    expect(availablePageLanguages("/before-entrusting-brazil")).toEqual(["en", "it"]);
    expect(availablePageLanguages("/it/before-entrusting-brazil")).toEqual(["en", "it"]);
  });
});

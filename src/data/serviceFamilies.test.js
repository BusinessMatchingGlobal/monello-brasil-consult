import { describe, expect, test } from "bun:test";
import { getServicesCatalog } from "./servicesCatalog";
import { familyPath, getServiceFamilies, serviceDestination } from "./serviceFamilies";
import { localizeFamilyPath } from "./serviceFamilyMetadata";

describe("service regrouping", () => {
  for (const lang of ["en", "it", "pt"]) {
    test(`${lang}: each existing service occurs in exactly one family or Export Desk level`, () => {
      const original = getServicesCatalog(lang).groups.flatMap(g => g.items);
      const regrouped = getServiceFamilies(lang).flatMap(f => [...f.items, ...f.levels]);
      expect(regrouped.length).toBe(original.length);
      expect(new Set(regrouped.map(i => i.name)).size).toBe(original.length);
      expect(regrouped.map(i => i.name).sort()).toEqual(original.map(i => i.name).sort());
      for (const item of original) expect(regrouped.find(i => i.name === item.name)).toEqual(item);
    });
    test(`${lang}: requested family card counts and four Export Desk levels`, () => {
      const families = getServiceFamilies(lang);
      expect(families.map(f => f.items.length)).toEqual([2, 4, 4, 6, 1, 2]);
      expect(families[4].levels.map(i => i.name)).toEqual(["Local Business Support", "Commercial Representation — Light", "Commercial Representation — Full", "Fractional Export Desk"]);
      expect(families[0].items[0].name).toBe(lang === "pt" ? "Check-up Europa" : "Brazil Check-up");
    });
  }
  test("localized addresses and language switching", () => {
    expect(familyPath("decide", "en")).toBe("/services/is-brazil-worth-it");
    expect(familyPath("decide", "it")).toBe("/servizi/il-brasile-conviene");
    expect(familyPath("decide", "pt")).toBe("/servicos/a-europa-vale-a-pena");
    expect(localizeFamilyPath("/services/verify", "it")).toBe("/servizi/verificare");
    expect(localizeFamilyPath("/servizi/il-brasile-conviene#check-up", "pt")).toBe("/servicos/a-europa-vale-a-pena#check-up");
  });
  test("situation service links use the requested families", () => {
    for (const lang of ["en", "it"]) {
      for (const name of ["Company Check", "Enhanced Due Diligence"]) expect(serviceDestination(name, lang)).toBe(familyPath("verify", lang));
      expect(serviceDestination("Competitor Snapshot", lang)).toBe(familyPath("prepare", lang));
      expect(serviceDestination("Buyer Finder", lang)).toBe(familyPath("find", lang));
      for (const name of ["BMG Intelligence Desk", "Local Business Support"]) expect(serviceDestination(name, lang)).toBe(familyPath("stay", lang));
    }
  });
});
import { describe, expect, test } from "bun:test";
import { getSiteNavigation, getFooterNavigation, SERVICE_ANCHORS } from "./siteNavigation";
import { SERVICE_GROUP_FAMILIES } from "./siteNavigation";
import { familyPath } from "../data/serviceFamilyMetadata";

describe("navigation destinations", () => {
  test("Domande frequenti is linked only by the Italian footer, never the header", () => {
    const inFooter = lang => getFooterNavigation(lang).flatMap(group => group.children ?? []).filter(link => link.href === "/domande-frequenti");
    expect(inFooter("it")).toEqual([{ href: "/domande-frequenti", label: "Domande frequenti", internal: true }]);
    expect(inFooter("en")).toEqual([]);
    expect(inFooter("pt")).toEqual([]);
    for (const lang of ["en", "it", "pt"]) {
      expect(getSiteNavigation(lang).flatMap(group => group.children ?? [group]).some(link => link.href === "/domande-frequenti")).toBe(false);
    }
  });
  test("Resources links the new editorial page only in EN and IT", () => {
    for (const lang of ["en", "it"]) {
      expect(getSiteNavigation(lang).find(group => group.href === "__resources__")?.children?.some(link => link.href === "/before-entrusting-brazil")).toBe(true);
    }
    expect(getSiteNavigation("pt").flatMap(group => group.children ?? []).some(link => link.href === "/before-entrusting-brazil")).toBe(false);
  });
  test("Italian situation links use existing localized addresses in header and footer", () => {
    const expected = ["/Our_Services", "/gia-in-brasile", "/riprendere-il-brasile"];
    expect(getSiteNavigation("it")[0].children.map(link => link.href)).toEqual(expected);
    expect(getFooterNavigation("it")[0].children.map(link => link.href)).toEqual(expected);
  });
  test("Business Matching uses each language's existing address", () => {
    for (const [lang, address] of [["en", "/services/business-matching"], ["it", "/servizi/business-matching"], ["pt", "/servicos/business-matching"]]) {
      expect(getSiteNavigation(lang)[1].children.find(link => link.label === "Business Matching").href).toBe(address);
      expect(getFooterNavigation(lang)[1].children.find(link => link.label === "Business Matching").href).toBe(address);
    }
  });
  test("the eight existing service groups have the requested stable destinations", () => {
    expect([...SERVICE_ANCHORS]).toEqual(["get-an-answer", "verify", "assess", "find", "make-contact", "enter", "stay", "training"]);
    for (const lang of ["en", "it", "pt"]) {
      expect(getSiteNavigation(lang)[1].children?.slice(0, 8).map(link => link.href)).toEqual(SERVICE_GROUP_FAMILIES.map(key => familyPath(key, lang)));
    }
  });
  test("Business Travel is footer-only in every language", () => {
    for (const lang of ["en", "it", "pt"]) {
      expect(getSiteNavigation(lang).flatMap(group => group.children ?? [group]).some(link => link.href === "/BT")).toBe(false);
      expect(getFooterNavigation(lang).flatMap(group => group.children ?? []).some(link => link.href === "/BT")).toBe(true);
    }
  });
  test("before-you-choose is not advertised in any language", () => {
    for (const lang of ["en", "it", "pt"]) {
      expect(getSiteNavigation(lang).flatMap(group => group.children ?? []).some(link => link.href === "/before-you-choose")).toBe(false);
    }
  });
  test("unpublished Portuguese situation translations are not advertised", () => {
    expect(getSiteNavigation("pt")[0].children?.map(link => link.href)).toEqual(["/Our_Services"]);
    expect(getSiteNavigation("en")[0].children?.map(link => link.href)).toEqual(["/Our_Services", "/already-in-brazil", "/back-to-brazil"]);
  });
  test("external destinations are retained", () => {
    for (const lang of ["en", "it", "pt"]) {
      const links = getSiteNavigation(lang).flatMap(group => group.children ?? []);
      expect(links.find(link => link.label === "Brazil Beauty Desk")?.href).toBe("https://www.brazilbeautydesk.com");
      expect(links.find(link => link.label === "#CustoBrasil newsletter")?.href).toBe("https://www.linkedin.com/company/businessmatchingglobal");
    }
  });
  test("the webinar item is gone: webinar pages live on an external site", () => {
    for (const lang of ["en", "it", "pt"]) {
      expect(getSiteNavigation(lang).find(link => link.label === "Webinar")).toBeUndefined();
    }
  });
});
test("export services link appears only in the Portuguese footer with the www address", async () => {
  const { getFooterNavigation } = await import("./siteNavigation.ts");
  const find = lang => getFooterNavigation(lang).flatMap(g => g.children ?? []).filter(l => l.label === "Serviços para exportação");
  const [pt] = find("pt");
  if (pt?.href !== "https://www.businessmatching.global/brasilexportacao") throw new Error("PT export link wrong");
  if (find("en").length || find("it").length) throw new Error("export link leaked to EN/IT");
});

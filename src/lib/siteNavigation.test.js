import { describe, expect, test } from "bun:test";
import { getSiteNavigation, getFooterNavigation, SERVICE_ANCHORS } from "./siteNavigation";

describe("navigation destinations", () => {
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
      expect(getSiteNavigation(lang)[1].children?.slice(0, 8).map(link => link.href)).toEqual(SERVICE_ANCHORS.map(anchor => `/Our_Services#${anchor}`));
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
});
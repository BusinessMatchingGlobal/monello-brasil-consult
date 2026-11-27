import { test, expect } from "bun:test";
import { canonicalUrl, SITE } from "./useCanonical";

for (const lang of ["de", "es", "fr"]) {
  test(`${lang} export canonical does not inherit the Portuguese override`, () => {
    expect(canonicalUrl("/brasilexportacao", SITE, `/${lang}/brasilexportacao`, `${SITE}/brasilexportacao`, lang))
      .toBe(`${SITE}/${lang}/brasilexportacao`);
  });
}

test("original Portuguese export canonical is unchanged", () => {
  expect(canonicalUrl("/brasilexportacao", SITE, "/brasilexportacao", `${SITE}/brasilexportacao`))
    .toBe("https://businessmatching.global/brasilexportacao");
});

test("ordinary canonical overrides remain authoritative", () => {
  expect(canonicalUrl("/privacy", SITE, "/fr/privacy", `${SITE}/fr/privacy`, "fr"))
    .toBe("https://businessmatching.global/fr/privacy");
});
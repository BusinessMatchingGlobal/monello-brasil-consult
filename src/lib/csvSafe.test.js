import { describe, expect, test } from "bun:test";
import { csvSafe } from "./csvSafe";

describe("subscriber CSV export", () => {
  test("formula-like values are exported as plain text", () => {
    for (const v of ["=HYPERLINK(\"x\")", "+1+1", "-2+3", "@SUM(A1)", "\tcmd", "\rcmd"]) {
      expect(csvSafe(v)).toBe(`'${v}`);
    }
  });
  test("ordinary values are unchanged", () => {
    expect(csvSafe("Mario")).toBe("Mario");
    expect(csvSafe("info@example.com")).toBe("info@example.com");
    expect(csvSafe(null)).toBe("");
  });
});

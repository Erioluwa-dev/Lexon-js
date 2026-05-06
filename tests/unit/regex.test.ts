import { validateRegex, explainRegex } from "../../src/rules/regex";

describe("regex rule", () => {
  describe("validateRegex", () => {
    it("returns true when string matches pattern", () => {
      const node = { type: "regex" as const, pattern: "^\\d+$" };
      expect(validateRegex("12345", node)).toBe(true);
      expect(validateRegex("0", node)).toBe(true);
    });

    it("returns false when string does not match pattern", () => {
      const node = { type: "regex" as const, pattern: "^\\d+$" };
      expect(validateRegex("abc", node)).toBe(false);
      expect(validateRegex("12abc", node)).toBe(false);
      expect(validateRegex("", node)).toBe(false);
    });

    it("returns false for invalid regex pattern", () => {
      const node = { type: "regex" as const, pattern: "[invalid" };
      expect(validateRegex("test", node)).toBe(false);
    });

    it("supports regex flags", () => {
      const node = { type: "regex" as const, pattern: "^test$", flags: "i" };
      expect(validateRegex("TEST", node)).toBe(true);
      expect(validateRegex("test", node)).toBe(true);
      expect(validateRegex("Test", node)).toBe(true);
    });

    it("returns true for empty string with matching pattern", () => {
      const node = { type: "regex" as const, pattern: "^$" };
      expect(validateRegex("", node)).toBe(true);
    });
  });

  describe("explainRegex", () => {
    it("returns correct error message", () => {
      const node = { type: "regex" as const, pattern: "^\\d+$" };
      expect(explainRegex("abc", node)).toBe('String does not match pattern "^\\d+$"');
    });
  });
});
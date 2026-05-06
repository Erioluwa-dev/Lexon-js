import { validateNoSpaces, explainNoSpaces } from "../../src/rules/noSpaces";

describe("noSpaces rule", () => {
  describe("validateNoSpaces", () => {
    it("returns true for string without spaces", () => {
      const node = { type: "noSpaces" as const, strict: true };
      expect(validateNoSpaces("hello", node)).toBe(true);
      expect(validateNoSpaces("helloworld", node)).toBe(true);
      expect(validateNoSpaces("hello123", node)).toBe(true);
    });

    it("returns false for string with spaces", () => {
      const node = { type: "noSpaces" as const, strict: true };
      expect(validateNoSpaces("hello world", node)).toBe(false);
      expect(validateNoSpaces(" hello", node)).toBe(false);
      expect(validateNoSpaces("hello ", node)).toBe(false);
      expect(validateNoSpaces("hello  world", node)).toBe(false);
    });

    it("returns false for string with tabs and newlines", () => {
      const node = { type: "noSpaces" as const, strict: true };
      expect(validateNoSpaces("hello\tworld", node)).toBe(false);
      expect(validateNoSpaces("hello\nworld", node)).toBe(false);
    });

    it("returns true for empty string", () => {
      const node = { type: "noSpaces" as const, strict: true };
      expect(validateNoSpaces("", node)).toBe(true);
    });

    it("returns true when strict is false", () => {
      const node = { type: "noSpaces" as const, strict: false };
      expect(validateNoSpaces("hello world", node)).toBe(true);
      expect(validateNoSpaces(" hello world ", node)).toBe(true);
    });
  });

  describe("explainNoSpaces", () => {
    it("returns correct error message", () => {
      const node = { type: "noSpaces" as const, strict: true };
      expect(explainNoSpaces("hello world", node)).toBe("String contains spaces");
    });
  });
});
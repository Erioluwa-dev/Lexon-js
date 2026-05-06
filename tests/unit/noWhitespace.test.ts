import { validateNoWhitespace, explainNoWhitespace } from "../../src/rules/noWhitespace";

describe("noWhitespace rule", () => {
  describe("validateNoWhitespace", () => {
    it("returns true when string has no whitespace", () => {
      const node = { type: "noWhitespace" as const, strict: true };
      expect(validateNoWhitespace("hello", node)).toBe(true);
      expect(validateNoWhitespace("helloworld123", node)).toBe(true);
    });

    it("returns false when string contains spaces", () => {
      const node = { type: "noWhitespace" as const, strict: true };
      expect(validateNoWhitespace("hello world", node)).toBe(false);
    });

    it("returns false when string contains tabs", () => {
      const node = { type: "noWhitespace" as const, strict: true };
      expect(validateNoWhitespace("hello\tworld", node)).toBe(false);
    });

    it("returns false when string contains newlines", () => {
      const node = { type: "noWhitespace" as const, strict: true };
      expect(validateNoWhitespace("hello\nworld", node)).toBe(false);
    });

    it("returns true when strict is false and only checks spaces", () => {
      const node = { type: "noWhitespace" as const, strict: false };
      expect(validateNoWhitespace("hello\tworld", node)).toBe(true);
      expect(validateNoWhitespace("hello world", node)).toBe(false);
    });
  });

  describe("explainNoWhitespace", () => {
    it("returns correct error message", () => {
      const node = { type: "noWhitespace" as const, strict: true };
      expect(explainNoWhitespace("hello world", node)).toBe("String contains whitespace");
    });
  });
});
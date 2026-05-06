import { validateContains, explainContains } from "../../src/rules/contains";

describe("contains rule", () => {
  describe("validateContains", () => {
    it("returns true when string contains substring", () => {
      const node = { type: "contains" as const, substring: "hello" };
      expect(validateContains("hello world", node)).toBe(true);
      expect(validateContains("say hello", node)).toBe(true);
      expect(validateContains("hello", node)).toBe(true);
    });

    it("returns false when string does not contain substring", () => {
      const node = { type: "contains" as const, substring: "hello" };
      expect(validateContains("world", node)).toBe(false);
      expect(validateContains("", node)).toBe(false);
    });

    it("returns false for empty string when substring exists", () => {
      const node = { type: "contains" as const, substring: "test" };
      expect(validateContains("", node)).toBe(false);
    });

    it("returns true when substring is empty", () => {
      const node = { type: "contains" as const, substring: "" };
      expect(validateContains("anything", node)).toBe(true);
      expect(validateContains("", node)).toBe(true);
    });
  });

  describe("explainContains", () => {
    it("returns correct error message", () => {
      const node = { type: "contains" as const, substring: "hello" };
      expect(explainContains("world", node)).toBe('String does not contain "hello"');
    });
  });
});
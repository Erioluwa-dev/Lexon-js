import { validateNotContains, explainNotContains } from "../../src/rules/notContains";

describe("notContains rule", () => {
  describe("validateNotContains", () => {
    it("returns true when string does not contain substring", () => {
      const node = { type: "notContains" as const, substring: "hello" };
      expect(validateNotContains("world", node)).toBe(true);
      expect(validateNotContains("", node)).toBe(true);
      expect(validateNotContains("goodbye", node)).toBe(true);
    });

    it("returns false when string contains substring", () => {
      const node = { type: "notContains" as const, substring: "hello" };
      expect(validateNotContains("hello world", node)).toBe(false);
      expect(validateNotContains("say hello", node)).toBe(false);
      expect(validateNotContains("hello", node)).toBe(false);
    });

    it("returns true for empty string when forbidden substring exists", () => {
      const node = { type: "notContains" as const, substring: "test" };
      expect(validateNotContains("", node)).toBe(true);
    });

    it("returns true when substring is empty", () => {
      const node = { type: "notContains" as const, substring: "" };
      expect(validateNotContains("anything", node)).toBe(true);
      expect(validateNotContains("", node)).toBe(true);
    });
  });

  describe("explainNotContains", () => {
    it("returns correct error message", () => {
      const node = { type: "notContains" as const, substring: "hello" };
      expect(explainNotContains("hello world", node)).toBe('String contains "hello"');
    });
  });
});
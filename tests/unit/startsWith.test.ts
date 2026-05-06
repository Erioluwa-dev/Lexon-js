import { validateStartsWith, explainStartsWith } from "../../src/rules/startsWith";

describe("startsWith rule", () => {
  describe("validateStartsWith", () => {
    it("returns true when string starts with prefix", () => {
      const node = { type: "startsWith" as const, prefix: "hello" };
      expect(validateStartsWith("hello world", node)).toBe(true);
      expect(validateStartsWith("hello", node)).toBe(true);
    });

    it("returns false when string does not start with prefix", () => {
      const node = { type: "startsWith" as const, prefix: "hello" };
      expect(validateStartsWith("world hello", node)).toBe(false);
      expect(validateStartsWith("hi", node)).toBe(false);
    });

    it("returns false for empty string when prefix exists", () => {
      const node = { type: "startsWith" as const, prefix: "hello" };
      expect(validateStartsWith("", node)).toBe(false);
    });

    it("returns true when prefix is empty", () => {
      const node = { type: "startsWith" as const, prefix: "" };
      expect(validateStartsWith("anything", node)).toBe(true);
      expect(validateStartsWith("", node)).toBe(true);
    });
  });

  describe("explainStartsWith", () => {
    it("returns correct error message", () => {
      const node = { type: "startsWith" as const, prefix: "hello" };
      expect(explainStartsWith("world", node)).toBe('String does not start with "hello"');
    });
  });
});
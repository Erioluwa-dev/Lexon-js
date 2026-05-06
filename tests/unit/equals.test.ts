import { validateEquals, explainEquals } from "../../src/rules/equals";

describe("equals rule", () => {
  describe("validateEquals", () => {
    it("returns true when string equals value", () => {
      const node = { type: "equals" as const, value: "hello" };
      expect(validateEquals("hello", node)).toBe(true);
    });

    it("returns false when string does not equal value", () => {
      const node = { type: "equals" as const, value: "hello" };
      expect(validateEquals("world", node)).toBe(false);
      expect(validateEquals("Hello", node)).toBe(false);
      expect(validateEquals("", node)).toBe(false);
    });

    it("returns true for empty string when value is empty", () => {
      const node = { type: "equals" as const, value: "" };
      expect(validateEquals("", node)).toBe(true);
    });
  });

  describe("explainEquals", () => {
    it("returns correct error message", () => {
      const node = { type: "equals" as const, value: "hello" };
      expect(explainEquals("world", node)).toBe('String "world" does not equal "hello"');
    });
  });
});
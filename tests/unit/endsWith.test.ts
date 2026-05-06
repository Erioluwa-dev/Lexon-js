import { validateEndsWith, explainEndsWith } from "../../src/rules/endsWith";

describe("endsWith rule", () => {
  describe("validateEndsWith", () => {
    it("returns true when string ends with suffix", () => {
      const node = { type: "endsWith" as const, suffix: "world" };
      expect(validateEndsWith("hello world", node)).toBe(true);
      expect(validateEndsWith("world", node)).toBe(true);
    });

    it("returns false when string does not end with suffix", () => {
      const node = { type: "endsWith" as const, suffix: "world" };
      expect(validateEndsWith("world hello", node)).toBe(false);
      expect(validateEndsWith("hi", node)).toBe(false);
    });

    it("returns false for empty string when suffix exists", () => {
      const node = { type: "endsWith" as const, suffix: "world" };
      expect(validateEndsWith("", node)).toBe(false);
    });

    it("returns true when suffix is empty", () => {
      const node = { type: "endsWith" as const, suffix: "" };
      expect(validateEndsWith("anything", node)).toBe(true);
      expect(validateEndsWith("", node)).toBe(true);
    });
  });

  describe("explainEndsWith", () => {
    it("returns correct error message", () => {
      const node = { type: "endsWith" as const, suffix: "world" };
      expect(explainEndsWith("hello", node)).toBe('String does not end with "world"');
    });
  });
});
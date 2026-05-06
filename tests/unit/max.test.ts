import { validateMax, explainMax } from "../../src/rules/max";

describe("max rule", () => {
  describe("validateMax", () => {
    it("returns true when string is at or below maximum length", () => {
      const node = { type: "max" as const, length: 5 };
      expect(validateMax("hello", node)).toBe(true);
      expect(validateMax("hi", node)).toBe(true);
      expect(validateMax("", node)).toBe(true);
    });

    it("returns false when string exceeds maximum length", () => {
      const node = { type: "max" as const, length: 5 };
      expect(validateMax("helloworld", node)).toBe(false);
      expect(validateMax("helloo", node)).toBe(false);
    });

    it("returns true for empty string", () => {
      const node = { type: "max" as const, length: 0 };
      expect(validateMax("", node)).toBe(true);
    });
  });

  describe("explainMax", () => {
    it("returns correct error message for long string", () => {
      const node = { type: "max" as const, length: 5 };
      expect(explainMax("helloworld", node)).toBe("String length 10 exceeds maximum 5");
    });

    it("returns correct error message for exactly one over", () => {
      const node = { type: "max" as const, length: 5 };
      expect(explainMax("hello!", node)).toBe("String length 6 exceeds maximum 5");
    });
  });
});
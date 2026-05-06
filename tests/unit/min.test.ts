import { validateMin, explainMin } from "../../src/rules/min";

describe("min rule", () => {
  describe("validateMin", () => {
    it("returns true when string meets minimum length", () => {
      const node = { type: "min" as const, length: 5 };
      expect(validateMin("hello", node)).toBe(true);
      expect(validateMin("helloworld", node)).toBe(true);
    });

    it("returns true when string equals minimum length", () => {
      const node = { type: "min" as const, length: 5 };
      expect(validateMin("hello", node)).toBe(true);
    });

    it("returns false when string is shorter than minimum", () => {
      const node = { type: "min" as const, length: 5 };
      expect(validateMin("hi", node)).toBe(false);
      expect(validateMin("", node)).toBe(false);
    });

    it("returns false for empty string when minimum > 0", () => {
      const node = { type: "min" as const, length: 1 };
      expect(validateMin("", node)).toBe(false);
    });

    it("returns true for empty string when minimum is 0", () => {
      const node = { type: "min" as const, length: 0 };
      expect(validateMin("", node)).toBe(true);
    });
  });

  describe("explainMin", () => {
    it("returns correct error message for short string", () => {
      const node = { type: "min" as const, length: 5 };
      expect(explainMin("hi", node)).toBe("String length 2 is less than minimum 5");
    });

    it("returns correct error message for empty string", () => {
      const node = { type: "min" as const, length: 3 };
      expect(explainMin("", node)).toBe("String length 0 is less than minimum 3");
    });
  });
});
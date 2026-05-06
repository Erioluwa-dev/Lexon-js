import { validateExact, explainExact } from "../../src/rules/exact";

describe("exact rule", () => {
  describe("validateExact", () => {
    it("returns true when string equals exact length", () => {
      const node = { type: "exact" as const, length: 5 };
      expect(validateExact("hello", node)).toBe(true);
      expect(validateExact("world", node)).toBe(true);
    });

    it("returns false when string length differs", () => {
      const node = { type: "exact" as const, length: 5 };
      expect(validateExact("hi", node)).toBe(false);
      expect(validateExact("helloworld", node)).toBe(false);
    });

    it("returns true for empty string when length is 0", () => {
      const node = { type: "exact" as const, length: 0 };
      expect(validateExact("", node)).toBe(true);
    });

    it("returns false for empty string when length > 0", () => {
      const node = { type: "exact" as const, length: 3 };
      expect(validateExact("", node)).toBe(false);
    });
  });

  describe("explainExact", () => {
    it("returns correct error message for short string", () => {
      const node = { type: "exact" as const, length: 5 };
      expect(explainExact("hi", node)).toBe("String length 2 does not equal exact length 5");
    });

    it("returns correct error message for long string", () => {
      const node = { type: "exact" as const, length: 3 };
      expect(explainExact("hello", node)).toBe("String length 5 does not equal exact length 3");
    });

    it("returns correct error message for empty string", () => {
      const node = { type: "exact" as const, length: 3 };
      expect(explainExact("", node)).toBe("String length 0 does not equal exact length 3");
    });
  });
});
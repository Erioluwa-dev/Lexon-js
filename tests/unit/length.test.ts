import { string } from "../../src/schema/string";

describe("length shorthand", () => {
  describe("validate", () => {
    it("validates string within min and max range", () => {
      const schema = string().length(3, 10).compile();
      expect(schema.validate("hello")).toBe(true);
      expect(schema.validate("abc")).toBe(true);
      expect(schema.validate("a".repeat(10))).toBe(true);
    });

    it("rejects string shorter than min", () => {
      const schema = string().length(3, 10).compile();
      expect(schema.validate("ab")).toBe(false);
      expect(schema.validate("")).toBe(false);
    });

    it("rejects string longer than max", () => {
      const schema = string().length(3, 10).compile();
      expect(schema.validate("a".repeat(11))).toBe(false);
    });

    it("works with equal min and max", () => {
      const schema = string().length(5, 5).compile();
      expect(schema.validate("hello")).toBe(true);
      expect(schema.validate("hi")).toBe(false);
      expect(schema.validate("helloworld")).toBe(false);
    });

    it("can be combined with other rules", () => {
      const schema = string().length(3, 10).noSpaces().compile();
      expect(schema.validate("hello")).toBe(true);
      expect(schema.validate("hello world")).toBe(false);
    });
  });

  describe("explain", () => {
    it("explains min failure", () => {
      const schema = string().length(3, 10).compile();
      const result = schema.getExplain()("ab");
      expect(result.valid).toBe(false);
      expect(result.error?.message).toBe("String length 2 is less than minimum 3");
    });

    it("explains max failure", () => {
      const schema = string().length(3, 10).compile();
      const result = schema.getExplain()("a".repeat(11));
      expect(result.valid).toBe(false);
      expect(result.error?.message).toBe("String length 11 exceeds maximum 10");
    });
  });
});

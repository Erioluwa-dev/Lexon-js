import { string } from "../../src/schema/string";
import { explain } from "../../src/debug/explain";

describe("string builder integration", () => {
  describe("full validation flow", () => {
    it("validates username with min, max, charset, noSpaces", () => {
      const schema = string()
        .min(3)
        .max(20)
        .charset("a-zA-Z0-9_", "alphanumeric and underscore")
        .noSpaces()
        .compile();

      expect(schema.validate("john_doe")).toBe(true);
      expect(schema.validate("user123")).toBe(true);
      expect(schema.validate("ab")).toBe(false);
      expect(schema.validate("a".repeat(21))).toBe(false);
      expect(schema.validate("user@name")).toBe(false);
      expect(schema.validate("user name")).toBe(false);
    });

    it("validates simple min rule", () => {
      const schema = string().min(5).compile();
      expect(schema.validate("hello")).toBe(true);
      expect(schema.validate("hi")).toBe(false);
    });

    it("validates simple max rule", () => {
      const schema = string().max(5).compile();
      expect(schema.validate("hello")).toBe(true);
      expect(schema.validate("helloworld")).toBe(false);
    });

    it("validates charset rule", () => {
      const schema = string().charset("a-z", "lowercase").compile();
      expect(schema.validate("hello")).toBe(true);
      expect(schema.validate("Hello")).toBe(false);
    });

    it("validates noSpaces rule", () => {
      const schema = string().noSpaces().compile();
      expect(schema.validate("helloworld")).toBe(true);
      expect(schema.validate("hello world")).toBe(false);
    });

    it("combines multiple rules in order", () => {
      const schema = string()
        .min(3)
        .charset("a-z", "lowercase")
        .max(10)
        .noSpaces()
        .compile();

      expect(schema.validate("hello")).toBe(true);
      expect(schema.validate("hi")).toBe(false); // fails min first
      expect(schema.validate("helloworld!")).toBe(false); // fails charset first
      expect(schema.validate("helloworldd")).toBe(false); // fails max
    });
  });

  describe("explain integration", () => {
    it("explains min failure", () => {
      const schema = string().min(5).compile();
      const result = explain("ab", schema.ast);
      
      expect(result.valid).toBe(false);
      expect(result.error?.message).toBe("String length 2 is less than minimum 5");
    });

    it("explains max failure", () => {
      const schema = string().max(3).compile();
      const result = explain("hello", schema.ast);
      
      expect(result.valid).toBe(false);
      expect(result.error?.message).toBe("String length 5 exceeds maximum 3");
    });

    it("explains charset failure", () => {
      const schema = string().charset("0-9", "digits").compile();
      const result = explain("abc", schema.ast);
      
      expect(result.valid).toBe(false);
      expect(result.error?.message).toBe("String contains characters outside digits");
    });

    it("explains noSpaces failure", () => {
      const schema = string().noSpaces().compile();
      const result = explain("hello world", schema.ast);
      
      expect(result.valid).toBe(false);
      expect(result.error?.message).toBe("String contains spaces");
    });

    it("returns valid true for passing input", () => {
      const schema = string().min(3).max(10).compile();
      const result = explain("hello", schema.ast);
      
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe("AST preservation", () => {
    it("preserves AST in compiled schema", () => {
      const schema = string().min(3).max(10).compile();
      
      expect(schema.ast).toHaveLength(2);
      expect(schema.ast[0].type).toBe("min");
      expect((schema.ast[0] as { length: number }).length).toBe(3);
      expect(schema.ast[1].type).toBe("max");
      expect((schema.ast[1] as { length: number }).length).toBe(10);
    });
  });
});
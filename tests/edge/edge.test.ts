import { string } from "../../src/schema/string";
import { explain } from "../../src/debug/explain";

describe("edge cases", () => {
  describe("empty strings", () => {
    it("handles empty string with min rule", () => {
      const schema = string().min(1).compile();
      expect(schema.validate("")).toBe(false);
    });

    it("handles empty string with max rule", () => {
      const schema = string().max(5).compile();
      expect(schema.validate("")).toBe(true);
    });

    it("handles empty string with charset", () => {
      const schema = string().charset("a-z", "lowercase").compile();
      expect(schema.validate("")).toBe(true);
    });

    it("handles empty string with noSpaces", () => {
      const schema = string().noSpaces().compile();
      expect(schema.validate("")).toBe(true);
    });
  });

  describe("unicode strings", () => {
    it("handles unicode with charset", () => {
      const schema = string().charset("a-z", "lowercase").compile();
      expect(schema.validate("café")).toBe(false);
      expect(schema.validate("naïve")).toBe(false);
    });

    it("handles unicode with min/max", () => {
      const schema = string().min(3).max(5).compile();
      expect(schema.validate("café")).toBe(true); // 4 chars
      expect(schema.validate("ééé")).toBe(true); // 3 chars unicode
      expect(schema.validate("🎉")).toBe(false); // emoji is 2 code units in JS
    });

    it("handles emoji strings", () => {
      const schema = string().charset("a-z", "lowercase").compile();
      expect(schema.validate("🎉")).toBe(false);
    });
  });

  describe("long strings", () => {
    it("handles very long strings efficiently", () => {
      const longString = "a".repeat(10000);
      const schema = string().min(5000).max(15000).compile();
      expect(schema.validate(longString)).toBe(true);
    });

    it("fails quickly on min with long invalid string", () => {
      const longString = "a".repeat(10000);
      const schema = string().min(15000).compile();
      expect(schema.validate(longString)).toBe(false);
    });
  });

  describe("whitespace variations", () => {
    it("detects various whitespace types", () => {
      const schema = string().noSpaces().compile();
      
      expect(schema.validate("hello world")).toBe(false); // space
      expect(schema.validate("hello\tworld")).toBe(false); // tab
      expect(schema.validate("hello\nworld")).toBe(false); // newline
      expect(schema.validate("hello\rworld")).toBe(false); // carriage return
    });
  });

  describe("multiple rules combined", () => {
    it("handles all rules together", () => {
      const schema = string()
        .min(3)
        .max(10)
        .charset("a-z0-9_", "alnum underscore")
        .noSpaces()
        .compile();

      expect(schema.validate("valid123")).toBe(true);
      expect(schema.validate("ab")).toBe(false); // min fail
      expect(schema.validate("a".repeat(11))).toBe(false); // max fail
      expect(schema.validate("has space")).toBe(false); // noSpaces fail
      expect(schema.validate("has-special")).toBe(false); // charset fail
    });
  });

  describe("explain with complex schema", () => {
    it("reports first failing rule", () => {
      const schema = string().min(5).max(10).compile();
      
      const result1 = explain("ab", schema.ast);
      expect(result1.error?.rule.type).toBe("min");
      
      const result2 = explain("a".repeat(15), schema.ast);
      expect(result2.error?.rule.type).toBe("max");
    });
  });

  describe("duplicate rules", () => {
    it("handles duplicate min rules", () => {
      const schema = string().min(3).min(5).compile();
      expect(schema.validate("ab")).toBe(false); // 2 < 5
      expect(schema.validate("hello")).toBe(true); // 5 >= 5
    });

    it("handles duplicate max rules", () => {
      const schema = string().max(10).max(5).compile();
      expect(schema.validate("a".repeat(7))).toBe(false); // 7 > 5
    });
  });
});
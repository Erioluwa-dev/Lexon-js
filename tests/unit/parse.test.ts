import { string } from "../../src/schema/string";

describe("parse method", () => {
  describe("successful parse", () => {
    it("returns success true with data for valid input", () => {
      const schema = string().min(3).max(10).compile();
      const result = schema.parse("hello");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe("hello");
      }
    });

    it("returns data matching the original input", () => {
      const schema = string().charset("a-z", "lowercase").compile();
      const result = schema.parse("test");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe("test");
      }
    });

    it("works with empty AST (no rules)", () => {
      const schema = string().compile();
      const result = schema.parse("anything");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe("anything");
      }
    });
  });

  describe("failed parse", () => {
    it("returns success false with error for invalid input", () => {
      const schema = string().min(5).compile();
      const result = schema.parse("hi");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.valid).toBe(false);
        expect(result.error.error?.message).toBe("String length 2 is less than minimum 5");
        expect(result.error.input).toBe("hi");
      }
    });

    it("reports correct failing rule", () => {
      const schema = string().min(3).max(5).compile();
      const result = schema.parse("a".repeat(10));

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.error?.rule.type).toBe("max");
      }
    });

    it("reports first failing rule when multiple fail", () => {
      const schema = string().min(10).charset("a-z", "lowercase").compile();
      const result = schema.parse("Hello!");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.error?.rule.type).toBe("min");
      }
    });
  });
});

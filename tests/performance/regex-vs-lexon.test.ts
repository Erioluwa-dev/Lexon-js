import { string } from "../../src/schema/string";

describe("performance benchmarks", () => {
  describe("min/max rules", () => {
    it("validates short strings efficiently", () => {
      const schema = string().min(3).max(20).compile();

      for (let i = 0; i < 1000; i++) {
        schema.validate("hello");
      }
    });

    it("handles boundary conditions", () => {
      const schema = string().min(5).max(5).compile();
      expect(schema.validate("hello")).toBe(true);
      expect(schema.validate("hell")).toBe(false);
      expect(schema.validate("hello!")).toBe(false);
    });
  });

  describe("charset rule", () => {
    it("validates alphanumeric efficiently", () => {
      const schema = string().charset("a-zA-Z0-9_", "alphanumeric").compile();

      for (let i = 0; i < 1000; i++) {
        schema.validate("user_123");
      }
    });
  });

  describe("combined rules", () => {
    it("validates complex schema efficiently", () => {
      const schema = string()
        .min(3)
        .max(20)
        .charset("a-zA-Z0-9_", "alphanumeric")
        .noSpaces()
        .compile();

      for (let i = 0; i < 1000; i++) {
        schema.validate("user_123");
      }
    });
  });
});
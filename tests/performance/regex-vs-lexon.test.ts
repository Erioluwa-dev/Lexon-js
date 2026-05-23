import { describe, it } from "vitest";
import { string } from "../../src/schema/string";

const minMaxSchema = string().min(3).max(20).compile();
const charsetSchema = string().charset("a-zA-Z0-9_", "alphanumeric").compile();
const combinedSchema = string()
  .min(3)
  .max(20)
  .charset("a-zA-Z0-9_", "alphanumeric")
  .noSpaces()
  .compile();

describe("performance benchmarks", () => {
  it("min/max: validates short string efficiently", () => {
    for (let i = 0; i < 10_000; i++) {
      minMaxSchema.validate("hello");
      minMaxSchema.validate("");
      minMaxSchema.validate("a".repeat(30));
    }
  });

  it("charset: validates charset efficiently", () => {
    for (let i = 0; i < 10_000; i++) {
      charsetSchema.validate("user_123");
      charsetSchema.validate("INVALID@#$");
    }
  });

  it("combined: validates complex schema efficiently", () => {
    for (let i = 0; i < 10_000; i++) {
      combinedSchema.validate("user_123");
      combinedSchema.validate("ab");
    }
  });
});

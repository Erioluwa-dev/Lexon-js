import { string } from "../../src/schema/string";

describe("ref method", () => {
  it("validates using a referenced schema", () => {
    const usernameSchema = string().min(3).max(20).compile();
    const schema = string().ref(usernameSchema).compile();

    expect(schema.validate("john_doe")).toBe(true);
    expect(schema.validate("ab")).toBe(false);
    expect(schema.validate("a".repeat(21))).toBe(false);
  });

  it("can combine ref with additional rules", () => {
    const baseSchema = string().min(3).max(20).compile();
    const schema = string().ref(baseSchema).noSpaces().compile();

    expect(schema.validate("john_doe")).toBe(true);
    expect(schema.validate("ab")).toBe(false);
    expect(schema.validate("hello world")).toBe(false);
  });

  it("validates charset through ref", () => {
    const lowercaseSchema = string().charset("a-z", "lowercase").compile();
    const schema = string().ref(lowercaseSchema).compile();

    expect(schema.validate("hello")).toBe(true);
    expect(schema.validate("Hello")).toBe(false);
    expect(schema.validate("hello123")).toBe(false);
  });

  it("works with nested refs", () => {
    const minSchema = string().min(3).compile();
    const maxSchema = string().max(10).compile();
    const schema = string().ref(minSchema).ref(maxSchema).compile();

    expect(schema.validate("hello")).toBe(true);
    expect(schema.validate("ab")).toBe(false);
    expect(schema.validate("a".repeat(11))).toBe(false);
  });

  it("works with empty string through ref", () => {
    const schema = string().min(1).compile();
    const refSchema = string().ref(schema).compile();

    expect(refSchema.validate("a")).toBe(true);
    expect(refSchema.validate("")).toBe(false);
  });

  it("explains ref failures through the correct rule", () => {
    const minSchema = string().min(5).compile();
    const schema = string().ref(minSchema).compile();
    const result = schema.getExplain()("hi");

    expect(result.valid).toBe(false);
    expect(result.error?.message).toBe("String length 2 is less than minimum 5");
  });

  it("explains through multiple refs and rules", () => {
    const minSchema = string().min(3).compile();
    const schema = string().ref(minSchema).max(10).compile();
    const result = schema.getExplain()("ab");

    expect(result.valid).toBe(false);
    expect(result.error?.rule.type).toBe("ref");
  });
});

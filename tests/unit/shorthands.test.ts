import { string } from "../../src/schema/string";

describe("alphanumeric shorthand", () => {
  it("accepts alphanumeric strings", () => {
    const schema = string().alphanumeric().compile();
    expect(schema.validate("hello123")).toBe(true);
    expect(schema.validate("ABCdef")).toBe(true);
    expect(schema.validate("user123")).toBe(true);
  });

  it("rejects strings with special characters", () => {
    const schema = string().alphanumeric().compile();
    expect(schema.validate("hello!")).toBe(false);
    expect(schema.validate("user name")).toBe(false);
    expect(schema.validate("hello-world")).toBe(false);
  });

  it("accepts empty string", () => {
    const schema = string().alphanumeric().compile();
    expect(schema.validate("")).toBe(true);
  });

  it("rejects strings with underscores", () => {
    const schema = string().alphanumeric().compile();
    expect(schema.validate("hello_world")).toBe(false);
  });

  it("can be combined with other rules", () => {
    const schema = string().min(3).max(20).alphanumeric().compile();
    expect(schema.validate("User123")).toBe(true);
    expect(schema.validate("ab")).toBe(false);
    expect(schema.validate("hello world")).toBe(false);
  });
});

describe("numeric shorthand", () => {
  it("accepts numeric strings", () => {
    const schema = string().numeric().compile();
    expect(schema.validate("12345")).toBe(true);
    expect(schema.validate("0")).toBe(true);
    expect(schema.validate("999")).toBe(true);
  });

  it("rejects strings with non-numeric characters", () => {
    const schema = string().numeric().compile();
    expect(schema.validate("123abc")).toBe(false);
    expect(schema.validate("hello")).toBe(false);
    expect(schema.validate("12 34")).toBe(false);
  });

  it("accepts empty string", () => {
    const schema = string().numeric().compile();
    expect(schema.validate("")).toBe(true);
  });

  it("can be combined with length", () => {
    const schema = string().length(2, 4).numeric().compile();
    expect(schema.validate("123")).toBe(true);
    expect(schema.validate("1")).toBe(false);
    expect(schema.validate("12345")).toBe(false);
    expect(schema.validate("12ab")).toBe(false);
  });
});

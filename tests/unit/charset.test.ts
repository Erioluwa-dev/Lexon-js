import { validateCharset, explainCharset } from "../../src/rules/charset";

describe("charset rule", () => {
  describe("validateCharset", () => {
    it("returns true for string matching charset pattern", () => {
      const node = { type: "charset" as const, pattern: "a-zA-Z0-9", description: "alphanumeric" };
      expect(validateCharset("hello123", node)).toBe(true);
      expect(validateCharset("HELLO", node)).toBe(true);
      expect(validateCharset("Hello123", node)).toBe(true);
    });

    it("returns true for empty string", () => {
      const node = { type: "charset" as const, pattern: "a-z", description: "lowercase" };
      expect(validateCharset("", node)).toBe(true);
    });

    it("returns false for string with invalid characters", () => {
      const node = { type: "charset" as const, pattern: "a-z", description: "lowercase" };
      expect(validateCharset("Hello", node)).toBe(false);
      expect(validateCharset("hello world", node)).toBe(false);
      expect(validateCharset("hello!", node)).toBe(false);
    });

    it("works with numeric patterns", () => {
      const node = { type: "charset" as const, pattern: "0-9", description: "digits" };
      expect(validateCharset("12345", node)).toBe(true);
      expect(validateCharset("123abc", node)).toBe(false);
    });

    it("works with special character patterns", () => {
      const node = { type: "charset" as const, pattern: "a-zA-Z0-9_", description: "word characters" };
      expect(validateCharset("hello_world", node)).toBe(true);
      expect(validateCharset("hello-world", node)).toBe(false);
    });
  });

  describe("explainCharset", () => {
    it("returns correct error message", () => {
      const node = { type: "charset" as const, pattern: "a-z", description: "lowercase letters" };
      expect(explainCharset("Hello", node)).toBe("String contains characters outside lowercase letters");
    });
  });
});
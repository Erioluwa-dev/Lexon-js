import { execute, explain } from "../../src/core/executor";
import type { StringAstNode } from "../../src/core/types";

describe("executor", () => {
  describe("execute", () => {
    it("returns true when all rules pass", () => {
      const ast = [
        { type: "min" as const, length: 3 },
        { type: "max" as const, length: 10 }
      ];
      expect(execute("hello", ast)).toBe(true);
    });

    it("returns false when any rule fails", () => {
      const ast = [
        { type: "min" as const, length: 3 },
        { type: "max" as const, length: 10 }
      ];
      expect(execute("hi", ast)).toBe(false);
      expect(execute("helloworld!", ast)).toBe(false);
    });

    it("returns true for empty AST", () => {
      const ast: StringAstNode[] = [];
      expect(execute("anything", ast)).toBe(true);
    });
  });

  describe("explain", () => {
    it("returns valid true for passing input", () => {
      const ast = [{ type: "min" as const, length: 3 }];
      const result = explain("hello", ast);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("returns error for failing input", () => {
      const ast = [{ type: "min" as const, length: 3 }];
      const result = explain("hi", ast);
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.index).toBe(0);
    });
  });
});
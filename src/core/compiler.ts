import type { StringAstNode, CompiledSchema, ExplainResult, SafeParseResult } from "./types";
import { execute, explain } from "./executor";

/**
 * Compiler options for schema compilation.
 */
export interface CompilerOptions {
  /** Enable explain mode for detailed errors */
  readonly explain?: boolean;
}

/**
 * Compiles an AST into an executable validator.
 */
export function compile(
  ast: ReadonlyArray<StringAstNode>,
  _options?: CompilerOptions
): CompiledSchema {
  const validate = (input: string): boolean => execute(input, ast);
  const explainBound = (input: string): ExplainResult => explain(input, ast);

  const parseFn = (input: string): SafeParseResult => {
    const result = explain(input, ast);
    if (result.valid) {
      return { success: true, data: input };
    }
    return { success: false, error: result };
  };

  return {
    validate,
    parse: parseFn,
    ast,
    getExplain: () => explainBound
  };
}

/**
 * Creates an explain function bound to the given AST.
 */
export function createExplain(
  ast: ReadonlyArray<StringAstNode>
): (input: string) => ExplainResult {
  return (input: string) => explain(input, ast);
}
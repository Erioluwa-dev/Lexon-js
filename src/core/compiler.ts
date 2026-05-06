import type { StringAstNode, CompiledSchema, ExplainResult } from "./types";
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
  options?: CompilerOptions
): CompiledSchema {
  if (options?.explain) {
    return {
      validate: ((input: string): input is string => execute(input, ast)) as (input: string) => input is string,
      ast
    };
  }

  const validate = (input: string): input is string => execute(input, ast);
  return { validate, ast };
}

/**
 * Creates an explain function bound to the compiled schema.
 */
export function createExplain(
  ast: ReadonlyArray<StringAstNode>
): (input: string) => ExplainResult {
  return (input: string) => explain(input, ast);
}
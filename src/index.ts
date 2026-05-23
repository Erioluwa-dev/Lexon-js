/**
 * Lexon - Fast, TypeScript-first string schema engine for validation and pattern rules.
 *
 * @packageDocumentation
 */

export { string } from "./schema/string";
export { StringBuilder } from "./schema/builder";

export type {
  CompiledSchema,
  ExplainResult,
  SafeParseResult,
  StringAstNode,
  MinNode,
  MaxNode,
  CharsetNode,
  NoSpacesNode,
  ExactNode,
  NoWhitespaceNode,
  StartsWithNode,
  EndsWithNode,
  ContainsNode,
  NotContainsNode,
  EqualsNode,
  RegexNode,
  RefNode,
  AstNode,
  AstNodeType,
  ValidationResult,
  SchemaOptions
} from "./core/types";

export { compile, type CompilerOptions } from "./core/compiler";

export { explain } from "./debug/explain";

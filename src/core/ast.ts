import type {
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
  RegexNode
} from "./types";

export function minAst(length: number): MinNode {
  return { type: "min", length };
}

export function maxAst(length: number): MaxNode {
  return { type: "max", length };
}

export function charsetAst(pattern: string, description: string): CharsetNode {
  return { type: "charset", pattern, description };
}

export function noSpacesAst(strict: boolean = true): NoSpacesNode {
  return { type: "noSpaces", strict };
}

export function exactAst(length: number): ExactNode {
  return { type: "exact", length };
}

export function noWhitespaceAst(strict: boolean = true): NoWhitespaceNode {
  return { type: "noWhitespace", strict };
}

export function startsWithAst(prefix: string): StartsWithNode {
  return { type: "startsWith", prefix };
}

export function endsWithAst(suffix: string): EndsWithNode {
  return { type: "endsWith", suffix };
}

export function containsAst(substring: string): ContainsNode {
  return { type: "contains", substring };
}

export function notContainsAst(substring: string): NotContainsNode {
  return { type: "notContains", substring };
}

export function equalsAst(value: string): EqualsNode {
  return { type: "equals", value };
}

export function regexAst(pattern: string, flags?: string): RegexNode {
  return { type: "regex", pattern, flags };
}

/**
 * Type guard for AST nodes.
 */
export function isAstNode(node: unknown): node is StringAstNode {
  if (typeof node !== "object" || node === null) return false;
  const n = node as Record<string, unknown>;
  return typeof n.type === "string" && (
    n.type === "min" ||
    n.type === "max" ||
    n.type === "charset" ||
    n.type === "noSpaces" ||
    n.type === "exact" ||
    n.type === "noWhitespace" ||
    n.type === "startsWith" ||
    n.type === "endsWith" ||
    n.type === "contains" ||
    n.type === "notContains" ||
    n.type === "equals" ||
    n.type === "regex"
  );
}
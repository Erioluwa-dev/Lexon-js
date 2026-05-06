import type { StringAstNode, MinNode, MaxNode, CharsetNode, NoSpacesNode } from "./types";

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

/**
 * Type guard for AST nodes.
 */
export function isAstNode(node: unknown): node is StringAstNode {
  if (typeof node !== "object" || node === null) return false;
  const n = node as Record<string, unknown>;
  return typeof n.type === "string" && (n.type === "min" || n.type === "max" || n.type === "charset" || n.type === "noSpaces");
}
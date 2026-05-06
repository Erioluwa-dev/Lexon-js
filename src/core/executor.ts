import type { StringAstNode, ExplainResult } from "./types";
import {
  validateMin,
  explainMin
} from "../rules/min";
import {
  validateMax,
  explainMax
} from "../rules/max";
import {
  validateCharset,
  explainCharset
} from "../rules/charset";
import {
  validateNoSpaces,
  explainNoSpaces
} from "../rules/noSpaces";

export function execute(input: string, ast: ReadonlyArray<StringAstNode>): boolean {
  for (const node of ast) {
    if (!executeNode(input, node)) {
      return false;
    }
  }
  return true;
}

function executeNode(input: string, node: StringAstNode): boolean {
  switch (node.type) {
    case "min":
      return validateMin(input, node);
    case "max":
      return validateMax(input, node);
    case "charset":
      return validateCharset(input, node);
    case "noSpaces":
      return validateNoSpaces(input, node);
    default: {
      node satisfies never;
      throw new Error(`Unknown AST node type: ${(node as { type: string }).type}`);
    }
  }
}

export function explain(input: string, ast: ReadonlyArray<StringAstNode>): ExplainResult {
  for (let i = 0; i < ast.length; i++) {
    const node = ast[i];
    if (node && !executeNode(input, node)) {
      return {
        valid: false,
        error: {
          rule: node,
          index: i,
          message: explainNode(input, node)
        },
        input
      };
    }
  }
  return { valid: true, input };
}

function explainNode(input: string, node: StringAstNode): string {
  switch (node.type) {
    case "min":
      return explainMin(input, node);
    case "max":
      return explainMax(input, node);
    case "charset":
      return explainCharset(input, node);
    case "noSpaces":
      return explainNoSpaces(input, node);
  }
}
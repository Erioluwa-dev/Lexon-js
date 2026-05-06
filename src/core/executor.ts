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
import {
  validateExact,
  explainExact
} from "../rules/exact";
import {
  validateNoWhitespace,
  explainNoWhitespace
} from "../rules/noWhitespace";
import {
  validateStartsWith,
  explainStartsWith
} from "../rules/startsWith";
import {
  validateEndsWith,
  explainEndsWith
} from "../rules/endsWith";
import {
  validateContains,
  explainContains
} from "../rules/contains";
import {
  validateNotContains,
  explainNotContains
} from "../rules/notContains";
import {
  validateEquals,
  explainEquals
} from "../rules/equals";
import {
  validateRegex,
  explainRegex
} from "../rules/regex";

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
    case "exact":
      return validateExact(input, node);
    case "noWhitespace":
      return validateNoWhitespace(input, node);
    case "startsWith":
      return validateStartsWith(input, node);
    case "endsWith":
      return validateEndsWith(input, node);
    case "contains":
      return validateContains(input, node);
    case "notContains":
      return validateNotContains(input, node);
    case "equals":
      return validateEquals(input, node);
    case "regex":
      return validateRegex(input, node);
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
    case "exact":
      return explainExact(input, node);
    case "noWhitespace":
      return explainNoWhitespace(input, node);
    case "startsWith":
      return explainStartsWith(input, node);
    case "endsWith":
      return explainEndsWith(input, node);
    case "contains":
      return explainContains(input, node);
    case "notContains":
      return explainNotContains(input, node);
    case "equals":
      return explainEquals(input, node);
    case "regex":
      return explainRegex(input, node);
  }
}
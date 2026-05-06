import type { NoWhitespaceNode } from "../core/types";
import { hasWhitespace } from "../utils/string";
import { whitespaceError } from "../utils/errors";

export function validateNoWhitespace(input: string, node: NoWhitespaceNode): boolean {
  if (!node.strict) {
    return !/ /.test(input);
  }
  return !hasWhitespace(input);
}

export function explainNoWhitespace(_input: string, _node: NoWhitespaceNode): string {
  return whitespaceError();
}
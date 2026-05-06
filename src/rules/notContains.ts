import type { NotContainsNode } from "../core/types";
import { notContainsError } from "../utils/errors";

export function validateNotContains(input: string, node: NotContainsNode): boolean {
  if (node.substring.length === 0) {
    return true;
  }
  return !input.includes(node.substring);
}

export function explainNotContains(_input: string, node: NotContainsNode): string {
  return notContainsError(node.substring);
}
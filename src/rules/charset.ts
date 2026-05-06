import type { CharsetNode } from "../core/types";
import { matchesCharset } from "../utils/string";
import { charsetError } from "../utils/errors";

export function validateCharset(input: string, node: CharsetNode): boolean {
  return matchesCharset(input, node.pattern);
}

export function explainCharset(_input: string, node: CharsetNode): string {
  return charsetError(node.description);
}
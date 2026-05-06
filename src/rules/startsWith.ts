import type { StartsWithNode } from "../core/types";
import { startsWithError } from "../utils/errors";

export function validateStartsWith(input: string, node: StartsWithNode): boolean {
  return input.startsWith(node.prefix);
}

export function explainStartsWith(_input: string, node: StartsWithNode): string {
  return startsWithError(node.prefix);
}
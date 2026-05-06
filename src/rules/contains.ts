import type { ContainsNode } from "../core/types";
import { containsError } from "../utils/errors";

export function validateContains(input: string, node: ContainsNode): boolean {
  return input.includes(node.substring);
}

export function explainContains(_input: string, node: ContainsNode): string {
  return containsError(node.substring);
}
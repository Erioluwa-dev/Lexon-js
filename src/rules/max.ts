import type { MaxNode } from "../core/types";
import { maxError } from "../utils/errors";

export function validateMax(input: string, node: MaxNode): boolean {
  return input.length <= node.length;
}

export function explainMax(input: string, node: MaxNode): string {
  return maxError(input.length, node.length);
}
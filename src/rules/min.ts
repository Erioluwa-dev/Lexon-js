import type { MinNode } from "../core/types";
import { minError } from "../utils/errors";

export function validateMin(input: string, node: MinNode): boolean {
  return input.length >= node.length;
}

export function explainMin(input: string, node: MinNode): string {
  return minError(input.length, node.length);
}
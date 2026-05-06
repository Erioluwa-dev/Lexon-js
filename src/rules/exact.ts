import type { ExactNode } from "../core/types";
import { exactError } from "../utils/errors";

export function validateExact(input: string, node: ExactNode): boolean {
  return input.length === node.length;
}

export function explainExact(input: string, node: ExactNode): string {
  return exactError(input.length, node.length);
}
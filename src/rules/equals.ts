import type { EqualsNode } from "../core/types";
import { equalsError } from "../utils/errors";

export function validateEquals(input: string, node: EqualsNode): boolean {
  return input === node.value;
}

export function explainEquals(input: string, node: EqualsNode): string {
  return equalsError(input, node.value);
}
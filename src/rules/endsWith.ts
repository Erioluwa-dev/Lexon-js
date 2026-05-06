import type { EndsWithNode } from "../core/types";
import { endsWithError } from "../utils/errors";

export function validateEndsWith(input: string, node: EndsWithNode): boolean {
  return input.endsWith(node.suffix);
}

export function explainEndsWith(_input: string, node: EndsWithNode): string {
  return endsWithError(node.suffix);
}
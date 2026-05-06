import type { NoSpacesNode } from "../core/types";
import { hasSpaces } from "../utils/string";
import { spacesError } from "../utils/errors";

export function validateNoSpaces(input: string, node: NoSpacesNode): boolean {
  if (!node.strict) {
    return true;
  }
  return !hasSpaces(input);
}

export function explainNoSpaces(_input: string, _node: NoSpacesNode): string {
  return spacesError();
}
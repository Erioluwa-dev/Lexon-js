import type { RegexNode } from "../core/types";
import { regexError } from "../utils/errors";

export function validateRegex(input: string, node: RegexNode): boolean {
  try {
    const regex = new RegExp(node.pattern, node.flags);
    return regex.test(input);
  } catch {
    return false;
  }
}

export function explainRegex(_input: string, node: RegexNode): string {
  return regexError(node.pattern);
}
/**
 * Error utilities for Lexon validation.
 */

/**
 * Creates an error message for minimum length failures.
 */
export function minError(actual: number, expected: number): string {
  return `String length ${actual} is less than minimum ${expected}`;
}

/**
 * Creates an error message for maximum length failures.
 */
export function maxError(actual: number, expected: number): string {
  return `String length ${actual} exceeds maximum ${expected}`;
}

/**
 * Creates an error message for charset failures.
 */
export function charsetError(description: string): string {
  return `String contains characters outside ${description}`;
}

/**
 * Creates an error message for spaces failures.
 */
export function spacesError(): string {
  return "String contains spaces";
}
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

/**
 * Creates an error message for exact length failures.
 */
export function exactError(actual: number, expected: number): string {
  return `String length ${actual} does not equal exact length ${expected}`;
}

/**
 * Creates an error message for whitespace failures.
 */
export function whitespaceError(): string {
  return "String contains whitespace";
}

/**
 * Creates an error message for startsWith failures.
 */
export function startsWithError(prefix: string): string {
  return `String does not start with "${prefix}"`;
}

/**
 * Creates an error message for endsWith failures.
 */
export function endsWithError(suffix: string): string {
  return `String does not end with "${suffix}"`;
}

/**
 * Creates an error message for contains failures.
 */
export function containsError(substring: string): string {
  return `String does not contain "${substring}"`;
}

/**
 * Creates an error message for notContains failures.
 */
export function notContainsError(substring: string): string {
  return `String contains "${substring}"`;
}

/**
 * Creates an error message for equals failures.
 */
export function equalsError(actual: string, expected: string): string {
  return `String "${actual}" does not equal "${expected}"`;
}

/**
 * Creates an error message for regex failures.
 */
export function regexError(pattern: string): string {
  return `String does not match pattern "${pattern}"`;
}
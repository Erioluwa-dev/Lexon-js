export function matchesCharset(input: string, pattern: string): boolean {
  try {
    const regex = new RegExp(`^[${pattern}]*$`);
    return regex.test(input);
  } catch {
    return false;
  }
}

export function hasSpaces(input: string): boolean {
  return /\s/.test(input);
}

export function hasWhitespace(input: string): boolean {
  return /\s/.test(input);
}
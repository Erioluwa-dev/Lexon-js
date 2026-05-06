import { string } from "../src";

const MIN_MAX_REGEX = /^.{3,20}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const UUID_REGEX = /^[a-fA-F0-9-]{36}$/;

const minMaxSchema = string().min(3).max(20).compile();
const usernameSchema = string()
  .min(3)
  .max(20)
  .charset("a-zA-Z0-9_", "alphanumeric")
  .noSpaces()
  .compile();
const uuidSchema = string().charset("a-fA-F0-9-", "UUID").noSpaces().compile();

function measure<T>(fn: () => T, iterations: number): number {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  return end - start;
}

function runBenchmarks() {
  const iterations = 100_000;

  console.log(`Running ${iterations} iterations each:\n`);

  console.log("min/max (3-20 chars):");
  console.log(`  Regex: ${(measure(() => MIN_MAX_REGEX.test("hello"), iterations)).toFixed(2)}ms`);
  console.log(`  Lexon: ${(measure(() => minMaxSchema.validate("hello"), iterations)).toFixed(2)}ms`);

  console.log("\nusername pattern:");
  console.log(`  Regex: ${(measure(() => USERNAME_REGEX.test("john_doe"), iterations)).toFixed(2)}ms`);
  console.log(`  Lexon: ${(measure(() => usernameSchema.validate("john_doe"), iterations)).toFixed(2)}ms`);

  console.log("\nUUID pattern:");
  console.log(`  Regex: ${(measure(() => UUID_REGEX.test("550e8400-e29b-41d4-a716"), iterations)).toFixed(2)}ms`);
  console.log(`  Lexon: ${(measure(() => uuidSchema.validate("550e8400-e29b-41d4-a716"), iterations)).toFixed(2)}ms`);
}

runBenchmarks();
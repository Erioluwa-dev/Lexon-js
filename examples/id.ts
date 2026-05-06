import { string, explain } from "../src";

const idSchema = string()
  .min(1)
  .max(36)
  .charset("a-fA-F0-9-", "UUID format")
  .noSpaces()
  .compile();

console.log("Valid IDs:");
console.log("uuid:", idSchema.validate("550e8400-e29b-41d4-a716-446655440000"));
console.log("short:", idSchema.validate("abc123"));

console.log("\nInvalid IDs:");
console.log("space:", idSchema.validate("abc def"));
console.log("special:", idSchema.validate("abc@123"));

console.log("\nExplain failures:");
const result = explain("abc def", idSchema.ast);
console.log("space explain:", result.error?.message);
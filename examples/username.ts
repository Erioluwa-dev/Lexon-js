import { string, explain } from "../src";

const usernameSchema = string()
  .min(3)
  .max(20)
  .charset("a-zA-Z0-9_", "alphanumeric and underscore")
  .noSpaces()
  .compile();

console.log("Valid usernames:");
console.log("john_doe:", usernameSchema.validate("john_doe"));
console.log("user123:", usernameSchema.validate("user123"));
console.log("alice:", usernameSchema.validate("alice"));

console.log("\nInvalid usernames:");
console.log("ab:", usernameSchema.validate("ab"));
console.log("long...:", usernameSchema.validate("a".repeat(21)));
console.log("user@name:", usernameSchema.validate("user@name"));
console.log("hello world:", usernameSchema.validate("hello world"));

console.log("\nExplain failures:");
const result = explain("ab", usernameSchema.ast);
console.log("ab explain:", result.error?.message);
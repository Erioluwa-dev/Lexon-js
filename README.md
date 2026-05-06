# Lexon

Fast, TypeScript-first string schema engine for validation and pattern rules.

## Installation

```bash
npm install lexon
```

## Quick Start

```typescript
import { string, explain } from "lexon";

// Create a schema
const usernameSchema = string()
  .min(3)
  .max(20)
  .charset("a-zA-Z0-9_", "alphanumeric")
  .noSpaces()
  .compile();

// Validate
usernameSchema.validate("john_doe"); // true
usernameSchema.validate("ab"); // false

// Debug failures
const result = explain("ab", usernameSchema.ast);
console.log(result.error?.message); // "String length 2 is less than minimum 3"
```

## API

### `string()` - Create schema builder

Returns a `StringBuilder` for chaining validation rules.

### Rules

| Method | Description |
|--------|-------------|
| `min(length)` | Minimum string length |
| `max(length)` | Maximum string length |
| `charset(pattern, description)` | Character class restriction |
| `noSpaces(strict?)` | Disallow whitespace |
| `exact(length)` | Exact string length |
| `noWhitespace(strict?)` | Disallow any whitespace (tabs, newlines) |
| `startsWith(prefix)` | Must start with prefix |
| `endsWith(suffix)` | Must end with suffix |
| `contains(substring)` | Must contain substring |
| `notContains(substring)` | Must not contain substring |
| `equals(value)` | Must equal exact value |
| `regex(pattern, flags?)` | Match custom regex pattern |

### Methods

| Method | Returns |
|--------|---------|
| `compile()` | `{ validate: (input: string) => boolean, ast: StringAstNode[] }` |
| `getExplain()` | `(input: string) => ExplainResult` |

### `explain(input, ast)` - Debug validation

Returns detailed error information for validation failures.

## Documentation

- [API Reference](./docs/api.md)
- [Rules Reference](./docs/rules.md)
- [Compiler Architecture](./docs/compiler.md)
- [Testing Guide](./docs/testing.md)

## Development

```bash
# Build
npm run build

# Test
npm test

# Lint & Format
npm run lint
npm run format
```

## License

MIT
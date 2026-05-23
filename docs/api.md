# API Reference

## `string()`

Creates a new string schema builder.

```typescript
import { string } from "lexon";

const schema = string()
  .min(3)
  .max(20)
  .charset("a-zA-Z0-9_", "alphanumeric")
  .noSpaces()
  .compile();

// Example with all rules
const emailSchema = string()
  .min(5)
  .max(100)
  .contains("@")
  .notContains(" ")
  .noWhitespace()
  .compile();
```

---

### Methods

#### `min(length: number): this`

Sets minimum string length.

```typescript
string().min(5).compile().validate("hello"); // true
string().min(5).compile().validate("hi"); // false
```

#### `max(length: number): this`

Sets maximum string length.

```typescript
string().max(5).compile().validate("hello"); // true
string().max(5).compile().validate("helloworld"); // false
```

#### `charset(pattern: string, description: string): this`

Restricts characters to a regex character class pattern.

```typescript
string().charset("a-z", "lowercase").compile().validate("hello"); // true
string().charset("a-z", "lowercase").compile().validate("Hello"); // false
```

#### `noSpaces(strict?: boolean): this`

Disallows whitespace characters (space, tab, newline, etc.).

```typescript
string().noSpaces().compile().validate("helloworld"); // true
string().noSpaces().compile().validate("hello world"); // false
```

#### `exact(length: number): this`

Requires exact string length.

```typescript
string().exact(5).compile().validate("hello"); // true
string().exact(5).compile().validate("hi"); // false
```

#### `noWhitespace(strict?: boolean): this`

Disallows all whitespace characters (space, tab, newline, carriage return).

```typescript
string().noWhitespace().compile().validate("helloworld"); // true
string().noWhitespace().compile().validate("hello\tworld"); // false
```

#### `startsWith(prefix: string): this`

Requires string to start with prefix.

```typescript
string().startsWith("hello").compile().validate("hello world"); // true
string().startsWith("hello").compile().validate("world hello"); // false
```

#### `endsWith(suffix: string): this`

Requires string to end with suffix.

```typescript
string().endsWith("world").compile().validate("hello world"); // true
string().endsWith("world").compile().validate("world hello"); // false
```

#### `contains(substring: string): this`

Requires string to contain substring.

```typescript
string().contains("hello").compile().validate("hello world"); // true
string().contains("hello").compile().validate("world"); // false
```

#### `notContains(substring: string): this`

Requires string to **not** contain substring.

```typescript
string().notContains("hello").compile().validate("world"); // true
string().notContains("hello").compile().validate("hello world"); // false
```

#### `equals(value: string): this`

Requires string to equal exact value.

```typescript
string().equals("hello").compile().validate("hello"); // true
string().equals("hello").compile().validate("world"); // false
```

#### `regex(pattern: string, flags?: string): this`

Matches string against custom regex pattern (escape hatch).

```typescript
string().regex("^\\d+$").compile().validate("12345"); // true
string().regex("^\\d+$", "i").compile().validate("TEST"); // depends on pattern
```

---

### `compile(): CompiledSchema`

Compiles the schema into a validator function.

```typescript
const schema = string().min(3).compile();
schema.validate("hello"); // true
schema.validate("hi"); // false
```

Returns `{ validate: (input: string) => boolean, ast: StringAstNode[] }`.

### `getExplain(): (input: string) => ExplainResult`

Returns an explain function for the compiled schema.

```typescript
const explain = string().min(5).getExplain();
const result = explain("hi");
// { valid: false, error: { message: "String length 2 is less than minimum 5" }, input: "hi" }
```

### `explain(input: string, ast: StringAstNode[]): ExplainResult`

Standalone explain function for debugging validation failures.

```typescript
import { string, explain } from "lexon";

const schema = string().min(5).compile();
const result = explain("hi", schema.ast);
console.log(result.error?.message); // "String length 2 is less than minimum 5"
```

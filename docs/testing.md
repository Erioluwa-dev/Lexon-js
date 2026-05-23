# Testing Guide

## Test Categories

### Unit Tests (`tests/unit/`)

Test individual rule implementations in isolation.

```typescript
// tests/unit/min.test.ts
import { validateMin, explainMin } from "../../src/rules/min";

describe("min rule", () => {
  it("returns true when string meets minimum length", () => {
    const node = { type: "min" as const, length: 5 };
    expect(validateMin("hello", node)).toBe(true);
  });
});
```

### Integration Tests (`tests/integration/`)

Test the full builder → compiler → executor flow.

```typescript
// tests/integration/builder.test.ts
describe("string builder integration", () => {
  it("validates with min, max, charset, noSpaces", () => {
    const schema = string()
      .min(3)
      .max(20)
      .charset("a-zA-Z0-9_", "alphanumeric")
      .noSpaces()
      .compile();

    expect(schema.validate("john_doe")).toBe(true);
  });
});
```

### Edge Case Tests (`tests/edge/`)

Test boundary conditions and unusual inputs:

- Empty strings
- Unicode characters
- Very long strings
- Whitespace variations
- Duplicate rules

### Performance Tests (`tests/performance/`)

Benchmark validation speed against baseline regex.

```typescript
// tests/performance/regex-vs-lexon.ts
import { bench } from "vitest";

bench("lexon min/max", () => {
  schema.validate("hello");
});
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Run a specific test file
npx vitest tests/unit/min.test.ts
```

## Test Coverage

Aim for 100% coverage of:

- All rule validators
- All rule explainers
- Builder methods
- Compiler output
- Edge cases

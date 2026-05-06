# Lexon MVP

Lexon is a fast, TypeScript-first string schema engine for validation and pattern rules.

## Goals

* Replace common regex use cases with readable schemas.
* Compile once, run fast.
* Keep the API small, strict, and easy to test.

## Core API Flow

1. `lx.string()` creates a schema.
2. Chain rules like `min()`, `max()`, `charset()`, `noSpaces()`.
3. Call `.compile()` to generate the validator.
4. Use the compiled function at runtime.
5. Use `.explain()` for failure details.

## File Structure

```
lexon/
  src/
    core/
      ast.ts
      compiler.ts
      executor.ts
      types.ts
    rules/
      min.ts
      max.ts
      charset.ts
      noSpaces.ts
    utils/
      string.ts
      errors.ts
      guard.ts
    schema/
      string.ts
      builder.ts
    debug/
      explain.ts
    index.ts
  tests/
    unit/
    integration/
    edge/
    performance/
  docs/
    api.md
    rules.md
    compiler.md
    testing.md
  benchmarks/
    regex-vs-lexon.ts
  examples/
    username.ts
    id.ts
  scripts/
    build.ts
    test.ts
  package.json
  tsconfig.json
  eslint.config.js
  vitest.config.ts
  README.md
  MVP.md
```

## Standards

* TypeScript strict mode on.
* No `any` unless absolutely required and documented.
* Small modules with one job each.
* Pure functions where possible.
* No hidden side effects in rule execution.
* Public API must stay stable once published.

## Testing

* Unit tests for every rule.
* Integration tests for builder → compiler → executor flow.
* Edge-case tests for empty strings, long strings, unicode, spaces, duplicates, and invalid inputs.
* Benchmark tests for runtime cost.
* Regression tests for every bug fix.
* Aim for exhaustive coverage of all public behavior.

## Documentation

* Every public function must have TSDoc.
* Every folder needs a short README or doc entry.
* Every rule must include usage examples.
* Generated API docs should stay in sync with code.

## Language and Tooling

* Primary language: TypeScript.
* Tests: Vitest.
* Build: tsup or similar lightweight bundler.
* Linting: ESLint.
* Formatting: Prettier.

## Design Principles

* Compile once, execute fast.
* Validate early and fail early.
* Keep the DSL readable.
* Keep runtime overhead low.
* Prefer clarity over clever abstractions.
* Add features only when a real use case exists.

## MVP Scope

### Include

* String schema builder.
* `min`, `max`, `charset`, `noSpaces` rules.
* `.compile()`.
* `.explain()`.

### Exclude

* Object schemas.
* Async validation.
* Parsing pipelines.
* Plugin system.
* Complex regex replacement features.
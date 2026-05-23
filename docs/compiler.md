# Compiler Architecture

## Overview

Lexon compiles string schemas into efficient validator functions. The compilation process transforms a chain of rules into an optimized AST (Abstract Syntax Tree) that can be executed quickly at runtime.

## AST Nodes

Each validation rule produces an AST node:

```typescript
type AstNodeType = "min" | "max" | "charset" | "noSpaces";

interface AstNode<T extends AstNodeType> {
  type: T;
}

interface MinNode extends AstNode<"min"> {
  length: number;
}

interface MaxNode extends AstNode<"max"> {
  length: number;
}

interface CharsetNode extends AstNode<"charset"> {
  pattern: string;
  description: string;
}

interface NoSpacesNode extends AstNode<"noSpaces"> {
  strict: boolean;
}
```

## Compilation Flow

```
string()
  .min(3)
  .max(10)
  .compile()
  ↓
[ {type: "min", length: 3}, {type: "max", length: 10} ]
  ↓
{ validate: (input) => boolean, ast: [...] }
```

## Execution

The executor iterates through AST nodes and dispatches to rule-specific validators:

1. For each node in the AST, call the corresponding `validateX` function.
2. If any rule fails, stop and return `false`.
3. If all rules pass, return `true`.

```typescript
function execute(input: string, ast: StringAstNode[]): boolean {
  for (const node of ast) {
    if (!executeNode(input, node)) {
      return false;
    }
  }
  return true;
}
```

## Performance Characteristics

| Metric | Complexity |
|--------|------------|
| **Compile time** | O(*n*) where *n* is number of rules |
| **Runtime** | O(*n* × *m*) where *n* is number of rules, *m* is input length |
| **Memory** | O(*n*) — AST is stored once |

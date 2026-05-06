import type { StringAstNode, CompiledSchema, ExplainResult } from "../core/types";
import { minAst, maxAst, charsetAst, noSpacesAst } from "../core/ast";
import { compile, createExplain } from "../core/compiler";

interface SchemaBuilderState {
  ast: StringAstNode[];
}

export class StringBuilder {
  readonly #state: SchemaBuilderState;

  constructor() {
    this.#state = { ast: [] };
  }

  min(length: number): this {
    if (!Number.isInteger(length) || length < 0) {
      throw new TypeError(`min() requires a non-negative integer, got ${length}`);
    }
    this.#state.ast.push(minAst(length));
    return this;
  }

  max(length: number): this {
    if (!Number.isInteger(length) || length < 0) {
      throw new TypeError(`max() requires a non-negative integer, got ${length}`);
    }
    this.#state.ast.push(maxAst(length));
    return this;
  }

  charset(pattern: string, description: string): this {
    if (typeof pattern !== "string" || pattern.length === 0) {
      throw new TypeError(`charset() requires a non-empty pattern string`);
    }
    this.#state.ast.push(charsetAst(pattern, description));
    return this;
  }

  noSpaces(strict?: boolean): this {
    this.#state.ast.push(noSpacesAst(strict ?? true));
    return this;
  }

  compile(): CompiledSchema {
    return compile(this.#state.ast);
  }

  getExplain(): (input: string) => ExplainResult {
    return createExplain(this.#state.ast);
  }
}
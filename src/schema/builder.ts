import type { StringAstNode, CompiledSchema, ExplainResult } from "../core/types";
import {
  minAst,
  maxAst,
  charsetAst,
  noSpacesAst,
  exactAst,
  noWhitespaceAst,
  startsWithAst,
  endsWithAst,
  containsAst,
  notContainsAst,
  equalsAst,
  regexAst,
  refAst
} from "../core/ast";
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

  exact(length: number): this {
    if (!Number.isInteger(length) || length < 0) {
      throw new TypeError(`exact() requires a non-negative integer, got ${length}`);
    }
    this.#state.ast.push(exactAst(length));
    return this;
  }

  noWhitespace(strict?: boolean): this {
    this.#state.ast.push(noWhitespaceAst(strict ?? true));
    return this;
  }

  startsWith(prefix: string): this {
    if (typeof prefix !== "string") {
      throw new TypeError(`startsWith() requires a string, got ${typeof prefix}`);
    }
    this.#state.ast.push(startsWithAst(prefix));
    return this;
  }

  endsWith(suffix: string): this {
    if (typeof suffix !== "string") {
      throw new TypeError(`endsWith() requires a string, got ${typeof suffix}`);
    }
    this.#state.ast.push(endsWithAst(suffix));
    return this;
  }

  contains(substring: string): this {
    if (typeof substring !== "string") {
      throw new TypeError(`contains() requires a string, got ${typeof substring}`);
    }
    this.#state.ast.push(containsAst(substring));
    return this;
  }

  notContains(substring: string): this {
    if (typeof substring !== "string") {
      throw new TypeError(`notContains() requires a string, got ${typeof substring}`);
    }
    this.#state.ast.push(notContainsAst(substring));
    return this;
  }

  equals(value: string): this {
    if (typeof value !== "string") {
      throw new TypeError(`equals() requires a string, got ${typeof value}`);
    }
    this.#state.ast.push(equalsAst(value));
    return this;
  }

  regex(pattern: string, flags?: string): this {
    if (typeof pattern !== "string" || pattern.length === 0) {
      throw new TypeError(`regex() requires a non-empty pattern string`);
    }
    this.#state.ast.push(regexAst(pattern, flags));
    return this;
  }

  length(min: number, max: number): this {
    return this.min(min).max(max);
  }

  alphanumeric(): this {
    return this.charset("a-zA-Z0-9", "alphanumeric");
  }

  numeric(): this {
    return this.charset("0-9", "numeric");
  }

  ref(schema: CompiledSchema): this {
    this.#state.ast.push(refAst(schema.ast));
    return this;
  }

  compile(): CompiledSchema {
    return compile(this.#state.ast);
  }

  getExplain(): (input: string) => ExplainResult {
    return createExplain(this.#state.ast);
  }
}
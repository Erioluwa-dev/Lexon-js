/**
 * Core type definitions for Lexon string schema engine.
 */

/**
 * AST node types for string validation rules.
 */
export type AstNodeType =
  | "min"
  | "max"
  | "charset"
  | "noSpaces"
  | "exact"
  | "noWhitespace"
  | "startsWith"
  | "endsWith"
  | "contains"
  | "notContains"
  | "equals"
  | "regex"
  | "ref";

/**
 * Base AST node structure.
 */
export interface AstNode<T extends AstNodeType = AstNodeType> {
  /** The type of this AST node */
  readonly type: T;
}

/**
 * AST node for minimum length validation.
 */
export interface MinNode extends AstNode<"min"> {
  /** Minimum length value */
  readonly length: number;
}

/**
 * AST node for maximum length validation.
 */
export interface MaxNode extends AstNode<"max"> {
  /** Maximum length value */
  readonly length: number;
}

/**
 * AST node for character set validation.
 */
export interface CharsetNode extends AstNode<"charset"> {
  /** Regular expression pattern for allowed characters */
  readonly pattern: string;
  /** Description of the charset for explain() output */
  readonly description: string;
}

/**
 * AST node for no-spaces validation.
 */
export interface NoSpacesNode extends AstNode<"noSpaces"> {
  /** Whether to allow spaces (optionally configurable) */
  readonly strict: boolean;
}

/**
 * AST node for exact length validation.
 */
export interface ExactNode extends AstNode<"exact"> {
  /** Exact length required */
  readonly length: number;
}

/**
 * AST node for no-whitespace validation.
 */
export interface NoWhitespaceNode extends AstNode<"noWhitespace"> {
  /** Whether strict mode - if false, only spaces are checked */
  readonly strict: boolean;
}

/**
 * AST node for startsWith validation.
 */
export interface StartsWithNode extends AstNode<"startsWith"> {
  /** Required prefix */
  readonly prefix: string;
}

/**
 * AST node for endsWith validation.
 */
export interface EndsWithNode extends AstNode<"endsWith"> {
  /** Required suffix */
  readonly suffix: string;
}

/**
 * AST node for contains validation.
 */
export interface ContainsNode extends AstNode<"contains"> {
  /** Required substring */
  readonly substring: string;
}

/**
 * AST node for notContains validation.
 */
export interface NotContainsNode extends AstNode<"notContains"> {
  /** Forbidden substring */
  readonly substring: string;
}

/**
 * AST node for equals validation.
 */
export interface EqualsNode extends AstNode<"equals"> {
  /** Required exact value */
  readonly value: string;
}

/**
 * AST node for regex validation.
 */
export interface RegexNode extends AstNode<"regex"> {
  /** Regular expression pattern */
  readonly pattern: string;
  /** Regex flags */
  readonly flags?: string;
}

/**
 * Union type of all AST nodes.
 */
export type StringAstNode =
  | MinNode
  | MaxNode
  | CharsetNode
  | NoSpacesNode
  | ExactNode
  | NoWhitespaceNode
  | StartsWithNode
  | EndsWithNode
  | ContainsNode
  | NotContainsNode
  | EqualsNode
  | RegexNode
  | RefNode;

/**
 * Result of schema compilation.
 */
export interface CompiledSchema {
  /** The validator function */
  readonly validate: (input: string) => boolean;
  /** Parse input with typed result (success or detailed error) */
  readonly parse: (input: string) => SafeParseResult;
  /** The AST used for compilation */
  readonly ast: ReadonlyArray<StringAstNode>;
  /** Get an explain function bound to this schema */
  readonly getExplain: () => (input: string) => ExplainResult;
}

/**
 * Result of validation with explain() mode.
 */
export interface ValidationResult {
  /** Whether validation passed */
  readonly valid: boolean;
  /** Index of the failing rule (if any) */
  readonly failedAtIndex?: number;
  /** Error message from the first failing rule */
  readonly error?: string;
  /** Input that was validated */
  readonly input: string;
  /** All AST nodes (for detailed error info) */
  readonly ast: ReadonlyArray<StringAstNode>;
}

/**
 * Explanation of a validation failure.
 */
export interface ExplainResult {
  /** Whether validation passed */
  readonly valid: boolean;
  /** Error details */
  readonly error?: {
    /** Rule that failed */
    readonly rule: StringAstNode;
    /** Index of the failing rule */
    readonly index: number;
    /** Human-readable error message */
    readonly message: string;
  };
  /** Input that was validated */
  readonly input: string;
}

/**
 * AST node for schema reference (composition).
 */
export interface RefNode extends AstNode<"ref"> {
  /** The referenced schema's AST */
  readonly refAst: ReadonlyArray<StringAstNode>;
}

/**
 * Schema configuration options.
 */
export interface SchemaOptions {
  /** Enable detailed error messages */
  readonly explain?: boolean;
}

/**
 * Result of a parse() operation.
 * Returns either validated data or detailed error information.
 */
export type SafeParseResult =
  | { readonly success: true; readonly data: string }
  | { readonly success: false; readonly error: ExplainResult };
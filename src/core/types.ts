/**
 * Core type definitions for Lexon string schema engine.
 */

/**
 * AST node types for string validation rules.
 */
export type AstNodeType = "min" | "max" | "charset" | "noSpaces";

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
 * Union type of all AST nodes.
 */
export type StringAstNode = MinNode | MaxNode | CharsetNode | NoSpacesNode;

/**
 * Result of schema compilation.
 */
export interface CompiledSchema {
  /** The validator function */
  readonly validate: (input: string) => boolean;
  /** The AST used for compilation */
  readonly ast: ReadonlyArray<StringAstNode>;
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
 * Schema configuration options.
 */
export interface SchemaOptions {
  /** Enable detailed error messages */
  readonly explain?: boolean;
}
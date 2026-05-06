import type { ExplainResult, StringAstNode } from "../core/types";
import { explain as explainExecutor } from "../core/executor";

export function explain(input: string, ast: ReadonlyArray<StringAstNode>): ExplainResult {
  return explainExecutor(input, ast);
}
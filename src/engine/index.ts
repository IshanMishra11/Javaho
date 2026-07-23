import { BhojpuriLexer } from "./lexer";
import { BhojpuriParser } from "./parser";
import { BhojpuriInterpreter } from "./interpreter";
import { Token } from "./tokens";
import { ProgramNode } from "./ast";

export interface ExecutionResult {
  success: boolean;
  output: string;
  errors: string[];
  tokens: Token[];
  ast: ProgramNode | null;
  environment?: Record<string, any>;
  executionTimeMs?: number;
}

export function runBhojpuriCode(code: string): ExecutionResult {
  const startTime = performance.now();
  let tokens: Token[] = [];
  let ast: ProgramNode | null = null;

  try {
    // 1. Lexical Analysis
    const lexer = new BhojpuriLexer(code);
    tokens = lexer.tokenize();

    // 2. Syntax Analysis
    const parser = new BhojpuriParser(tokens);
    ast = parser.parse();

    // 3. Interpretation
    const interpreter = new BhojpuriInterpreter();
    const result = interpreter.execute(ast);

    const endTime = performance.now();

    return {
      success: true,
      output: result.output,
      errors: [],
      tokens,
      ast,
      environment: result.environment,
      executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      success: false,
      output: "",
      errors: [err.message || "An unexpected error occurred during execution"],
      tokens,
      ast,
      executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
    };
  }
}

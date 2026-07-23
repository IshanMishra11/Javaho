import { Token } from "../engine/tokens";
import { ProgramNode } from "../engine/ast";

export interface SampleProgram {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
}

export interface ExecutionResponse {
  success: boolean;
  output: string;
  errors: string[];
  tokens?: Token[];
  ast?: ProgramNode | null;
  environment?: Record<string, any>;
  executionTimeMs?: number;
}

export type ActiveTab = "output" | "errors" | "tokens" | "ast" | "environment";

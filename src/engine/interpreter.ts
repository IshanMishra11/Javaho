import {
  ProgramNode,
  StatementNode,
  ExpressionNode,
  VariableDeclarationNode,
  AssignmentNode,
  PrintStatementNode,
  IfStatementNode,
  WhileStatementNode,
  BinaryExpressionNode,
  LiteralExpressionNode,
  VariableExpressionNode,
} from "./ast";

export class Environment {
  private values: Map<string, any> = new Map();

  public define(name: string, value: any): void {
    this.values.set(name, value);
  }

  public assign(name: string, value: any, line: number): void {
    if (this.values.has(name)) {
      this.values.set(name, value);
      return;
    }
    throw new Error(`Runtime Error at line ${line}: Unknown variable '${name}'`);
  }

  public get(name: string, line: number): any {
    if (this.values.has(name)) {
      return this.values.get(name);
    }
    throw new Error(`Runtime Error at line ${line}: Unknown variable '${name}'`);
  }

  public getAll(): Record<string, any> {
    const obj: Record<string, any> = {};
    this.values.forEach((val, key) => {
      obj[key] = val;
    });
    return obj;
  }
}

export class BhojpuriInterpreter {
  private environment: Environment = new Environment();
  private outputLogs: string[] = [];

  public execute(program: ProgramNode): { output: string; logs: string[]; environment: Record<string, any> } {
    this.outputLogs = [];
    this.environment = new Environment();

    for (const stmt of program.statements) {
      this.executeStatement(stmt);
    }

    return {
      output: this.outputLogs.join("\n"),
      logs: this.outputLogs,
      environment: this.environment.getAll(),
    };
  }

  private executeStatement(stmt: StatementNode): void {
    switch (stmt.kind) {
      case "VariableDeclaration": {
        const decl = stmt as VariableDeclarationNode;
        const val = this.evaluate(decl.initializer);
        this.environment.define(decl.identifier, val);
        break;
      }

      case "Assignment": {
        const assign = stmt as AssignmentNode;
        const val = this.evaluate(assign.value);
        this.environment.assign(assign.identifier, val, assign.line);
        break;
      }

      case "PrintStatement": {
        const printStmt = stmt as PrintStatementNode;
        const val = this.evaluate(printStmt.expression);
        this.outputLogs.push(this.stringify(val));
        break;
      }

      case "IfStatement": {
        const ifStmt = stmt as IfStatementNode;
        const cond = this.evaluate(ifStmt.condition);
        if (this.isTruthy(cond)) {
          for (const s of ifStmt.thenBranch) {
            this.executeStatement(s);
          }
        } else {
          for (const s of ifStmt.elseBranch) {
            this.executeStatement(s);
          }
        }
        break;
      }

      case "WhileStatement": {
        const whileStmt = stmt as WhileStatementNode;
        let iterations = 0;
        const MAX_ITERATIONS = 100000;

        while (this.isTruthy(this.evaluate(whileStmt.condition))) {
          iterations++;
          if (iterations > MAX_ITERATIONS) {
            throw new Error(`Runtime Error at line ${whileStmt.line}: Infinite loop detected (exceeded 100,000 iterations)`);
          }
          for (const s of whileStmt.body) {
            this.executeStatement(s);
          }
        }
        break;
      }

      default:
        throw new Error(`Runtime Error at line ${stmt.line}: Unknown statement type '${(stmt as any).kind}'`);
    }
  }

  private evaluate(expr: ExpressionNode): any {
    switch (expr.kind) {
      case "LiteralExpression":
        return (expr as LiteralExpressionNode).value;

      case "VariableExpression": {
        const varExpr = expr as VariableExpressionNode;
        return this.environment.get(varExpr.name, varExpr.line);
      }

      case "BinaryExpression": {
        const bin = expr as BinaryExpressionNode;
        const left = this.evaluate(bin.left);
        const right = this.evaluate(bin.right);
        const op = bin.operator;
        const line = bin.line;

        switch (op) {
          case "+":
            if (typeof left === "string" || typeof right === "string") {
              return this.stringify(left) + this.stringify(right);
            }
            if (typeof left === "number" && typeof right === "number") {
              return left + right;
            }
            throw new Error(`Runtime Error at line ${line}: Operands for '+' must be numbers or strings`);

          case "-":
            this.checkNumberOperands(op, left, right, line);
            return left - right;

          case "*":
            this.checkNumberOperands(op, left, right, line);
            return left * right;

          case "/":
            this.checkNumberOperands(op, left, right, line);
            if (right === 0) {
              throw new Error(`Runtime Error at line ${line}: Division by zero`);
            }
            return Math.floor(left / right);

          case "%":
            this.checkNumberOperands(op, left, right, line);
            if (right === 0) {
              throw new Error(`Runtime Error at line ${line}: Modulo by zero`);
            }
            return left % right;

          case "<":
            this.checkNumberOperands(op, left, right, line);
            return left < right;

          case "<=":
            this.checkNumberOperands(op, left, right, line);
            return left <= right;

          case ">":
            this.checkNumberOperands(op, left, right, line);
            return left > right;

          case ">=":
            this.checkNumberOperands(op, left, right, line);
            return left >= right;

          case "==":
            return left === right;

          case "!=":
            return left !== right;
        }
      }
    }

    throw new Error(`Runtime Error at line ${expr.line}: Cannot evaluate expression`);
  }

  private checkNumberOperands(op: string, left: any, right: any, line: number): void {
    if (typeof left === "number" && typeof right === "number") return;
    throw new Error(`Runtime Error at line ${line}: Operands for '${op}' must be numbers`);
  }

  private isTruthy(val: any): boolean {
    if (val === null || val === undefined) return false;
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val !== 0;
    return Boolean(val);
  }

  private stringify(val: any): string {
    if (val === null || val === undefined) return "null";
    if (typeof val === "boolean") {
      return val ? "sahi" : "galat";
    }
    return String(val);
  }
}

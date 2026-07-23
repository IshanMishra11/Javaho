import { Token, TokenType } from "./tokens";
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

export class BhojpuriParser {
  private tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public parse(): ProgramNode {
    const statements: StatementNode[] = [];
    const line = this.peek().line;

    while (!this.isAtEnd()) {
      statements.push(this.parseStatement());
    }

    return {
      kind: "Program",
      line,
      statements,
    };
  }

  private parseStatement(): StatementNode {
    const token = this.peek();

    if (this.match(TokenType.RAKH)) {
      return this.parseVariableDeclaration();
    } else if (this.match(TokenType.DIKHA)) {
      return this.parsePrintStatement();
    } else if (this.match(TokenType.AGAR)) {
      return this.parseIfStatement();
    } else if (this.match(TokenType.JABTAK)) {
      return this.parseWhileStatement();
    } else if (this.check(TokenType.IDENTIFIER) && this.checkNext(TokenType.ASSIGN)) {
      return this.parseAssignment();
    } else {
      throw new Error(`Syntax Error at line ${token.line}: Unexpected token '${token.value}'`);
    }
  }

  private parseVariableDeclaration(): VariableDeclarationNode {
    const line = this.previous().line;
    const nameToken = this.consume(TokenType.IDENTIFIER, `Syntax Error at line ${line}: Expected variable name after 'rakh'`);
    this.consume(TokenType.ASSIGN, `Syntax Error at line ${nameToken.line}: Expected '=' after variable name in declaration`);
    const initializer = this.parseExpression();

    return {
      kind: "VariableDeclaration",
      line,
      identifier: nameToken.value,
      initializer,
    };
  }

  private parseAssignment(): AssignmentNode {
    const nameToken = this.advance(); // IDENTIFIER
    const line = nameToken.line;
    this.consume(TokenType.ASSIGN, `Syntax Error at line ${line}: Expected '=' after variable name`);
    const value = this.parseExpression();

    return {
      kind: "Assignment",
      line,
      identifier: nameToken.value,
      value,
    };
  }

  private parsePrintStatement(): PrintStatementNode {
    const line = this.previous().line;
    const expression = this.parseExpression();

    return {
      kind: "PrintStatement",
      line,
      expression,
    };
  }

  private parseIfStatement(): IfStatementNode {
    const line = this.previous().line;
    const condition = this.parseExpression();

    const thenBranch: StatementNode[] = [];
    const elseBranch: StatementNode[] = [];

    while (!this.check(TokenType.NAHIN) && !this.check(TokenType.KHATAM) && !this.isAtEnd()) {
      thenBranch.push(this.parseStatement());
    }

    if (this.match(TokenType.NAHIN)) {
      while (!this.check(TokenType.KHATAM) && !this.isAtEnd()) {
        elseBranch.push(this.parseStatement());
      }
    }

    if (!this.match(TokenType.KHATAM)) {
      throw new Error(`Syntax Error at line ${this.peek().line}: Missing 'khatam' to close 'agar' block`);
    }

    return {
      kind: "IfStatement",
      line,
      condition,
      thenBranch,
      elseBranch,
    };
  }

  private parseWhileStatement(): WhileStatementNode {
    const line = this.previous().line;
    const condition = this.parseExpression();

    const body: StatementNode[] = [];

    while (!this.check(TokenType.KHATAM) && !this.isAtEnd()) {
      body.push(this.parseStatement());
    }

    if (!this.match(TokenType.KHATAM)) {
      throw new Error(`Syntax Error at line ${this.peek().line}: Missing 'khatam' to close 'jabtak' block`);
    }

    return {
      kind: "WhileStatement",
      line,
      condition,
      body,
    };
  }

  private parseExpression(): ExpressionNode {
    return this.parseComparison();
  }

  private parseComparison(): ExpressionNode {
    let left = this.parseTerm();

    while (this.match(TokenType.LESS, TokenType.LESS_EQUAL, TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.EQUAL, TokenType.NOT_EQUAL)) {
      const opToken = this.previous();
      const right = this.parseTerm();
      left = {
        kind: "BinaryExpression",
        line: opToken.line,
        left,
        operator: opToken.value,
        right,
      } as BinaryExpressionNode;
    }

    return left;
  }

  private parseTerm(): ExpressionNode {
    let left = this.parseFactor();

    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const opToken = this.previous();
      const right = this.parseFactor();
      left = {
        kind: "BinaryExpression",
        line: opToken.line,
        left,
        operator: opToken.value,
        right,
      } as BinaryExpressionNode;
    }

    return left;
  }

  private parseFactor(): ExpressionNode {
    let left = this.parsePrimary();

    while (this.match(TokenType.MULTIPLY, TokenType.DIVIDE, TokenType.MODULO)) {
      const opToken = this.previous();
      const right = this.parsePrimary();
      left = {
        kind: "BinaryExpression",
        line: opToken.line,
        left,
        operator: opToken.value,
        right,
      } as BinaryExpressionNode;
    }

    return left;
  }

  private parsePrimary(): ExpressionNode {
    if (this.match(TokenType.INTEGER)) {
      return {
        kind: "LiteralExpression",
        line: this.previous().line,
        value: parseInt(this.previous().value, 10),
      } as LiteralExpressionNode;
    }
    if (this.match(TokenType.STRING)) {
      return {
        kind: "LiteralExpression",
        line: this.previous().line,
        value: this.previous().value,
      } as LiteralExpressionNode;
    }
    if (this.match(TokenType.SAHI)) {
      return {
        kind: "LiteralExpression",
        line: this.previous().line,
        value: true,
      } as LiteralExpressionNode;
    }
    if (this.match(TokenType.GALAT)) {
      return {
        kind: "LiteralExpression",
        line: this.previous().line,
        value: false,
      } as LiteralExpressionNode;
    }
    if (this.match(TokenType.IDENTIFIER)) {
      return {
        kind: "VariableExpression",
        line: this.previous().line,
        name: this.previous().value,
      } as VariableExpressionNode;
    }

    throw new Error(`Syntax Error at line ${this.peek().line}: Unexpected token '${this.peek().value}'`);
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private checkNext(type: TokenType): boolean {
    if (this.current + 1 >= this.tokens.length) return false;
    return this.tokens[this.current + 1].type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw new Error(message);
  }
}

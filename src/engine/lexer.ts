import { Token, TokenType } from "./tokens";

const KEYWORDS: Record<string, TokenType> = {
  rakh: TokenType.RAKH,
  dikha: TokenType.DIKHA,
  agar: TokenType.AGAR,
  nahin: TokenType.NAHIN,
  jabtak: TokenType.JABTAK,
  khatam: TokenType.KHATAM,
  sahi: TokenType.SAHI,
  galat: TokenType.GALAT,
};

export class BhojpuriLexer {
  private source: string;
  private position: number = 0;
  private line: number = 1;

  constructor(source: string) {
    this.source = source || "";
  }

  public tokenize(): Token[] {
    const tokens: Token[] = [];

    while (this.position < this.source.length) {
      const current = this.peek();

      if (current === "\n") {
        this.line++;
        this.position++;
      } else if (/\s/.test(current)) {
        this.position++;
      } else if (current === "#") {
        // Skip comment until end of line
        while (this.position < this.source.length && this.peek() !== "\n") {
          this.position++;
        }
      } else if (/\d/.test(current)) {
        tokens.push(this.readNumber());
      } else if (/[a-zA-Z_]/.test(current)) {
        tokens.push(this.readIdentifierOrKeyword());
      } else if (current === '"') {
        tokens.push(this.readString());
      } else {
        switch (current) {
          case "+":
            tokens.push({ type: TokenType.PLUS, value: "+", line: this.line });
            this.position++;
            break;
          case "-":
            tokens.push({ type: TokenType.MINUS, value: "-", line: this.line });
            this.position++;
            break;
          case "*":
            tokens.push({ type: TokenType.MULTIPLY, value: "*", line: this.line });
            this.position++;
            break;
          case "/":
            tokens.push({ type: TokenType.DIVIDE, value: "/", line: this.line });
            this.position++;
            break;
          case "%":
            tokens.push({ type: TokenType.MODULO, value: "%", line: this.line });
            this.position++;
            break;
          case "=":
            this.position++;
            if (this.peek() === "=") {
              this.position++;
              tokens.push({ type: TokenType.EQUAL, value: "==", line: this.line });
            } else {
              tokens.push({ type: TokenType.ASSIGN, value: "=", line: this.line });
            }
            break;
          case "!":
            this.position++;
            if (this.peek() === "=") {
              this.position++;
              tokens.push({ type: TokenType.NOT_EQUAL, value: "!=", line: this.line });
            } else {
              throw new Error(`Syntax Error at line ${this.line}: Unexpected character '!'`);
            }
            break;
          case "<":
            this.position++;
            if (this.peek() === "=") {
              this.position++;
              tokens.push({ type: TokenType.LESS_EQUAL, value: "<=", line: this.line });
            } else {
              tokens.push({ type: TokenType.LESS, value: "<", line: this.line });
            }
            break;
          case ">":
            this.position++;
            if (this.peek() === "=") {
              this.position++;
              tokens.push({ type: TokenType.GREATER_EQUAL, value: ">=", line: this.line });
            } else {
              tokens.push({ type: TokenType.GREATER, value: ">", line: this.line });
            }
            break;
          default:
            throw new Error(`Syntax Error at line ${this.line}: Unexpected character '${current}'`);
        }
      }
    }

    tokens.push({ type: TokenType.EOF, value: "", line: this.line });
    return tokens;
  }

  private peek(): string {
    if (this.position >= this.source.length) return "\0";
    return this.source[this.position];
  }

  private readNumber(): Token {
    let startLine = this.line;
    let numStr = "";
    while (this.position < this.source.length && /\d/.test(this.peek())) {
      numStr += this.source[this.position];
      this.position++;
    }
    return { type: TokenType.INTEGER, value: numStr, line: startLine };
  }

  private readIdentifierOrKeyword(): Token {
    let startLine = this.line;
    let text = "";
    while (this.position < this.source.length && /[a-zA-Z0-9_]/.test(this.peek())) {
      text += this.source[this.position];
      this.position++;
    }
    const type = KEYWORDS[text] || TokenType.IDENTIFIER;
    return { type, value: text, line: startLine };
  }

  private readString(): Token {
    let startLine = this.line;
    this.position++; // skip opening "
    let strVal = "";

    while (this.position < this.source.length && this.peek() !== '"') {
      if (this.peek() === "\n") {
        this.line++;
      }
      strVal += this.source[this.position];
      this.position++;
    }

    if (this.position >= this.source.length) {
      throw new Error(`Syntax Error at line ${startLine}: Unterminated string literal`);
    }

    this.position++; // skip closing "
    return { type: TokenType.STRING, value: strVal, line: startLine };
  }
}

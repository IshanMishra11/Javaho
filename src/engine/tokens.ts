export enum TokenType {
  RAKH = "RAKH",
  DIKHA = "DIKHA",
  AGAR = "AGAR",
  NAHIN = "NAHIN",
  JABTAK = "JABTAK",
  KHATAM = "KHATAM",
  SAHI = "SAHI",
  GALAT = "GALAT",

  IDENTIFIER = "IDENTIFIER",
  INTEGER = "INTEGER",
  STRING = "STRING",

  PLUS = "PLUS",
  MINUS = "MINUS",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  MODULO = "MODULO",
  ASSIGN = "ASSIGN",
  EQUAL = "EQUAL",
  NOT_EQUAL = "NOT_EQUAL",
  LESS = "LESS",
  GREATER = "GREATER",
  LESS_EQUAL = "LESS_EQUAL",
  GREATER_EQUAL = "GREATER_EQUAL",

  EOF = "EOF"
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
}

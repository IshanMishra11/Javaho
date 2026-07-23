package com.bhojpurilang.model;

public enum TokenType {
    // Keywords
    RAKH,       // rakh (variable declaration)
    DIKHA,      // dikha (print)
    AGAR,       // agar (if)
    NAHIN,      // nahin (else)
    JABTAK,     // jabtak (while)
    KHATAM,     // khatam (end block)
    SAHI,       // sahi (true)
    GALAT,      // galat (false)

    // Literals & Identifiers
    IDENTIFIER,
    INTEGER,
    STRING,

    // Operators
    PLUS,       // +
    MINUS,      // -
    MULTIPLY,   // *
    DIVIDE,     // /
    MODULO,     // %
    ASSIGN,     // =
    EQUAL,      // ==
    NOT_EQUAL,  // !=
    LESS,       // <
    GREATER,    // >
    LESS_EQUAL, // <=
    GREATER_EQUAL, // >=

    // Special
    EOF
}

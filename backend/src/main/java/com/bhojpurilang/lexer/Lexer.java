package com.bhojpurilang.lexer;

import com.bhojpurilang.model.Token;
import com.bhojpurilang.model.TokenType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Lexer {
    private final String source;
    private int position = 0;
    private int line = 1;
    private static final Map<String, TokenType> KEYWORDS = new HashMap<>();

    static {
        KEYWORDS.put("rakh", TokenType.RAKH);
        KEYWORDS.put("dikha", TokenType.DIKHA);
        KEYWORDS.put("agar", TokenType.AGAR);
        KEYWORDS.put("nahin", TokenType.NAHIN);
        KEYWORDS.put("jabtak", TokenType.JABTAK);
        KEYWORDS.put("khatam", TokenType.KHATAM);
        KEYWORDS.put("sahi", TokenType.SAHI);
        KEYWORDS.put("galat", TokenType.GALAT);
    }

    public Lexer(String source) {
        this.source = source != null ? source : "";
    }

    public List<Token> tokenize() throws RuntimeException {
        List<Token> tokens = new ArrayList<>();

        while (position < source.length()) {
            char current = peek();

            if (current == '\n') {
                line++;
                position++;
            } else if (Character.isWhitespace(current)) {
                position++;
            } else if (current == '#') {
                // Ignore comment line
                while (position < source.length() && peek() != '\n') {
                    position++;
                }
            } else if (Character.isDigit(current)) {
                tokens.add(readNumber());
            } else if (Character.isLetter(current) || current == '_') {
                tokens.add(readIdentifierOrKeyword());
            } else if (current == '"') {
                tokens.add(readString());
            } else {
                switch (current) {
                    case '+':
                        tokens.add(new Token(TokenType.PLUS, "+", line));
                        position++;
                        break;
                    case '-':
                        tokens.add(new Token(TokenType.MINUS, "-", line));
                        position++;
                        break;
                    case '*':
                        tokens.add(new Token(TokenType.MULTIPLY, "*", line));
                        position++;
                        break;
                    case '/':
                        tokens.add(new Token(TokenType.DIVIDE, "/", line));
                        position++;
                        break;
                    case '%':
                        tokens.add(new Token(TokenType.MODULO, "%", line));
                        position++;
                        break;
                    case '=':
                        position++;
                        if (peek() == '=') {
                            position++;
                            tokens.add(new Token(TokenType.EQUAL, "==", line));
                        } else {
                            tokens.add(new Token(TokenType.ASSIGN, "=", line));
                        }
                        break;
                    case '!':
                        position++;
                        if (peek() == '=') {
                            position++;
                            tokens.add(new Token(TokenType.NOT_EQUAL, "!=", line));
                        } else {
                            throw new RuntimeException("Syntax Error at line " + line + ": Unexpected character '!'");
                        }
                        break;
                    case '<':
                        position++;
                        if (peek() == '=') {
                            position++;
                            tokens.add(new Token(TokenType.LESS_EQUAL, "<=", line));
                        } else {
                            tokens.add(new Token(TokenType.LESS, "<", line));
                        }
                        break;
                    case '>':
                        position++;
                        if (peek() == '=') {
                            position++;
                            tokens.add(new Token(TokenType.GREATER_EQUAL, ">=", line));
                        } else {
                            tokens.add(new Token(TokenType.GREATER, ">", line));
                        }
                        break;
                    default:
                        throw new RuntimeException("Syntax Error at line " + line + ": Unexpected character '" + current + "'");
                }
            }
        }

        tokens.add(new Token(TokenType.EOF, "", line));
        return tokens;
    }

    private char peek() {
        if (position >= source.length()) return '\0';
        return source.charAt(position);
    }

    private Token readNumber() {
        StringBuilder sb = new StringBuilder();
        int startLine = line;
        while (position < source.length() && Character.isDigit(peek())) {
            sb.append(source.charAt(position));
            position++;
        }
        return new Token(TokenType.INTEGER, sb.toString(), startLine);
    }

    private Token readIdentifierOrKeyword() {
        StringBuilder sb = new StringBuilder();
        int startLine = line;
        while (position < source.length() && (Character.isLetterOrDigit(peek()) || peek() == '_')) {
            sb.append(source.charAt(position));
            position++;
        }
        String text = sb.toString();
        TokenType type = KEYWORDS.getOrDefault(text, TokenType.IDENTIFIER);
        return new Token(type, text, startLine);
    }

    private Token readString() {
        int startLine = line;
        position++; // Skip opening "
        StringBuilder sb = new StringBuilder();

        while (position < source.length() && peek() != '"') {
            if (peek() == '\n') {
                line++;
            }
            sb.append(source.charAt(position));
            position++;
        }

        if (position >= source.length()) {
            throw new RuntimeException("Syntax Error at line " + startLine + ": Unterminated string literal");
        }

        position++; // Skip closing "
        return new Token(TokenType.STRING, sb.toString(), startLine);
    }
}

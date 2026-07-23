package com.bhojpurilang.parser;

import com.bhojpurilang.ast.*;
import com.bhojpurilang.model.Token;
import com.bhojpurilang.model.TokenType;

import java.util.ArrayList;
import java.util.List;

public class Parser {
    private final List<Token> tokens;
    private int current = 0;

    public Parser(List<Token> tokens) {
        this.tokens = tokens;
    }

    public Program parse() {
        List<Statement> statements = new ArrayList<>();
        int line = peek().getLine();

        while (!isAtEnd()) {
            statements.add(parseStatement());
        }

        return new Program(statements, line);
    }

    private Statement parseStatement() {
        Token token = peek();

        if (match(TokenType.RAKH)) {
            return parseVariableDeclaration();
        } else if (match(TokenType.DIKHA)) {
            return parsePrintStatement();
        } else if (match(TokenType.AGAR)) {
            return parseIfStatement();
        } else if (match(TokenType.JABTAK)) {
            return parseWhileStatement();
        } else if (check(TokenType.IDENTIFIER) && checkNext(TokenType.ASSIGN)) {
            return parseAssignment();
        } else {
            throw new RuntimeException("Syntax Error at line " + token.getLine() + ": Unexpected token '" + token.getValue() + "'");
        }
    }

    private VariableDeclaration parseVariableDeclaration() {
        int line = previous().getLine();
        Token nameToken = consume(TokenType.IDENTIFIER, "Syntax Error at line " + line + ": Expected variable name after 'rakh'");
        consume(TokenType.ASSIGN, "Syntax Error at line " + nameToken.getLine() + ": Expected '=' after variable name in declaration");
        Expression initializer = parseExpression();
        return new VariableDeclaration(nameToken.getValue(), initializer, line);
    }

    private Assignment parseAssignment() {
        Token nameToken = advance(); // IDENTIFIER
        int line = nameToken.getLine();
        consume(TokenType.ASSIGN, "Syntax Error at line " + line + ": Expected '=' after variable name");
        Expression value = parseExpression();
        return new Assignment(nameToken.getValue(), value, line);
    }

    private PrintStatement parsePrintStatement() {
        int line = previous().getLine();
        Expression expr = parseExpression();
        return new PrintStatement(expr, line);
    }

    private IfStatement parseIfStatement() {
        int line = previous().getLine();
        Expression condition = parseExpression();

        List<Statement> thenBranch = new ArrayList<>();
        List<Statement> elseBranch = new ArrayList<>();

        while (!check(TokenType.NAHIN) && !check(TokenType.KHATAM) && !isAtEnd()) {
            thenBranch.add(parseStatement());
        }

        if (match(TokenType.NAHIN)) {
            while (!check(TokenType.KHATAM) && !isAtEnd()) {
                elseBranch.add(parseStatement());
            }
        }

        if (!match(TokenType.KHATAM)) {
            throw new RuntimeException("Syntax Error at line " + peek().getLine() + ": Missing 'khatam' to close 'agar' block");
        }

        return new IfStatement(condition, thenBranch, elseBranch, line);
    }

    private WhileStatement parseWhileStatement() {
        int line = previous().getLine();
        Expression condition = parseExpression();

        List<Statement> body = new ArrayList<>();

        while (!check(TokenType.KHATAM) && !isAtEnd()) {
            body.add(parseStatement());
        }

        if (!match(TokenType.KHATAM)) {
            throw new RuntimeException("Syntax Error at line " + peek().getLine() + ": Missing 'khatam' to close 'jabtak' block");
        }

        return new WhileStatement(condition, body, line);
    }

    private Expression parseExpression() {
        return parseComparison();
    }

    private Expression parseComparison() {
        Expression left = parseTerm();

        while (match(TokenType.LESS, TokenType.LESS_EQUAL, TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.EQUAL, TokenType.NOT_EQUAL)) {
            Token opToken = previous();
            Expression right = parseTerm();
            left = new BinaryExpression(left, opToken.getValue(), right, opToken.getLine());
        }

        return left;
    }

    private Expression parseTerm() {
        Expression left = parseFactor();

        while (match(TokenType.PLUS, TokenType.MINUS)) {
            Token opToken = previous();
            Expression right = parseFactor();
            left = new BinaryExpression(left, opToken.getValue(), right, opToken.getLine());
        }

        return left;
    }

    private Expression parseFactor() {
        Expression left = parsePrimary();

        while (match(TokenType.MULTIPLY, TokenType.DIVIDE, TokenType.MODULO)) {
            Token opToken = previous();
            Expression right = parsePrimary();
            left = new BinaryExpression(left, opToken.getValue(), right, opToken.getLine());
        }

        return left;
    }

    private Expression parsePrimary() {
        if (match(TokenType.INTEGER)) {
            return new LiteralExpression(Long.parseLong(previous().getValue()), previous().getLine());
        }
        if (match(TokenType.STRING)) {
            return new LiteralExpression(previous().getValue(), previous().getLine());
        }
        if (match(TokenType.SAHI)) {
            return new LiteralExpression(true, previous().getLine());
        }
        if (match(TokenType.GALAT)) {
            return new LiteralExpression(false, previous().getLine());
        }
        if (match(TokenType.IDENTIFIER)) {
            return new VariableExpression(previous().getValue(), previous().getLine());
        }

        throw new RuntimeException("Syntax Error at line " + peek().getLine() + ": Unexpected token '" + peek().getValue() + "'");
    }

    private boolean match(TokenType... types) {
        for (TokenType type : types) {
            if (check(type)) {
                advance();
                return true;
            }
        }
        return false;
    }

    private boolean check(TokenType type) {
        if (isAtEnd()) return false;
        return peek().getType() == type;
    }

    private boolean checkNext(TokenType type) {
        if (current + 1 >= tokens.size()) return false;
        return tokens.get(current + 1).getType() == type;
    }

    private Token advance() {
        if (!isAtEnd()) current++;
        return previous();
    }

    private boolean isAtEnd() {
        return peek().getType() == TokenType.EOF;
    }

    private Token peek() {
        return tokens.get(current);
    }

    private Token previous() {
        return tokens.get(current - 1);
    }

    private Token consume(TokenType type, String message) {
        if (check(type)) return advance();
        throw new RuntimeException(message);
    }
}

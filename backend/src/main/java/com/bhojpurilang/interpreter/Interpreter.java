package com.bhojpurilang.interpreter;

import com.bhojpurilang.ast.*;

import java.util.List;

public class Interpreter {
    private final Environment environment = new Environment();
    private final StringBuilder output = new StringBuilder();

    public String execute(Program program) {
        for (Statement stmt : program.getStatements()) {
            executeStatement(stmt);
        }
        return output.toString();
    }

    private void executeStatement(Statement stmt) {
        if (stmt instanceof VariableDeclaration) {
            VariableDeclaration varDecl = (VariableDeclaration) stmt;
            Object val = evaluate(varDecl.getInitializer());
            environment.define(varDecl.getIdentifier(), val);
        } else if (stmt instanceof Assignment) {
            Assignment assign = (Assignment) stmt;
            Object val = evaluate(assign.getValue());
            environment.assign(assign.getIdentifier(), val, assign.getLine());
        } else if (stmt instanceof PrintStatement) {
            PrintStatement printStmt = (PrintStatement) stmt;
            Object val = evaluate(printStmt.getExpression());
            if (output.length() > 0) {
                output.append("\n");
            }
            output.append(stringify(val));
        } else if (stmt instanceof IfStatement) {
            IfStatement ifStmt = (IfStatement) stmt;
            Object condVal = evaluate(ifStmt.getCondition());
            if (isTruthy(condVal)) {
                for (Statement s : ifStmt.getThenBranch()) {
                    executeStatement(s);
                }
            } else {
                for (Statement s : ifStmt.getElseBranch()) {
                    executeStatement(s);
                }
            }
        } else if (stmt instanceof WhileStatement) {
            WhileStatement whileStmt = (WhileStatement) stmt;
            int iterations = 0;
            int MAX_ITERATIONS = 100000; // Protection against infinite loops

            while (isTruthy(evaluate(whileStmt.getCondition()))) {
                iterations++;
                if (iterations > MAX_ITERATIONS) {
                    throw new RuntimeException("Runtime Error at line " + whileStmt.getLine() + ": Infinite loop detected (exceeded 100,000 iterations)");
                }
                for (Statement s : whileStmt.getBody()) {
                    executeStatement(s);
                }
            }
        }
    }

    private Object evaluate(Expression expr) {
        if (expr instanceof LiteralExpression) {
            return ((LiteralExpression) expr).getValue();
        } else if (expr instanceof VariableExpression) {
            VariableExpression varExpr = (VariableExpression) expr;
            return environment.get(varExpr.getName(), varExpr.getLine());
        } else if (expr instanceof BinaryExpression) {
            BinaryExpression bin = (BinaryExpression) expr;
            Object left = evaluate(bin.getLeft());
            Object right = evaluate(bin.getRight());
            String op = bin.getOperator();
            int line = bin.getLine();

            switch (op) {
                case "+":
                    if (left instanceof String || right instanceof String) {
                        return stringify(left) + stringify(right);
                    }
                    if (left instanceof Number && right instanceof Number) {
                        return ((Number) left).longValue() + ((Number) right).longValue();
                    }
                    throw new RuntimeException("Runtime Error at line " + line + ": Operands for '+' must be numbers or strings");

                case "-":
                    checkNumberOperands(op, left, right, line);
                    return ((Number) left).longValue() - ((Number) right).longValue();

                case "*":
                    checkNumberOperands(op, left, right, line);
                    return ((Number) left).longValue() * ((Number) right).longValue();

                case "/":
                    checkNumberOperands(op, left, right, line);
                    long denominator = ((Number) right).longValue();
                    if (denominator == 0) {
                        throw new RuntimeException("Runtime Error at line " + line + ": Division by zero");
                    }
                    return ((Number) left).longValue() / denominator;

                case "%":
                    checkNumberOperands(op, left, right, line);
                    long mod = ((Number) right).longValue();
                    if (mod == 0) {
                        throw new RuntimeException("Runtime Error at line " + line + ": Modulo by zero");
                    }
                    return ((Number) left).longValue() % mod;

                case "<":
                    checkNumberOperands(op, left, right, line);
                    return ((Number) left).longValue() < ((Number) right).longValue();

                case "<=":
                    checkNumberOperands(op, left, right, line);
                    return ((Number) left).longValue() <= ((Number) right).longValue();

                case ">":
                    checkNumberOperands(op, left, right, line);
                    return ((Number) left).longValue() > ((Number) right).longValue();

                case ">=":
                    checkNumberOperands(op, left, right, line);
                    return ((Number) left).longValue() >= ((Number) right).longValue();

                case "==":
                    return isEqual(left, right);

                case "!=":
                    return !isEqual(left, right);
            }
        }

        throw new RuntimeException("Runtime Error at line " + expr.getLine() + ": Cannot evaluate expression");
    }

    private void checkNumberOperands(String op, Object left, Object right, int line) {
        if (left instanceof Number && right instanceof Number) return;
        throw new RuntimeException("Runtime Error at line " + line + ": Operands for '" + op + "' must be integers");
    }

    private boolean isTruthy(Object object) {
        if (object == null) return false;
        if (object instanceof Boolean) return (Boolean) object;
        if (object instanceof Number) return ((Number) object).longValue() != 0;
        return true;
    }

    private boolean isEqual(Object a, Object b) {
        if (a == null && b == null) return true;
        if (a == null) return false;
        return a.equals(b);
    }

    private String stringify(Object object) {
        if (object == null) return "null";
        if (object instanceof Boolean) {
            return ((Boolean) object) ? "sahi" : "galat";
        }
        return object.toString();
    }
}

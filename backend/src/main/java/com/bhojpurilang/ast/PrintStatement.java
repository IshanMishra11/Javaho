package com.bhojpurilang.ast;

public class PrintStatement extends Statement {
    private final Expression expression;

    public PrintStatement(Expression expression, int line) {
        super(line);
        this.expression = expression;
    }

    public Expression getExpression() {
        return expression;
    }
}

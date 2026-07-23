package com.bhojpurilang.ast;

public class LiteralExpression extends Expression {
    private final Object value;

    public LiteralExpression(Object value, int line) {
        super(line);
        this.value = value;
    }

    public Object getValue() {
        return value;
    }
}

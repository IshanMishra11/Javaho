package com.bhojpurilang.ast;

public class VariableExpression extends Expression {
    private final String name;

    public VariableExpression(String name, int line) {
        super(line);
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

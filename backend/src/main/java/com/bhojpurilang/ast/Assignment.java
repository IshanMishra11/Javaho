package com.bhojpurilang.ast;

public class Assignment extends Statement {
    private final String identifier;
    private final Expression value;

    public Assignment(String identifier, Expression value, int line) {
        super(line);
        this.identifier = identifier;
        this.value = value;
    }

    public String getIdentifier() {
        return identifier;
    }

    public Expression getValue() {
        return value;
    }
}

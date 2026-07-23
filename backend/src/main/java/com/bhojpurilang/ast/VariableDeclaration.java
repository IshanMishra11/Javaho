package com.bhojpurilang.ast;

public class VariableDeclaration extends Statement {
    private final String identifier;
    private final Expression initializer;

    public VariableDeclaration(String identifier, Expression initializer, int line) {
        super(line);
        this.identifier = identifier;
        this.initializer = initializer;
    }

    public String getIdentifier() {
        return identifier;
    }

    public Expression getInitializer() {
        return initializer;
    }
}

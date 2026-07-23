package com.bhojpurilang.ast;

import java.util.List;

public class Program extends ASTNode {
    private final List<Statement> statements;

    public Program(List<Statement> statements, int line) {
        super(line);
        this.statements = statements;
    }

    public List<Statement> getStatements() {
        return statements;
    }
}

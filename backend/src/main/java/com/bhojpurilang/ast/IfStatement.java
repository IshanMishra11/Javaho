package com.bhojpurilang.ast;

import java.util.List;

public class IfStatement extends Statement {
    private final Expression condition;
    private final List<Statement> thenBranch;
    private final List<Statement> elseBranch;

    public IfStatement(Expression condition, List<Statement> thenBranch, List<Statement> elseBranch, int line) {
        super(line);
        this.condition = condition;
        this.thenBranch = thenBranch;
        this.elseBranch = elseBranch;
    }

    public Expression getCondition() {
        return condition;
    }

    public List<Statement> getThenBranch() {
        return thenBranch;
    }

    public List<Statement> getElseBranch() {
        return elseBranch;
    }
}

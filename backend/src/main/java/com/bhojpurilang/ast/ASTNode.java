package com.bhojpurilang.ast;

public abstract class ASTNode {
    private final int line;

    public ASTNode(int line) {
        this.line = line;
    }

    public int getLine() {
        return line;
    }
}

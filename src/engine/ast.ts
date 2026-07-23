export interface ASTNode {
  kind: string;
  line: number;
}

export interface StatementNode extends ASTNode {}
export interface ExpressionNode extends ASTNode {}

export interface ProgramNode extends ASTNode {
  kind: "Program";
  statements: StatementNode[];
}

export interface VariableDeclarationNode extends StatementNode {
  kind: "VariableDeclaration";
  identifier: string;
  initializer: ExpressionNode;
}

export interface AssignmentNode extends StatementNode {
  kind: "Assignment";
  identifier: string;
  value: ExpressionNode;
}

export interface PrintStatementNode extends StatementNode {
  kind: "PrintStatement";
  expression: ExpressionNode;
}

export interface IfStatementNode extends StatementNode {
  kind: "IfStatement";
  condition: ExpressionNode;
  thenBranch: StatementNode[];
  elseBranch: StatementNode[];
}

export interface WhileStatementNode extends StatementNode {
  kind: "WhileStatement";
  condition: ExpressionNode;
  body: StatementNode[];
}

export interface BinaryExpressionNode extends ExpressionNode {
  kind: "BinaryExpression";
  left: ExpressionNode;
  operator: string;
  right: ExpressionNode;
}

export interface LiteralExpressionNode extends ExpressionNode {
  kind: "LiteralExpression";
  value: number | string | boolean;
}

export interface VariableExpressionNode extends ExpressionNode {
  kind: "VariableExpression";
  name: string;
}

import React from "react";
import { X, Layers, Code, Server, Cpu, CheckCircle } from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div id="architecture-modal" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-sans text-xs">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Java Backend & Compiler Architecture</h2>
              <p className="text-xs text-slate-400">Spring Boot REST API & Hand-crafted Interpreter Pipeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300">
          {/* Pipeline Diagram */}
          <div>
            <h3 className="font-bold text-slate-200 text-sm mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Compilation & Execution Pipeline</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-[11px] text-center">
              <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col items-center">
                <span className="text-amber-400 font-bold mb-1">1. Lexer</span>
                <span className="text-slate-400 text-[10px]">Source Code → Tokens Stream</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col items-center">
                <span className="text-sky-400 font-bold mb-1">2. Parser</span>
                <span className="text-slate-400 text-[10px]">Tokens → AST Nodes Tree</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col items-center">
                <span className="text-emerald-400 font-bold mb-1">3. Interpreter</span>
                <span className="text-slate-400 text-[10px]">AST Walk → Environment State</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col items-center">
                <span className="text-purple-400 font-bold mb-1">4. REST Controller</span>
                <span className="text-slate-400 text-[10px]">Output & Errors JSON DTO</span>
              </div>
            </div>
          </div>

          {/* Folder Structure */}
          <div>
            <h3 className="font-bold text-slate-200 text-sm mb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-sky-400" />
              <span>Java Project Structure (`/backend/`)</span>
            </h3>

            <pre className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed">
{`BhojpuriLang/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/bhojpurilang/
│       ├── Application.java               # Spring Boot Application Entry Point
│       ├── controller/
│       │   └── BhojpuriController.java    # REST API Endpoint (POST /run)
│       ├── model/
│       │   ├── Token.java & TokenType.java # Tokens & Keywords
│       │   ├── RunRequest.java            # { "code": "..." }
│       │   └── RunResponse.java           # { "success": true, "output": "...", "errors": [] }
│       ├── lexer/
│       │   └── Lexer.java                 # Hand-crafted Character Tokenizer
│       ├── parser/
│       │   └── Parser.java                # Recursive Descent Parser
│       ├── ast/
│       │   ├── ASTNode.java, Program.java, Statement.java, Expression.java
│       │   ├── VariableDeclaration.java, Assignment.java, PrintStatement.java
│       │   └── IfStatement.java, WhileStatement.java, BinaryExpression.java
│       └── interpreter/
│           ├── Environment.java           # Variable Symbol Table
│           └── Interpreter.java           # AST Tree Walker & Evaluator`}
            </pre>
          </div>

          {/* Endpoint Specification */}
          <div>
            <h3 className="font-bold text-slate-200 text-sm mb-2 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>REST API Endpoint Spec</span>
            </h3>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-900 text-emerald-200 font-bold px-2 py-0.5 rounded text-[10px]">POST</span>
                <span className="text-amber-300 font-bold">/run</span>
              </div>

              <div>
                <p className="text-slate-400 text-[11px] mb-1">Request Payload:</p>
                <pre className="text-emerald-300 text-xs bg-slate-900 p-2 rounded">
{`{
  "code": "rakh x = 10\\ndikha x"
}`}
                </pre>
              </div>

              <div>
                <p className="text-slate-400 text-[11px] mb-1">Response Payload (Success):</p>
                <pre className="text-emerald-300 text-xs bg-slate-900 p-2 rounded">
{`{
  "success": true,
  "output": "10",
  "errors": []
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-1.5 rounded-lg transition cursor-pointer text-xs"
          >
            Close Spec
          </button>
        </div>
      </div>
    </div>
  );
};

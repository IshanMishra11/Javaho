import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { CodeEditor } from "./components/CodeEditor";
import { Toolbar } from "./components/Toolbar";
import { OutputConsole } from "./components/OutputConsole";
import { ErrorConsole } from "./components/ErrorConsole";
import { TokensViewer } from "./components/TokensViewer";
import { ASTViewer } from "./components/ASTViewer";
import { EnvironmentViewer } from "./components/EnvironmentViewer";
import { CheatsheetModal } from "./components/CheatsheetModal";
import { ArchitectureModal } from "./components/ArchitectureModal";
import { DeveloperModal } from "./components/DeveloperModal";
import { SAMPLE_PROGRAMS } from "./data/samplePrograms";
import { ExecutionResponse, ActiveTab } from "./types/ide";
import { Terminal, AlertOctagon, List, Network, Database } from "lucide-react";

export default function App() {
  const [currentSampleId, setCurrentSampleId] = useState<string>("sample-main");
  const [code, setCode] = useState<string>(SAMPLE_PROGRAMS[0].code);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("output");

  const [executionResult, setExecutionResult] = useState<ExecutionResponse | null>(null);

  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState<boolean>(false);
  const [isArchOpen, setIsArchOpen] = useState<boolean>(false);
  const [isDeveloperOpen, setIsDeveloperOpen] = useState<boolean>(false);

  // Handle sample selection
  const handleSelectSample = (sampleId: string) => {
    setCurrentSampleId(sampleId);
    const found = SAMPLE_PROGRAMS.find((p) => p.id === sampleId);
    if (found) {
      setCode(found.code);
      setExecutionResult(null);
    }
  };

  // Run Code via REST API
  const handleRunCode = async () => {
    setIsRunning(true);
    setExecutionResult(null);

    try {
      const response = await fetch("/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data: ExecutionResponse = await response.json();
      setExecutionResult(data);

      if (!data.success && data.errors && data.errors.length > 0) {
        setActiveTab("errors");
      } else {
        setActiveTab("output");
      }
    } catch (err: any) {
      setExecutionResult({
        success: false,
        output: "",
        errors: [err.message || "Failed to communicate with backend interpreter REST API"],
        executionTimeMs: 0,
      });
      setActiveTab("errors");
    } finally {
      setIsRunning(false);
    }
  };

  // Auto-format BhojpuriLang code
  const handleFormatCode = () => {
    const lines = code.split("\n");
    let indentLevel = 0;
    const formattedLines: string[] = [];

    for (let rawLine of lines) {
      const trimmed = rawLine.trim();

      if (!trimmed) {
        formattedLines.push("");
        continue;
      }

      // Check if line starts with closing/else keywords
      const isDedent = trimmed.startsWith("nahin") || trimmed.startsWith("khatam");
      if (isDedent && indentLevel > 0) {
        indentLevel--;
      }

      const indentStr = "    ".repeat(indentLevel);
      formattedLines.push(indentStr + trimmed);

      // Check if line opens a block
      const isIndent = trimmed.startsWith("agar") || trimmed.startsWith("jabtak") || trimmed.startsWith("nahin");
      if (isIndent) {
        indentLevel++;
      }
    }

    setCode(formattedLines.join("\n"));
  };

  const handleClearCode = () => {
    setCode("");
    setExecutionResult(null);
  };

  const handleResetCode = () => {
    const found = SAMPLE_PROGRAMS.find((p) => p.id === currentSampleId);
    if (found) {
      setCode(found.code);
      setExecutionResult(null);
    }
  };

  const handleInsertSnippet = (snippet: string) => {
    setCode((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
    setIsCheatsheetOpen(false);
  };

  // Find line number of error if available
  const errorLine =
    executionResult?.errors && executionResult.errors.length > 0
      ? (() => {
          const match = executionResult.errors[0].match(/line (\d+)/i);
          return match ? parseInt(match[1], 10) : null;
        })()
      : null;

  return (
    <div id="bhojpuri-ide-root" className="h-screen w-screen bg-[#09090B] text-slate-300 flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navbar */}
      <Navbar
        currentSampleId={currentSampleId}
        onSelectSample={handleSelectSample}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        onOpenArchitecture={() => setIsArchOpen(true)}
        onOpenDeveloper={() => setIsDeveloperOpen(true)}
      />

      {/* Main Split Layout */}
      <div className="flex-1 min-h-0 grid grid-rows-12 md:grid-rows-1 md:grid-cols-12 overflow-hidden">
        {/* Left/Top Section: Code Editor */}
        <div className="row-span-7 md:row-span-1 md:col-span-7 border-b md:border-b-0 md:border-r border-white/5 flex flex-col min-h-0 bg-[#0D0D10]">
          <Toolbar
            onRun={handleRunCode}
            onFormat={handleFormatCode}
            onClear={handleClearCode}
            onReset={handleResetCode}
            isRunning={isRunning}
            executionTimeMs={executionResult?.executionTimeMs}
            isSuccess={executionResult ? executionResult.success : null}
          />

          <div className="flex-1 min-h-0">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              errorLine={errorLine}
            />
          </div>
        </div>

        {/* Right/Bottom Section: Results & Inspector Console */}
        <div className="row-span-5 md:row-span-1 md:col-span-5 flex flex-col min-h-0 bg-[#09090B]">
          {/* Console Tabs */}
          <div className="bg-[#111114] border-b border-white/5 px-3 flex items-center justify-between text-xs overflow-x-auto shrink-0">
            <div className="flex items-center space-x-1 py-1.5">
              {/* Output Tab */}
              <button
                onClick={() => setActiveTab("output")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                  activeTab === "output"
                    ? "bg-white/10 text-amber-300 font-bold shadow border border-amber-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Output</span>
              </button>

              {/* Error Tab */}
              <button
                onClick={() => setActiveTab("errors")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                  activeTab === "errors"
                    ? "bg-white/10 text-rose-300 font-bold shadow border border-rose-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                <span>Errors</span>
                {executionResult?.errors && executionResult.errors.length > 0 && (
                  <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {executionResult.errors.length}
                  </span>
                )}
              </button>

              {/* Tokens Tab */}
              <button
                onClick={() => setActiveTab("tokens")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                  activeTab === "tokens"
                    ? "bg-white/10 text-amber-300 font-bold shadow border border-amber-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <List className="w-3.5 h-3.5 text-amber-400" />
                <span>Tokens</span>
              </button>

              {/* AST Tab */}
              <button
                onClick={() => setActiveTab("ast")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                  activeTab === "ast"
                    ? "bg-white/10 text-sky-300 font-bold shadow border border-sky-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Network className="w-3.5 h-3.5 text-sky-400" />
                <span>AST</span>
              </button>

              {/* Memory / Env Tab */}
              <button
                onClick={() => setActiveTab("environment")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                  activeTab === "environment"
                    ? "bg-white/10 text-emerald-300 font-bold shadow border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Variables</span>
              </button>
            </div>
          </div>

          {/* Console Tab Content */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {activeTab === "output" && (
              <OutputConsole
                output={executionResult?.output || ""}
                onClear={() => setExecutionResult(null)}
              />
            )}

            {activeTab === "errors" && (
              <ErrorConsole errors={executionResult?.errors || []} />
            )}

            {activeTab === "tokens" && (
              <TokensViewer tokens={executionResult?.tokens || []} />
            )}

            {activeTab === "ast" && (
              <ASTViewer ast={executionResult?.ast || null} />
            )}

            {activeTab === "environment" && (
              <EnvironmentViewer environment={executionResult?.environment} />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CheatsheetModal
        isOpen={isCheatsheetOpen}
        onClose={() => setIsCheatsheetOpen(false)}
        onInsertCode={handleInsertSnippet}
      />

      <ArchitectureModal
        isOpen={isArchOpen}
        onClose={() => setIsArchOpen(false)}
      />

      <DeveloperModal
        isOpen={isDeveloperOpen}
        onClose={() => setIsDeveloperOpen(false)}
      />
    </div>
  );
}

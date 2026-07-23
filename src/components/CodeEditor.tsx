import React, { useEffect, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  errorLine?: number | null;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  errorLine,
}) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Register BhojpuriLang language if not already registered
    if (!monaco.languages.getLanguages().some((lang) => lang.id === "bhojpurilang")) {
      monaco.languages.register({ id: "bhojpurilang" });

      // Tokenizer rules for syntax highlighting
      monaco.languages.setMonarchTokensProvider("bhojpurilang", {
        keywords: ["rakh", "dikha", "agar", "nahin", "jabtak", "khatam", "sahi", "galat"],
        operators: ["+", "-", "*", "/", "%", "=", "==", "!=", "<", ">", "<=", ">="],
        tokenizer: {
          root: [
            [/#.*$/, "comment"],
            [/"([^"\\]|\\.)*"/, "string"],
            [/\b(rakh|dikha|agar|nahin|jabtak|khatam)\b/, "keyword"],
            [/\b(sahi|galat)\b/, "constant.language"],
            [/\b\d+\b/, "number"],
            [/[a-zA-Z_][a-zA-Z0-9_]*/, "identifier"],
            [/==|!=|<=|>=|=|<|>|\+|\-|\*|\/|%/, "operator"],
          ],
        },
      });

      // Define custom color theme
      monaco.editor.defineTheme("bhojpuri-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "keyword", foreground: "F59E0B", fontStyle: "bold" }, // Amber
          { token: "constant.language", foreground: "10B981", fontStyle: "bold" }, // Emerald green
          { token: "string", foreground: "34D399" }, // Mint
          { token: "number", foreground: "60A5FA" }, // Blue
          { token: "comment", foreground: "6B7280", fontStyle: "italic" }, // Gray
          { token: "operator", foreground: "F43F5E" }, // Rose
          { token: "identifier", foreground: "F3F4F6" }, // Light white
        ],
        colors: {
          "editor.background": "#0D0D10", // Sophisticated dark
          "editor.lineHighlightBackground": "#18181C",
          "editorCursor.foreground": "#F59E0B",
          "editorLineNumber.foreground": "#475569",
          "editorLineNumber.activeForeground": "#F59E0B",
        },
      });
    }

    // Bind Ctrl+Enter or Cmd+Enter to Run Code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun();
    });
  };

  // Decorate error line if present
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    const editor = editorRef.current;
    const monaco = monacoRef.current;

    if (errorLine && errorLine > 0) {
      const decorations = editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(errorLine, 1, errorLine, 100),
            options: {
              isWholeLine: true,
              className: "bg-red-950/60 border-l-4 border-red-500",
              glyphMarginClassName: "bg-red-500",
            },
          },
        ]
      );

      return () => {
        editor.deltaDecorations(decorations, []);
      };
    }
  }, [errorLine]);

  return (
    <div id="code-editor-container" className="h-full w-full bg-[#0D0D10] overflow-hidden flex flex-col relative">
      <div className="bg-[#0C0C0E] px-4 py-1.5 border-b border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
          <span className="text-slate-200">main.bj</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500 text-[11px]">BhojpuriLang Source</span>
        </div>
        <div className="text-[11px] text-slate-500 hidden sm:block">
          Press <kbd className="bg-white/5 text-slate-300 px-1.5 py-0.5 rounded border border-white/10">Ctrl + Enter</kbd> to run
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <Editor
          height="100%"
          language="bhojpurilang"
          theme="bhojpuri-dark"
          value={code}
          onChange={(val) => onChange(val || "")}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'Cascadia Code', Consolas, Monaco, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            padding: { top: 12, bottom: 12 },
            lineNumbersMinChars: 3,
            renderLineHighlight: "all",
            smoothScrolling: true,
            cursorBlinking: "smooth",
          }}
        />
      </div>
    </div>
  );
};

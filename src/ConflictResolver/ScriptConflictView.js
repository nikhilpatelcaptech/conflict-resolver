// src/ConflictResolver/ScriptConflictView.js
import React, { useState, useEffect } from "react";
import { DiffEditor, loader } from "@monaco-editor/react";

loader.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs"
  }
});
export default function ScriptConflictView({ conflict, onResolve, resolved }) {
  const [customValue, setCustomValue] = useState("");

  // Reset manual editor whenever conflict changes
  useEffect(
    () => {
      if (!conflict) {
        setCustomValue("");
        return;
      }
      setCustomValue(String(conflict.incoming || conflict.current || ""));
    },
    [conflict]
  );

  if (!conflict) return null;

  const containerStyle = {
    fontSize: 13,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: 0
  };

  const topSectionStyle = {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
    marginBottom: 8
  };

  const bottomSectionStyle = {
    borderTop: "1px solid #111827",
    paddingTop: 8,
    height: 200,
    maxHeight: 200,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    minHeight: 0
  };

  const textareaContainerStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minHeight: 0
  };

  const labelStyle = {
    fontSize: 11,
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: 4
  };

  const diffWrapperStyle = {
    border: "1px solid #1f2937",
    borderRadius: 4,
    height: 260,
    maxHeight: 260,
    overflow: "hidden"
  };

  const textareaStyle = {
    flex: 1,
    minHeight: 0,
    fontFamily: "Menlo, monospace",
    fontSize: 11,
    borderRadius: 4,
    border: "1px solid #1f2937",
    padding: 8,
    background: "#020617",
    color: "#e5e7eb",
    resize: "vertical",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word"
  };

  const buttonColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    justifyContent: "flex-end",
    width: "12%"
  };

  const buttonStyle = {
    padding: "6px 10px",
    fontSize: 12,
    borderRadius: 4,
    border: "1px solid transparent",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      <div style={topSectionStyle}>
        <h3 style={{ marginBottom: 12, wordBreak: "break-all" }}>
          {conflict.path}
        </h3>

        <div style={{ ...labelStyle, marginBottom: 4 }}>
          Diff (current vs incoming)
        </div>
        <div style={diffWrapperStyle}>
          <DiffEditor
            key={conflict.id}
            original={String(conflict.current || "")}
            modified={String(conflict.incoming || "")}
            language="javascript"
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              lineNumbers: "on",
              wordWrap: "on",
              wordWrapColumn: 80,
              wrappingIndent: "same",
              renderSideBySide: true, // inline diff to avoid 2x width
              automaticLayout: true,
              scrollBeyondLastColumn: 0,
              scrollbar: {
                horizontal: "hidden",
                horizontalScrollbarSize: 0
              }
            }}
          />
        </div>
      </div>

      <div style={bottomSectionStyle}>
        <div style={textareaContainerStyle}>
          <div style={labelStyle}>Custom merged script (optional)</div>
          <textarea
            style={textareaStyle}
            value={customValue}
            onChange={e => setCustomValue(e.target.value)}
          />
        </div>

        <div style={buttonColumnStyle}>
          <button
            type="button"
            disabled={resolved}
            style={{
              ...buttonStyle,
              background: "#111827",
              color: "#f9fafb",
              borderColor: "#374151",
              opacity: resolved ? 0.5 : 1,
              cursor: resolved ? "not-allowed" : "pointer"
            }}
            onClick={() => onResolve(conflict.id, "current")}
          >
            Use Current
          </button>
          <button
            type="button"
            disabled={resolved}
            style={{
              ...buttonStyle,
              background: "#059669",
              color: "#ecfdf5",
              opacity: resolved ? 0.5 : 1,
              cursor: resolved ? "not-allowed" : "pointer"
            }}
            onClick={() => onResolve(conflict.id, "incoming")}
          >
            Use Incoming
          </button>
          <button
            type="button"
            disabled={resolved}
            style={{
              ...buttonStyle,
              background: "#4f46e5",
              color: "#eef2ff",
              opacity: resolved ? 0.5 : 1,
              cursor: resolved ? "not-allowed" : "pointer"
            }}
            onClick={() => onResolve(conflict.id, "custom", customValue)}
          >
            Use Custom
          </button>
        </div>
      </div>
    </div>
  );
}

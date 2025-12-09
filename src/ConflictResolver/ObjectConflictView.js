// src/ConflictResolver/ObjectConflictView.js
import React, { useState, useEffect } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

export default function ObjectConflictView({ conflict, onResolve, resolved }) {
  const [customValue, setCustomValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!conflict) {
      setCustomValue("");
      setError("");
      return;
    }
    const base =
      conflict.incoming != null ? conflict.incoming : conflict.current || {};
    setCustomValue(JSON.stringify(base, null, 2));
    setError("");
  }, [conflict]);

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
    gap: 4,
    minHeight: 0
  };

  const labelStyle = {
    fontSize: 11,
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: 4
  };

  const diffContainerStyle = {
    borderRadius: 4,
    border: "1px solid #1f2937",
    overflow: "auto"
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
    justifyContent: "flex-end"
  };

  const buttonStyle = {
    padding: "6px 10px",
    fontSize: 12,
    borderRadius: 4,
    border: "1px solid transparent",
    cursor: "pointer"
  };

  const handleUseCustom = () => {
    try {
      const parsed = JSON.parse(customValue || "{}");
      setError("");
      onResolve(conflict.id, "custom", parsed);
    } catch (e) {
      setError("Invalid JSON in custom value");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={topSectionStyle}>
        <h3 style={{ marginBottom: 12, wordBreak: "break-all" }}>
          {conflict.path}
        </h3>

        <div style={{ ...labelStyle, marginBottom: 4 }}>Diff (current vs incoming)</div>
        <div style={diffContainerStyle}>
          <ReactDiffViewer
            oldValue={JSON.stringify(conflict.current || {}, null, 2)}
            newValue={JSON.stringify(conflict.incoming || {}, null, 2)}
            splitView
            showDiffOnly={false}
            useDarkTheme
          />
        </div>
      </div>

      <div style={bottomSectionStyle}>
        <div style={textareaContainerStyle}>
          <div style={labelStyle}>Custom object (JSON)</div>
          <textarea
            style={textareaStyle}
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
          />
          {error && (
            <div
              style={{
                fontSize: 11,
                color: "#f97316"
              }}
            >
              {error}
            </div>
          )}
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
            onClick={handleUseCustom}
          >
            Use Custom (JSON)
          </button>
        </div>
      </div>
    </div>
  );
}

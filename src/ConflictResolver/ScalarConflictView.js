// src/ConflictResolver/ScalarConflictView.js
import React, { useState, useEffect } from "react";

export default function ScalarConflictView({ conflict, onResolve, resolved }) {
  const [customValue, setCustomValue] = useState("");

  useEffect(() => {
    if (!conflict) {
      setCustomValue("");
      return;
    }
    setCustomValue(String(conflict.incoming ?? conflict.current ?? ""));
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
    height: 160,
    maxHeight: 160,
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

  const fieldRowStyle = {
    display: "flex",
    gap: 12,
    marginBottom: 12
  };

  const fieldStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  };

  const inputStyle = {
    padding: "6px 8px",
    borderRadius: 4,
    border: "1px solid #1f2937",
    fontSize: 12,
    background: "#020617",
    color: "#e5e7eb",
    fontFamily: "Menlo, monospace"
  };

  const customInputStyle = {
    ...inputStyle,
    height: 125,
    resize: "none"
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

        <div style={fieldRowStyle}>
          <div style={fieldStyle}>
            <div style={labelStyle}>Current</div>
            <input
              style={inputStyle}
              value={String(conflict.current ?? "")}
              readOnly
            />
          </div>
          <div style={fieldStyle}>
            <div style={labelStyle}>Incoming</div>
            <input
              style={inputStyle}
              value={String(conflict.incoming ?? "")}
              readOnly
            />
          </div>
        </div>
      </div>

      <div style={bottomSectionStyle}>
        <div style={textareaContainerStyle}>
          <div style={labelStyle}>Custom value</div>
          <textarea
            style={customInputStyle}
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
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

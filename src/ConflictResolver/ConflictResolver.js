// src/ConflictResolver/ConflictResolver.js
import React, { useState, useMemo } from "react";
import useConflictResolver from "./useConflictResolver";
import ScalarConflictView from "./ScalarConflictView";
import ObjectConflictView from "./ObjectConflictView";
import ScriptConflictView from "./ScriptConflictView";

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightConflictMarkers(str) {
  // first escape HTML so JSON is safe
  let html = escapeHtml(str);

  // highlight @@CONFLICT{conf-1}@@ style markers
  html = html.replace(
    /(@@CONFLICT\{.*?\}@@)/g,
    '<span style="color:#f97316;font-weight:600;">$1</span>'
  );

  // highlight {{CONF-1}} / {{CONF-xyz}} style markers
  html = html.replace(
    /(\{\{CONF-[^}]+\}\})/g,
    '<span style="color:#f97316;font-weight:600;">$1</span>'
  );

  return html;
}

export default function ConflictResolver({ data }) {
  const {
    workingDraft,
    conflicts,
    applyResolution,
    isResolved,
    allResolved
  } = useConflictResolver(data);

  const [selectedId, setSelectedId] = useState(
    conflicts[0] ? conflicts[0].id : undefined
  );

  const selectedConflict = conflicts.find(c => c.id === selectedId);
  const selectedInfo = useMemo(
    () => {
      if (!selectedConflict || !selectedConflict.path) return {};
      const segments = selectedConflict.path.split("/").filter(Boolean);
      // Paths look like: /_blocksByName/<blockName>/config/executionStrategy
      let blockId = null;
      if (segments[0] === "_blocksByName" && segments.length > 1) {
        blockId = segments[1];
      }
      return {
        blockId,
        pathSegments: segments,
        pathString: segments.join(".")
      };
    },
    [selectedConflict]
  );

  const selectedBlockContext = useMemo(
    () => {
      if (!selectedInfo.blockId || !workingDraft) return null;

      const { blocks, _blocksByName } = workingDraft;
      const blockId = selectedInfo.blockId;

      // Prefer the full block from `blocks` array (more complete shape)
      if (Array.isArray(blocks)) {
        const fromBlocks = blocks.find(b => b.name === blockId) || null;
        if (fromBlocks) return fromBlocks;
      }

      // Fallback to `_blocksByName` if present
      if (_blocksByName && _blocksByName[blockId]) {
        return _blocksByName[blockId];
      }

      return null;
    },
    [workingDraft, selectedInfo.blockId]
  );
  // ───────────────── layout styles ─────────────────

  const containerStyle = {
    display: "flex",
    height: "100vh",
    background: "#020617",
    color: "#f9fafb",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,system-ui,Segoe UI,Roboto,sans-serif",
    fontSize: 13
  };

  const sidebarStyle = {
    width: 320,
    maxWidth: 320,
    borderRight: "1px solid #111827",
    display: "flex",
    flexDirection: "column"
  };

  const headerStyle = {
    padding: 12,
    borderBottom: "1px solid #111827"
  };

  const listStyle = {
    flex: 1,
    overflowY: "auto"
  };

  const listItemStyle = {
    width: "100%",
    textAlign: "left",
    padding: "8px 12px",
    borderBottom: "1px solid #020617",
    background: "transparent",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    fontSize: 11
  };

  const mainStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0
  };

  // whole central content area (above footer)
  const detailStyle = {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    minHeight: 0 // allow children to use flex + scroll
  };

  const footerStyle = {
    borderTop: "1px solid #111827",
    padding: "8px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 11
  };

  const applyButtonStyle = enabled => ({
    padding: "6px 12px",
    borderRadius: 4,
    border: "none",
    fontSize: 11,
    fontWeight: 600,
    cursor: enabled ? "pointer" : "not-allowed",
    background: enabled ? "#059669" : "#374151",
    color: enabled ? "#ecfdf5" : "#9ca3af"
  });

  const handleApply = () => {
    console.log("SESSION ID:", data.sessionId);
    console.log("FINAL MERGED OBJECT:", workingDraft);
    // eslint-disable-next-line no-alert
    alert("Merged object logged to console");
  };

  const resolvedCount = conflicts.filter(c => isResolved(c.id)).length;

  const renderDetail = () => {
    if (!selectedConflict) {
      return <div>No conflict selected</div>;
    }

    if (selectedConflict.kind === "scalar") {
      return (
        <ScalarConflictView
          conflict={selectedConflict}
          onResolve={applyResolution}
          resolved={isResolved(selectedConflict.id)}
        />
      );
    }

    if (selectedConflict.kind === "object") {
      return (
        <ObjectConflictView
          conflict={selectedConflict}
          onResolve={applyResolution}
          resolved={isResolved(selectedConflict.id)}
        />
      );
    }

    if (selectedConflict.kind === "script") {
      return (
        <ScriptConflictView
          conflict={selectedConflict}
          onResolve={applyResolution}
          resolved={isResolved(selectedConflict.id)}
        />
      );
    }

    return (
      <div>
        Unknown conflict type: {selectedConflict.kind}
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {/* ───── Left: conflicts list ───── */}
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <div
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              color: "#9ca3af"
            }}
          >
            Conflicts
          </div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>
            {resolvedCount} / {data.conflictsCount} resolved
          </div>
        </div>

        <div style={listStyle}>
          {conflicts.map(conf => {
            const label = conf.path.split("/").filter(Boolean).join(".");
            const resolved = isResolved(conf.id);
            const isActive = conf.id === selectedId;

            return (
              <button
                key={conf.id}
                type="button"
                style={{
                  ...listItemStyle,
                  backgroundColor: isActive ? "#020617" : "transparent"
                }}
                onClick={() => setSelectedId(conf.id)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Menlo, monospace",
                      fontSize: 10,
                      color: "#9ca3af"
                    }}
                  >
                    {conf.id}
                  </span>
                  <span
                    style={{
                      padding: "2px 6px",
                      borderRadius: 999,
                      fontSize: 9,
                      background: resolved ? "#059669" : "#4b5563",
                      color: "#f9fafb"
                    }}
                  >
                    {resolved ? "Resolved" : conf.kind}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#e5e7eb",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ───── Center: detail + block context + footer ───── */}
      <div style={mainStyle}>
        {/* top: conflict detail + bottom: block context */}
        <div style={detailStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 12,
              minHeight: 0
            }}
          >
            {/* conflict view area (scrolls if tall) */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflow: "auto"
              }}
            >
              {renderDetail()}
            </div>

            {/* block context at bottom with fixed height and internal scroll */}
            <div
              style={{
                borderTop: "1px solid #111827",
                paddingTop: 8,
                height: 220, // fixed height; adjust if you want a bit more/less
                maxHeight: 220,
                display: "flex",
                flexDirection: "column",
                minHeight: 0
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  marginBottom: 4
                }}
              >
                Block context (from working object)
              </div>

              {selectedConflict &&
                <div
                  style={{
                    fontSize: 11,
                    color: "#e5e7eb",
                    marginBottom: 4
                  }}
                >
                  Path:{" "}
                  <span style={{ fontFamily: "Menlo, monospace" }}>
                    {selectedInfo.pathString || selectedConflict.path}
                  </span>
                </div>}

              {selectedBlockContext
                ? <pre
                    style={{
                      flex: 1,
                      margin: 0,
                      padding: 8,
                      borderRadius: 4,
                      border: "1px solid #111827",
                      background: "#020617",
                      color: "#e5e7eb",
                      fontFamily: "Menlo, monospace",
                      fontSize: 11,
                      overflow: "auto",
                      whiteSpace: "pre"
                    }}
                    dangerouslySetInnerHTML={{
                      __html: highlightConflictMarkers(
                        JSON.stringify(
                          selectedBlockContext,
                          (key, value) => {
                            if (
                              key === "_relationsByName" ||
                              key === "_blocksByName"
                            ) {
                              return undefined;
                            }
                            return value;
                          },
                          2
                        )
                      )
                    }}
                  />
                : <div
                    style={{
                      fontSize: 11,
                      color: "#6b7280",
                      marginTop: 8
                    }}
                  >
                    Select a conflict whose path starts with{" "}
                    <code>_blocksByName.&lt;blockId&gt;</code> to see its block
                    here.
                  </div>}
            </div>
          </div>
        </div>

        {/* footer at very bottom */}
        <div style={footerStyle}>
          <div>
            Session:{" "}
            <span style={{ fontFamily: "Menlo, monospace" }}>
              {data.sessionId}
            </span>{" "}
            · Status: <strong>{data.status}</strong>
          </div>
          <button
            type="button"
            disabled={!allResolved}
            style={applyButtonStyle(allResolved)}
            onClick={handleApply}
          >
            Apply &amp; Log Merged Object
          </button>
        </div>
      </div>
    </div>
  );
}

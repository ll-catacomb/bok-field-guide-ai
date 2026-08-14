"use client";

import { useState } from "react";

// How a harness reaches a live service — a request to an API, authenticated with
// a secret key — and why that gets unwieldy across many services, each with its
// own methods, docs, and keys. Toggle MCP to see the standardized alternative.
const SERVICES = [
  { name: "Google Docs", method: "Docs REST API", key: "AIza·doc·••••", data: "the document's text" },
  { name: "a course database", method: "SQL query", key: "db-user:••••", data: "the enrollment rows" },
  { name: "Google Calendar", method: "Calendar API", key: "AIza·cal·••••", data: "your events" },
];

export function ApiTools() {
  const [mcp, setMcp] = useState(false);

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · Calling a service</span>
        <span className="kicker">APIs, keys, and the case for MCP</span>
      </div>
      <div className="interactive-body">
        <p className="at-note">
          A tool call to a live service is just a request over the network. The
          model decides what it wants; the harness sends a request to the
          service&rsquo;s <strong>API</strong>, proving it&rsquo;s allowed with a{" "}
          <strong>secret key</strong>; the service sends the data back. Simple
          enough for one service — but look what happens across several.
        </p>

        <div className="at-toggle">
          <button className="btn" aria-pressed={mcp} onClick={() => setMcp((v) => !v)}>
            {mcp ? "MCP: on" : "MCP: off"}
          </button>
          <span className="at-toggle-hint">{mcp ? "one protocol for everything" : "a bespoke wire per service"}</span>
        </div>

        <div className={`at-diagram ${mcp ? "is-mcp" : ""}`}>
          <div className="at-harness">
            <span className="at-node-label">the harness</span>
            <span className="at-node-sub">{mcp ? "speaks only MCP" : "must speak every service"}</span>
          </div>

          <div className="at-links">
            {SERVICES.map((s) => (
              <div className="at-link" key={s.name}>
                {mcp ? (
                  <>
                    <span className="at-wire at-wire-mcp">— MCP →</span>
                    <span className="at-mid">
                      <span className="at-mid-t">MCP adapter</span>
                      <span className="at-mid-b">🔑 {s.key} · {s.method}</span>
                    </span>
                    <span className="at-wire">→</span>
                  </>
                ) : (
                  <span className="at-wire at-wire-bespoke">
                    — {s.method} · 🔑 {s.key} →
                  </span>
                )}
                <span className="at-service">
                  <span className="at-service-name">{s.name}</span>
                  <span className="at-service-data">returns {s.data}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className={`at-cap ${mcp ? "is-good" : "is-bad"}`}>
          {mcp ? (
            <>
              <strong>With MCP</strong> (the Model Context Protocol), the harness
              speaks one standard language. Each service gets a small{" "}
              <strong>adapter</strong> that holds its key and translates the one
              standard language into that service&rsquo;s own. Add a new service
              by plugging in another adapter — nothing in the harness changes,
              and the keys stay in one place.
            </>
          ) : (
            <>
              <strong>Without MCP</strong>, every service is a hand-built
              integration: its own method (REST, SQL, an API of its own),
              its own secret key, its own documentation. When any of those
              changes — and they do — the wiring breaks and someone has to fix it.
            </>
          )}
        </p>
      </div>

      <style>{`
        .at-note { margin: 0 0 1.25rem; font-size: 15px; color: var(--color-ink-soft); }
        .at-toggle { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .at-toggle-hint { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-ash); }
        .at-diagram { display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: center; }
        @media (max-width: 620px) { .at-diagram { grid-template-columns: 1fr; } }
        .at-harness { border: 1px solid var(--color-ink); background: var(--color-ink); color: var(--color-paper); padding: 0.9rem 1rem; text-align: center; }
        .at-node-label { display: block; font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.08em; }
        .at-node-sub { display: block; margin-top: 0.25rem; font-size: 10px; font-style: italic; color: var(--color-bone-soft); }
        .at-links { display: flex; flex-direction: column; gap: 0.5rem; }
        .at-link { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .at-wire { font-family: var(--font-mono); font-size: 10.5px; color: var(--color-ash); white-space: nowrap; }
        .at-wire-bespoke { color: var(--color-crimson); border: 1px dashed var(--color-crimson); padding: 2px 6px; }
        .at-wire-mcp { color: var(--color-gold); font-weight: 600; }
        .at-mid { display: inline-flex; flex-direction: column; border: 1px solid var(--color-gold); padding: 3px 7px; }
        .at-mid-t { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-gold); }
        .at-mid-b { font-family: var(--font-mono); font-size: 9.5px; color: var(--color-ash); }
        .at-service { display: inline-flex; flex-direction: column; border: 1px solid var(--color-rule); background: var(--color-paper); padding: 0.35rem 0.7rem; }
        .at-service-name { font-family: var(--font-mono); font-size: 12px; color: var(--color-ink); }
        .at-service-data { font-size: 11px; color: var(--color-ash); }
        .at-cap { margin: 1.4rem 0 0; font-size: 14.5px; line-height: 1.55; padding-left: 1rem; border-left: 2px solid var(--color-crimson); color: var(--color-ink); }
        .at-cap.is-good { border-left-color: var(--color-gold); }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from "react";

// The context window as a fixed budget. System + question are always present;
// the reader toggles curated context blocks on, watches the window fill, and
// sees the model's "guessing room" shrink as high-signal tokens crowd it out.
const WINDOW = 1000; // stylized token budget

// Every chat starts partly full — a system prompt and memory are already on the
// desk before you type a word (the workshop's "Memento" framing).
const FIXED = [
  { key: "system", label: "system prompt", tokens: 60, color: "#cfc7b4" },
  { key: "memory", label: "memory", tokens: 40, color: "#c9bfa8" },
  { key: "question", label: "your question", tokens: 40, color: "#d8cbb2" },
];

const CONTEXT_BLOCKS = [
  { key: "source", label: "primary source", tokens: 220 },
  { key: "rubric", label: "grading rubric", tokens: 90 },
  { key: "examples", label: "two worked examples", tokens: 260 },
  { key: "style", label: "style guide", tokens: 110 },
];

export function ContextWindow() {
  const [on, setOn] = useState<Record<string, boolean>>({});

  const contextTokens = CONTEXT_BLOCKS.filter((b) => on[b.key]).reduce(
    (s, b) => s + b.tokens,
    0
  );
  const fixedTokens = FIXED.reduce((s, b) => s + b.tokens, 0);
  const used = fixedTokens + contextTokens;
  const output = Math.max(0, WINDOW - used);
  const pct = (t: number) => `${(t / WINDOW) * 100}%`;

  const richness = contextTokens / (WINDOW - fixedTokens); // 0..~1
  const crowded = used / WINDOW > 0.7;
  const caption = crowded
    ? "Careful — the window is crowding. Past a point, more context makes quality worse, not better: “context rot,” where the model gets lost in the middle. High-signal beats high-volume."
    : richness < 0.05
      ? "A bare prompt: the model guesses about almost everything."
      : richness < 0.4
        ? "Some context: the model guesses less, hedges less."
        : "Rich context: the model mostly follows your lead.";

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · The context window</span>
        <span className="kicker">
          {used} / {WINDOW} tokens in
        </span>
      </div>
      <div className="interactive-body">
        <p className="cw-note">
          Your prompt, the model&rsquo;s reply, and everything after all share one
          fixed-size <strong>context window</strong> that starts partly full — a
          system prompt and memory. Add high-signal context and watch the
          model&rsquo;s room to guess shrink.
        </p>

        <div className="cw-bar" role="img" aria-label="context window fill">
          {FIXED.map((f) => (
            <div
              key={f.key}
              className="cw-seg"
              style={{ width: pct(f.tokens), background: f.color }}
              title={`${f.label}: ${f.tokens} tokens`}
            />
          ))}
          {CONTEXT_BLOCKS.filter((b) => on[b.key]).map((b) => (
            <div
              key={b.key}
              className="cw-seg cw-ctx"
              style={{ width: pct(b.tokens) }}
              title={`${b.label}: ${b.tokens} tokens`}
            />
          ))}
          <div
            className="cw-seg cw-output"
            style={{ width: pct(output) }}
            title={`space left for the model's answer: ${output} tokens`}
          />
        </div>

        <div className="cw-legend">
          <span><i className="sw" style={{ background: "#cfc7b4" }} /> system prompt</span>
          <span><i className="sw" style={{ background: "var(--color-crimson)" }} /> your context</span>
          <span><i className="sw cw-hatch" /> the model&rsquo;s guessing room</span>
        </div>

        <p className={`cw-caption ${crowded ? "is-rot" : ""}`}>{caption}</p>

        <div className="cw-toggles">
          <span className="kicker">add context:</span>
          {CONTEXT_BLOCKS.map((b) => (
            <button
              key={b.key}
              className="btn btn-ghost"
              aria-pressed={!!on[b.key]}
              onClick={() => setOn((s) => ({ ...s, [b.key]: !s[b.key] }))}
            >
              {b.label} <span className="cw-cost">+{b.tokens}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .cw-note { margin: 0 0 1.25rem; font-size: 15px; color: var(--color-ink-soft); }
        .cw-bar { display: flex; height: 3rem; border: 1px solid var(--color-rule); background: var(--color-paper); overflow: hidden; }
        .cw-seg { height: 100%; transition: width 260ms cubic-bezier(0.2,0.7,0.3,1); }
        .cw-ctx { background: var(--color-crimson); border-left: 1px solid var(--color-paper); }
        .cw-output {
          background-image: repeating-linear-gradient(45deg, transparent 0, transparent 6px, rgba(42,40,37,0.14) 6px, rgba(42,40,37,0.14) 7px);
          background-color: var(--color-paper-deep);
        }
        .cw-legend { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0.75rem 0 0; font-family: var(--font-mono); font-size: 11px; color: var(--color-ash); }
        .cw-legend span { display: inline-flex; align-items: center; gap: 0.4rem; }
        .cw-legend .sw { width: 12px; height: 12px; display: inline-block; border: 1px solid var(--color-rule); }
        .cw-legend .cw-hatch { background-image: repeating-linear-gradient(45deg, transparent 0, transparent 3px, rgba(42,40,37,0.3) 3px, rgba(42,40,37,0.3) 4px); }
        .cw-caption { margin: 1.1rem 0 0; font-style: italic; font-size: 15px; color: var(--color-ink); }
        .cw-caption.is-rot { color: var(--color-crimson); font-style: normal; }
        .cw-toggles { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 1.25rem; }
        .cw-cost { font-size: 10px; color: var(--color-ash); }
        .cw-toggles .kicker { margin-right: 0.25rem; }
      `}</style>
    </div>
  );
}

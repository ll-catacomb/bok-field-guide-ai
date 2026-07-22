"use client";

import { useMemo, useState } from "react";
import { encode, decode } from "gpt-tokenizer";

// A small bone-and-crimson palette for the token chips. Muted, so the
// fragmentation reads without turning into confetti.
const CHIP_COLORS = [
  "#e4d9c3",
  "#d9c9ae",
  "#e8cdc4",
  "#cfd6c4",
  "#d6cbb8",
  "#e2d2c9",
  "#ccd0cf",
  "#e0d7c0",
];

const SEED =
  "Unsurprisingly, they had to cancel the show. The crowd went home unhappily.";

export function Tokenizer() {
  const [text, setText] = useState(SEED);
  const [showIds, setShowIds] = useState(false);

  const tokens = useMemo(() => {
    if (!text) return [] as { id: number; piece: string }[];
    try {
      const ids = encode(text);
      return ids.map((id) => ({ id, piece: decode([id]) }));
    } catch {
      return [];
    }
  }, [text]);

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · Tokenization</span>
        <span className="kicker">{tokens.length} tokens · {text.length} chars</span>
      </div>
      <div className="interactive-body">
        <p className="tk-note">
          Type below and watch the text break into tokens — each colored chunk
          is one integer in the model&rsquo;s vocabulary. Flip to the numbers to
          see what the model actually reads.
        </p>

        <textarea
          className="ctl-input"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Text to tokenize"
        />

        <div className="tk-out" aria-live="polite">
          {tokens.map((t, i) => (
            <span
              key={i}
              className={`tk-chip ${showIds ? "tk-chip-id" : ""}`}
              style={{ background: CHIP_COLORS[i % CHIP_COLORS.length] }}
              title={showIds ? t.piece : `token id ${t.id}`}
            >
              {showIds ? t.id : t.piece.replace(/ /g, "·")}
            </span>
          ))}
        </div>

        <div className="tk-viewtoggle">
          <button
            className="btn btn-ghost"
            aria-pressed={showIds}
            onClick={() => setShowIds((v) => !v)}
          >
            {showIds ? "showing: token IDs (numbers)" : "show what the model sees"}
          </button>
        </div>

        <div className="tk-tries">
          <span className="kicker">try:</span>
          <button
            className="btn btn-ghost"
            onClick={() => setText("Shall I compare thee to a summer's day?")}
          >
            a line of Shakespeare
          </button>
          <button
            className="btn btn-ghost"
            onClick={() =>
              setText(
                "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch"
              )
            }
          >
            a Welsh place name
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => setText("ἐν ἀρχῇ ἦν ὁ λόγος")}
          >
            a line of Greek
          </button>
          <button className="btn btn-ghost" onClick={() => setText(SEED)}>
            reset
          </button>
        </div>

        <p className="tk-fine">
          No language teacher would split <code>unhappily</code> into{" "}
          <code>unhap</code> · <code>ily</code>. Non-English text fractures
          hardest — more tokens per idea.
        </p>
      </div>

      <style>{`
        .tk-note { margin: 0 0 1rem; font-size: 15px; color: var(--color-ink-soft); }
        .tk-out {
          display: flex; flex-wrap: wrap; gap: 3px;
          margin: 1rem 0 1.25rem; font-family: var(--font-mono); font-size: 13px;
          line-height: 1.9;
        }
        .tk-chip {
          padding: 1px 4px; border: 1px solid rgba(42,40,37,0.18);
          border-radius: 2px; color: var(--color-ink); white-space: pre;
        }
        .tk-chip-id { color: var(--color-crimson); font-size: 12px; }
        .tk-viewtoggle { margin: 0 0 1rem; }
        .tk-tries { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
        .tk-tries .kicker { margin-right: 0.25rem; }
        .tk-fine { margin: 3rem 0 0; font-size: 13px; font-style: italic; color: var(--color-ash); line-height: 1.5; }
        .tk-fine code { font-style: normal; font-family: var(--font-mono); font-size: 0.85em; background: var(--color-paper); padding: 0 3px; border: 1px solid var(--color-rule); }
      `}</style>
    </div>
  );
}

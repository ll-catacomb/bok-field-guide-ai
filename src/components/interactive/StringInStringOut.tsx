"use client";

import { useMemo, useState } from "react";
import { encode } from "gpt-tokenizer";

// The core function, made literal — with "what the model sees" shown as its own
// permanent window beside the human view, so no one misses it. Both columns
// share one grid so their rows (input, divider, output) stay aligned even when
// the token list wraps to several lines. Pairs with the Tokenizer module below.
const PROMPT = "Summarize Hamlet's most famous soliloquy in one sentence.";
const RESPONSE =
  "Hamlet weighs existence against oblivion — whether to endure suffering or end it — and finds that dread of the unknown is what stays his hand.";

export function StringInStringOut() {
  const [prompt, setPrompt] = useState(PROMPT);
  const [ran, setRan] = useState(false);

  const inNums = useMemo(() => encode(prompt).join("  "), [prompt]);
  const outNums = useMemo(() => encode(RESPONSE).join("  "), []);

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · String in, string out</span>
        <span className="kicker">the whole engine, one exchange</span>
      </div>
      <div className="interactive-body">
        <div className="sio-grid">
          {/* row 1 — column headers */}
          <span className="sio-colhead tag">what you see</span>
          <span className="sio-colhead tag sio-model-head">what the model sees</span>

          {/* row 2 — input */}
          <div className="sio-block">
            <span className="sio-lbl">you type — a string</span>
            <textarea
              className="sio-ta"
              rows={2}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setRan(false);
              }}
              aria-label="prompt"
            />
          </div>
          <div className="sio-block">
            <span className="sio-lbl">numbers in</span>
            <p className="sio-nums">{inNums}</p>
          </div>

          {/* row 3 — shared divider */}
          <div className="sio-mid" aria-hidden="true">
            <span className="sio-rule" />
            <span className="tag">LLM ↓</span>
            <span className="sio-rule" />
          </div>

          {/* row 4 — output */}
          <div className="sio-block">
            <span className="sio-lbl">you read — a string</span>
            {ran ? <p className="sio-resp">{RESPONSE}</p> : <p className="sio-idle">press run →</p>}
          </div>
          <div className="sio-block">
            <span className="sio-lbl">numbers out</span>
            {ran ? <p className="sio-nums">{outNums}</p> : <p className="sio-idle">—</p>}
          </div>
        </div>

        <div className="sio-controls">
          <button className="btn" onClick={() => setRan(true)}>run</button>
          <span className="sio-disclaimer">illustrative — not a live model</span>
        </div>

        <p className="sio-caption">
          Same exchange, two views. To you it&rsquo;s words in, words out; to the
          model it&rsquo;s <em>numbers</em> in, numbers out — seen from underneath.
        </p>
      </div>

      <style>{`
        .sio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem 1rem;
          align-items: stretch;
        }
        @media (max-width: 600px) { .sio-grid { grid-template-columns: 1fr; } }
        .sio-colhead { margin-bottom: 0.1rem; align-self: end; }
        .sio-model-head { color: var(--color-crimson); }
        .sio-block { border: 1px solid var(--color-rule); background: var(--color-paper); padding: 0.6rem 0.7rem; min-height: 4.75rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .sio-lbl { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-ash); }
        .sio-ta { flex: 1; display: block; width: 100%; border: 0; padding: 0; margin: 0; background: transparent; resize: vertical; font-family: var(--font-body); font-size: 15px; line-height: 1.5; color: var(--color-ink); }
        .sio-ta:focus { outline: none; }
        .sio-resp { margin: 0; font-size: 15px; line-height: 1.5; }
        .sio-idle { margin: 0; font-family: var(--font-mono); font-size: 12px; color: var(--color-ash); }
        .sio-nums { margin: 0; font-family: var(--font-mono); font-size: 11px; line-height: 1.7; color: var(--color-crimson); word-break: break-word; }
        .sio-mid { grid-column: 1 / -1; display: flex; align-items: center; gap: 0.6rem; padding: 0.35rem 0.25rem; }
        .sio-rule { flex: 1; height: 1px; background: var(--color-rule); opacity: 0.5; }
        .sio-mid .tag { color: var(--color-crimson); }
        .sio-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-top: 1.25rem; }
        .sio-disclaimer { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-ash); }
        .sio-caption { margin: 1.1rem 0 0; font-style: italic; font-size: 14px; color: var(--color-ink); }
      `}</style>
    </div>
  );
}

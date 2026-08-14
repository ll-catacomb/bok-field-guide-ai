"use client";

import { useState } from "react";

// A conversation fills the window over time. Each message you send adds *two*
// blocks — your message and the model's (longer) reply — and they stack up.
// When the window nears full, the tool "compacts": it folds the earlier turns
// into a shorter summary and passes that forward. Seamless to you, but the model
// now works from a lossy recap, which is why long threads drift and lose detail.
const WINDOW = 1000;
const SYSTEM = 80;
const YOU = 40;
const AI = 110;
const LIMIT = 880; // compact once we cross this

type Block =
  | { kind: "system"; tokens: number }
  | { kind: "you"; tokens: number; n: number }
  | { kind: "ai"; tokens: number; n: number }
  | { kind: "summary"; tokens: number };

const START: Block[] = [{ kind: "system", tokens: SYSTEM }];

export function ContextFill() {
  const [blocks, setBlocks] = useState<Block[]>(START);
  const [turns, setTurns] = useState(0);
  const [compactions, setCompactions] = useState(0);

  const used = blocks.reduce((s, b) => s + b.tokens, 0);
  const remaining = Math.max(0, WINDOW - used);

  function send() {
    const n = turns + 1;
    let next: Block[] = [
      ...blocks,
      { kind: "you", tokens: YOU, n },
      { kind: "ai", tokens: AI, n },
    ];
    let didCompact = false;

    if (next.reduce((s, b) => s + b.tokens, 0) > LIMIT) {
      // Fold everything except the system block and the most recent exchange
      // (the last you + ai pair) into one much smaller summary block.
      const system = next[0];
      const lastPair = next.slice(-2);
      const middle = next.slice(1, -2);
      const folded = middle.reduce((s, b) => s + b.tokens, 0);
      next = [system, { kind: "summary", tokens: Math.round(folded * 0.35) }, ...lastPair];
      didCompact = true;
    }

    setBlocks(next);
    setTurns(n);
    if (didCompact) setCompactions((c) => c + 1);
  }

  function reset() {
    setBlocks(START);
    setTurns(0);
    setCompactions(0);
  }

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · A conversation fills up</span>
        <span className="kicker">{used} / {WINDOW} tokens · {turns} turns</span>
      </div>
      <div className="interactive-body">
        <p className="cf-note">
          One message rarely fills the window — but a conversation does. Each
          message you send adds two blocks, <strong>your message</strong>{" "}and the
          model&rsquo;s <strong>reply</strong>, and they stack up. Keep sending,
          and watch what happens when it runs out of room.
        </p>

        <div className="cf-bar" role="img" aria-label="context window filling">
          {blocks.map((b, i) => {
            const label =
              b.kind === "system"
                ? "sys"
                : b.kind === "summary"
                  ? "summary"
                  : b.kind === "you"
                    ? "you"
                    : "ai";
            return (
              <div
                key={i}
                className={`cf-seg cf-${b.kind}`}
                style={{ flexBasis: `${(b.tokens / WINDOW) * 100}%` }}
                title={`${label}: ${b.tokens} tokens`}
              >
                <span className="cf-seg-label">{label}</span>
              </div>
            );
          })}
          <div className="cf-seg cf-room" style={{ flexBasis: `${(remaining / WINDOW) * 100}%` }}>
            <span className="cf-seg-label">room</span>
          </div>
        </div>

        <div className="cf-controls">
          <button className="btn" onClick={send}>send a message</button>
          <button className="btn btn-ghost" onClick={reset}>reset</button>
        </div>

        {compactions > 0 && (
          <p className="cf-compact" aria-live="polite">
            <strong>Compaction ({compactions}×).</strong> The window filled, so the
            tool folded the earlier turns into a short <em>summary</em> and
            passed that forward. The conversation feels seamless — but the model is
            now working from a lossy summary, not your original words. This is why
            very long conversations drift, lose detail, and grow less precise the
            longer they run.
          </p>
        )}
      </div>

      <style>{`
        .cf-note { margin: 0 0 1.25rem; font-size: 15px; color: var(--color-ink-soft); }
        .cf-bar { display: flex; height: 3rem; border: 1px solid var(--color-rule); overflow: hidden; }
        .cf-seg { display: flex; align-items: center; justify-content: center; overflow: hidden; border-right: 1px solid var(--color-paper); transition: flex-basis 240ms cubic-bezier(0.2,0.7,0.3,1); }
        .cf-seg:last-child { border-right: 0; }
        .cf-seg-label { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap; }
        .cf-system { background: var(--color-paper-deep); color: var(--color-ash); }
        .cf-you { background: #d8cbb2; color: var(--color-ink); }
        .cf-ai { background: #e6decb; color: var(--color-ink-soft); }
        .cf-summary { background: var(--color-crimson); color: var(--color-paper); }
        .cf-room { color: var(--color-ash); background-image: repeating-linear-gradient(45deg, transparent 0, transparent 6px, rgba(42,40,37,0.08) 6px, rgba(42,40,37,0.08) 7px); }
        .cf-controls { display: flex; gap: 0.75rem; margin-top: 1.1rem; }
        .cf-compact { margin: 1.4rem 0 0; font-size: 15px; line-height: 1.55; color: var(--color-ink); border-left: 2px solid var(--color-crimson); padding-left: 1rem; }
      `}</style>
    </div>
  );
}

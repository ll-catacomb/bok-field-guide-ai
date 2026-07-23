"use client";

import { useState } from "react";

// Why RAG exists, on ONE shared scale so the two bars are comparable. The window
// is measured in schematic "units" (≈ one chunk each). A memo, a few articles,
// even a whole book fit — only a library overflows. For every source, the
// retrieved chunks are a visible *subset* of the full text, never larger.
const WINDOW = 40; // schematic units; one unit ≈ one chunk
const SYSTEM = 2;
const ANSWER = 1;

const CORPORA = [
  { key: "memo", label: "a one-page memo", full: 3, chunks: 2, docs: "1 document",
    cap: "A one-page memo barely dents the window — just paste it in; retrieving would be pointless." },
  { key: "articles", label: "a few articles", full: 9, chunks: 3, docs: "4 articles",
    cap: "A few articles fill only a modest slice. Still no reason to retrieve — paste them." },
  { key: "book", label: "a 300-page book", full: 28, chunks: 5, docs: "1 book",
    cap: "A whole book fits, using a good share of the window. You can often paste it all." },
  { key: "library", label: "a whole library", full: 200, chunks: 8, docs: "2,000 documents",
    cap: "A library of 2,000 documents overflows the window many times over. Now you must retrieve." },
];

export function RetrievalTradeoff() {
  const [k, setK] = useState(0);
  const c = CORPORA[k];

  const used = SYSTEM + c.full;
  const fits = used <= WINDOW;
  const overX = Math.round(used / WINDOW);
  const w = (units: number) => `${Math.min(100, (units / WINDOW) * 100)}%`;
  const ragRoom = WINDOW - SYSTEM - c.chunks - ANSWER;

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · Fidelity vs. breadth</span>
        <span className="kicker">both rows share one window</span>
      </div>
      <div className="interactive-body">
        <p className="rt-note">
          Modern context windows are enormous — hundreds of thousands of tokens,
          often a million or more. Pick a source and compare pasting it all in
          against retrieving just the relevant bits, drawn on the same window.
        </p>

        <div className="rt-pick">
          <span className="kicker">the source:</span>
          {CORPORA.map((x, idx) => (
            <button key={x.key} className="btn btn-ghost" aria-pressed={idx === k} onClick={() => setK(idx)}>
              {x.label}
            </button>
          ))}
        </div>

        {/* Row 1 — paste it all in */}
        <div className="rt-row">
          <span className="tag">paste it all in</span>
          <div className="rt-bar">
            <div className="rt-seg rt-sys" style={{ width: w(SYSTEM) }} title="system prompt" />
            {fits ? (
              <>
                <div className="rt-seg rt-full" style={{ width: w(c.full) }}>the full text</div>
                <div className="rt-seg rt-room" style={{ width: w(WINDOW - used) }}>room to work</div>
              </>
            ) : (
              <div className="rt-seg rt-over" style={{ width: w(WINDOW) }}>
                the full text — overflowing ≈{overX}× →
              </div>
            )}
          </div>
          <p className={`rt-cap ${fits ? "" : "is-bad"}`}>{c.cap}</p>
        </div>

        {/* Row 2 — retrieve (RAG) */}
        <div className="rt-row">
          <span className="tag">retrieve just the relevant chunks (RAG)</span>
          <div className="rt-libwrap">
            <div className="rt-lib">library · {c.docs}</div>
            <span className="rt-arrow" aria-hidden="true">→ {c.chunks} chunk{c.chunks === 1 ? "" : "s"} →</span>
          </div>
          <div className="rt-bar">
            <div className="rt-seg rt-sys" style={{ width: w(SYSTEM) }} title="system prompt" />
            {Array.from({ length: c.chunks }).map((_, i) => (
              <div key={i} className="rt-seg rt-chunk" style={{ width: w(1) }} title="a retrieved chunk" />
            ))}
            <div className="rt-seg rt-ans" style={{ width: w(ANSWER) }} title="the answer" />
            <div className="rt-seg rt-room" style={{ width: w(ragRoom) }}>room to work</div>
          </div>
          <p className="rt-cap">
            {fits
              ? `You wouldn't bother retrieving from ${c.docs} — but if you did, it would load ${c.chunks} chunk${c.chunks === 1 ? "" : "s"}, a subset of the text.`
              : `Retrieval loads just ${c.chunks} chunks out of ${c.docs} — a handful of passages from millions of words. Huge reach, but you're trusting the right chunks were chosen.`}
          </p>
        </div>
      </div>

      <style>{`
        .rt-note { margin: 0 0 1.25rem; font-size: 15px; color: var(--color-ink-soft); }
        .rt-pick { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
        .rt-pick .kicker { margin-right: 0.25rem; }
        .rt-row { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .rt-bar { display: flex; height: 2.5rem; border: 1px solid var(--color-rule); overflow: hidden; }
        .rt-seg { display: flex; align-items: center; justify-content: center; overflow: hidden; white-space: nowrap; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.04em; border-right: 1px solid var(--color-paper); }
        .rt-seg:last-child { border-right: 0; }
        .rt-sys { background: var(--color-paper-deep); color: var(--color-ash); }
        .rt-full { background: #d8cbb2; color: var(--color-ink); }
        .rt-over { background: repeating-linear-gradient(45deg, var(--color-crimson) 0, var(--color-crimson) 8px, #8f1727 8px, #8f1727 16px); color: var(--color-paper); }
        .rt-chunk { background: var(--color-crimson); }
        .rt-ans { background: #e6decb; }
        .rt-room { color: var(--color-ash); background-image: repeating-linear-gradient(45deg, transparent 0, transparent 6px, rgba(42,40,37,0.08) 6px, rgba(42,40,37,0.08) 7px); }
        .rt-libwrap { display: flex; align-items: center; gap: 0.5rem; }
        .rt-lib { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ash); border: 1px dashed var(--color-rule); padding: 0.3rem 0.6rem; }
        .rt-arrow { font-family: var(--font-mono); font-size: 10px; color: var(--color-crimson); }
        .rt-cap { margin: 0.2rem 0 0; font-size: 13.5px; line-height: 1.45; color: var(--color-ink-soft); }
        .rt-cap.is-bad { color: var(--color-crimson); }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from "react";

// A click-through of retrieval-augmented generation (RAG) — the "eyes" tool
// worth slowing down on. Every stage is always visible; click one for detail.
// The retrieval-miss caveat sits permanently below, since that's the whole point.
const STAGES = [
  {
    label: "Drop the PDF",
    body: "You paste a PDF into the chat, or point a CLI tool like Claude Code at a whole folder of them.",
  },
  {
    label: "Extract text",
    body: "A script pulls the raw text out of the PDF. In a CLI you can also loop through the pages and have a vision model caption diagrams, charts, and photos — otherwise anything that isn't plain text is simply lost.",
  },
  {
    label: "Chunk",
    body: "The text is split into pieces, usually around a paragraph each, so they can be searched and retrieved independently.",
  },
  {
    label: "Embed",
    body: "Each chunk is turned into an embedding: a point in a high-dimensional vector space where chunks with similar meaning sit close together. (These are coordinates, not probabilities.)",
  },
  {
    label: "Vector store",
    body: "The embeddings are saved in a searchable vector store — a database you can query by meaning rather than by exact keyword.",
  },
  {
    label: "Retrieve",
    body: "Your question is embedded too, and the store returns the handful of chunks whose vectors sit nearest to it — the few most relevant passages.",
  },
  {
    label: "Into context",
    body: "Only those retrieved chunks are handed to the model, which answers your question from them. You've searched a huge library without ever loading the whole thing into the window.",
  },
];

export function RagPipeline() {
  const [i, setI] = useState(0);
  const stage = STAGES[i];

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · Retrieval (RAG)</span>
        <span className="kicker">unpacking one tool call, step by step</span>
      </div>
      <div className="interactive-body">
        <div className="rag-flow" role="tablist">
          {STAGES.map((s, idx) => (
            <div key={s.label} className="rag-step-wrap">
              <button
                className={`rag-step ${idx === i ? "is-on" : ""}`}
                aria-pressed={idx === i}
                onClick={() => setI(idx)}
              >
                <span className="rag-num">{idx + 1}</span>
                <span className="rag-step-label">{s.label}</span>
              </button>
              {idx < STAGES.length - 1 && <span className="rag-join" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>

        <div className="rag-detail" aria-live="polite">
          <span className="tag">Step {i + 1} · {stage.label}</span>
          <p>{stage.body}</p>
        </div>

        <p className="rag-caveat">
          <strong>The catch:</strong> retrieval hands over a <em>handful</em>{" "}
          of chunks, not the whole document. If the passage you need isn&rsquo;t
          among the few retrieved, the model never sees it. RAG is fast for &ldquo;search a huge
          library,&rdquo; but it can fail tasks that must be precise and
          exhaustive — a close citation, a full literature scan — where you want
          full-context reading instead. Knowing how the pipeline works tells you
          when to trust it.
        </p>
      </div>

      <style>{`
        .rag-flow { display: flex; flex-wrap: wrap; align-items: stretch; gap: 0.35rem 0; margin-bottom: 1.25rem; }
        .rag-step-wrap { display: inline-flex; align-items: center; }
        .rag-step { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.7rem; border: 1px solid var(--color-rule); background: var(--color-paper); cursor: pointer; transition: background 160ms ease, border-color 160ms ease; }
        .rag-step:hover { border-color: var(--color-crimson); }
        .rag-step.is-on { background: var(--color-crimson); border-color: var(--color-crimson); }
        .rag-step.is-on .rag-step-label, .rag-step.is-on .rag-num { color: var(--color-paper); }
        .rag-num { font-family: var(--font-mono); font-size: 10px; color: var(--color-ash); border: 1px solid currentColor; border-radius: 999px; width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; }
        .rag-step-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.03em; color: var(--color-ink); white-space: nowrap; }
        .rag-join { color: var(--color-crimson); font-family: var(--font-mono); font-size: 13px; padding: 0 0.3rem; }
        .rag-detail { border: 1px solid var(--color-rule); border-left: 3px solid var(--color-crimson); background: var(--color-paper); padding: 1rem 1.1rem; }
        .rag-detail .tag { display: block; color: var(--color-crimson); margin-bottom: 0.4rem; }
        .rag-detail p { margin: 0; font-size: 15px; line-height: 1.5; }
        .rag-caveat { margin: 1.4rem 0 0; font-size: 14.5px; line-height: 1.55; color: var(--color-ink); border-left: 2px solid var(--color-crimson); padding-left: 1rem; }
      `}</style>
    </div>
  );
}

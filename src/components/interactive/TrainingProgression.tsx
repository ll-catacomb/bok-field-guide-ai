"use client";

import { useState } from "react";

// "It learns by reading," in the spirit of the NYT's BabyGPT (trained on Jane
// Austen to predict the next character). Click through training checkpoints and
// watch the same little model climb out of noise into a recognizable voice —
// with no grammar ever programmed in. Scripted stages, deterministic.
const STAGES = [
  {
    label: "0 rounds",
    sample: "'kZhc,TK996'q ?xJ}~9E<z5ekmJlqp8ar9",
    note: "Before any training, BabyGPT is pure noise — it hasn't even learned which letters English uses, or that words exist at all.",
  },
  {
    label: "250 rounds",
    sample: "the to and I you be a of hat that nome hene beer — alingedimpe, ratlabus, mandiered",
    note: "About 30 seconds in. It has learned its ABCs and the commonest letters (all those e's) and a few tiny words — but it still invents nonsense words.",
  },
  {
    label: "500 rounds",
    sample: "she was and if her fard. For but the aser if the could her, your fill will welt.",
    note: "A minute in. It can spell small words and is picking up basic grammar — where periods and commas go — but no one would be fooled.",
  },
  {
    label: "5,000 rounds",
    sample:
      "Elizabeth had been the more agreeable to her sister, and the party were of a form that country.",
    note: "Ten minutes in. Bigger words, fewer misspellings; it has learned names, and that a period is followed by a space and a capital. The sentences still don't mean anything.",
  },
  {
    label: "30,000 rounds",
    sample:
      "Elizabeth could not but smile, though she felt the truth of his words more than she wished to own.",
    note: "An hour in. Full sentences that look like English — stitched together character by character from statistical patterns, never copied from the text. About as far as a tiny model on a few megabytes can go.",
  },
  {
    label: "a frontier model",
    sample:
      "Having read a large fraction of everything ever written, it predicts the next token so well that the output reads as fluent, purposeful thought.",
    note: "The frontier models are the same idea at a staggering scale: trained on more than a terabyte of text — hundreds of billions of words, up to a million times more than BabyGPT. New abilities (answering questions, summarizing, writing code) emerge unexpectedly as they grow.",
  },
];

export function TrainingProgression() {
  const [i, setI] = useState(0);
  const stage = STAGES[i];

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · Learning to write</span>
        <span className="kicker">BabyGPT · trained on Jane Austen</span>
      </div>
      <div className="interactive-body">
        <p className="tp-intro">
          It learns one move — <em>given the text so far, guess the next
          character</em> — then scores itself against the real text and adjusts.
          Repeat a few thousand times. Click through its training:
        </p>

        <div className="tp-stages" role="tablist">
          {STAGES.map((s, idx) => (
            <button
              key={s.label}
              className="btn btn-ghost tp-stage-btn"
              aria-pressed={idx === i}
              onClick={() => setI(idx)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="tp-sample" aria-live="polite">
          {stage.sample}
        </div>

        <p className="tp-note" aria-live="polite">
          {stage.note}
        </p>
      </div>

      <style>{`
        .tp-intro { margin: 0 0 1.1rem; font-size: 15px; color: var(--color-ink-soft); }
        .tp-stages { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
        .tp-stage-btn { text-transform: none; letter-spacing: 0.04em; }
        .tp-sample {
          border: 1px solid var(--color-rule);
          background: var(--color-paper);
          padding: 1rem;
          min-height: 4.5rem;
          display: flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-crimson);
        }
        .tp-note { margin: 1.1rem 0 0; font-style: italic; font-size: 14.5px; color: var(--color-ink); line-height: 1.5; }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from "react";

// The humanities twin of the Multiplication demo — the "Claude gives in
// immediately" pattern on the real Coriolanus I.9 example. Both outcomes are
// shown side by side and revealed together by one click, so there is no staging
// to get wrong: ungrounded, the model denies the scene exists; given the text,
// it reverses and reads it. Scripted, not a live call.
const PROMPT =
  "Please give me a rigorous close reading of Act 1, Scene 9 of Shakespeare's Coriolanus.";

const SCENE = `COMINIUS  …from this time,
  For what he did before Corioli, call him,
  With all the applause and clamour of the host,
  CAIUS MARCIUS CORIOLANUS! Bear
  The addition nobly ever!`;

const DENIAL = `I'm afraid there is no Act 1, Scene 9 in Coriolanus — the first act
runs only through Scene 8. You may be thinking of the duel with
Aufidius. I can't close-read a scene that doesn't exist.`;

const READING = `You're absolutely right — Act 1, Scene 9 does exist, and the text
confirms it. The scene stages the making of a name: Cominius sets
valour beyond language ("Thou'ldst not believe thy deeds") even as it
fixes Marcius in language — christening him "Coriolanus" amid the
"applause and clamour of the host." The hero who scorns the crowd's
voice is named by its clamour…`;

export function Grounding() {
  const [ran, setRan] = useState(false);

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · Grounding</span>
        <span className="kicker">same question, with and without the source</span>
      </div>
      <div className="interactive-body">
        <div className="gr-prompt">
          <span className="gr-lbl">the question, asked both ways</span>
          <p>{PROMPT}</p>
        </div>

        <div className="gr-grid">
          <span className="gr-colhead tag gr-cold">asked cold — no text</span>
          <span className="gr-colhead tag gr-warm">asked with the scene text</span>

          <div className="gr-ctx gr-ctx-none">context: none</div>
          <div className="gr-ctx gr-ctx-text">
            <span className="gr-lbl">context: the scene, pasted in</span>
            <pre className="gr-scene">{SCENE}</pre>
          </div>

          <div className="gr-mid" aria-hidden="true">
            <span className="gr-rule" /><span className="tag">LLM ↓</span><span className="gr-rule" />
          </div>

          <div className={`gr-out ${ran ? "gr-out-bad" : ""}`}>
            {ran ? <pre className="gr-resp">{DENIAL}</pre> : <p className="gr-idle">press run →</p>}
          </div>
          <div className={`gr-out ${ran ? "gr-out-good" : ""}`}>
            {ran ? <pre className="gr-resp">{READING}</pre> : <p className="gr-idle">press run →</p>}
          </div>
        </div>

        <div className="gr-controls">
          <button className="btn" onClick={() => setRan(true)}>run both</button>
          <span className="gr-disclaimer">illustrative — not a live model</span>
        </div>

        {ran && (
          <p className="gr-caption">
            Same model, same question. Ungrounded, it confabulates — confidently
            insisting the scene doesn&rsquo;t exist. Given the source, it reverses
            in an instant (&ldquo;you&rsquo;re right, it absolutely exists&rdquo;)
            and reads it. It was never broken; it was ungrounded.
          </p>
        )}
      </div>

      <style>{`
        .gr-prompt { border: 1px solid var(--color-rule); background: var(--color-paper); padding: 0.6rem 0.7rem; margin-bottom: 1.1rem; }
        .gr-prompt p { margin: 0.25rem 0 0; font-size: 15px; }
        .gr-lbl { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-ash); }
        .gr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem 1rem; align-items: stretch; }
        @media (max-width: 600px) { .gr-grid { grid-template-columns: 1fr; } }
        .gr-colhead { align-self: end; }
        .gr-cold { color: var(--color-crimson); }
        .gr-warm { color: var(--color-gold); }
        .gr-ctx { border: 1px solid var(--color-rule); background: var(--color-paper); padding: 0.6rem 0.7rem; min-height: 6.5rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .gr-ctx-none { align-items: flex-start; justify-content: center; font-family: var(--font-mono); font-size: 11px; color: var(--color-ash); }
        .gr-scene { margin: 0; font-family: var(--font-mono); font-size: 10px; line-height: 1.45; color: var(--color-ash); white-space: pre-wrap; }
        .gr-mid { grid-column: 1 / -1; display: flex; align-items: center; gap: 0.6rem; padding: 0.35rem 0.25rem; }
        .gr-rule { flex: 1; height: 1px; background: var(--color-rule); opacity: 0.5; }
        .gr-mid .tag { color: var(--color-crimson); }
        .gr-out { border: 1px solid var(--color-rule); background: var(--color-paper); padding: 0.7rem; min-height: 8rem; }
        .gr-out-bad { border-color: var(--color-crimson); }
        .gr-out-good { border-color: var(--color-gold); }
        .gr-resp { margin: 0; font-family: var(--font-body); font-size: 13.5px; line-height: 1.5; white-space: pre-wrap; }
        .gr-idle { margin: 0; font-family: var(--font-mono); font-size: 12px; color: var(--color-ash); }
        .gr-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-top: 1.25rem; }
        .gr-disclaimer { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-ash); }
        .gr-caption { margin: 1.1rem 0 0; font-style: italic; font-size: 14px; color: var(--color-ink); }
      `}</style>
    </div>
  );
}

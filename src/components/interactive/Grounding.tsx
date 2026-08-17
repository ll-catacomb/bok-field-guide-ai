"use client";

import { useState } from "react";

// The humanities twin of the Multiplication demo. Two *separate* conversations,
// each flowing left → right (you → LLM → reply), revealed together by one click.
// Asked cold, the model denies the scene exists; asked in a fresh thread with
// the text supplied up front, it simply reads it. No single-thread "you're
// right, I apologize" flip, because these are two independent threads.
const PROMPT =
  "Please give me a rigorous close reading of Act 1, Scene 9 of Shakespeare's Coriolanus.";

const PROMPT_GROUNDED =
  "Please give me a rigorous close reading of this scene — Act 1, Scene 9 of Coriolanus:";

const SCENE = `COMINIUS  …from this time,
  For what he did before Corioli, call him,
  With all the applause and clamour of the host,
  CAIUS MARCIUS CORIOLANUS! Bear
  The addition nobly ever!`;

const DENIAL = `I'm afraid there is no Act 1, Scene 9 in Coriolanus — the first act
runs only through Scene 8. You may be thinking of the duel with
Aufidius. I can't close-read a scene that doesn't exist.`;

const READING = `The scene stages the making of a name. Cominius sets valour beyond
language — "Thou'ldst not believe thy deeds" — even as it fixes Marcius
in language, christening him "Coriolanus" amid the "applause and clamour
of the host." The hero who scorns the people's voice is named by its
clamour…`;

function Thread({
  title,
  tone,
  you,
  scene,
  reply,
  ran,
}: {
  title: string;
  tone: "cold" | "warm";
  you: string;
  scene?: string;
  reply: string;
  ran: boolean;
}) {
  return (
    <div className="gr-thread">
      <span className={`gr-thread-title tag gr-${tone}`}>{title}</span>
      <div className="gr-ex">
        <div className="gr-msg gr-you">
          <span className="gr-lbl">you</span>
          <p className="gr-you-text">{you}</p>
          {scene && <pre className="gr-scene">{scene}</pre>}
        </div>
        <div className="gr-arrow" aria-hidden="true">
          <span className="tag">LLM</span>
          <span className="gr-arrowglyph">→</span>
        </div>
        <div className={`gr-msg gr-ai ${ran ? `gr-ai-${tone}` : ""}`}>
          <span className="gr-lbl">ai</span>
          {ran ? (
            <pre className="gr-resp">{reply}</pre>
          ) : (
            <p className="gr-idle">press run →</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Grounding() {
  const [ran, setRan] = useState(false);

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · Grounding</span>
        <span className="kicker">same question, two separate conversations</span>
      </div>
      <div className="interactive-body">
        <p className="gr-note">
          Numbers aren&rsquo;t the only thing a model will be confidently wrong
          about. Here is the same request in two fresh threads — one with the
          scene text, one without.
        </p>

        <div className="gr-controls">
          <button className="btn" onClick={() => setRan(true)}>
            run both
          </button>
          <span className="gr-disclaimer">illustrative — not a live model</span>
        </div>

        <div className="gr-threads">
          <Thread
            title="Thread A · asked cold, no text"
            tone="cold"
            you={PROMPT}
            reply={DENIAL}
            ran={ran}
          />
          <Thread
            title="Thread B · asked with the scene text"
            tone="warm"
            you={PROMPT_GROUNDED}
            scene={SCENE}
            reply={READING}
            ran={ran}
          />
        </div>

        {ran && (
          <p className="gr-caption">
            Same model, same question. Asked cold, it makes things up — confidently
            insisting the scene doesn&rsquo;t exist. Given the source, it simply
            reads it. Nothing was wrong with the model — it just didn&rsquo;t have the scene in front of it.
          </p>
        )}
      </div>

      <style>{`
        .gr-note { margin: 0 0 1.1rem; font-size: 15px; color: var(--color-ink-soft); }
        .gr-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .gr-disclaimer { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-ash); }
        .gr-threads { display: flex; flex-direction: column; gap: 1.5rem; }
        .gr-thread { display: flex; flex-direction: column; gap: 0.45rem; }
        .gr-thread-title { align-self: flex-start; }
        .gr-cold { color: var(--color-crimson); }
        .gr-warm { color: var(--color-gold); }
        .gr-ex { display: grid; grid-template-columns: 1fr auto 1.3fr; gap: 0.75rem; align-items: stretch; }
        @media (max-width: 620px) { .gr-ex { grid-template-columns: 1fr; }
          .gr-arrow { flex-direction: row !important; }
          .gr-arrowglyph { transform: rotate(90deg); } }
        .gr-msg { border: 1px solid var(--color-rule); background: var(--color-paper); padding: 0.7rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .gr-ai-cold { border-color: var(--color-crimson); }
        .gr-ai-warm { border-color: var(--color-gold); }
        .gr-lbl { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-ash); }
        .gr-you-text { margin: 0; font-size: 14px; }
        .gr-scene { margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 10px; line-height: 1.45; color: var(--color-ash); white-space: pre-wrap; }
        .gr-arrow { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; }
        .gr-arrowglyph { font-family: var(--font-mono); font-size: 20px; color: var(--color-crimson); }
        .gr-resp { margin: 0; font-family: var(--font-body); font-size: 13.5px; line-height: 1.5; white-space: pre-wrap; }
        .gr-idle { margin: 0; font-family: var(--font-mono); font-size: 12px; color: var(--color-ash); }
        .gr-caption { margin: 1.25rem 0 0; font-style: italic; font-size: 14px; color: var(--color-ink); }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from "react";

// A guided lab in two clicks: (1) let the model guess a large product — it will
// be plausible and wrong; (2) let it write and run Python, which returns the
// correct answer AND lays the two numbers side by side so the pattern is
// impossible to miss (right magnitude, right ends, invented middle).

// Plausible-but-wrong guess: right length, right first/last digits, wrong
// middle — how a language model fails at long arithmetic. Deterministic.
function plausibleWrong(truth: bigint): string {
  const s = truth.toString();
  if (s.length <= 4) return s;
  const d = s.split("");
  const start = 2;
  const end = d.length - 2;
  for (let i = start; i < end; i++) {
    d[i] = String((d[i].charCodeAt(0) - 48 + ((i * 3) % 7) + 1) % 10);
  }
  if (d.join("") === s) d[start] = String((+d[start] + 1) % 10);
  return d.join("");
}

export function MultiplicationLab() {
  const [a, setA] = useState("82345");
  const [b, setB] = useState("67890");
  const [step, setStep] = useState(0); // 0 idle · 1 guessed · 2 tooled + compared

  const truth = (BigInt(a || "0") * BigInt(b || "0")).toString();
  const guess = plausibleWrong(BigInt(a || "0") * BigInt(b || "0"));

  let lead = 0;
  while (lead < guess.length && guess[lead] === truth[lead]) lead++;
  let trail = 0;
  while (
    trail < guess.length - lead &&
    guess[guess.length - 1 - trail] === truth[truth.length - 1 - trail]
  )
    trail++;

  const reset = (setter: (v: string) => void) => (v: string) => {
    setter(v.replace(/\D/g, ""));
    setStep(0);
  };

  const guessDigits = (highlight: boolean) =>
    highlight
      ? guess.split("").map((c, i) => (
          <span key={i} className={c === truth[i] ? "ml-match" : "ml-miss"}>{c}</span>
        ))
      : guess;

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · Multiplication</span>
        <span className="kicker">try it before you read on</span>
      </div>
      <div className="interactive-body">
        <div className="ml-eq">
          <input className="ctl-input ml-input" inputMode="numeric" value={a}
            onChange={(e) => reset(setA)(e.target.value)} aria-label="first factor" />
          <span className="ml-times">×</span>
          <input className="ctl-input ml-input" inputMode="numeric" value={b}
            onChange={(e) => reset(setB)(e.target.value)} aria-label="second factor" />
        </div>

        {step === 0 && (
          <button className="btn" onClick={() => setStep(1)}>
            ask the model — no calculator
          </button>
        )}

        {step >= 1 && (
          <div className="ml-block" aria-live="polite">
            <span className="tag">the model, working “in its head”</span>
            <span className="ml-num">{guessDigits(false)}</span>
            {step === 1 && (
              <button className="btn ml-next" onClick={() => setStep(2)}>
                check it with a tool →
              </button>
            )}
          </div>
        )}

        {step >= 2 && (
          <>
            <div className="ml-block" aria-live="polite">
              <ol className="ml-trace">
                <li><span className="ml-actor ml-tool">writes + runs python</span><code>print({a} * {b})</code></li>
                <li><span className="ml-actor ml-tool">python returns</span><code>{truth}</code></li>
              </ol>
            </div>

            <div className="ml-compare">
              <div className="ml-cmp-row">
                <span className="tag">guess</span>
                <span className="ml-num">{guessDigits(true)}</span>
              </div>
              <div className="ml-cmp-row">
                <span className="tag">truth</span>
                <span className="ml-num">{truth}</span>
              </div>

              <p className="ml-why">
                Look at what the guess got <span className="ml-match">right</span>:
                the magnitude (both are {truth.length}-digit numbers), the{" "}
                <strong>first {lead}</strong> digit{lead === 1 ? "" : "s"}, and the{" "}
                <strong>last {trail}</strong> digit{trail === 1 ? "" : "s"}. Only the{" "}
                <span className="ml-miss">middle</span> is invented. From reading
                text, the model learned the <em>heuristics</em> of multiplication —
                roughly how big the answer is, how it starts, how it ends — but
                never how to compute it. That only arrives when it stops guessing
                and writes the Python.
              </p>
            </div>
          </>
        )}
      </div>

      <style>{`
        .ml-eq { display: flex; align-items: center; gap: 0.6rem; max-width: 22rem; margin-bottom: 1.1rem; }
        .ml-input { text-align: right; }
        .ml-times { font-family: var(--font-mono); font-size: 18px; color: var(--color-crimson); }
        .ml-block { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1.5rem; }
        .ml-num { font-family: var(--font-mono); font-size: 22px; letter-spacing: 0.03em; }
        .ml-match { color: var(--color-ink); }
        .ml-miss { color: var(--color-crimson); font-weight: 600; }
        .ml-next { align-self: flex-start; margin-top: 0.4rem; }
        .ml-trace { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
        .ml-trace li { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.5rem; font-size: 14px; }
        .ml-actor { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid var(--color-crimson); color: var(--color-crimson); padding: 1px 5px; }
        .ml-trace code { font-family: var(--font-mono); font-size: 13px; background: var(--color-paper); padding: 1px 5px; border: 1px solid var(--color-rule); }
        .ml-compare { margin-top: 1.75rem; border-top: 1px solid var(--color-rule); padding-top: 1.25rem; }
        .ml-cmp-row { display: flex; align-items: baseline; gap: 0.75rem; }
        .ml-cmp-row + .ml-cmp-row { margin-top: 0.4rem; }
        .ml-cmp-row .tag { width: 3.5rem; }
        .ml-why { margin: 1.25rem 0 0; font-size: 15px; line-height: 1.55; color: var(--color-ink-soft); }
      `}</style>
    </div>
  );
}

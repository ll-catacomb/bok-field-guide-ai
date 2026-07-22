"use client";

import { useState } from "react";

// Memory as the first form of "automatic context." Each thread is drawn as its
// own context window (not a chat): a new thread opens nearly empty, and a
// memory note is a block the tool writes from one window and auto-loads into
// the next — so it appears to know you across sessions.

type Seg = { label: string; pct: number; cls: string };

function Window({ title, segs }: { title: string; segs: Seg[] }) {
  return (
    <div className="mw-thread">
      <span className="tag">{title}</span>
      <div className="mw-bar">
        {segs.map((s, i) => (
          <div
            key={i}
            className={`mw-seg mw-${s.cls}`}
            style={{ flexBasis: `${s.pct}%` }}
            title={s.label}
          >
            <span className="mw-seg-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Memory() {
  const [memory, setMemory] = useState(false);

  const thread1: Seg[] = [
    { label: "system", pct: 16, cls: "sys" },
    { label: 'you: "I teach GENED 1144 this fall"', pct: 46, cls: "you" },
    { label: memory ? "ai: noted ✎ saved" : "ai: noted", pct: 38, cls: "ai" },
  ];

  const thread2: Seg[] = memory
    ? [
        { label: "system", pct: 14, cls: "sys" },
        { label: "memory: teaches GENED 1144", pct: 30, cls: "mem" },
        { label: 'you: "what am I teaching?"', pct: 28, cls: "you" },
        { label: "ai: GENED 1144", pct: 28, cls: "ai" },
      ]
    : [
        { label: "system", pct: 16, cls: "sys" },
        { label: 'you: "what am I teaching?"', pct: 40, cls: "you" },
        { label: "ai: no record", pct: 44, cls: "ai" },
      ];

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · Memory</span>
        <span className="kicker">why a new window forgets — unless it doesn&rsquo;t</span>
      </div>
      <div className="interactive-body">
        <p className="mw-note">
          Every new chat opens a fresh context window — empty and amnesiac, like
          the protagonist of <em>Memento</em>. So how does a tool ever seem to
          remember you from one day to the next? Flip the memory switch and watch
          the second window.
        </p>

        <button className="btn" aria-pressed={memory} onClick={() => setMemory((v) => !v)}>
          {memory ? "memory: on" : "memory: off"}
        </button>

        <div className="mw-threads">
          <Window title="Thread 1 · yesterday" segs={thread1} />

          <div className={`mw-join ${memory ? "is-on" : ""}`} aria-hidden="true">
            {memory ? "memory carried forward ↓" : "new thread ↓ (nothing carried)"}
          </div>

          <Window title="Thread 2 · today (a brand-new window)" segs={thread2} />
        </div>

        <p className="mw-result">
          {memory
            ? "A memory note written in Thread 1 was auto-loaded into Thread 2's window — so today's blank thread already knows what you teach."
            : "Thread 2 opened blank. Yesterday's fact lived only in yesterday's window, and that window is gone."}
        </p>

        <p className="mw-caption">
          Memory is just a note the tool writes and reloads into every new thread
          — the first and simplest form of <em>automatic context</em>: context
          you never pasted, added for you.
        </p>

        <p className="mw-harvard annotation">
          In the <strong>Harvard-provided sandbox accounts</strong>, there is no
          cross-session memory — every thread starts blank. Personal{" "}
          <strong>Claude</strong> and <strong>ChatGPT</strong> accounts <em>do</em>{" "}
          keep memory, which is how they seem to know you and your projects from
          one session to the next.
        </p>
      </div>

      <style>{`
        .mw-note { margin: 0 0 1.25rem; font-size: 15px; color: var(--color-ink-soft); }
        .mw-threads { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1.5rem; }
        .mw-thread { display: flex; flex-direction: column; gap: 0.4rem; }
        .mw-bar { display: flex; height: 2.75rem; border: 1px solid var(--color-rule); overflow: hidden; }
        .mw-seg { display: flex; align-items: center; padding: 0 0.5rem; overflow: hidden; border-right: 1px solid var(--color-paper); }
        .mw-seg:last-child { border-right: 0; }
        .mw-seg-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.02em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mw-sys { background: var(--color-paper-deep); color: var(--color-ash); }
        .mw-you { background: #d8cbb2; color: var(--color-ink); }
        .mw-ai { background: #e6decb; color: var(--color-ink-soft); }
        .mw-mem { background: var(--color-crimson); color: var(--color-paper); }
        .mw-join { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-ash); text-align: center; padding: 0.2rem 0; }
        .mw-join.is-on { color: var(--color-crimson); }
        .mw-result { margin: 1.25rem 0 0; font-size: 15px; color: var(--color-ink); }
        .mw-caption { margin: 1rem 0 0; font-style: italic; font-size: 14.5px; color: var(--color-ink-soft); }
        .mw-harvard { display: block; margin: 1rem 0 0; line-height: 1.5; }
      `}</style>
    </div>
  );
}

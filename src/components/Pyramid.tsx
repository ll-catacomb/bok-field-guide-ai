"use client";

import { useState } from "react";
import { TIERS } from "@/data/pyramid";

// Three stacked trapezoids, widest at the base. Click a tier to expand its
// detail panel. Static geometry (no scroll animation yet).
export function Pyramid() {
  const [open, setOpen] = useState<string>("foundation");
  // Render apex first (top of the pyramid), foundation last (base).
  const ordered = [...TIERS].sort((a, b) => b.level - a.level);
  const active = TIERS.find((t) => t.key === open) ?? null;

  const widths = { 3: 42, 2: 66, 1: 92 }; // % width per level

  return (
    <div className="pyr">
      <div className="pyr-stack" role="list">
        {ordered.map((t) => {
          const isOpen = t.key === open;
          return (
            <button
              key={t.key}
              role="listitem"
              className={`pyr-tier ${isOpen ? "is-open" : ""}`}
              style={{ width: `${widths[t.level as 1 | 2 | 3]}%` }}
              onClick={() => setOpen(t.key)}
              aria-expanded={isOpen}
            >
              <span className="pyr-level">{String(t.level).padStart(2, "0")}</span>
              <span className="pyr-name font-display">{t.name}</span>
              <span className="pyr-short">{t.short}</span>
            </button>
          );
        })}
        <div className="pyr-base-label tag" aria-hidden="true">
          load-bearing ↑ · build from the bottom
        </div>
      </div>

      {active && (
        <aside className="pyr-detail" aria-live="polite">
          <div className="pyr-detail-head">
            <span className="tag">Tier {String(active.level).padStart(2, "0")}</span>
            <h3 className="font-display">{active.name}</h3>
          </div>
          <p className="pyr-def">{active.definition}</p>
          <p className="pyr-why">
            <span className="tag">why it&rsquo;s load-bearing</span>
            {active.why}
          </p>
          <div className="pyr-practices">
            <span className="tag">in practice</span>
            <ul>
              {active.practices.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <a
            className="pyr-link"
            href={active.link.href}
            target="_blank"
            rel="noreferrer"
          >
            {active.link.label} →
          </a>
        </aside>
      )}

      <style>{`
        .pyr { margin: 2.5rem 0; }
        .pyr-stack { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .pyr-tier {
          display: flex; flex-direction: column; align-items: center; gap: 0.15rem;
          padding: 1rem 1.25rem; border: 1px solid var(--color-rule);
          background: var(--color-paper-deep); cursor: pointer; text-align: center;
          transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
          clip-path: polygon(8% 0, 92% 0, 100% 100%, 0 100%);
        }
        .pyr-tier:hover { transform: translateY(-1px); }
        .pyr-tier.is-open { background: var(--color-crimson); border-color: var(--color-crimson); }
        .pyr-tier.is-open .pyr-name, .pyr-tier.is-open .pyr-short, .pyr-tier.is-open .pyr-level { color: var(--color-paper); }
        .pyr-level { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; color: var(--color-ash); }
        .pyr-name { font-size: 1.35rem; line-height: 1; color: var(--color-ink); }
        .pyr-short { font-size: 12px; font-style: italic; color: var(--color-ash); max-width: 26rem; }
        .pyr-base-label { margin-top: 0.6rem; }

        .pyr-detail { margin-top: 2rem; border: 1px solid var(--color-rule); border-left: 3px solid var(--color-crimson); background: var(--color-paper); padding: 1.5rem 1.4rem; }
        .pyr-detail-head { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 0.75rem; }
        .pyr-detail-head h3 { margin: 0; font-size: 1.5rem; font-weight: 400; }
        .pyr-def { margin: 0 0 1.1rem; font-size: 16px; }
        .pyr-why { margin: 0 0 1.1rem; font-size: 15px; color: var(--color-ink-soft); }
        .pyr-why .tag, .pyr-practices .tag { display: block; margin-bottom: 0.35rem; color: var(--color-crimson); }
        .pyr-practices ul { margin: 0; padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .pyr-practices li { font-size: 15px; }
        .pyr-link { display: inline-block; margin-top: 1.25rem; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; color: var(--color-crimson); text-decoration: none; border-bottom: 1px solid rgba(165,28,48,0.35); padding-bottom: 1px; }
        .pyr-link:hover { border-bottom-color: var(--color-crimson); }
      `}</style>
    </div>
  );
}

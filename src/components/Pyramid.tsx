"use client";

import { useState } from "react";
import { TIERS } from "@/data/pyramid";
import { TermText } from "@/components/TermText";

// Three stacked trapezoids, widest at the base. Click a tier to expand its
// detail panel. Static geometry (no scroll animation yet).
export function Pyramid() {
  const [open, setOpen] = useState<string>("foundation");
  // Render apex first (top of the pyramid), foundation last (base).
  const ordered = [...TIERS].sort((a, b) => b.level - a.level);
  const active = TIERS.find((t) => t.key === open) ?? null;

  return (
    <div className="pyr">
      {/* One triangle, sliced into three horizontal bands. The pyramid shape
          comes entirely from the clip on .pyr-stack, so the tiers stay full
          width and their edges always meet cleanly. */}
      <div className="pyr-stack" role="list">
        {ordered.map((t) => {
          const isOpen = t.key === open;
          return (
            <button
              key={t.key}
              role="listitem"
              className={`pyr-tier ${isOpen ? "is-open" : ""} ${t.level === 3 ? "is-apex" : ""}`}
              onClick={() => setOpen(t.key)}
              aria-expanded={isOpen}
            >
              <span className="pyr-level">{String(t.level).padStart(2, "0")}</span>
              <span className="pyr-name font-display">{t.name}</span>
              <span className="pyr-short">{t.short}</span>
            </button>
          );
        })}
      </div>
      <div className="pyr-base-label tag" aria-hidden="true">
        load-bearing ↑ · build from the bottom
      </div>

      {active && (
        <aside className="pyr-detail" aria-live="polite">
          <div className="pyr-detail-head">
            <span className="tag">Tier {String(active.level).padStart(2, "0")}</span>
            <h3 className="font-display">{active.name}</h3>
          </div>
          <p className="pyr-def">
            <TermText>{active.definition}</TermText>
          </p>
          <p className="pyr-why">
            <span className="tag">why it&rsquo;s load-bearing</span>
            <TermText>{active.why}</TermText>
          </p>
          <div className="pyr-practices">
            <span className="tag">in practice</span>
            <ul>
              {active.practices.map((p) => (
                <li key={p}>
                  <TermText>{p}</TermText>
                </li>
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
        /* The whole stack is clipped to a single triangle. Every tier is full
           width; the clip alone carves the pyramid, so tier edges always align. */
        .pyr-stack {
          max-width: 48rem; margin: 0 auto;
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
          display: flex; flex-direction: column;
        }
        .pyr-tier {
          width: 100%; display: flex; flex-direction: column; align-items: center; gap: 0.15rem;
          padding: 1.15rem 1.25rem; border: 0; cursor: pointer; text-align: center;
          background: var(--color-paper-deep);
          transition: background 180ms ease;
        }
        /* Thin band separators (the side overhang is clipped away by the triangle). */
        .pyr-tier + .pyr-tier { border-top: 1px solid var(--color-rule); }
        /* The apex band sits under the point; extra top padding drops the label
           down into the wider part of the triangle so it reads cleanly. */
        .pyr-tier.is-apex { padding-top: 3.4rem; }
        .pyr-tier.is-apex .pyr-name { font-size: 1.2rem; }
        .pyr-tier.is-apex .pyr-short { max-width: 17rem; }
        /* The base band needs to reach the bottom corners; a little more height
           keeps its proportions right against the wide foot of the triangle. */
        .pyr-tier:last-child { padding-bottom: 1.6rem; }
        .pyr-tier.is-open { background: var(--color-crimson); }
        .pyr-tier.is-open .pyr-name, .pyr-tier.is-open .pyr-short, .pyr-tier.is-open .pyr-level { color: var(--color-paper); }
        .pyr-level { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; color: var(--color-ash); }
        .pyr-name { font-size: 1.35rem; line-height: 1; color: var(--color-ink); }
        .pyr-short { font-size: 12px; font-style: italic; color: var(--color-ash); max-width: 26rem; }
        .pyr-base-label { display: block; text-align: center; margin-top: 0.6rem; }

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

import {
  PROVIDERS,
  SURFACE_COLUMNS,
  COMPANIONS,
} from "@/data/harvard-tools";

// A static, legible matrix. The interactive/animated atlas (à la the vibe-atlas
// spectrum) is deferred with the other scroll mechanics — for now the value is
// clarity: same three engines, four surfaces each, ordered by how much they see.
export function HarvardAtlas() {
  return (
    <div className="atlas">
      <div className="atlas-axis" aria-hidden="true">
        <span>you see every string</span>
        <span>the tool handles more for you →</span>
      </div>

      <div className="atlas-grid" role="table" aria-label="Harvard AI tools by surface">
        <div className="atlas-row atlas-head" role="row">
          <div className="atlas-provider-cell" role="columnheader" />
          {SURFACE_COLUMNS.map((c) => (
            <div key={c.key} className="atlas-col-head" role="columnheader">
              <span className="atlas-col-label">{c.label}</span>
              <span className="atlas-col-hint">{c.hint}</span>
            </div>
          ))}
        </div>

        {PROVIDERS.map((p) => (
          <div key={p.key} className="atlas-row" role="row">
            <div className="atlas-provider-cell" role="rowheader">
              <span className="atlas-provider-name font-display">{p.name}</span>
              <span className="atlas-provider-blurb">{p.blurb}</span>
            </div>
            {SURFACE_COLUMNS.map((c) => {
              const s = p.surfaces[c.key];
              return (
                <div key={c.key} className="atlas-cell" role="cell">
                  <span className="atlas-cell-name">{s.name}</span>
                  <span className="atlas-cell-note">{s.note}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="atlas-companions">
        <span className="tag">companion tools</span>
        <ul>
          {COMPANIONS.map((c) => (
            <li key={c.name}>
              {c.href ? (
                <a
                  className="atlas-comp-name"
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.name}
                </a>
              ) : (
                <span className="atlas-comp-name">{c.name}</span>
              )}
              <span className="atlas-comp-note">{c.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .atlas { margin: 2.5rem 0; }
        .atlas-axis { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-ash); margin-bottom: 0.5rem; }
        .atlas-grid { border: 1px solid var(--color-rule); }
        .atlas-row { display: grid; grid-template-columns: 1.3fr repeat(4, 1fr); }
        .atlas-row + .atlas-row { border-top: 1px solid var(--color-rule); }
        .atlas-head { background: var(--color-paper-deep); }
        .atlas-col-head { padding: 0.6rem 0.7rem; border-left: 1px solid var(--color-rule); display: flex; flex-direction: column; gap: 0.2rem; }
        .atlas-col-label { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-crimson); }
        .atlas-col-hint { font-size: 12px; font-style: italic; color: var(--color-ash); line-height: 1.3; }
        .atlas-provider-cell { padding: 0.75rem 0.8rem; display: flex; flex-direction: column; gap: 0.35rem; }
        .atlas-provider-name { font-size: 1.35rem; line-height: 1; }
        .atlas-provider-blurb { font-size: 13px; color: var(--color-ink-soft); line-height: 1.4; }
        .atlas-cell { padding: 0.75rem 0.7rem; border-left: 1px solid var(--color-rule); display: flex; flex-direction: column; gap: 0.3rem; }
        .atlas-cell-name { font-family: var(--font-mono); font-size: 13.5px; color: var(--color-ink); }
        .atlas-cell-note { font-size: 12.5px; color: var(--color-ash); line-height: 1.35; }
        .atlas-companions { margin-top: 1.75rem; }
        .atlas-companions ul { list-style: none; margin: 0.6rem 0 0; padding: 0; display: grid; gap: 0.55rem; }
        .atlas-companions li { display: flex; flex-direction: column; gap: 0.15rem; padding-left: 0.9rem; border-left: 2px solid var(--color-gold); }
        .atlas-comp-name { font-family: var(--font-mono); font-size: 13px; }
        .atlas-comp-note { font-size: 13px; color: var(--color-ink-soft); }
        @media (max-width: 720px) {
          .atlas-row { grid-template-columns: 1fr 1fr; }
          .atlas-head { display: none; }
          .atlas-provider-cell { grid-column: 1 / -1; border-bottom: 1px solid var(--color-rule); background: var(--color-paper-deep); }
          .atlas-cell { border-left: 1px solid var(--color-rule); border-top: 1px solid var(--color-rule); }
          .atlas-cell::before { content: attr(data-label); }
        }
      `}</style>
    </div>
  );
}

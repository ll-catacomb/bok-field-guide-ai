// A static schematic of the core exchange — string → LLM → string — rendered
// as styled nodes rather than an ASCII code block. No interactivity; the
// StringInStringOut module just below makes it playable.
export function EngineDiagram() {
  return (
    <figure className="engine-diagram" aria-label="A string goes into the LLM and a string comes out.">
      <div className="ed-node ed-io">
        <span className="ed-cap">your prompt</span>
        <span className="ed-sub">a string</span>
      </div>

      <div className="ed-arrow" aria-hidden="true">
        <span className="ed-line" />
        <span className="ed-head">▶</span>
      </div>

      <div className="ed-node ed-llm">
        <span className="ed-llm-title">LLM</span>
        <span className="ed-sub ed-sub-inv">tokens in / out</span>
      </div>

      <div className="ed-arrow" aria-hidden="true">
        <span className="ed-line" />
        <span className="ed-head">▶</span>
      </div>

      <div className="ed-node ed-io">
        <span className="ed-cap">model response</span>
        <span className="ed-sub">a string</span>
      </div>

      <style>{`
        .engine-diagram {
          display: flex;
          align-items: stretch;
          gap: 0;
          margin: 2rem 0;
        }
        .ed-node {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          padding: 1.25rem 0.75rem;
          text-align: center;
          min-height: 5rem;
        }
        .ed-io {
          border: 1px solid var(--color-rule);
          background: var(--color-paper);
        }
        .ed-llm {
          flex: 0 0 auto;
          min-width: 6.5rem;
          background: var(--color-ink);
          border: 1px solid var(--color-ink);
        }
        .ed-cap {
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--color-ink);
        }
        .ed-llm-title {
          font-family: var(--font-mono);
          font-size: 15px;
          letter-spacing: 0.14em;
          color: var(--color-paper);
        }
        .ed-sub {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-ash);
        }
        .ed-sub-inv { color: var(--color-bone-soft); }
        .ed-arrow {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 0 0.5rem;
        }
        .ed-line {
          display: block;
          width: 1.75rem;
          height: 1px;
          background: var(--color-crimson);
        }
        .ed-head {
          color: var(--color-crimson);
          font-size: 11px;
          line-height: 1;
          margin-left: -2px;
        }
        @media (max-width: 560px) {
          .engine-diagram { flex-direction: column; align-items: stretch; }
          .ed-llm { min-width: 0; }
          .ed-arrow { padding: 0.4rem 0; transform: rotate(90deg); }
        }
      `}</style>
    </figure>
  );
}

// Two flavors of tool call along the input/output axis: "hands" (extend what
// the model can DO) and "eyes" (extend what it can SEE). The woodcut above —
// a hand grasping two eye-topped stems — carries the metaphor.

const HANDS = [
  { name: "Run code / calculate", note: "a code executor runs Python the model writes — the multiplication demo" },
  { name: "Call an API", note: "query a database, send an email, look up a calendar or a price" },
  { name: "Generate an image", note: "hand the prompt to a diffusion model (DALL·E, Imagen) and get a picture back" },
];

const EYES = [
  { name: "Read a pasted image", note: "native in today's chat models; a captioning step in text-only setups" },
  { name: "Web search + fetch", note: "pull in current information from beyond the training data" },
  { name: "Read files & extract PDF text", note: "open the actual document, spreadsheet, or codebase" },
  { name: "Retrieve (RAG)", note: "search a large library and return only the most relevant passages" },
];

export function ToolCategories() {
  return (
    <div className="tc">
      <figure className="tc-fig">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="tc-woodcut"
          src="/images/eye-hand.png"
          alt="A woodcut of a hand grasping two stems that each open into a wide, watching eye."
        />
      </figure>

      <div className="tc-grid">
        <div className="tc-col">
          <div className="tc-head">
            <span className="tc-name font-display">Hands</span>
            <span className="tc-sub">extend what it can <em>do</em> — the output side</span>
          </div>
          <ul className="tc-list">
            {HANDS.map((t) => (
              <li key={t.name}>
                <span className="tc-item">{t.name}</span>
                <span className="tc-note">{t.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="tc-col">
          <div className="tc-head">
            <span className="tc-name font-display">Eyes</span>
            <span className="tc-sub">extend what it can <em>see</em> — the input side</span>
          </div>
          <ul className="tc-list">
            {EYES.map((t) => (
              <li key={t.name}>
                <span className="tc-item">{t.name}</span>
                <span className="tc-note">{t.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="tc-caption">
        In both, the model supplies the <em>judgment</em> — it recognizes it needs
        a tool and writes the call — and the tool supplies the <em>precision</em>.
      </p>

      <style>{`
        .tc { margin: 2rem 0; }
        .tc-fig { margin: 0 0 1.5rem; display: flex; justify-content: center; }
        .tc-woodcut { display: block; width: auto; height: auto; max-width: 240px; max-height: 240px; }
        .tc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 640px) { .tc-grid { grid-template-columns: 1fr; } }
        .tc-col { border: 1px solid var(--color-rule); background: var(--color-paper); }
        .tc-head { padding: 0.85rem 1rem; border-bottom: 1px solid var(--color-rule); background: var(--color-paper-deep); }
        .tc-name { display: block; font-size: 1.5rem; line-height: 1; color: var(--color-crimson); }
        .tc-sub { display: block; margin-top: 0.2rem; font-size: 12px; font-style: italic; color: var(--color-ash); }
        .tc-list { list-style: none; margin: 0; padding: 0.5rem 0; }
        .tc-list li { display: flex; flex-direction: column; gap: 0.1rem; padding: 0.5rem 1rem; }
        .tc-list li + li { border-top: 1px solid var(--color-rule); }
        .tc-item { font-family: var(--font-mono); font-size: 13px; color: var(--color-ink); }
        .tc-note { font-size: 13px; color: var(--color-ink-soft); line-height: 1.4; }
        .tc-caption { margin: 1.25rem 0 0; font-style: italic; font-size: 14.5px; color: var(--color-ink); }
      `}</style>
    </div>
  );
}

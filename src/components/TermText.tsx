"use client";

import React from "react";
import { Term } from "./Term";

// Wraps distinctive glossary phrases inside a plain string of data-driven text
// (pyramid tiers, gallery blurbs, recipe steps) so they get hover cards without
// hand-editing every data file. Deliberately conservative: only multi-word or
// unambiguous phrases are listed, each id is wrapped at most once per string,
// matches must sit on word boundaries, and matches never overlap. Longer, more
// specific phrases are listed first so they win.
const PHRASES: { phrase: string; id: string }[] = [
  { phrase: "retrieval-augmented generation", id: "rag" },
  { phrase: "Model Context Protocol", id: "mcp" },
  { phrase: "large language model", id: "llm" },
  { phrase: "context window", id: "context-window" },
  { phrase: "custom GPTs", id: "custom-gpt" },
  { phrase: "custom GPT", id: "custom-gpt" },
  { phrase: "NotebookLM", id: "notebooklm" },
  { phrase: "tokenization", id: "token" },
  { phrase: "tokenizer", id: "token" },
  { phrase: "grounding", id: "grounding" },
  { phrase: "grounded", id: "grounding" },
  { phrase: "corpus", id: "corpus" },
];

const isBoundary = (ch: string | undefined) =>
  ch === undefined || !/[a-z0-9]/i.test(ch);

export function TermText({ children }: { children: string }) {
  const text = children;
  const lower = text.toLowerCase();
  const used = new Set<string>();
  const chosen: { start: number; end: number; id: string }[] = [];

  for (const { phrase, id } of PHRASES) {
    if (used.has(id)) continue;
    const p = phrase.toLowerCase();
    let from = 0;
    for (;;) {
      const idx = lower.indexOf(p, from);
      if (idx === -1) break;
      const end = idx + p.length;
      if (isBoundary(text[idx - 1]) && isBoundary(text[end])) {
        const overlaps = chosen.some((c) => idx < c.end && end > c.start);
        if (!overlaps) {
          chosen.push({ start: idx, end, id });
          used.add(id);
        }
        break;
      }
      from = end;
    }
  }

  if (chosen.length === 0) return <>{text}</>;
  chosen.sort((a, b) => a.start - b.start);

  const out: React.ReactNode[] = [];
  let cursor = 0;
  chosen.forEach((c, i) => {
    if (c.start > cursor) out.push(text.slice(cursor, c.start));
    out.push(
      <Term id={c.id} key={`${c.id}-${i}`}>
        {text.slice(c.start, c.end)}
      </Term>,
    );
    cursor = c.end;
  });
  if (cursor < text.length) out.push(text.slice(cursor));

  return <>{out}</>;
}

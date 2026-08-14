// Not a client module: these are pure helpers that produce <Term> (client)
// elements, so they can run during server render (the MDX <p>/<li> overrides).
import React from "react";
import { Term } from "./Term";

// Auto-glossary. Wraps EVERY occurrence of a curated set of distinctive terms
// so each gets its own hover card, wherever the word appears. Two entry points:
//   • wrapChildren(children) — recursive, for React trees (MDX <p>/<li>). Skips
//     existing <Term> and <a>/<code> so nothing double-wraps.
//   • <TermText>{string}</TermText> — for plain data-driven strings.
// The list is deliberately conservative: multi-word phrases, domain acronyms
// (case-sensitive), and unambiguous single words only — never bare "model",
// "context", "key", "window", "prompt", "parameters".
type Phrase = { phrase: string; id: string; cs?: boolean };

const PHRASES: Phrase[] = [
  { phrase: "Model Context Protocol", id: "mcp" },
  { phrase: "context engineering", id: "context-engineering" },
  { phrase: "context window", id: "context-window" },
  { phrase: "machine learning", id: "machine-learning" },
  { phrase: "custom GPTs", id: "custom-gpt" },
  { phrase: "custom GPT", id: "custom-gpt" },
  { phrase: "secret key", id: "api-key" },
  { phrase: "tool calls", id: "tool-call" },
  { phrase: "tool call", id: "tool-call" },
  { phrase: "NotebookLM", id: "notebooklm" },
  { phrase: "tokenization", id: "token" },
  { phrase: "tokenizer", id: "token" },
  { phrase: "hallucination", id: "grounding" },
  { phrase: "compaction", id: "compaction" },
  { phrase: "embeddings", id: "embedding" },
  { phrase: "embedding", id: "embedding" },
  { phrase: "generative", id: "generative" },
  { phrase: "diffusion", id: "diffusion" },
  { phrase: "grounding", id: "grounding" },
  { phrase: "grounded", id: "grounding" },
  { phrase: "harnesses", id: "harness" },
  { phrase: "harness", id: "harness" },
  { phrase: "corpora", id: "corpus" },
  { phrase: "corpus", id: "corpus" },
  { phrase: "vectors", id: "embedding" },
  { phrase: "vector", id: "embedding" },
  { phrase: "chunks", id: "chunk" },
  { phrase: "chunk", id: "chunk" },
  { phrase: "agents", id: "agent" },
  { phrase: "agent", id: "agent" },
  { phrase: "tokens", id: "token" },
  { phrase: "token", id: "token" },
  { phrase: "memory", id: "memory" },
  // case-sensitive acronyms
  { phrase: "APIs", id: "api", cs: true },
  { phrase: "API", id: "api", cs: true },
  { phrase: "LLMs", id: "llm", cs: true },
  { phrase: "LLM", id: "llm", cs: true },
  { phrase: "RAG", id: "rag", cs: true },
  { phrase: "MCP", id: "mcp", cs: true },
]
  // longest first, so "tokenization" beats "token", "context window" beats none, etc.
  .sort((a, b) => b.phrase.length - a.phrase.length);

const isBoundary = (ch: string | undefined) =>
  ch === undefined || !/[a-z0-9]/i.test(ch);

// Wrap every non-overlapping, boundary-aligned occurrence in one left-to-right pass.
function wrapString(text: string): React.ReactNode {
  const lower = text.toLowerCase();
  const out: React.ReactNode[] = [];
  let buf = "";
  let i = 0;
  let n = 0;

  while (i < text.length) {
    let hit: { len: number; id: string } | null = null;
    for (const { phrase, id, cs } of PHRASES) {
      const len = phrase.length;
      const matches = cs
        ? text.slice(i, i + len) === phrase
        : lower.slice(i, i + len) === phrase.toLowerCase();
      if (matches && isBoundary(text[i - 1]) && isBoundary(text[i + len])) {
        hit = { len, id };
        break;
      }
    }
    if (hit) {
      if (buf) {
        out.push(buf);
        buf = "";
      }
      out.push(
        <Term id={hit.id} key={`t${i}-${n++}`}>
          {text.slice(i, i + hit.len)}
        </Term>,
      );
      i += hit.len;
    } else {
      buf += text[i];
      i += 1;
    }
  }
  if (buf) out.push(buf);

  return out.length === 1 ? out[0] : out;
}

// Recursively wrap text nodes in a React tree, leaving structure intact and
// never descending into an existing <Term>, a link, or code.
export function wrapChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === "string") return wrapString(child);
    if (!React.isValidElement(child)) return child;

    const type = child.type;
    if (type === Term || type === "a" || type === "code" || type === "pre") {
      return child;
    }
    const props = child.props as { children?: React.ReactNode };
    if (props && props.children != null) {
      return React.cloneElement(child, {}, wrapChildren(props.children));
    }
    return child;
  });
}

export function TermText({ children }: { children: string }) {
  return <>{wrapString(children)}</>;
}

// Same as TermText, but also renders [label](href) as a link, so data strings
// (pyramid practices, say) can carry a reference without becoming JSX.
const MD_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function LinkedText({ children }: { children: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of children.matchAll(MD_LINK)) {
    const at = m.index ?? 0;
    if (at > last) out.push(wrapString(children.slice(last, at)));
    out.push(
      <a key={at} href={m[2]} target="_blank" rel="noreferrer">
        {m[1]}
      </a>,
    );
    last = at + m[0].length;
  }
  if (last < children.length) out.push(wrapString(children.slice(last)));
  return <>{out}</>;
}

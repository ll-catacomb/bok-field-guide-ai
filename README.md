# The Bok Field Guide to Generative AI in Higher Education

An asynchronous, interactive tutorial site introducing AI basics to higher-ed
faculty, from the Harvard Bok Center / Learning Lab. It works outward from the
engine underneath (string in, string out) to the specific tools Harvard puts on
your desk, then turns to the teaching: a pyramid of course structure →
AI-resilience → AI integration, and a gallery of project types.

The visual language is a bone/white "field guide" — Fraunces + EB Garamond +
IBM Plex Mono + a blackletter display face, Harvard crimson, catalog scaffolding
(plate labels, tags, drop caps, film grain).

## Interactives

The home tutorial is intercut with real, client-side widgets (no API keys, no
live model calls — the text→output demos are scripted):

- **String in, string out** — the core exchange, with a "what the model sees"
  view that flips the words into token integers (`gpt-tokenizer`).
- **Tokenizer** — a live tokenizer; watch text shatter into tokens and reveal
  their integer IDs.
- **Learning to write** — a faithful re-creation of the NYT "BabyGPT" piece:
  step through training checkpoints (0 → 30,000 rounds) as output climbs out of
  noise into fluent prose.
- **Multiplication** — the "it predicts, it doesn't compute" demo: a plausible
  wrong answer, then a Python tool that fixes it, then a side-by-side comparison.
- **Grounding** — the Coriolanus "you're right, it absolutely exists" pattern,
  shown both ways at once (cold vs. with the text).
- **Context window** + **A conversation fills up** — the finite window, and
  compaction over a long thread.
- **Memory** — why a new chat forgets, and how memory carries context forward.
- **Harvard atlas** — Claude / ChatGPT / Gemini across Web / Desktop / IDE / CLI.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · MDX
(`@next/mdx`) · `gpt-tokenizer`. Fonts via `next/font/google`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint
```

## Editing content

All of the home-page text lives in one file: **`src/content/home.mdx`** (hero and
body alike). The pyramid, gallery, and Harvard atlas are data-driven under
`src/data/`. Each interactive's copy lives at the top of its file in
`src/components/interactive/`.

## Notes

- Medieval-motif imagery renders as legible placeholder blocks until real assets
  are dropped into `public/images/`.
- Deferred by design: scroll-triggered animation, an animated canvas atlas, and
  live model calls.

## License

MIT — see [LICENSE](./LICENSE).

// First projects, framed as the thing you've actually wanted to do for years —
// not a chore, a longing. Each is still nothing more than ingredients (inputs) →
// steps (operations) → dish (output). The capabilities come from the Learning
// Lab workshops (see ~/Development/claude-code-20260603/examples); the framing is
// deliberately personal, because the first project you finish is the one you care
// about.

export type Recipe = {
  key: string;
  title: string;
  field: string;
  ingredients: string[];
  steps: string[];
  dish: string;
  why: string;
};

export const RECIPES: Recipe[] = [
  {
    key: "japanese-poetry",
    title: "The Lost Anthology",
    field: "Japanese · translation",
    ingredients: [
      "Photocopies of an out-of-print poetry collection — scans or even phone photos of the pages",
      "A note on the romanization and translation style you want",
    ],
    steps: [
      "Read each page image; transcribe the Japanese, kana and kanji intact",
      "Set romaji and a faithful English translation beneath each poem",
      "Flag anything genuinely illegible for your eye, rather than guessing",
    ],
    dish: "A clean, searchable digital edition of the anthology — the book you thought was gone, yours again.",
    why: "Those photocopies have sat in a drawer for years. This is the project that finally opens them.",
  },
  {
    key: "qubit-visualizer",
    title: "The Qubit You Could Never Draw",
    field: "physics · interactive",
    ingredients: [
      "A one-page brief: the states and gates you want a student to see",
      "The exact computations, hardcoded — no live math engine, just the numbers you trust",
    ],
    steps: [
      "Design a Bloch-sphere / state-vector visualization for the concept",
      "Wire in your hardcoded computations so every step is correct by construction",
      "Add captions a first-year could follow; write a short rationale for yourself",
    ],
    dish: "A single self-contained HTML interactive — double-click to open, hand to a student, no install.",
    why: "You've drawn superposition at the whiteboard for a decade. This is the picture you always wanted to hand over.",
  },
  {
    key: "fourteen-odysseys",
    title: "Fourteen Odysseys",
    field: "languages · philology",
    ingredients: [
      "The translations you've collected over the years (here, the Odyssey in fourteen English versions) plus the Greek",
      "Optionally, a second work in another script you've meant to sit beside it",
    ],
    steps: [
      "Split each translation into per-book files",
      "Set your chosen passages beside the original — version against version",
      "Name the rhetorical figures and mark where the translators quietly diverge",
    ],
    dish: "Per-book passage files with the Greek and every translation aligned — the comparison you never had time to lay out by hand.",
    why: "The parallel reading you've done in your head for years, finally on the page and shareable.",
  },
  {
    key: "song-lineage",
    title: "Who the Songs Were Listening To",
    field: "music · corpora",
    ingredients: [
      "A corpus you care about as JSON (here, 538 song lyrics)",
      "One rule you set yourself: no keyword search — the model has to read",
    ],
    steps: [
      "Batch the corpus fifty items at a time",
      "Read each as a close reader; find every artist named, with verbatim quotes",
      "Aggregate the batches and write the lineage out in prose, ordered by year",
    ],
    dish: "Per-batch JSON, a master file, and a prose history of who was echoing whom.",
    why: "The question you've carried since grad school — who cites whom — answerable at last across the whole corpus.",
  },
  {
    key: "research-stack",
    title: "The Stack You Never Read Together",
    field: "research · synthesis",
    ingredients: [
      "The papers piling up on your desk (PDFs)",
      "One line naming the through-question you keep circling",
    ],
    steps: [
      "Read each paper in full",
      "Summarize its claims, method, evidence, and limits faithfully",
      "Name the bridge to your own work; mark speculation as speculation",
    ],
    dish: "One self-contained HTML brief per paper, plus an index that finally puts them in a single conversation.",
    why: "Not a lit review you owe someone — the synthesis you've wanted to see for your own thinking.",
  },
  {
    key: "unfinished-interviews",
    title: "The Interviews You Never Finished Coding",
    field: "social science",
    ingredients: [
      "The transcripts and codebook (CSV) you started and set aside",
      "A published coding methodology you trust",
    ],
    steps: [
      "Index each transcript by broad topic codes",
      "Apply your analytic codes to the indexed sections",
      "Audit for negative cases, then synthesize a typology",
    ],
    dish: "A research-results essay (HTML + Markdown), with a worked example at every step so you can check its judgment.",
    why: "The dataset you couldn't face finishing by hand — now moving again, with you still holding the interpretation.",
  },
  {
    key: "paper-teachable",
    title: "Your Paper, Finally Teachable",
    field: "any discipline",
    ingredients: ["One published paper you wish your students actually read (ideally your own)"],
    steps: [
      "Extract the paper's framework",
      "Generate student-facing case studies and discussion plans",
      "Build objection audits and an end-of-class quiz",
      "Assemble it into a single landing page",
    ],
    dish: "A teaching packet: a case-study homepage linking cases, plans, audits, and a quiz.",
    why: "The scholarship you're proudest of, turned into the class session you never had time to build around it.",
  },
];

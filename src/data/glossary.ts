// The field guide's glossary. Each entry is a piece of jargon that appears in
// the prose; wrap the first occurrence in <Term id="slug">…</Term> and the
// reader gets a hover card with this definition (and any links). Keep
// definitions to 1–3 plain sentences, in the guide's voice.

export type GlossaryLink = { text: string; href: string };

export type GlossaryEntry = {
  term: string; // display heading on the card
  definition: string;
  links?: GlossaryLink[];
  aliases?: string[]; // for reference / future auto-linking
};

export const GLOSSARY: Record<string, GlossaryEntry> = {
  "machine-learning": {
    term: "Machine learning",
    definition:
      "Systems that improve at a task by finding patterns in data rather than following hand-written rules — the older family of AI that already runs spam filters, recommendations, and fraud detection.",
  },
  generative: {
    term: "Generative AI",
    definition:
      "AI that produces new text, images, audio, or video, rather than only classifying, ranking, or filtering data that already exists.",
  },
  diffusion: {
    term: "Diffusion model",
    definition:
      "The image-generating kind of model (DALL·E, Imagen, Midjourney): it starts from noise and repeatedly denoises it into a picture. A different engine from the language models this guide is about.",
    aliases: ["diffusion models"],
  },
  llm: {
    term: "Large language model (LLM)",
    definition:
      "The text-in, text-out engine behind Claude, ChatGPT, and Gemini. Given a string of text, it predicts the most likely next chunk of text, one token at a time — and that single move, at scale, reads as fluent thought.",
    aliases: ["large language model", "LLM"],
    links: [
      {
        text: "Karpathy — Deep Dive into LLMs",
        href: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
      },
    ],
  },
  token: {
    term: "Token",
    definition:
      "The unit a model actually reads. Text is split into tokens — whole words, word-fragments, or characters — each mapped to an integer. The model predicts the next token, not the next letter or word, which is why it can miscount letters or stumble on rare names. (A tokenizer is the tool that does the splitting.)",
    aliases: ["tokens", "tokenizer", "tokenization"],
  },
  parameters: {
    term: "Parameters",
    definition:
      "The billions of adjustable numbers inside a model, tuned during training. They hold everything it has learned; “a larger model” usually means one with more parameters.",
  },
  "context-window": {
    term: "Context window",
    definition:
      "The fixed-size workspace a model can see at once — your prompt, the files you paste, its replies, all of it. Everything it reasons over must fit inside; when the window fills, quality drops and the model gets “lost in the middle.”",
    aliases: ["context", "window"],
  },
  "context-engineering": {
    term: "Context engineering",
    definition:
      "The craft of curating what goes into the context window: the smallest set of high-signal tokens that make the right output likely. Choosing what to include — and what to leave out — is most of the skill.",
    links: [
      {
        text: "Anthropic — Building Effective Agents",
        href: "https://www.anthropic.com/engineering/building-effective-agents",
      },
    ],
  },
  compaction: {
    term: "Compaction",
    definition:
      "When a conversation fills the context window, most tools summarize the older turns and pass the summary forward instead of stopping. The chat feels seamless, but the model is now reasoning from a compressed recap with details dropped.",
    aliases: ["compact"],
  },
  "high-signal": {
    term: "High-signal context",
    definition:
      "The material in the context window that actually bears on the task — the passage in question, the rubric, one worked example. Because every token you spend crowds out another, curating for signal beats pasting in everything you have.",
    aliases: ["high signal", "high-signal tokens"],
  },
  "lost-in-the-middle": {
    term: "Lost in the middle",
    definition:
      "The tendency of a model to use what sits at the very start and the very end of a long context well, while material buried in the middle gets weaker attention. Put what matters most where it can be seen.",
    aliases: ["lost in the middle"],
  },
  memory: {
    term: "Memory",
    definition:
      "A small note a tool writes about you and loads into each new conversation. The simplest form of automatic context — context you never pasted, added for you.",
  },
  harness: {
    term: "Harness",
    definition:
      "The software wrapped around the raw model that turns a one-shot text function into an interactive tool — managing the context window, running tool calls, applying edits, and looping. A chat box is a thin harness; a coding agent is a thick one.",
    links: [
      {
        text: "Anthropic — Building Effective Agents",
        href: "https://www.anthropic.com/engineering/building-effective-agents",
      },
    ],
  },
  "tool-call": {
    term: "Tool call",
    definition:
      "When the model, instead of answering in prose, emits a structured request for the harness to do something — run code, read a file, search the web — and the result comes back into its context. How a text engine gets hands and eyes.",
    aliases: ["tool use", "tool calls"],
  },
  rag: {
    term: "RAG (retrieval-augmented generation)",
    definition:
      "Rather than pasting a whole corpus into the context window, you store it as chunks, retrieve only the passages relevant to the question, and feed those in. How tools answer questions about documents far too big to fit — and a quiet source of error, since it retrieves what is similar, not necessarily what is right.",
    aliases: ["retrieval", "retrieval-augmented generation"],
  },
  chunk: {
    term: "Chunk",
    definition:
      "A passage-sized slice of a longer document. Splitting a corpus into chunks is what lets retrieval pull in just the relevant parts instead of the whole thing.",
    aliases: ["chunks", "chunking"],
  },
  embedding: {
    term: "Embedding (vector)",
    definition:
      "A piece of text turned into a list of numbers that fixes it at a point in space, so texts used in similar ways land near each other — king near queen, graphene far away. What lets retrieval find passages by sense rather than exact keyword.",
    aliases: ["vector", "embeddings", "word2vec"],
    links: [
      {
        text: "TensorFlow Embedding Projector",
        href: "https://projector.tensorflow.org/",
      },
    ],
  },
  api: {
    term: "API (application programming interface)",
    definition:
      "A published set of requests a service agrees to answer, so one program can ask another for data or actions over the network — the doorway a harness knocks on to reach a live service.",
    aliases: ["APIs"],
  },
  "api-key": {
    term: "Secret key",
    definition:
      "A secret string that proves a request is allowed — a password for machines. The service checks the key before it returns any data, which is why keys must be kept private.",
    aliases: ["secret key", "API key", "key"],
  },
  mcp: {
    term: "MCP (Model Context Protocol)",
    definition:
      "An open standard — a universal port, one plug shape every service agrees to accept — for connecting a harness to external tools and data. Run one small server per service and the harness only ever needs to speak MCP, instead of learning every service's private API.",
    aliases: ["Model Context Protocol"],
    links: [
      { text: "modelcontextprotocol.io", href: "https://modelcontextprotocol.io" },
    ],
  },
  grounding: {
    term: "Grounding",
    definition:
      "Giving the model the actual source — the passage, the data, the document — so it answers from what's in front of it instead of guessing from memory. The direct remedy for hallucination, a confident but made-up answer.",
    aliases: ["grounded", "hallucination", "hallucinate"],
  },
  corpus: {
    term: "Corpus",
    definition:
      "A body of texts treated as a single dataset — a poet's collected works, a term's worth of transcripts, hundreds of song lyrics — handed to a model to read or search as a whole.",
    aliases: ["corpora"],
  },
  notebooklm: {
    term: "NotebookLM",
    definition:
      "Google's tool for building a small assistant grounded in documents you upload: it answers questions, cites the sources, and won't stray beyond them. A common no-code way to make a source-grounded course helper.",
    aliases: ["Notebook LM"],
  },
  "custom-gpt": {
    term: "Custom GPT",
    definition:
      "A reusable ChatGPT configured with your own instructions and reference files, so it behaves a set way every time — the OpenAI counterpart to Claude Projects and Gemini Gems.",
    aliases: ["custom GPTs", "GPTs"],
  },
  agent: {
    term: "Agent",
    definition:
      "A model given tools, a goal, and a loop: it decides its own next steps, calls tools, and works toward the goal with little step-by-step supervision. The far end of the automation spectrum — powerful, and the place to be most careful.",
    aliases: ["autonomous agent", "agents"],
  },
  skill: {
    term: "Skill",
    definition:
      "A folder of instructions (a SKILL.md) that Claude Code loads only when your task matches its short description — a reusable playbook, kept on disk and pulled in on demand.",
    aliases: ["skills"],
  },
};

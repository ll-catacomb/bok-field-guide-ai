// The Harvard atlas: the three model providers Harvard FAS makes available to
// affiliates, mapped across the *surfaces* each one shows up in. Same engine
// underneath (string in, string out) — the surfaces differ in how much they
// see of your files and how much they do on your behalf.

export type Surface = {
  name: string;
  note: string;
};

export type Provider = {
  key: string;
  name: string;
  blurb: string;
  surfaces: {
    web: Surface;
    cli: Surface;
    ide: Surface;
    desktop: Surface;
  };
};

export const SURFACE_COLUMNS: { key: keyof Provider["surfaces"]; label: string; hint: string }[] = [
  { key: "web", label: "Browser chat", hint: "a chat window (\u201cweb UI\u201d, user interface) — you see every string" },
  { key: "desktop", label: "Desktop app", hint: "the same chat, plus files & voice, on your machine" },
  { key: "ide", label: "Editor panel (IDE)", hint: "lives inside your code editor (an IDE, integrated development environment); reads your project" },
  { key: "cli", label: "Command line (CLI)", hint: "runs in the terminal (a CLI, command-line interface); reaches your whole file system" },
];

export const PROVIDERS: Provider[] = [
  {
    key: "claude",
    name: "Claude",
    blurb: "Anthropic. Strong long-context reading and writing; the default for careful, source-grounded work.",
    surfaces: {
      web: { name: "claude.ai", note: "chat, Projects, and Artifacts (live-rendered documents & apps)" },
      desktop: { name: "Claude Desktop", note: "Mac & Windows app; connects to local files via MCP" },
      ide: { name: "Claude Code in VS Code / JetBrains", note: "editor extension that reads and edits your project" },
      cli: { name: "Claude Code", note: "terminal agent with access to your files, git, and shell" },
    },
  },
  {
    key: "chatgpt",
    name: "ChatGPT",
    blurb: "OpenAI. Broad general-purpose assistant with image generation, data analysis, and custom GPTs.",
    surfaces: {
      web: { name: "chatgpt.com", note: "chat, Code Interpreter (runs Python), and custom GPTs" },
      desktop: { name: "ChatGPT Desktop", note: "Mac & Windows app with screen and voice access" },
      ide: { name: "Codex / Copilot in VS Code", note: "in-editor assistance and inline completions" },
      cli: { name: "Codex CLI", note: "terminal coding agent that runs against your repo" },
    },
  },
  {
    key: "gemini",
    name: "Gemini",
    blurb: "Google. Deeply wired into Google Workspace and a family of study & research tools.",
    surfaces: {
      web: { name: "gemini.google.com", note: "chat with Canvas (live preview) and Deep Research" },
      desktop: { name: "Gemini in Chrome / Workspace", note: "side panel in the browser, Docs, Gmail, and Slides" },
      ide: { name: "Gemini Code Assist", note: "editor extension for VS Code and JetBrains" },
      cli: { name: "Gemini CLI", note: "open-source terminal agent" },
    },
  },
];

export type Companion = {
  name: string;
  note: string;
  href?: string;
};

// Beyond raw chat: purpose-built tools worth naming for teaching contexts.
export const COMPANIONS: Companion[] = [
  { name: "NotebookLM", note: "Google. A very good version of RAG: grounds answers strictly in sources you upload — good for course readings; generates audio overviews.", href: "https://notebooklm.google.com/" },
  { name: "Google AI Studio", note: "A sandbox for prompting Gemini directly and tuning parameters.", href: "https://aistudio.google.com/" },
  { name: "Custom GPTs", note: "Reusable ChatGPT assistants configured with instructions and reference files.", href: "https://help.openai.com/en/articles/8554397-creating-and-editing-gpts" },
  { name: "Gemini Gems", note: "Google. Reusable Gemini assistants configured with instructions and reference files — the Gemini counterpart to custom GPTs.", href: "https://gemini.google/overview/gems/" },
];

// Gallery of project *types* — each tagged with the pyramid tier(s) it serves.
// Seeded with representative examples (drawn from the Learning Lab workshop
// materials); real, credited projects get filled in later. Thumbnails are
// placeholder-artifact treatments until assets land.

export type PyramidTier = "foundation" | "resilience" | "integration";

export type Project = {
  key: string;
  title: string;
  epithet: string;
  blurb: string;
  tiers: PyramidTier[];
  status: "TEMPLATE" | "EXAMPLE" | "PLANNED";
};

export const TIER_LABEL: Record<PyramidTier, string> = {
  foundation: "structure",
  resilience: "resilience",
  integration: "integration",
};

export const PROJECTS: Project[] = [
  {
    key: "tokenization-demo",
    title: "It's All Text",
    epithet: "a five-minute tokenization activity",
    blurb:
      "Students paste text into a tokenizer and watch language become integers. Builds the core intuition every later AI discussion depends on.",
    tiers: ["foundation"],
    status: "EXAMPLE",
  },
  {
    key: "source-grounded-tutor",
    title: "Source-Grounded Tutor",
    epithet: "a NotebookLM built on the syllabus",
    blurb:
      "A course assistant that answers only from the assigned readings, with citations — extending office hours without inventing facts.",
    tiers: ["integration"],
    status: "TEMPLATE",
  },
  {
    key: "process-portfolio",
    title: "Process Portfolio",
    epithet: "assessment that survives AI",
    blurb:
      "Drafts, annotations, and a short oral defense replace the single submitted artifact — moving the grade onto the thinking, not the output.",
    tiers: ["resilience", "foundation"],
    status: "TEMPLATE",
  },
  {
    key: "adversarial-critique",
    title: "Critique the Machine",
    epithet: "students audit AI output",
    blurb:
      "Students are given AI-written answers to fact-check, extend, and grade against the rubric — turning the tool into the object of study.",
    tiers: ["resilience", "integration"],
    status: "EXAMPLE",
  },
  {
    key: "simulation-interlocutor",
    title: "Historical Interlocutor",
    epithet: "a simulated primary voice",
    blurb:
      "A carefully scoped role-play the class can interview — an opposing counsel, a historical figure, a patient case — paired with source critique.",
    tiers: ["integration"],
    status: "PLANNED",
  },
  {
    key: "rubric-first-design",
    title: "Rubric-First Assignment",
    epithet: "criteria before prompts",
    blurb:
      "A worked template for stating objectives and evaluation criteria up front — the structural groundwork the rest of the pyramid stands on.",
    tiers: ["foundation"],
    status: "TEMPLATE",
  },
];

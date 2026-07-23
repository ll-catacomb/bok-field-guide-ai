// The Bok / Learning Lab pyramid. Read bottom to top: AI integration only
// works when it rests on a resilient course, which itself rests on solid
// course structure. Skip a layer and the one above it collapses.
//
// Practices and framing draw on the Bok Center's published guidance —
// "Teaching in the Age of AI," "Designing Courses & Assignments in the Age of
// AI," and its guidance on seated (in-class) exams. See src/data/resources.ts.

export type Tier = {
  key: string;
  level: number; // 1 = foundation
  name: string;
  short: string;
  definition: string;
  why: string;
  practices: string[];
  link: { label: string; href: string };
};

export const TIERS: Tier[] = [
  {
    key: "foundation",
    level: 1,
    name: "Course structure",
    short: "the foundation — good teaching, AI or no AI",
    definition:
      "The ordinary, essential architecture of a well-designed course: clear learning objectives, a legible syllabus, well-chosen materials, worked examples, and transparent assessment criteria.",
    why: "None of this is about AI — which is exactly why it comes first. Solid structure does three things at once. First, it is simply good teaching, worth doing entirely on its own terms. Second, it is the audit that makes the tier above possible: once you have said what each assignment is actually for, you can see precisely where a student could hand the work to a model and short-circuit the learning. Third, it is the raw material for the tier at the top — clear objectives, readings, rubrics, and worked examples are exactly the context you would load into any AI tool you build for the course, whether for yourself, for your students, or for both. Get this layer right and everything above it becomes legible; skip it and the higher tiers have nothing to stand on.",
    practices: [
      "State learning objectives in terms of what students should be able to do.",
      "Write questions and prompts with precise, higher-order action verbs — “critique,” “design,” “compare” — not vague ones like “discuss” or “list” (see Bloom's taxonomy).",
      "Give students the evaluation criteria (or rubric) up front, and worked examples of the thinking you want.",
      "Make the arc of the course — why this, why now — visible in the syllabus.",
      "Once objectives are explicit, walk each assignment and mark where a model could already produce a passable version — that map is where the next tier's work begins.",
      "Keep your objectives, readings, and rubrics gathered in one place; that same bundle is the context any course AI tool will need.",
    ],
    link: {
      label: "Bok Center · Teaching in the Age of AI",
      href: "https://bokcenter.harvard.edu/artificial-intelligence",
    },
  },
  {
    key: "resilience",
    level: 2,
    name: "AI-resilience",
    short: "assignments that stay meaningful in a world with AI",
    definition:
      "Designing assessments so they still produce reliable evidence of a student's own learning even though capable AI exists — by making process visible, grounding work in the local and personal, adding in-person touchpoints, or being transparent about permitted AI use.",
    why: "A take-home essay prompt that a model can answer in ten seconds no longer measures what you think it measures. The Bok Center frames this not as detection or prohibition but as design: build work whose value survives the existence of AI, and pair it with an explicit, discussed AI policy. This is a design problem, not a policing one — and it is far easier once the foundation is solid, because the audit you did there already tells you which assignments are exposed and what each is meant to measure. On a course whose goals are vague, resilience is impossible even to judge; you cannot protect a target you never named.",
    practices: [
      "Add in-person touchpoints after submission — post-submission understanding checks, oral defenses, live interviews, or short in-class reflections.",
      "Use AI-resilient formats: blue-book or oral exams, video essays, posters, infographics, or live coding/interpretive demonstrations.",
      "Scaffold large take-home projects into steps, with some completed without devices.",
      "Where AI is permitted, require transparency: students share their prompts and their rationale for what they kept, modified, or discarded (“AI-to-human handoff,” timed no-AI checkpoints).",
      "Anchor tasks in specific course materials, local data, or personal experience.",
    ],
    link: {
      label: "Bok Center · Designing Courses & Assignments in the Age of AI",
      href: "https://bokcenter.harvard.edu/courses-and-assignments-in-age-of-ai",
    },
  },
  {
    key: "integration",
    level: 3,
    name: "AI integration",
    short: "the apex — using AI to do things you couldn't before",
    definition:
      "Deliberately bringing AI into the learning experience to enhance it: as a tutor, a sparring partner, a simulation, a feedback engine, or a way to give students access to methods and scale previously out of reach.",
    why: "This is the exciting tier — and the one most likely to fail if built on sand. The tools here run on the very materials the foundation produced: your objectives, readings, and rubrics become the grounding for a custom tutor, a feedback engine, or a simulation. Reach for this tier last — not because it matters least, but because it is the only one that cannot compensate for a weak layer beneath it. Integration multiplies whatever is already there: on a resilient, well-structured course it can be genuinely transformative; bolted onto a vague one, it just accelerates the confusion.",
    practices: [
      "Build custom assistants grounded in your course readings (e.g. a NotebookLM or Project) to extend office hours without inventing facts.",
      "Use AI for fast, formative feedback so students iterate more before they submit; use it yourself to draft rubrics or norm grades across sections.",
      "Design activities where students direct, critique, and audit an AI collaborator — e.g. custom GPTs that simulate discipline-specific peer review.",
      "Simulate: historical interlocutors, opposing counsel, patient cases, policy-dilemma debates, or conversational language practice.",
    ],
    link: {
      label: "Bok Center · Examples & Ideas for Using AI in Your Teaching",
      href: "https://bokcenter.harvard.edu/examples-and-ideas-for-using-AI-for-your-teaching",
    },
  },
];

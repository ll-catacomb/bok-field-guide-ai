// The Bok / Learning Lab pyramid. Read bottom to top: AI integration only
// works when it rests on a resilient course, which itself rests on solid
// course structure. Skip a layer and the one above it collapses.
//
// Practices and framing draw on the Bok Center's published guidance:
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
    why: "None of this is about AI, and it still comes first. Solid structure earns its place several times over. It is simply good teaching, worth doing entirely on its own terms. It is also the audit that makes the tier above possible: once you have said what each assignment is actually for, you can see precisely where a student could hand the work to a model and short-circuit the learning. And it is the raw material for the tier at the top: clear objectives, readings, rubrics, and worked examples are exactly the context you would load into any AI tool you build for the course, whether for yourself, for your students, or for both. Skip it and the higher tiers have nothing to stand on.",
    practices: [
      "State learning objectives in terms of what students should be able to do.",
      "Write questions and prompts with precise, higher-order action verbs like “critique,” “design,” or “compare,” not vague ones like “discuss” or “list” (see the Bok Center on [taxonomies of learning](https://bokcenter.harvard.edu/taxonomies-learning)).",
      "Give students the evaluation criteria (or rubric) up front, and worked examples of the thinking you want.",
      "Make the arc of the course (why this, why now) visible in the syllabus.",
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
      "Designing assessments so they still produce reliable evidence of a student's own learning even though capable AI exists: making process visible, grounding work in the local and personal, adding in-person touchpoints, or being transparent about permitted AI use.",
    why: "A take-home essay prompt that a model can answer in ten seconds no longer measures what you think it measures. The Bok Center frames this not as detection or prohibition but as design: build work whose value survives the existence of AI, and pair it with an explicit, discussed AI policy. It is far easier once the foundation is solid, because the audit you did there already tells you which assignments are exposed and what each is meant to measure. On a course whose goals are vague, you cannot protect a target you never named.",
    practices: [
      "Add in-person touchpoints after submission: post-submission understanding checks, oral defenses, live interviews, or short in-class reflections.",
      "Use AI-resilient formats: blue-book or oral exams, video essays, posters, infographics, or live coding/interpretive demonstrations.",
      "Scaffold large take-home projects into steps, with some completed without devices.",
      "Where AI is permitted, require transparency: students hand in the prompts they used along with an account of what they kept, what they changed, and what they threw out — and why.",
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
    short: "bringing AI into the work on purpose, in service of a stated goal",
    definition:
      "Bringing AI into the course deliberately, as part of the work rather than around its edges. That covers a wide range: a well-chosen existing tool used for a clear purpose, a chatbot or tutor built for the course, a simulation or feedback tool, or — at the far end — students building working systems of their own. What the tiers below share is intent: the AI is there to serve a stated learning goal, not because it is available.",
    why: "This tier sits on top because it cannot compensate for a weak layer beneath it. Bolted onto a vague course (a chatbot and a shrug), it just accelerates the confusion. Done well, it asks more of students, not less. Integration can be modest — a tool someone else built, used for a reason you can name — and it can go much further, with students building systems themselves. That far end is where the Learning Lab has spent most of its time, and it is worth describing, because the techniques involved map straight onto moves the curriculum already teaches. Context engineering (assembling and indexing every source a task needs in the model's working memory) is a more demanding version of the lit review. Multi-agent design (decomposing a task into sub-moves precise enough for an agent to act on) forces a student to state explicitly what it means to construct an argument, translate a text, or read closely. That articulation is most of the learning, and it lets you see, rather than guess, what a student thinks the moves of the discipline actually are. The skill shifts from authoring every sentence to setting direction, evaluating outputs, and standing behind the result.",
    practices: [
      "Start from the learning goal, not the tool: name what you want students to get better at, then ask whether AI belongs in that. A well-chosen existing tool, used for a reason you can state, is a legitimate answer.",
      "Scaffold toward a system rather than a paper, where the discipline supports it: each stage builds an AI-native skill (context engineering, prompt design, multi-agent orchestration) and a disciplinary one (close reading, argument, translation) at once.",
      "Make the intermediate artifacts assessable (the source index, the prompt set, the agent specification, the evaluation criteria) the way you would assess a paper's outline and draft.",
      "Have students build and document a working system on real course material — e.g. comparative-literature students shipping web apps that translate or interpret texts, language students building their own practice tools, science courses building interactive simulations.",
      "Teach students to read AI output with a trained eye (fabricated citations, unsupported causal claims, fluent prose over shaky ground) and to show not that AI is untrustworthy but why a given output is wrong, and where.",
      "Ask students to defend the work in conversation: they submit the finished piece plus a record of process (what the AI produced, what they checked, what they changed and why), then talk you through it.",
      "Faculty can use the same techniques to build from materials already in hand (readings, transcribed lectures, notes, years of TF correspondence), designing what comes next rather than grading what came before.",
    ],
    link: {
      label: "Bok Center · Examples & Ideas for Using AI in Your Teaching",
      href: "https://bokcenter.harvard.edu/examples-and-ideas-for-using-AI-for-your-teaching",
    },
  },
];

// Bok Center / Learning Lab published guidance. These are the canonical,
// faculty-facing sources this site's teaching advice draws from — linked so the
// tutorial stays a doorway to the Center's own pages rather than a replacement.

export type Resource = {
  title: string;
  href: string;
  blurb: string;
};

export const BOK_RESOURCES: Resource[] = [
  {
    title: "Teaching in the Age of AI",
    href: "https://bokcenter.harvard.edu/artificial-intelligence",
    blurb:
      "The Center's overview: what generative AI is, how it affects teaching and learning, and how to get started by aligning AI use with your course objectives.",
  },
  {
    title: "Designing Courses & Assignments in the Age of AI",
    href: "https://bokcenter.harvard.edu/courses-and-assignments-in-age-of-ai",
    blurb:
      "Concrete strategies for assessment that still produces reliable evidence of learning: in-person understanding checks, oral defenses, blue-book and oral exams, scaffolded device-free steps, and transparent AI use.",
  },
  {
    title: "Examples & Ideas for Using AI in Your Teaching",
    href: "https://bokcenter.harvard.edu/examples-and-ideas-for-using-AI-for-your-teaching",
    blurb:
      "A growing catalog of concrete classroom applications — from drafting rubrics and norming grades to custom GPTs, policy-dilemma simulations, language practice, and multimodal feedback.",
  },
];

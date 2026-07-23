// Gallery of AI-in-teaching ideas, tagged with the pyramid tier(s) they serve.
// Copy is pulled verbatim from the Bok Center's "Examples & Ideas for Using AI
// for Your Teaching" (https://bokcenter.harvard.edu/examples-and-ideas-for-using-AI-for-your-teaching),
// "a growing list of ideas from faculty, students, and Bok Center fellows."
// Tier tags are a first pass — to be refined.

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
    key: "multimodal-translation-feedback",
    title: "Multimodal Translation Feedback",
    epithet: "language · vision synthesis",
    blurb:
      "Language instructors can use AI to support translation activities by having students annotate physical copies of AI-generated translations. The instructor can photograph these annotated documents and use AI vision tools to synthesize student notes and highlights quickly, identifying common corrections or questions. This approach preserves the benefits of handwritten work while using AI to process an entire group's feedback efficiently, allowing instructors to address areas of focus and patterns of misunderstanding in real-time.",
    tiers: ["integration", "resilience"],
    status: "EXAMPLE",
  },
  {
    key: "visual-annotation-analytics",
    title: "Visual Annotation Analytics",
    epithet: "any field · annotation analytics",
    blurb:
      "Instructors can transform traditional text and image commentary into rich analytical data using AI vision tools. Students physically annotate printed materials (articles, maps, photographs, charts) with highlighters, sticky notes, or handwritten comments, which instructors then photograph. These photos are processed through vision APIs (or through no-code options, like uploading images to a conversation thread or to a Custom GPT) that identify, categorize, and synthesize annotation patterns across the entire class. This approach preserves the value of real-time brainstorming while providing instructors and students with immediate, comprehensive insights into student interests, understanding, misconceptions, and questions.",
    tiers: ["integration", "resilience"],
    status: "EXAMPLE",
  },
  {
    key: "voice-cloned-facilitators",
    title: "Voice-Cloned Discussion Facilitators",
    epithet: "discussion · voice clones",
    blurb:
      "Instructors can create AI voice clones to serve as additional discussion participants or guides. These voice bots could represent different perspectives, historical figures relevant to course content, or even the instructor themselves, allowing students to engage in dialogue with the AI-generated subject positions to develop and articulate their ideas before collaborative activities. This adds a novel dimension to class discussions while maintaining the crucial human element of peer collaboration.",
    tiers: ["integration"],
    status: "EXAMPLE",
  },
  {
    key: "ai-assisted-language-practice",
    title: "AI-Assisted Language Practice",
    epithet: "language · speaking practice",
    blurb:
      "Language instructors can use AI voice tools and custom chatbots that allow students to develop their speaking and listening skills through natural conversations. Students speak with these AI systems through microphones, and the AI interlocutor can be designed simply to converse dialogically or to provide immediate feedback (on pronunciation, grammar, vocabulary usage) or both. This provides additional practice opportunities outside of class time and helps students build confidence before speaking with peers or the instructor.",
    tiers: ["integration"],
    status: "EXAMPLE",
  },
  {
    key: "peer-review-simulation",
    title: "AI-Assisted Peer Review Simulation",
    epithet: "writing · peer-review sim",
    blurb:
      "Instructors can create custom GPTs trained on discipline-specific writing standards to simulate the peer review process for student writing. Students submit drafts to these AI reviewers, which provide structured feedback in two, three, or more voices, similar to revise and resubmit instructions they might encounter in the process of professional scientific publishing. This helps students internalize field-specific writing expectations while providing more revision opportunities and perspectives than traditional peer review alone might support.",
    tiers: ["integration"],
    status: "EXAMPLE",
  },
  {
    key: "interactive-augmented-maps",
    title: "Interactive AI-Augmented Maps",
    epithet: "history · interactive maps",
    blurb:
      "History instructors can create dynamic learning experiences using AI-generated maps and graphics projected onto large surfaces with which students can physically interact. For geographic content, AI can generate contextual information about regions as students annotate and discuss them. This approach combines the benefits of the richness of digital information with physical, collaborative engagement, allowing students to build knowledge of historical geographies—together as a group—through direct interaction with deeper data that is organized visually and spatially.",
    tiers: ["integration"],
    status: "EXAMPLE",
  },
  {
    key: "real-time-response-analysis",
    title: "Real-Time Response Analysis",
    epithet: "large lectures · response analysis",
    blurb:
      "For large lecture courses, instructors can implement AI tools that analyze weekly student posts, responses to discussion prompts, or quick writes in real-time. Rather than sampling just a few student contributions, the AI can identify patterns, misconceptions, and insightful perspectives across every submission, allowing the instructor to address the full spectrum of student thinking during the same class session and to focus on the most relevant or common issues. This approach can also make large classes feel more interactive and participatory while further ensuring that diverse student perspectives are captured and addressed.",
    tiers: ["integration"],
    status: "EXAMPLE",
  },
  {
    key: "policy-dilemma-simulations",
    title: "Policy Dilemma Simulations",
    epithet: "ethics & politics · simulations",
    blurb:
      "Political science or ethics instructors can organize policy simulation exercises where student teams analyze social dilemmas in different national or cultural contexts. Students create custom GPTs representing the perspectives of the separate, relevant groups and then prompt those discussants into a debate. In addition to revealing the salient issues and beliefs at stake, this can help students generate potential policy frameworks and then draft persuasive presentations advocating for their proposed solutions. This approach teaches students to evaluate the societal impacts of conflicting views or ideologies while also enhancing their skills in policy analysis, comparative research, and effective communication.",
    tiers: ["integration"],
    status: "EXAMPLE",
  },
  {
    key: "draft-a-rubric",
    title: "Draft a Rubric",
    epithet: "assessment · rubric drafting",
    blurb:
      "An instructor can upload an assignment prompt into an AI chat to generate a first draft of an assessment rubric. The AI can then be asked to identify both explicit and implicit criteria embedded in the assignment prompt, ensuring the rubric is comprehensive. Depending on the result, the AI can be used to refine the draft to align more completely with the overall course objectives and desired grading standards.",
    tiers: ["foundation", "integration"],
    status: "EXAMPLE",
  },
  {
    key: "norm-grades-across-sections",
    title: "Norm Grades Across Sections",
    epithet: "grading · norming across sections",
    blurb:
      "Ensuring consistent grading across large courses with multiple teaching fellows or instructors can be challenging. Harvard-supported AI tools can assist in analyzing uploaded course rubrics and answer keys alongside examples of graded student work. The AI can be prompted to compare submissions against the rubric and to identify discrepancies or inconsistencies in grading across sections. It can then flag student work that deviates significantly from the norm for further (human) review.",
    tiers: ["foundation", "integration"],
    status: "EXAMPLE",
  },
  {
    key: "slide-feedback-loop",
    title: "Slide Feedback Loop",
    epithet: "presentations · slide feedback",
    blurb:
      "Faculty who teach with slides can upload their decks to an AI tool that evaluates clarity, pacing, and alignment with learning objectives. The AI can suggest where to add interactivity, simplify visuals, or trim redundant content—helping instructors design more effective presentations and avoid cognitive overload.",
    tiers: ["foundation", "integration"],
    status: "EXAMPLE",
  },
  {
    key: "group-work-synthesizer",
    title: "Group Work Synthesizer",
    epithet: "group work · synthesis",
    blurb:
      "After in-class group work or collaborative activities, instructors can ask each group to submit a photo of their whiteboard, worksheet, or notes. AI vision tools can analyze and synthesize common ideas or divergent responses across groups. Instructors can project these AI summaries to guide follow-up discussion, without needing to manually scan every submission.",
    tiers: ["integration"],
    status: "EXAMPLE",
  },
  {
    key: "syllabus-reflection",
    title: "AI-Enhanced Syllabus Reflection",
    epithet: "any course · syllabus reflection",
    blurb:
      "At the end of a course, instructors can have students revisit their syllabi to explore what they have done and the connections between the weeks and array of subtopics. The students annotate physical printouts of the syllabus with their reflections, memories, and questions. These annotations, different for each student, are then photographed and analyzed by AI vision tools to identify patterns, themes, and insights across the class. The LLM can order and hierarchize the connections it identifies, inductively reasoning to reveal those foci students found most salient, most difficult, most interconnected. This approach combines tangible engagement with the material syllabus with rapid AI-powered synthesis, producing an overall picture that allows for enhanced meta-reflection on the course's content and structure as a whole. It takes the students' notes and essentially enables a bird's-eye view, giving the students a chance to see — visually mapped out and categorized orderly — the most common and complex threads. Here AI is providing immediate and empirically grounded feedback that would otherwise exceed the temporal (and methodological) limitations of the course, which can be used to guide the final discussions about course's learning outcomes, its deepest components, and the students' experiences.",
    tiers: ["integration", "resilience"],
    status: "EXAMPLE",
  },
  {
    key: "content-analysis",
    title: "AI-Generated Content Analysis",
    epithet: "philosophy · critique the machine",
    blurb:
      "Philosophy instructors can design assignments where students analyze and improve upon deliberately subpar AI-generated philosophical arguments. This approach teaches students to identify the differences between superficially correct writing and substantive philosophical reasoning. Students practice critical thinking by pinpointing logical fallacies, insufficient evidence, or oversimplified treatments of complex ideas in the AI-generated content, strengthening their ability to construct rigorous arguments. If desired, a second step may be taken: the students write new and improved paragraphs, and then feed those, along with the original, intentionally weak texts, into a custom GPT that they and their instructor have built, one that is designed to write sophisticatedly and reference specific sources. The GPT may be asked to analyze and compare both texts, to indicate the areas of most improvement, and to provide detailed feedback — all of which can also be used to enable deeper reflection on the material at hand. The second step effectively moves in an opposite different direction from the first; in the first, AI content is generated and then commented on by humans, in the second, human content is commented on by AI, and, if the process is repeated, a productive feedback loop is established. This exercise can help students iteratively refine their explanations, adjust their style and conceptual framing, and build out their argumentation. There are potential applications of this mechanic to proof-based mathematics, in which an advanced LLM would be tasked with generating flawed proofs, with varying degrees of error subtlety or concealment depending on the desired difficulty of the students' task.",
    tiers: ["resilience", "integration"],
    status: "EXAMPLE",
  },
  {
    key: "spatial-ranking-activities",
    title: "Spatial Ranking Activities",
    epithet: "any field · spatial ranking",
    blurb:
      "Instructors from many disciplines can design interactive learning activities in which students physically position concept cards, objects, art supplies, or images printed out in real time along continua (such as a large graph or a meter stick marked from 0-100) to indicate their evaluation of different ideas and their relationships. Using the unique capacities of our space and materials, students place objects and annotations representing theories, historical events, or scientific concepts along scales and planes based on criteria like importance, chronology, causality, or ethical impact. The resulting arrangements are then photographed, and AI vision processing is used to quantify and visualize the collective results instantly. This approach combines spatial manipulation, student collaboration, and tactile and visual thinking with the analytical power of AI, allowing for macroscopic assessment of the created forms in order to augment discussion of patterns, outliers, and unexpected groupings, while also creating a permanent digital record of student thinking and experience that can be referenced throughout the course.",
    tiers: ["integration", "resilience"],
    status: "EXAMPLE",
  },
];

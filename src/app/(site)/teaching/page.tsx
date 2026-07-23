import type { Metadata } from "next";
import Link from "next/link";
import { CatalogStripe } from "@/components/CatalogStripe";
import { Pyramid } from "@/components/Pyramid";
import { BOK_RESOURCES } from "@/data/resources";

export const metadata: Metadata = {
  title: "The Teaching Pyramid — AI for Higher Ed",
  description:
    "The Bok Center / Learning Lab approach to AI in teaching: course structure, then AI-resilience, then AI integration.",
};

export default function TeachingPage() {
  return (
    <main>
      <CatalogStripe slug="/teaching" id="TP02" />

      <section className="hero">
        <span className="plate-label">Field Guide · Bok Center · Plate II</span>
        <h1 className="hero-title">The Teaching Pyramid</h1>
        <hr className="hero-rule" />
        <p className="hero-lede">
          AI does not rescue a shaky course; it amplifies whatever is already
          there. So the Learning Lab&rsquo;s advice stacks: get the foundation
          right, make the work resilient, and only then reach for integration.
        </p>
      </section>

      <article className="reading prose">
        <p className="drop-cap">
          It is tempting to start with the exciting part — the custom tutor, the
          AI feedback engine, the simulation. But integration is the top of a
          pyramid, and a pyramid is only as sound as what holds it up. Read it the
          way you would read Maslow&rsquo;s hierarchy of needs: each tier&rsquo;s
          needs must be met before the one above it even comes into reach. A
          course can&rsquo;t be made AI-resilient until its goals are clear, and AI
          can&rsquo;t be integrated well into a course that isn&rsquo;t resilient.
          Click through the tiers from the base.
        </p>

        <Pyramid />

        <h2>When a course leans all the way in: from essays to systems</h2>
        <p>
          For courses ready to go past resilience, integration doesn&rsquo;t mean
          students consuming a tool someone else built. It means students learning
          to build with AI themselves. In several Bok-supported courses, a semester
          that once ended in a single essay now ends in a working system the
          student designs, tests, and documents — its parts corresponding to the
          intellectual moves of the discipline. The sequence is scaffolded exactly
          as a paper is: each stage develops an AI-native skill (context
          engineering, prompt design, multi-agent orchestration) alongside a
          traditional one (close reading, argument, translation), and each
          intermediate artifact (the source index, the prompt set, the agent
          specification) is itself assessable, the way an outline and a draft used
          to be.
        </p>
        <p>
          Two of these techniques map directly onto moves the curriculum already
          teaches. <strong>Context engineering</strong> (assembling and indexing
          every source a task needs in the model&rsquo;s working memory) is a more
          demanding version of the lit review. <strong>Multi-agent design</strong>{" "}
          (decomposing a task into sub-moves precise enough for an agent to act on)
          forces a student to state explicitly what it means to construct an
          argument or translate a text. That articulation is most of the learning,
          and it lets you see, rather than guess, what a student thinks the moves of
          the discipline actually are. In Comparative Literature, students who have
          never coded finish the term having shipped web applications that
          translate or interpret literature on real source material; in Modern
          Hebrew, they build their own language-practice tools; in the sciences,
          courses build interactive simulations that give students deeper intuition
          for the principles they&rsquo;re learning.
        </p>
        <p>
          The skill this develops is less writing every sentence than setting
          direction, evaluating outputs, and standing behind the result. Students
          learn to read AI&rsquo;s work with a trained eye (for fabricated
          citations, plausible-but-unsupported claims, fluent prose over uncertain
          ground) and to show not that AI is untrustworthy but <em>why this output
          is wrong, and where</em>. Assessment follows the shift: students submit
          finished work with a record of process (what the AI produced, what they
          verified, what they changed and why) and defend it in conversation. None
          of this lowers the rigor of the work. It demands more of it.
        </p>

        <h2>Embodied learning, and where AI fits</h2>
        <p>
          Not every answer to AI is an AI answer. We genuinely care about
          embodied, preserved learning for its own sake — the kind that happens
          in a room, in a voice, in the body, in an archive. Seated and oral
          exams, in-class performance and critique, projects that send students
          into Harvard&rsquo;s physical spaces and collections: these are where a
          great deal of durable learning lives. The Bok Center runs a physical
          studio and a long practice in the arts and oral performance, and AI is
          simply one of the supports we offer.
        </p>
        <p>
          Some of that embodied work can loop back into the AI story, if you want
          it to. A student who spends an afternoon in a museum (gathering notes,
          photographs, and observations) can turn that first-hand encounter into
          a structured database and then build an argument on top of it: the same{" "}
          ingredients → steps → dish move from the <a href="/recipe">recipe card</a>.
          But the tie-in is entirely optional. We are just as happy to help you
          design plain AI-resilient work with no AI integration at all (a seated
          exam, an oral defense, a studio critique) and to talk through the
          logistics and the question-writing that make it hold up.
        </p>

        <hr className="rule-gold" />

        <h2>Further reading — Bok Center guidance</h2>
        <p>
          This page is a doorway, not a replacement. The Bok Center maintains the
          fuller, continually updated guidance:
        </p>
        <ul className="resource-list">
          {BOK_RESOURCES.map((r) => (
            <li key={r.href}>
              <a href={r.href} target="_blank" rel="noreferrer">
                {r.title} →
              </a>
              <span className="resource-blurb">{r.blurb}</span>
            </li>
          ))}
        </ul>

        <hr className="rule-gold" />

        <p>
          Want to see what each tier looks like in a real assignment? The{" "}
          <Link href="/gallery">gallery</Link> collects project types tagged by the
          tier they serve.
        </p>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
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

        <h2>A note on seated exams</h2>
        <p>
          One of the most direct AI-resilience moves is also one of the oldest:
          the in-class, seated exam. The Bok Center offers detailed guidance for
          instructors re-introducing them, and two themes are worth carrying up
          into the pyramid.
        </p>
        <p>
          <strong>Logistics come first, and early.</strong> Final exams must be
          registered with the Registrar before the term; midterm accommodations
          and rooms are the course head&rsquo;s responsibility; decide up front
          whether students write in blue books or on proctored laptops, and plan
          for accessibility (handwriting, timed image IDs) and for grading under
          time pressure.
        </p>
        <p>
          <strong>Pedagogy is the point.</strong> Write questions aligned with
          your objectives that ask students to apply, synthesize, and critique —
          not merely recall — using precise higher-order verbs; reflect what was
          actually taught; and scaffold students toward the format in advance so
          the exam measures understanding rather than test-taking stamina.
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
          <a href="/gallery">gallery</a> collects project types tagged by the
          tier they serve.
        </p>
      </article>
    </main>
  );
}

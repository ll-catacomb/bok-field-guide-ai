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
      <CatalogStripe />

      <section className="hero">
        <span className="plate-label">Bok Center · Learning Lab</span>
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
          pyramid, and a pyramid is only as sound as what holds it up: a course
          can&rsquo;t be made AI-resilient until its goals are clear, and AI
          can&rsquo;t be integrated well into a course that isn&rsquo;t resilient.
          Click each layer below, starting at the base, to see what that tier
          asks of a course.
        </p>

        <Pyramid />

      </article>

      <section className="doorways">
        <hr className="rule-gold" />
        <span className="plate-label">Where to go next</span>

        <div className="home-cta">
          <Link href="/tutorial" className="cta-btn">
            Start the tutorial →
          </Link>
        </div>
        <p className="doorway-primary-sub">
          The tutorial: what the engine actually is, what it can and can&rsquo;t
          do, and how the tools Harvard gives you map onto each other.
        </p>

        <ul className="doorway-list">
          <li>
            <Link href="/recipe">The Recipe Card →</Link>
            <span className="doorway-blurb">
              Your first project, in three parts: ingredients, steps, dish. The
              tutorial hands you off here when you&rsquo;re ready to build.
            </span>
          </li>
          <li>
            <Link href="/gallery">The Gallery →</Link>
            <span className="doorway-blurb">
              What each tier looks like in a real assignment — project types
              tagged by the tier they serve.
            </span>
          </li>
        </ul>
      </section>

      <article className="reading prose">
        <hr className="rule-gold" />

        <h2>Further reading — Bok Center guidance</h2>
        <p>
          The Bok Center maintains the fuller, continually updated guidance:
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
      </article>
    </main>
  );
}

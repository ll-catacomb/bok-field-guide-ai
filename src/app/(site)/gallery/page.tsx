import type { Metadata } from "next";
import Link from "next/link";
import { CatalogStripe } from "@/components/CatalogStripe";
import { TermText } from "@/components/TermText";
import { PROJECTS, TIER_LABEL } from "@/data/projects";
import { getStories } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery — AI for Higher Ed",
  description:
    "Ideas for using AI in teaching, from the Bok Center — tagged by the pyramid tier they serve.",
};

export default function GalleryPage() {
  const stories = getStories();
  return (
    <main>
      <CatalogStripe />

      <section className="hero">
        <span className="plate-label">Bok Center · Learning Lab</span>
        <h1 className="hero-title">The Gallery</h1>
        <hr className="hero-rule" />
        <p className="hero-lede">
          What integration looks like when a course leans all the way in — and
          where the learning that happens in a room, a voice, or an archive
          still comes first. Then the examples: project stories from the
          Learning Lab and a growing list of ideas from faculty, students, and
          Bok Center fellows.
        </p>
      </section>

      <article className="reading prose">
        <h2>When a course leans all the way in: from essays to systems</h2>
        <p>
          The furthest form of integration has students building with AI themselves. In several Bok-supported courses, a semester
          that once ended in a single essay now ends in a working system the
          student designs, tests, and documents — its parts corresponding to the
          intellectual moves of the discipline. The sequence is scaffolded exactly
          as a paper is: each stage develops an AI-native skill (context
          engineering, prompt design, multi-agent orchestration) alongside a
          traditional one (close reading, argument, translation), and each
          intermediate artifact (the source index, the prompt set, the agent
          specification) is itself assessable, the way you would assess an outline
          and a draft.
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
          The skill this develops is setting direction, evaluating outputs, and
          standing behind the result. Students
          learn to read AI&rsquo;s work with a trained eye (for fabricated
          citations, plausible-but-unsupported claims, fluent prose over uncertain
          ground) and to show not that AI is untrustworthy but <em>why this output
          is wrong, and where</em>. Assessment follows the shift: students submit
          finished work with a record of process (what the AI produced, what they
          verified, what they changed and why) and defend it in conversation. The
          work is more demanding than the paper it replaced.
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

        <h2>The examples</h2>
        <p>
          What follows is what all of that looks like in practice: project
          stories from the Learning Lab first, then a growing list of ideas from
          faculty, students, and Bok Center fellows. Each is tagged with the{" "}
          <a href="/">pyramid</a> tier it serves.
        </p>
      </article>

      <section className="gal-wrap">
        <div className="gal-grid">
          {stories.map((s) => (
            <Link className="gal-card gal-card-story" href={`/gallery/${s.slug}`} key={s.slug}>
              {s.hero && (
                <div className="gal-storythumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.hero} alt="" loading="lazy" />
                </div>
              )}
              <div className="gal-cardhead">
                <span className="gal-plate">Story</span>
                <div className="gal-tiers">
                  {s.tiers.map((t) => (
                    <span key={t} className={`gal-tier gal-tier-${t}`}>
                      {TIER_LABEL[t as keyof typeof TIER_LABEL] ?? t}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="gal-title font-display">{s.title}</h2>
              {s.courses && <p className="gal-epithet">{s.courses}</p>}
              <p className="gal-blurb gal-blurb-clamp">
                <TermText>{s.shortDescription}</TermText>
              </p>
              <span className="gal-more">Read the story →</span>
            </Link>
          ))}
          {PROJECTS.map((p) => (
            <article className="gal-card" key={p.key}>
              <div className="gal-cardhead">
                <span className="gal-plate">Idea</span>
                <div className="gal-tiers">
                  {p.tiers.map((t) => (
                    <span key={t} className={`gal-tier gal-tier-${t}`}>
                      {TIER_LABEL[t]}
                    </span>
                  ))}
                  <span className="gal-status tag">{p.status}</span>
                </div>
              </div>
              <h2 className="gal-title font-display">{p.title}</h2>
              <p className="gal-epithet">
                <TermText>{p.epithet}</TermText>
              </p>
              <p className="gal-blurb">
                <TermText>{p.blurb}</TermText>
              </p>
            </article>
          ))}
        </div>

        <p className="gal-seealso">
          These ideas are drawn verbatim from the Bok Center&rsquo;s{" "}
          <a
            href="https://bokcenter.harvard.edu/examples-and-ideas-for-using-AI-for-your-teaching"
            target="_blank"
            rel="noreferrer"
          >
            Examples &amp; Ideas for Using AI in Your Teaching →
          </a>
        </p>
      </section>

      <style>{`
        .gal-wrap { max-width: 70rem; margin: 0 auto; padding: 1rem clamp(1rem, 4vw, 2.5rem) 0; }
        .gal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr)); gap: 1.5rem; grid-auto-rows: 1fr; }
        .gal-card { display: flex; flex-direction: column; gap: 0.45rem; height: 100%; overflow: hidden; border: 1px solid var(--color-rule); border-top: 3px solid var(--color-crimson); background: var(--color-paper); padding: 1.15rem 1.25rem 1.3rem; }
        .gal-card-story { text-decoration: none; color: inherit; padding: 0 0 1.1rem; overflow: hidden; transition: border-color 160ms ease, transform 160ms ease; }
        .gal-card-story:hover { border-color: var(--color-crimson); transform: translateY(-2px); }
        .gal-storythumb { aspect-ratio: 16 / 9; overflow: hidden; background: var(--color-paper-deep); margin-bottom: 0.7rem; }
        .gal-storythumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gal-card-story .gal-cardhead,
        .gal-card-story .gal-title,
        .gal-card-story .gal-epithet,
        .gal-card-story .gal-blurb,
        .gal-card-story .gal-more { padding-left: 1.25rem; padding-right: 1.25rem; }
        .gal-blurb-clamp { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
        .gal-more { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: var(--color-crimson); margin-top: 0.7rem; }
        .gal-cardhead { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; margin-bottom: 0.15rem; }
        .gal-plate { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; color: var(--color-ash); }
        .gal-tiers { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; margin-left: auto; }
        .gal-tier { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; padding: 1px 6px; border: 1px solid var(--color-crimson); color: var(--color-crimson); }
        .gal-tier-foundation { border-color: var(--color-gold); color: var(--color-gold); }
        .gal-tier-integration { background: var(--color-crimson); color: var(--color-paper); border-color: var(--color-crimson); }
        .gal-status { font-size: 9.5px; }
        .gal-title { font-size: 1.35rem; line-height: 1.08; font-weight: 400; margin: 0.15rem 0 0; }
        .gal-epithet { font-style: italic; font-size: 13px; color: var(--color-ash); margin: 0; }
        .gal-blurb { font-size: 14px; color: var(--color-ink-soft); margin: 0.4rem 0 0; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; overflow: hidden; }
        .gal-herolink { color: var(--color-crimson); }
        .gal-seealso { max-width: 42rem; margin: 2.5rem auto 0; font-size: 14px; color: var(--color-ink-soft); }
        .gal-seealso a { color: var(--color-crimson); font-family: var(--font-mono); font-size: 13px; text-decoration: none; border-bottom: 1px solid rgba(165,28,48,0.3); }
        .gal-seealso a:hover { border-bottom-color: var(--color-crimson); }
      `}</style>
    </main>
  );
}

import type { Metadata } from "next";
import { CatalogStripe } from "@/components/CatalogStripe";
import { TermText } from "@/components/TermText";
import { PROJECTS, TIER_LABEL } from "@/data/projects";

export const metadata: Metadata = {
  title: "Gallery — AI for Higher Ed",
  description:
    "Ideas for using AI in teaching, from the Bok Center — tagged by the pyramid tier they serve.",
};

export default function GalleryPage() {
  return (
    <main>
      <CatalogStripe slug="/gallery" id="GA03" />

      <section className="hero">
        <span className="plate-label">Field Guide · Bok Center · Plate III</span>
        <h1 className="hero-title">The Gallery of Specimens</h1>
        <hr className="hero-rule" />
        <p className="hero-lede">
          A growing list of ideas — from faculty, students, and Bok Center
          fellows — for using AI in teaching, each accessioned by the{" "}
          <a href="/teaching" className="gal-herolink">
            pyramid
          </a>{" "}
          tier it serves.
        </p>
      </section>

      <section className="gal-wrap">
        <div className="gal-grid">
          {PROJECTS.map((p, i) => (
            <article className="gal-card" key={p.key}>
              <div className="gal-cardhead">
                <span className="gal-plate">
                  PL00-{String(i + 1).padStart(3, "0")}
                </span>
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
        .gal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr)); gap: 1.5rem; align-items: start; }
        .gal-card { display: flex; flex-direction: column; gap: 0.45rem; border: 1px solid var(--color-rule); border-top: 3px solid var(--color-crimson); background: var(--color-paper); padding: 1.15rem 1.25rem 1.3rem; }
        .gal-cardhead { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; margin-bottom: 0.15rem; }
        .gal-plate { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; color: var(--color-ash); }
        .gal-tiers { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; margin-left: auto; }
        .gal-tier { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; padding: 1px 6px; border: 1px solid var(--color-crimson); color: var(--color-crimson); }
        .gal-tier-foundation { border-color: var(--color-gold); color: var(--color-gold); }
        .gal-tier-integration { background: var(--color-crimson); color: var(--color-paper); border-color: var(--color-crimson); }
        .gal-status { font-size: 9.5px; }
        .gal-title { font-size: 1.35rem; line-height: 1.08; font-weight: 400; margin: 0.15rem 0 0; }
        .gal-epithet { font-style: italic; font-size: 13px; color: var(--color-ash); margin: 0; }
        .gal-blurb { font-size: 14px; color: var(--color-ink-soft); margin: 0.4rem 0 0; line-height: 1.5; }
        .gal-herolink { color: var(--color-crimson); }
        .gal-seealso { max-width: 42rem; margin: 2.5rem auto 0; font-size: 14px; color: var(--color-ink-soft); }
        .gal-seealso a { color: var(--color-crimson); font-family: var(--font-mono); font-size: 13px; text-decoration: none; border-bottom: 1px solid rgba(165,28,48,0.3); }
        .gal-seealso a:hover { border-bottom-color: var(--color-crimson); }
      `}</style>
    </main>
  );
}

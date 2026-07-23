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
      <CatalogStripe slug="/gallery" id="GA03" />

      <section className="hero">
        <span className="plate-label">Field Guide · Bok Center · Plate III</span>
        <h1 className="hero-title">The Gallery of Specimens</h1>
        <hr className="hero-rule" />
        <p className="hero-lede">
          Project stories from the Learning Lab, alongside a growing list of
          ideas — from faculty, students, and Bok Center fellows — for using AI
          in teaching, each accessioned by the{" "}
          <a href="/teaching" className="gal-herolink">
            pyramid
          </a>{" "}
          tier it serves.
        </p>
      </section>

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

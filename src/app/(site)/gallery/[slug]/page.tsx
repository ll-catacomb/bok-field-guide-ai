import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CatalogStripe } from "@/components/CatalogStripe";
import { StoryBody } from "@/components/StoryBody";
import { getStorySlugs, getStory } from "@/lib/gallery";
import { TIER_LABEL, type PyramidTier } from "@/data/projects";

export function generateStaticParams() {
  return getStorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Story — Gallery" };
  return {
    title: `${story.title} — Gallery`,
    description: story.shortDescription.slice(0, 200),
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  return (
    <main>
      <CatalogStripe slug={`/gallery/${slug}`} id="GS" />

      <section className="hero story-hero">
        <div className="hero-text">
          <Link href="/gallery" className="story-back">
            ← The Gallery
          </Link>
          <div className="story-tiers">
            {story.tiers.map((t) => (
              <span key={t} className={`gal-tier gal-tier-${t}`}>
                {TIER_LABEL[t as PyramidTier] ?? t}
              </span>
            ))}
          </div>
          <h1 className="hero-title story-title">{story.title}</h1>
          {story.longTitle && story.longTitle !== story.title && (
            <p className="story-longtitle">{story.longTitle}</p>
          )}
          <hr className="hero-rule" />
          <p className="hero-lede">{story.shortDescription}</p>
          {(story.courses || story.dates) && (
            <dl className="story-facts">
              {story.courses && (
                <div>
                  <dt>Courses</dt>
                  <dd>{story.courses}</dd>
                </div>
              )}
              {story.dates && (
                <div>
                  <dt>When</dt>
                  <dd>{story.dates}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </section>

      {story.hero && (
        <div className="story-herofig">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={story.hero} alt="" />
        </div>
      )}

      <article className="reading">
        <StoryBody markdown={story.body} />
        <hr className="rule-gold" />
        <p className="story-return">
          <Link href="/gallery">← Back to the Gallery</Link>
        </p>
      </article>

      <style>{`
        .story-hero .hero-text { max-width: 46rem; }
        .story-back { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; color: var(--color-crimson); text-decoration: none; }
        .story-tiers { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 0.9rem 0 0.6rem; }
        .story-title { font-size: clamp(1.9rem, 4vw, 3rem); }
        .story-longtitle { font-family: var(--font-body); font-style: italic; font-size: 1.05rem; color: var(--color-ash); margin: 0.5rem 0 0; }
        .story-facts { display: flex; flex-wrap: wrap; gap: 1.5rem 2.5rem; margin: 1.4rem 0 0; }
        .story-facts dt { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-crimson); margin-bottom: 0.2rem; }
        .story-facts dd { margin: 0; font-size: 14px; color: var(--color-ink-soft); max-width: 34rem; line-height: 1.45; }
        .story-herofig { max-width: 60rem; margin: 1.5rem auto 0; padding: 0 1.5rem; }
        .story-herofig img { width: 100%; height: auto; display: block; border: 1px solid var(--color-rule); }
        .story-prose h2 { font-size: clamp(1.4rem, 2.6vw, 1.8rem); }
        .story-prose blockquote { font-size: 1.05rem; }
        .story-return { margin-top: 2rem; }
        .story-return a { font-family: var(--font-mono); font-size: 13px; color: var(--color-crimson); text-decoration: none; }
      `}</style>
    </main>
  );
}

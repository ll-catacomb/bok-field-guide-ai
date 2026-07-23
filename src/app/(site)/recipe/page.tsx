import type { Metadata } from "next";
import { CatalogStripe } from "@/components/CatalogStripe";
import { RECIPES } from "@/data/recipes";

export const metadata: Metadata = {
  title: "The Recipe Card — Your First AI Project",
  description:
    "The Learning Lab's recipe-card method for starting your first AI project: ingredients (inputs), steps (operations), and a dish (output).",
};

export default function RecipePage() {
  return (
    <main>
      <CatalogStripe slug="/recipe" id="RC04" />

      <section className="hero">
        <div className="hero-text">
          <span className="plate-label">Field Guide · Bok Center · Plate IV</span>
          <h1 className="hero-title">The Recipe Card</h1>
          <hr className="hero-rule" />
          <p className="hero-lede">
            You now know what the engine is, what it can and can&rsquo;t do, and how
            harnesses and tools extend it. So — your first project. The Learning Lab
            teaches it as a recipe: get the recipe right and the dish comes out
            right; leave an ingredient out and it won&rsquo;t.
          </p>
        </div>
        <img
          className="hero-figure"
          src="/cook.png"
          alt="Woodcut-style illustration of a hand emerging from clouds, holding a serpent over rising flames, printed in red."
        />
      </section>

      <article className="reading prose">
        <p className="drop-cap">
          Every project we built in the workshops has the same three parts. The
          context window itself is a recipe card: <strong>ingredients</strong> are
          your inputs — the files, data, and examples you bring; <strong>steps</strong>{" "}
          are the operations and prompts, in order; and the <strong>dish</strong>{" "}
          is your output — the page, the rubric, the dataset, the site. Another way
          to say it: you are writing a coursepack for a brilliant student who
          hasn&rsquo;t done the reading. Hand over the right materials and clear
          instructions, and the work comes back right.
        </p>

        <div className="recipe-card-hero">
          <div className="rc-slot">
            <span className="tag">ingredients</span>
            <span className="rc-slot-sub">your inputs — files, data, examples</span>
          </div>
          <div className="rc-arrow" aria-hidden="true">→</div>
          <div className="rc-slot">
            <span className="tag">steps</span>
            <span className="rc-slot-sub">the operations &amp; prompts, in order</span>
          </div>
          <div className="rc-arrow" aria-hidden="true">→</div>
          <div className="rc-slot rc-slot-dish">
            <span className="tag">dish</span>
            <span className="rc-slot-sub">your output — the finished thing</span>
          </div>
        </div>

        <h2>Fill one out</h2>
        <p>
          Here is the blank card we hand out. Print it and fill one in for a real
          task you want to bring to your work this week — ingredients, steps, dish.
          Scoping a single concrete task is the whole exercise.
        </p>

        <div className="recipe-pdf-wrap">
          <object className="recipe-pdf" data="/recipe-card.pdf#view=FitH" type="application/pdf" aria-label="The blank recipe card worksheet">
            <p className="recipe-pdf-fallback">
              Your browser can&rsquo;t preview PDFs inline.{" "}
              <a href="/recipe-card.pdf">Open the recipe card (PDF) →</a>
            </p>
          </object>
          <p className="recipe-pdf-links">
            <a href="/recipe-card.pdf" target="_blank" rel="noreferrer">Open the blank card in a new tab →</a>
            <a href="/recipe-card.pdf" download>Download to print →</a>
          </p>
        </div>

        <h2>Start with what you&rsquo;ve been meaning to do</h2>
        <p>
          The first project you finish is the one you actually care about — the
          photocopies in the drawer, the translations you&rsquo;ve collected for
          years, the diagram you could never quite draw. Each of these is a real
          Learning Lab project, framed as the longing that started it, and each is
          still nothing more than ingredients, steps, and a dish.
        </p>
      </article>

      <section className="recipe-gallery-wrap">
        <div className="recipe-gallery">
          {RECIPES.map((r) => (
            <article className="rc-card" key={r.key}>
              <div className="rc-card-head">
                <h3 className="rc-card-title font-display">{r.title}</h3>
                <span className="rc-field tag">{r.field}</span>
              </div>
              <div className="rc-card-body">
                <div className="rc-section">
                  <span className="rc-label">Ingredients</span>
                  <ul>
                    {r.ingredients.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="rc-section">
                  <span className="rc-label">Steps</span>
                  <ol>
                    {r.steps.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ol>
                </div>
                <div className="rc-section rc-section-dish">
                  <span className="rc-label">Dish</span>
                  <p>{r.dish}</p>
                </div>
              </div>
              <p className="rc-why">{r.why}</p>
            </article>
          ))}
        </div>

        <p className="recipe-close">
          Pick the smallest version of the thing you actually want, fill out one
          card, and cook. That&rsquo;s the whole method. ◊
        </p>

        <div className="recipe-next">
          <p className="recipe-next-lede">
            Once you&rsquo;ve cooked one project for yourself, the harder question
            arrives: how do you build tools that serve a <em>class</em> — not just
            your own research or curiosity? We&rsquo;re glad to help with research.
            But mostly, we&rsquo;re here for the teaching.
          </p>
          <div className="home-cta">
            <a href="/teaching" className="cta-btn">Now build it for your students →</a>
          </div>
        </div>
      </section>

      <style>{`
        .recipe-card-hero { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; gap: 0.6rem; margin: 2rem 0 2.5rem; }
        @media (max-width: 640px) { .recipe-card-hero { grid-template-columns: 1fr; } .rc-arrow { transform: rotate(90deg); } }
        .rc-slot { border: 1px solid var(--color-rule); background: var(--color-paper); padding: 1rem; text-align: center; display: flex; flex-direction: column; gap: 0.3rem; min-height: 5rem; justify-content: center; }
        .rc-slot .tag { color: var(--color-crimson); }
        .rc-slot-dish { border-color: var(--color-gold); }
        .rc-slot-sub { font-size: 12px; font-style: italic; color: var(--color-ash); }
        .rc-arrow { font-family: var(--font-mono); font-size: 18px; color: var(--color-crimson); text-align: center; }

        .recipe-pdf-wrap { margin: 1.75rem 0; }
        .recipe-pdf { width: 100%; height: 640px; border: 1px solid var(--color-rule); background: var(--color-paper-deep); display: block; }
        .recipe-pdf-fallback { padding: 2rem; text-align: center; font-size: 15px; }
        .recipe-pdf-links { display: flex; flex-wrap: wrap; gap: 1.5rem; margin: 0.9rem 0 0; }
        .recipe-pdf-links a { font-family: var(--font-mono); font-size: 12px; color: var(--color-crimson); text-decoration: none; border-bottom: 1px solid rgba(165,28,48,0.3); padding-bottom: 1px; }
        .recipe-pdf-links a:hover { border-bottom-color: var(--color-crimson); }

        .recipe-gallery-wrap { max-width: 64rem; margin: 0 auto; padding: 1rem clamp(1rem, 4vw, 2.5rem) 0; }
        .recipe-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1.5rem; }
        .rc-card { border: 1px solid var(--color-rule); background: var(--color-paper); display: flex; flex-direction: column; }
        .rc-card-head { display: flex; align-items: baseline; justify-content: space-between; gap: 0.75rem; padding: 0.9rem 1rem; border-bottom: 1px solid var(--color-rule); background: var(--color-paper-deep); }
        .rc-card-title { margin: 0; font-size: 1.25rem; font-weight: 400; line-height: 1.05; }
        .rc-field { font-size: 9.5px; color: var(--color-ash); white-space: nowrap; }
        .rc-card-body { padding: 0.9rem 1rem; display: flex; flex-direction: column; gap: 0.9rem; flex: 1; }
        .rc-section { display: flex; flex-direction: column; gap: 0.35rem; }
        .rc-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-crimson); }
        .rc-section ul, .rc-section ol { margin: 0; padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .rc-section li { font-size: 13.5px; line-height: 1.4; color: var(--color-ink); }
        .rc-section-dish p { margin: 0; font-size: 13.5px; line-height: 1.45; color: var(--color-ink); }
        .rc-section-dish .rc-label { color: var(--color-gold); }
        .rc-why { margin: 0; padding: 0.75rem 1rem; border-top: 1px solid var(--color-rule); font-size: 12.5px; font-style: italic; color: var(--color-ash); }

        .recipe-close { max-width: 42rem; margin: 2.5rem auto 0; text-align: center; font-family: var(--font-display); font-size: 1.15rem; color: var(--color-ink); }

        .recipe-next { max-width: 44rem; margin: 3rem auto 1rem; padding-top: 2.5rem; border-top: 1px solid var(--color-rule); text-align: center; }
        .recipe-next-lede { margin: 0 0 1.75rem; font-family: var(--font-body); font-size: 1.15rem; line-height: 1.6; color: var(--color-ink); }
      `}</style>
    </main>
  );
}

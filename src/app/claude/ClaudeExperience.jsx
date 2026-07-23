"use client";

/* /claude — the Claude Code workshop, in the-claude-report's scrollytelling
   style. Copy is adapted from that report ("Recipes, Repos & Practicing
   Teaching"), edited to reference this field guide and to fold in the
   claude-quests material — the harness and the five primitives. Story beats
   1–4 hold real workshop-photo slots (drop images into /public/claude/). */

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shell,
  Eyebrow,
  Interlude,
  fadeUp,
  stagger,
  useC,
  FONT_DISPLAY,
  FONT_BODY,
  FONT_MONO,
} from "./_experience";

/* ---------- reusable image slot (placeholder until a src is set) ---------- */

function ImageSlot({ src, alt, caption, label, ratio = "4 / 3" }) {
  const C = useC();
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          position: "relative",
          aspectRatio: ratio,
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${C.line}`,
          background: C.card,
          backdropFilter: "blur(8px)",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || ""}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 12,
              border: `1px dashed ${C.kraft}`,
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              textAlign: "center",
              padding: 16,
            }}
          >
            <span style={{ fontSize: 22, color: C.clay }}>▦</span>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.slate,
              }}
            >
              image slot
            </span>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 12,
                color: C.kraft,
                maxWidth: 260,
                lineHeight: 1.5,
              }}
            >
              {label}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11.5,
            letterSpacing: "0.04em",
            color: C.kraft,
            marginTop: 12,
            lineHeight: 1.5,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- spec card: the five primitives, glassmorphic ---------- */

function SpecCard({ glyph, rows }) {
  const C = useC();
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${C.line}`,
        background: C.card,
        backdropFilter: "blur(8px)",
        padding: "26px 26px 22px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${C.clay}, ${C.kraft})`,
        }}
      />
      <div style={{ fontSize: 26, color: C.clay, marginBottom: 18, lineHeight: 1 }}>
        {glyph}
      </div>
      <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        {rows.map((r) => (
          <div
            key={r.k}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(84px, 30%) 1fr",
              gap: 14,
              alignItems: "baseline",
              borderTop: `1px solid ${C.line}`,
              paddingTop: 12,
            }}
          >
            <dt
              style={{
                fontFamily: FONT_MONO,
                fontSize: 10.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.rust,
                margin: 0,
              }}
            >
              {r.k}
            </dt>
            <dd
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14.5,
                lineHeight: 1.5,
                color: C.ink,
                margin: 0,
              }}
            >
              {r.v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------------- hero ---------------- */

function Hero() {
  const C = useC();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.18], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  return (
    <header
      id="top"
      style={{
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 clamp(20px, 6vw, 96px)",
      }}
    >
      <motion.div
        style={{
          y,
          opacity,
          maxWidth: 1100,
          padding: "80px 110px 80px 130px",
          margin: "-80px 0 -80px -130px",
          background: `radial-gradient(72% 78% at 32% 50%, ${C.scrim} 0%, ${C.scrim.replace("0.9", "0.62")} 38%, ${C.scrim.replace("0.9", "0.3")} 58%, transparent 76%)`,
        }}
      >
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <Eyebrow>The Bok Field Guide · A report from the Learning Lab</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 420,
              fontSize: "clamp(2.7rem, 7.4vw, 6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: C.ink,
              textShadow: C.textShadow,
              margin: "26px 0 0",
            }}
          >
            <em style={{ fontStyle: "italic", fontWeight: 480, color: C.clay }}>
              Recipes,
            </em>{" "}
            Repos &amp;
            <br />
            Practicing Teaching
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
              lineHeight: 1.55,
              color: C.ink,
              textShadow: C.textShadowSoft,
              maxWidth: 640,
              margin: "30px 0 0",
            }}
          >
            Three back-to-back four-day intensives taught Harvard faculty to build
            with Claude. We expected a few brave volunteers — and all three weeks
            filled immediately. The field guide you just read is the engine
            underneath; this is what happened when faculty put their hands on it.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px 34px",
              marginTop: 42,
              fontFamily: FONT_MONO,
              fontSize: 13,
              fontWeight: 500,
              color: C.ink,
            }}
          >
            <span>🗓 May 18–21 · June 1–4 · June 8–10, 2026</span>
            <span>📍 Bok Center Learning Lab</span>
            <span>✳ Chat · ▤ Cowork · ▮ Code</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          fontFamily: FONT_MONO,
          fontSize: 11,
          letterSpacing: "0.2em",
          color: C.slate,
        }}
      >
        SCROLL
        <motion.span
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 44,
            background: C.clay,
            transformOrigin: "top",
            display: "block",
          }}
        />
      </motion.div>
    </header>
  );
}

/* ---------------- three signatures (the recipe metaphor) ---------------- */

const SIGNATURES = [
  {
    tag: "hello world",
    glyph: "✳",
    title: "Hello, World — with recipes",
    body: "We handed Claude a junk folder of recipe photos (handwriting, scans, terrible filenames) and it came back a clean, browsable website. A no-prerequisite on-ramp that ran on Day 1 of all three weeks: messy in, structured out.",
    foot: "the burst",
  },
  {
    tag: "context",
    glyph: "▤",
    title: "The recipe as a way of thinking",
    body: "Ingredients + instructions → dish. The same frame the field guide uses for the context window scaled all the way up to context engineering — a CLAUDE.md as the cookbook, a skill as a perfected recipe card. The most technical idea, taught without jargon.",
    foot: "the weave",
  },
  {
    tag: "memory",
    glyph: "▮",
    title: "A classroom that remembered itself",
    body: "Each morning faculty pulled a repo holding the day before: yesterday's transcript, a distilled 'top 10 takeaways,' and a knowledge base they could literally ask questions of. The course modeled the practice it taught.",
    foot: "the columns",
  },
];

function Signatures() {
  const C = useC();
  return (
    <section
      id="signatures"
      style={{
        position: "relative",
        zIndex: 1,
        background: C.panel,
        borderTop: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        padding: "clamp(72px, 10vw, 130px) clamp(20px, 6vw, 96px)",
      }}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-90px" }}
        style={{ maxWidth: 1240, margin: "0 auto" }}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Three signatures</Eyebrow>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 440,
            fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            color: C.ink,
            textShadow: C.textShadowSoft,
            margin: "22px 0 14px",
            maxWidth: 820,
          }}
        >
          One metaphor held the whole series together
        </motion.h2>
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: FONT_BODY,
            fontSize: "1.05rem",
            lineHeight: 1.6,
            color: C.slate,
            maxWidth: 640,
            margin: "0 0 56px",
          }}
        >
          The field guide you just read explains the engine. In the room we
          organized four days around a single, friendly idea, a recipe, and let
          it carry faculty from their first delight to real fluency. Three moves
          did most of the work.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 22,
          }}
        >
          {SIGNATURES.map((s) => (
            <motion.article
              key={s.tag}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{
                position: "relative",
                background: C.card,
                border: `1px solid ${C.line}`,
                borderRadius: 18,
                padding: "30px 28px 26px",
                backdropFilter: "blur(8px)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${C.clay}, ${C.kraft})`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 22,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11.5,
                    letterSpacing: "0.12em",
                    color: C.rust,
                    border: `1px solid ${C.kraft}`,
                    borderRadius: 999,
                    padding: "4px 12px",
                  }}
                >
                  {s.tag}
                </span>
                <span style={{ fontSize: 22, color: C.clay }}>{s.glyph}</span>
              </div>
              <h3
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                  letterSpacing: "-0.01em",
                  color: C.ink,
                  margin: "0 0 14px",
                  lineHeight: 1.15,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 15,
                  lineHeight: 1.62,
                  color: C.slate,
                  margin: "0 0 22px",
                }}
              >
                {s.body}
              </p>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11.5,
                  letterSpacing: "0.1em",
                  color: C.kraft,
                  borderTop: `1px solid ${C.line}`,
                  paddingTop: 14,
                }}
              >
                {s.foot}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- the story (alternating text + image/spec) ---------------- */

const PRIMITIVE_ROWS = [
  { k: "Skills", v: "expertise Claude loads when a task matches" },
  { k: "Hooks", v: "shell commands the harness runs, every time" },
  { k: "MCPs", v: "a standard port to outside tools and data" },
  { k: "Commands", v: "a workflow you trigger by name" },
  { k: "Subagents", v: "a clean, isolated context for a side task" },
];

const STORY = [
  {
    eyebrow: "Beat 01 · Hello, World",
    title: "Messy in, structured out",
    body: "A folder of photographed recipes (handwritten cards, magazine scans, junk filenames) handed to Claude with nothing else. It recognized the dishes, renamed the files, transcribed each recipe, and built a small browsable website. You could feel the delight in the room when the files came back clean.",
    image: {
      src: null,
      label: "the recipe website: messy photos → clean card-grid site (/public/claude/recipe-website.jpg)",
      caption: "▦ Recipe photos in → a browsable website out.",
      alt: "Recipe photos transformed into a website",
    },
  },
  {
    eyebrow: "Beat 02 · The connective move",
    title: "Faculty's own recipes, prototyped overnight",
    body: "At a day's close, faculty filled out paper 'recipe cards' (Ingredients, Instructions, Serving), each a real teaching problem. It's the same card the field guide hands you on the recipe page. Overnight we scaffolded every one into a working starter project; faculty walked in the next morning and found their own half-formed idea already running in a folder.",
    image: {
      src: null,
      label: "handwritten recipe cards + the overnight prototype they became (/public/claude/recipe-cards.jpg)",
      caption: "▦ A paper recipe card and the prototype it became.",
      alt: "Handwritten recipe cards and generated prototypes",
    },
  },
  {
    eyebrow: "Beat 03 · Context engineering",
    title: "One line changes everything",
    body: "The field guide shows how everything lands in one context window. Here faculty saw it bite: Claude was ending every answer with a limerick, a single line buried in a CLAUDE.md file. Edited live, the behavior flipped instantly. One sentence in one markdown file steered a whole folder. That is context engineering, taught as a moment of delight — and nearly everyone wrote and ran their own.",
    image: {
      src: null,
      label: "the CLAUDE.md 'limerick' line / a faculty member's own context file (/public/claude/claude-md.jpg)",
      caption: "▦ The CLAUDE.md behind the limerick reveal.",
      alt: "A CLAUDE.md context file",
    },
  },
  {
    eyebrow: "Beat 04 · What got built",
    title: "Things faculty actually built",
    body: "Not toy ideas: an oral-exam practice coach that gives students feedback before their first viva; a folklore archive woven into a website in an afternoon; a make-up-exam generator; lecture notes auto-built from class recordings; an anticipate-student-questions tool for chemistry teaching fellows. The excitement of the people who built them is the argument.",
    image: {
      src: null,
      label: "screenshots of faculty-built projects — oral-exam coach, folklore site, etc. (/public/claude/faculty-projects.jpg)",
      caption: "▦ A few of the things faculty built and kept.",
      alt: "Faculty-built projects",
    },
  },
  {
    eyebrow: "Beat 05 · Under the hood",
    title: "The levers underneath the recipe",
    body: "By the last day, faculty wanted to know what did the steering. Underneath sits the harness (the same program the field guide introduces when it turns from the engine to the tools) and a small set of primitives you configure to shape it. Skills, hooks, MCPs, slash commands, subagents: five levers, each a different way to decide what Claude does and when. They are the substance of days three and four, and the reason a recipe can harden into a repeatable tool.",
    spec: { glyph: "✦", rows: PRIMITIVE_ROWS },
  },
];

function Story() {
  const C = useC();
  return (
    <section
      id="story"
      style={{
        position: "relative",
        zIndex: 1,
        background: C.panelAlt,
        borderTop: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        padding: "clamp(72px, 10vw, 130px) clamp(20px, 6vw, 96px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          variants={stagger}
          style={{ marginBottom: 70 }}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>How the weeks actually went</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 440,
              fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: C.ink,
              textShadow: C.textShadowSoft,
              margin: "22px 0 0",
              maxWidth: 760,
            }}
          >
            From a junk drawer of photos to a way of working
          </motion.h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 9vw, 110px)" }}>
          {STORY.map((beat, i) => (
            <motion.div
              key={beat.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-110px" }}
              transition={{ duration: 0.7, ease: [0.21, 0.6, 0.35, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "clamp(28px, 4vw, 64px)",
                alignItems: "center",
              }}
            >
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ marginBottom: 16 }}>
                  <Eyebrow light>{beat.eyebrow}</Eyebrow>
                </div>
                <h3
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: "italic",
                    fontWeight: 480,
                    fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                    letterSpacing: "-0.015em",
                    color: C.ink,
                    margin: "0 0 16px",
                    lineHeight: 1.12,
                  }}
                >
                  {beat.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    lineHeight: 1.68,
                    color: C.slate,
                    margin: 0,
                    maxWidth: 540,
                  }}
                >
                  {beat.body}
                </p>
              </div>
              {beat.spec ? (
                <SpecCard glyph={beat.spec.glyph} rows={beat.spec.rows} />
              ) : (
                <ImageSlot
                  src={beat.image.src}
                  alt={beat.image.alt}
                  caption={beat.image.caption}
                  label={beat.image.label}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- by the numbers ---------------- */

const FACTS = [
  { k: "Demand", v: "Three intensive weeks — every one oversubscribed. We planned one and added two more; both filled immediately." },
  { k: "Reach", v: "Twelve sessions across three runs (four mornings each), 1:00–2:30pm in the Learning Lab studio." },
  { k: "The on-ramp", v: "The recipe-photos → website demo opened Day 1 of all three weeks — a signature, not a one-off." },
  { k: "Built by faculty", v: "Oral-exam coaches, archive sites, grading helpers, make-up-exam generators, lecture notes from recordings." },
];

function Numbers() {
  const C = useC();
  return (
    <section
      id="numbers"
      style={{
        position: "relative",
        zIndex: 1,
        background: C.panel,
        borderTop: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        padding: "clamp(72px, 10vw, 120px) clamp(20px, 6vw, 96px)",
      }}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-90px" }}
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Why faculty showed up</Eyebrow>
        </motion.div>
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: FONT_BODY,
            fontSize: "1.05rem",
            lineHeight: 1.6,
            color: C.slate,
            maxWidth: 640,
            margin: "22px 0 0",
          }}
        >
          The hardest evidence we have is demand — and it points the same way as
          everything we saw in the room.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 0,
            marginTop: 42,
            border: `1px solid ${C.line}`,
            borderRadius: 16,
            overflow: "hidden",
            background: C.card,
            backdropFilter: "blur(8px)",
          }}
        >
          {FACTS.map((f, i) => (
            <motion.div
              key={f.k}
              variants={fadeUp}
              style={{
                padding: "30px 26px",
                borderLeft: i === 0 ? "none" : `1px solid ${C.line}`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.clay,
                  marginBottom: 14,
                }}
              >
                {f.k}
              </div>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 15,
                  lineHeight: 1.62,
                  color: C.ink,
                  margin: 0,
                }}
              >
                {f.v}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- closing ---------------- */

function Closing() {
  const C = useC();
  const linkStyle = {
    fontFamily: FONT_MONO,
    fontSize: 12.5,
    letterSpacing: "0.06em",
    color: C.paper,
    background: C.ink,
    textDecoration: "none",
    padding: "11px 20px",
    borderRadius: 999,
    display: "inline-block",
  };
  const linkAlt = {
    ...linkStyle,
    color: C.ink,
    background: "transparent",
    border: `1px solid ${C.line}`,
  };
  return (
    <section
      id="closing"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "82vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(72px, 10vw, 120px) clamp(20px, 6vw, 96px)",
      }}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        style={{ textAlign: "center", maxWidth: 860 }}
      >
        <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}>
          <Eyebrow>The through-line</Eyebrow>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 420,
            fontSize: "clamp(2.2rem, 5.4vw, 4.2rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            color: C.ink,
            textShadow: C.textShadow,
            margin: "24px 0 22px",
          }}
        >
          We don't script teaching.
          <br />
          <em style={{ fontStyle: "italic", color: C.clay }}>We practice it.</em>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: FONT_BODY,
            fontSize: "1.1rem",
            lineHeight: 1.65,
            color: C.slate,
            maxWidth: 620,
            margin: "0 auto 34px",
          }}
        >
          Build it with the people in the room, capture what emerges, iterate the
          next day. Faculty using AI on their own work (research, writing,
          administration) is the precondition for designing good AI-aware work
          for students. The field guide is the primer; the recipe card is where
          your own first project begins.
        </motion.p>
        <motion.div
          variants={fadeUp}
          style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/recipe" style={linkStyle}>
            Plan your first project →
          </Link>
          <Link href="/" style={linkAlt}>
            ← Back to the field guide
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function ClaudeExperience() {
  return (
    <Shell
      nav={{
        brand: { name: "Bok Field Guide", sub: "/ Claude Code" },
        links: [
          { href: "/", label: "← Field Guide" },
          { href: "#signatures", label: "The metaphor" },
          { href: "#story", label: "What happened" },
          { href: "#numbers", label: "By the numbers" },
        ],
      }}
      footer={{ tagline: "A report · built with Claude, naturally" }}
    >
      <Hero />
      <Interlude from="✳ hello world" to="▤ context" label="the recipe deepens" />
      <Signatures />
      <Interlude from="▤ context" to="▮ memory" label="the field remembers" />
      <Story />
      <Interlude from="▮ memory" to="◯ practice" label="everything converges" />
      <Numbers />
      <Closing />
    </Shell>
  );
}

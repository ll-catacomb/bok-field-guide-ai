"use client";

/* /claude — the Claude Code workshop, told in the-claude-report's scrollytelling
   style (the Bok Center house look for Claude material). Days 1–2 live in the
   field guide; this page is the asynchronous companion to days 3–4: the five
   primitives that extend Claude Code. Content adapted from mw-claude-quests. */

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

/* ---------- spec card: a primitive's key facts, glassmorphic ---------- */

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
              gridTemplateColumns: "minmax(88px, 34%) 1fr",
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
                letterSpacing: "0.14em",
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
            <Eyebrow>The Bok Field Guide · Claude Code Workshop</Eyebrow>
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
              Skills,
            </em>{" "}
            Hooks &amp;
            <br />
            Subagents
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
            The Bok Center runs four-day faculty intensives on building with
            Claude. Days one and two — the engine, context, and tools — are the
            field guide you just read. This is the asynchronous companion to days
            three and four: the five primitives that turn Claude Code from a chat
            you talk to into a system you extend.
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
            <span>🗓 A four-day faculty intensive</span>
            <span>📍 Bok Center · Learning Lab</span>
            <span>✳ Skills · ▤ Hooks · ▮ MCPs · ◯ Commands · ✦ Subagents</span>
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

/* ---------------- three ways to steer ---------------- */

const STEER = [
  {
    tag: "model-invoked",
    glyph: "✳",
    title: "Claude decides",
    body: "Claude reads the room and chooses — which skill fits this task, which tool to call, when to spawn a subagent. Probabilistic, flexible, and the source of most of its intelligence.",
    foot: "skills · subagents · MCP tools",
  },
  {
    tag: "harness-triggered",
    glyph: "▤",
    title: "The harness decides",
    body: "Underneath the intelligence sits a deterministic layer. When a lifecycle event fires — a file saved, a turn finished — a shell command runs. Every time, whether the model wants it or not.",
    foot: "hooks",
  },
  {
    tag: "user-invoked",
    glyph: "▮",
    title: "You decide",
    body: "Sometimes you want the shortcut in your own hand. You type a slash command; the harness expands a template into a full prompt and sends it. A named workflow, begun on purpose.",
    foot: "slash commands",
  },
];

function Steer() {
  const C = useC();
  return (
    <section
      id="steer"
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
          <Eyebrow>Who decides what runs</Eyebrow>
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
          Three hands can reach the wheel
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
          Everything Claude Code does is set in motion by one of three parties.
          Knowing which one is holding the wheel is the whole mental model —
          every primitive that follows is just a variation on it.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 22,
          }}
        >
          {STEER.map((s) => (
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

/* ---------------- the five primitives ---------------- */

const PRIMITIVES = [
  {
    eyebrow: "Primitive 01 · Skills",
    glyph: "✳",
    title: "Expertise Claude loads when it fits",
    body: "A skill is a folder with a SKILL.md inside: a short description up top, a playbook below. Claude reads only the descriptions at the start of a session, and loads a skill's full body the moment your task matches — progressive disclosure, so you can keep dozens on hand and pay for none of them until one applies.",
    spec: [
      { k: "Invoked by", v: "the model, on match" },
      { k: "Lives in", v: "SKILL.md + a folder" },
      { k: "Loads", v: "progressively, on demand" },
      { k: "Good for", v: "teaching Claude how to do a task well" },
    ],
  },
  {
    eyebrow: "Primitive 02 · Hooks",
    glyph: "▤",
    title: "Automation that isn't optional",
    body: "A hook is a shell command the harness runs at a set moment — before a tool call, after an edit, when a turn ends. The model has no say. It's the deterministic floor beneath all the probabilistic reasoning: when the event fires, the command runs, every time, whether Claude wants it to or not.",
    spec: [
      { k: "Invoked by", v: "the harness, on lifecycle events" },
      { k: "Lives in", v: "a settings JSON file" },
      { k: "Loads", v: "every time — deterministic" },
      { k: "Good for", v: "what must happen, guaranteed" },
    ],
  },
  {
    eyebrow: "Primitive 03 · MCPs",
    glyph: "▮",
    title: "A standard port for the outside world",
    body: "An MCP server is a separate process that speaks the Model Context Protocol, an open standard from Anthropic. Connect one and Claude gains new tools that look just like its built-ins — but reach a database, a repository, your calendar. One protocol, any number of services, each key held server-side.",
    spec: [
      { k: "Invoked by", v: "the model, as tools" },
      { k: "Lives in", v: "a separate server process" },
      { k: "Speaks", v: "the Model Context Protocol" },
      { k: "Good for", v: "reaching external systems" },
    ],
  },
  {
    eyebrow: "Primitive 04 · Slash Commands",
    glyph: "◯",
    title: "A workflow behind a short name",
    body: "Type /summarize-paper and the harness expands a markdown template into a full prompt — arguments filled in, files inlined, shell output embedded — before Claude ever sees it. Deterministic dispatch on the way in, the exact counterpart to a hook firing on the way out.",
    spec: [
      { k: "Invoked by", v: "you, by name" },
      { k: "Lives in", v: ".claude/commands/*.md" },
      { k: "Expands", v: "on the way in" },
      { k: "Good for", v: "a shortcut you trigger by hand" },
    ],
  },
  {
    eyebrow: "Primitive 05 · Subagents",
    glyph: "✦",
    title: "A clean context for a side task",
    body: "A subagent is an isolated Claude spawned for one job. It works in its own context window and returns only its final answer — all the searching and half-read files stay behind and vanish. It keeps the main conversation uncluttered, and lets focused work run in parallel.",
    spec: [
      { k: "Invoked by", v: "delegation from the main agent" },
      { k: "Lives in", v: ".claude/agents/*.md" },
      { k: "Runs in", v: "its own context window" },
      { k: "Good for", v: "focused work without the clutter" },
    ],
  },
];

function Primitives() {
  const C = useC();
  return (
    <section
      id="primitives"
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
            <Eyebrow>The building blocks</Eyebrow>
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
            Five primitives, one lever each
          </motion.h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 9vw, 110px)" }}>
          {PRIMITIVES.map((p, i) => (
            <motion.div
              key={p.title}
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
                  <Eyebrow light>{p.eyebrow}</Eyebrow>
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
                  {p.title}
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
                  {p.body}
                </p>
              </div>
              <SpecCard glyph={p.glyph} rows={p.spec} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- how it fits the workshop ---------------- */

const FACTS = [
  { k: "Days 1–2", v: "The engine, context, and handling output — covered by the field guide you just read. Start there if you skipped it." },
  { k: "Days 3–4", v: "Extending Claude Code: the five primitives above, each built and run against a real teaching problem you bring." },
  { k: "Prerequisite", v: "No coding. If you followed the field guide, you're ready — the workshop builds only on those intuitions." },
  { k: "What you leave with", v: "Your own skill, hook, or command running in a folder — Claude Code shaped to how you actually work." },
];

function Numbers() {
  const C = useC();
  return (
    <section
      id="fit"
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
          <Eyebrow>How this fits the workshop</Eyebrow>
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
          The live workshop is hands-on and four days long. This page is the part
          you can carry home and work through at your own pace.
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
          Stop prompting it.
          <br />
          <em style={{ fontStyle: "italic", color: C.clay }}>Start extending it.</em>
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
          The field guide showed you the engine; the primitives are the levers.
          Write one skill, wire one hook, save one command, and Claude Code stops
          being a chat you visit and becomes a tool that fits your hand. That is
          the whole workshop — the rest is practice.
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
          { href: "#steer", label: "Steering" },
          { href: "#primitives", label: "The primitives" },
          { href: "#fit", label: "How it fits" },
        ],
      }}
      footer={{ tagline: "Claude Code workshop · built with Claude, naturally" }}
    >
      <Hero />
      <Interlude from="✳ chat" to="▤ extend" label="from talking to building" />
      <Steer />
      <Interlude from="✳ model" to="▮ harness" label="three hands on the wheel" />
      <Primitives />
      <Interlude from="▮ primitives" to="◯ practice" label="bring your own problem" />
      <Numbers />
      <Closing />
    </Shell>
  );
}

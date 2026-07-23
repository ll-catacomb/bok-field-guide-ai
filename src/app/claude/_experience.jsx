"use client";

/* ----------------------------------------------------------------
   SHARED EXPERIENCE ENGINE — Learning Lab @ the Bok Center
   The particle field, theme, nav, footer, and shell chrome used by
   /promo, /report, and /bullets. Page content lives in each route's
   own *Experience.jsx; this module is just the reusable scaffolding.
   Palette: Anthropic ivory / ink / clay / kraft
   Formations (scroll-driven): ✳ burst · ▤ weave · ▮ columns · ◯ ring
---------------------------------------------------------------- */

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";
import * as THREE from "three";
import { motion, useScroll, useSpring } from "framer-motion";

export const LIGHT = {
  paper: "#FAF9F5",
  ivory: "#F0EEE6",
  ink: "#141413",
  clay: "#D97757",
  rust: "#A8472E",
  kraft: "#D4A27F",
  slate: "#5E5C55",
  line: "#DEDAD0",
  panel: "rgba(250,249,245,0.88)",
  panelAlt: "rgba(240,238,230,0.9)",
  card: "rgba(255,255,255,0.6)",
  glass: "rgba(250,249,245,0.66)",
  navBg: "rgba(250,249,245,0.82)",
  btnText: "#FAF9F5",
  footerBg: "#141413",
  footerText: "#FAF9F5",
  grainOpacity: 0.05,
  grainBlend: "multiply",
  particleOpacity: 0.55,
  textShadow: "0 1px 2px rgba(20,20,19,0.10), 0 10px 30px rgba(20,20,19,0.12)",
  textShadowSoft: "0 1px 1px rgba(20,20,19,0.07), 0 6px 18px rgba(20,20,19,0.08)",
  scrim: "rgba(250,249,245,0.9)",
};

export const DARK = {
  paper: "#1A1915",
  ivory: "#211F1A",
  ink: "#F0EEE6",
  clay: "#D97757",
  rust: "#C96A4A",
  kraft: "#C9A381",
  slate: "#A5A096",
  line: "#34322B",
  panel: "rgba(26,25,21,0.88)",
  panelAlt: "rgba(33,31,26,0.9)",
  card: "rgba(46,44,37,0.55)",
  glass: "rgba(26,25,21,0.66)",
  navBg: "rgba(26,25,21,0.82)",
  btnText: "#FAF9F5",
  footerBg: "#0E0D0B",
  footerText: "#F0EEE6",
  grainOpacity: 0.06,
  grainBlend: "screen",
  particleOpacity: 0.74,
  textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 12px 34px rgba(0,0,0,0.55)",
  textShadowSoft: "0 1px 1px rgba(0,0,0,0.4), 0 6px 18px rgba(0,0,0,0.4)",
  scrim: "rgba(26,25,21,0.9)",
};

const ThemeCtx = createContext({ C: LIGHT, mode: "light", toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);
export const useC = () => useContext(ThemeCtx).C;

export const FONT_DISPLAY = `"Fraunces", Georgia, serif`;
export const FONT_BODY = `"Schibsted Grotesk", "Helvetica Neue", Arial, sans-serif`;
export const FONT_MONO = `"Spline Sans Mono", "SF Mono", Menlo, monospace`;

/* ---------------- particle formations ---------------- */

const N = 28800;

function buildFormations(n) {
  const burst = new Float32Array(n * 3);
  const weave = new Float32Array(n * 3);
  const cols = new Float32Array(n * 3);
  const ring = new Float32Array(n * 3);

  const SPOKES = 15;
  const armLen = Array.from({ length: SPOKES }, () => 0.68 + Math.random() * 0.55);
  const armWid = Array.from({ length: SPOKES }, () => 0.55 + Math.random() * 1.0);
  const armOff = Array.from({ length: SPOKES }, () => (Math.random() - 0.5) * 0.14);
  const armSpeed = Array.from({ length: SPOKES }, () => 0.22 + Math.random() * 0.34);
  const armPhase = Array.from({ length: SPOKES }, () => Math.random() * Math.PI * 2);
  const dirX = new Float32Array(n);
  const dirY = new Float32Array(n);
  const baseR = new Float32Array(n);
  const armIdx = new Int16Array(n).fill(-1);
  const GRID_W = 170;
  const COLS = 26;
  const tiltX = -0.55;

  for (let i = 0; i < n; i++) {
    const i3 = i * 3;

    /* burst — radial spokes with a filled core, breathing arms, stray leakers */
    {
      if (i % 11 === 0) {
        const cr = Math.pow(Math.random(), 0.85) * 1.05;
        const ca = Math.random() * Math.PI * 2;
        burst[i3] = Math.cos(ca) * cr;
        burst[i3 + 1] = Math.sin(ca) * cr;
        burst[i3 + 2] = (Math.random() - 0.5) * 0.7;
      } else {
        const s = i % SPOKES;
        const leaker = i % 17 === 0;
        if (leaker) {
          const e = Math.pow(Math.random(), 2.1);
          const t = 1.0 + e * 0.8;
          const r = t * 4.1 * armLen[s];
          const tri = Math.random() + Math.random() - 1;
          const coneA = (0.04 + e * 0.85) * (0.6 + armWid[s] * 0.5);
          const a = (s / SPOKES) * Math.PI * 2 + armOff[s] + tri * coneA;
          const tri2 = Math.random() + Math.random() - 1;
          burst[i3] = Math.cos(a) * r;
          burst[i3 + 1] = Math.sin(a) * r;
          burst[i3 + 2] = tri2 * (0.3 + e * 1.5);
          dirX[i] = Math.cos(a);
          dirY[i] = Math.sin(a);
          baseR[i] = r;
          armIdx[i] = s;
        } else {
          const t = Math.pow(Math.random(), 0.65);
          const r = t * 4.1 * armLen[s];
          const a =
            (s / SPOKES) * Math.PI * 2 +
            armOff[s] +
            (Math.random() - 0.5) * ((0.13 * armWid[s]) / (0.35 + t));
          burst[i3] = Math.cos(a) * r;
          burst[i3 + 1] = Math.sin(a) * r;
          burst[i3 + 2] = (Math.random() - 0.5) * 1.0 * (1 - t * 0.7);
          dirX[i] = Math.cos(a);
          dirY[i] = Math.sin(a);
          baseR[i] = r;
          armIdx[i] = s;
        }
      }
    }

    /* weave — rippled fabric plane, tilted toward camera */
    {
      const gx = (i % GRID_W) / (GRID_W - 1);
      const gy = Math.floor(i / GRID_W) / Math.ceil(n / GRID_W - 1);
      const x = (gx - 0.5) * 13.5;
      let y = (gy - 0.5) * 8.5;
      let z =
        Math.sin(gx * Math.PI * 4.0) * 0.6 +
        Math.cos(gy * Math.PI * 3.0 + gx * 2.0) * 0.6 +
        (Math.random() - 0.5) * 0.12;
      const cy = Math.cos(tiltX), sy = Math.sin(tiltX);
      const y2 = y * cy - z * sy;
      const z2 = y * sy + z * cy;
      weave[i3] = x;
      weave[i3 + 1] = y2;
      weave[i3 + 2] = z2;
    }

    /* columns — vertical streams, like a terminal raining state */
    {
      const c = i % COLS;
      const x = (c / (COLS - 1) - 0.5) * 12.5 + (Math.random() - 0.5) * 0.14;
      cols[i3] = x;
      cols[i3 + 1] = (Math.random() - 0.5) * 9.5;
      cols[i3 + 2] = (Math.random() - 0.5) * 3.0;
    }

    /* ring — a settled torus, slightly squashed */
    {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const R = 3.7;
      const rr = 0.45 + Math.random() * 0.35;
      ring[i3] = (R + rr * Math.cos(v)) * Math.cos(u);
      ring[i3 + 1] = (R + rr * Math.cos(v)) * Math.sin(u) * 0.6;
      ring[i3 + 2] = rr * Math.sin(v) + Math.sin(u * 3) * 0.25;
    }
  }
  return {
    formations: [burst, weave, cols, ring],
    meta: { dirX, dirY, baseR, armIdx, armSpeed, armPhase, spokes: SPOKES },
  };
}

/* scroll keyframes: which formation owns which stretch of the page */
const KEYS = [
  { p: 0.0, f: 0 },
  { p: 0.14, f: 0 },
  { p: 0.32, f: 1 },
  { p: 0.46, f: 1 },
  { p: 0.6, f: 2 },
  { p: 0.72, f: 2 },
  { p: 0.88, f: 3 },
  { p: 1.01, f: 3 },
];

const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);

function blendAt(p) {
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= KEYS[i].p && p < KEYS[i + 1].p) {
      const a = KEYS[i].f;
      const b = KEYS[i + 1].f;
      if (a === b) return { a, b, t: 0 };
      const t = (p - KEYS[i].p) / (KEYS[i + 1].p - KEYS[i].p);
      return { a, b, t: smoother(Math.min(Math.max(t, 0), 1)) };
    }
  }
  return { a: 3, b: 3, t: 0 };
}

/* ---------------- the fixed three.js field ---------------- */

function ParticleField({ progress, reduced, palette }) {
  const mountRef = useRef(null);
  const progressRef = useRef(0);
  const fogRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      progressRef.current = v;
    });
    return unsub;
  }, [progress]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(new THREE.Color(palette.paper), 9.5, 19);
    fogRef.current = scene.fog;

    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      60
    );
    camera.position.z = 11.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const { formations, meta } = buildFormations(N);

    const positions = new Float32Array(N * 3);
    positions.set(formations[0]);

    const colors = new Float32Array(N * 3);
    const clay = new THREE.Color("#D97757");
    const kraft = new THREE.Color("#D4A27F");
    const rust = new THREE.Color("#C26545");
    const ember = new THREE.Color("#E08A4F");
    for (let i = 0; i < N; i++) {
      const r = Math.random();
      const col = r < 0.5 ? clay : r < 0.72 ? ember : r < 0.88 ? kraft : rust;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.034,
      vertexColors: true,
      transparent: true,
      opacity: palette.particleOpacity,
      depthWrite: false,
      sizeAttenuation: true,
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const mouse = { x: 0, y: 0 };
    const onPointer = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const start = performance.now();
    const pos = geometry.attributes.position.array;
    const burstArr = formations[0];
    const armPulse = new Float32Array(meta.spokes);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (document.hidden) return;

      const time = (performance.now() - start) / 1000;
      const { a, b, t } = blendAt(progressRef.current);

      if ((a === 0 || b === 0) && !reduced) {
        for (let s = 0; s < meta.spokes; s++) {
          armPulse[s] =
            1 + 0.13 * Math.sin(time * meta.armSpeed[s] + meta.armPhase[s]);
        }
        for (let i = 0; i < N; i++) {
          const s = meta.armIdx[i];
          if (s < 0) continue;
          const r = meta.baseR[i] * armPulse[s];
          burstArr[i * 3] = meta.dirX[i] * r;
          burstArr[i * 3 + 1] = meta.dirY[i] * r;
        }
      }

      const A = formations[a];
      const B = formations[b];
      const drift = reduced ? 0 : 0.055;

      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        pos[i3] =
          A[i3] + (B[i3] - A[i3]) * t + Math.sin(time * 0.5 + i * 0.61) * drift;
        pos[i3 + 1] =
          A[i3 + 1] +
          (B[i3 + 1] - A[i3 + 1]) * t +
          Math.cos(time * 0.43 + i * 0.37) * drift;
        pos[i3 + 2] =
          A[i3 + 2] +
          (B[i3 + 2] - A[i3 + 2]) * t +
          Math.sin(time * 0.36 + i * 1.21) * drift;
      }
      geometry.attributes.position.needsUpdate = true;

      if (!reduced) {
        group.rotation.z = Math.sin(time * 0.06) * 0.07;
        group.rotation.y += (mouse.x * 0.34 - group.rotation.y) * 0.045;
        group.rotation.x += (mouse.y * 0.26 - group.rotation.x) * 0.045;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  useEffect(() => {
    if (fogRef.current) fogRef.current.color.set(palette.paper);
    if (materialRef.current) materialRef.current.opacity = palette.particleOpacity;
  }, [palette]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    />
  );
}

/* ---------------- small shared pieces ---------------- */

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.6, 0.35, 1] },
  },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export function Eyebrow({ children, light }) {
  const C = useC();
  return (
    <div
      style={{
        fontFamily: FONT_MONO,
        fontSize: 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: light ? C.kraft : C.rust,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          width: 28,
          height: 1,
          background: light ? C.kraft : C.clay,
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}

/* a transparent band between panels where the field morphs in the open */
export function Interlude({ from, to, label }) {
  const C = useC();
  return (
    <div
      style={{
        height: "52vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: "-25%" }}
        transition={{ duration: 1 }}
        style={{
          fontFamily: FONT_MONO,
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: C.slate,
          background: C.glass,
          border: `1px solid ${C.line}`,
          borderRadius: 999,
          padding: "10px 22px",
          backdropFilter: "blur(6px)",
        }}
      >
        {from} <span style={{ color: C.clay, margin: "0 8px" }}>⟶</span> {to}
        <span style={{ color: C.kraft, marginLeft: 14 }}>{label}</span>
      </motion.div>
    </div>
  );
}

/* ---------------- nav + footer chrome ---------------- */

function Nav({ brand, links, cta }) {
  const { C, mode, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = {
    fontFamily: FONT_MONO,
    fontSize: 12.5,
    letterSpacing: "0.06em",
    color: C.ink,
    textDecoration: "none",
    padding: "6px 2px",
    borderBottom: "1px solid transparent",
  };

  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.21, 0.6, 0.35, 1], delay: 0.2 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px clamp(20px, 4vw, 56px)",
        background: scrolled ? C.navBg : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        transition: "background .4s, border-color .4s, backdrop-filter .4s",
      }}
    >
      <a
        href="#top"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <span style={{ color: C.clay, fontSize: 20, lineHeight: 1 }}>✳</span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 700,
            fontSize: 15,
            color: C.ink,
            letterSpacing: "-0.01em",
          }}
        >
          {brand?.name || "Learning Lab"}
        </span>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: C.slate,
            display:
              typeof window !== "undefined" && window.innerWidth < 640
                ? "none"
                : "inline",
          }}
        >
          {brand?.sub || "/ Bok Center"}
        </span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 2.5vw, 30px)" }}>
        {(links || []).map((l) => (
          <a key={l.href} className="navlink" href={l.href} style={link}>
            {l.label}
          </a>
        ))}
        <motion.button
          onClick={toggle}
          aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92, rotate: 40 }}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: `1px solid ${C.line}`,
            background: C.glass,
            color: C.clay,
            fontSize: 15,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          {mode === "light" ? "☾" : "☼"}
        </motion.button>
        {cta && (
          <motion.a
            href={cta.href}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: FONT_MONO,
              fontSize: 12.5,
              color: C.paper,
              background: C.ink,
              textDecoration: "none",
              padding: "9px 18px",
              borderRadius: 999,
            }}
          >
            {cta.label}
          </motion.a>
        )}
      </div>
    </motion.nav>
  );
}

export function Footer({ tagline }) {
  const C = useC();
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        background: C.footerBg,
        color: C.footerText,
        padding: "44px clamp(20px, 6vw, 96px)",
        display: "flex",
        flexWrap: "wrap",
        gap: "16px 40px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ color: C.clay, fontSize: 18 }}>✳</span>
        <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 14 }}>
          Derek Bok Center for Teaching and Learning · Learning Lab
        </span>
      </div>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 11.5,
          letterSpacing: "0.08em",
          color: C.kraft,
        }}
      >
        {tagline || "Harvard University · built with Claude, naturally"}
      </div>
    </footer>
  );
}

/* ---------------- the shell that wires it together ---------------- */

export function Shell({ nav, footer, children }) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    mass: 0.7,
  });

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const [mode, setMode] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  const C = mode === "dark" ? DARK : LIGHT;
  const theme = useMemo(
    () => ({
      C,
      mode,
      toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  return (
    <ThemeCtx.Provider value={theme}>
      <div style={{ background: C.paper, color: C.ink, minHeight: "100vh" }}>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&family=Spline+Sans+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
        body { margin: 0; background: ${C.paper}; }
        ::selection { background: ${C.clay}; color: #FAF9F5; }
        a.navlink:hover { border-bottom-color: ${C.clay} !important; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${C.clay}; outline-offset: 3px; border-radius: 4px;
        }
        section, nav, footer, article, span, p, h1, h2, h3, a, button {
          transition: background-color .45s ease, color .45s ease, border-color .45s ease;
        }
        @media (max-width: 640px) { a.navlink { display: none; } }
      `}</style>

        {/* paper grain */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            opacity: C.grainOpacity,
            mixBlendMode: C.grainBlend,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <ParticleField progress={smooth} reduced={reduced} palette={C} />
        <Nav brand={nav?.brand} links={nav?.links} cta={nav?.cta} />
        {children}
        <Footer tagline={footer?.tagline} />
      </div>
    </ThemeCtx.Provider>
  );
}

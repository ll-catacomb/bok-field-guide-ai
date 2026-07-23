import fs from "node:fs";
import path from "node:path";

// Reads curated gallery "story" markdown from src/content/gallery/ (gitignored
// while the copy is being vetted). If the folder is absent/empty — e.g. a fresh
// clone of the public repo — every function returns nothing and the gallery
// gracefully falls back to the short Bok "ideas" list only.
const DIR = path.join(process.cwd(), "src/content/gallery");

// Display order (umbrella first, then roughly by theme). Unknown slugs sort last.
const ORDER = [
  "ai-enhancement-overview",
  "ai-resilient-courses",
  "impromptu-comprehension-checks",
  "essay-to-system",
  "complit-126x-essay-to-system",
  "vibe-coding-stations",
  "vibe-coding-modern-hebrew",
  "annotation-activities",
  "gened-1196-oral-exam",
  "complit-126x-oral-exam-tool",
  "astro-17-ai-integration",
  "hls-civ-pro-pipeline",
];

export type Story = {
  slug: string;
  title: string;
  longTitle?: string;
  shortDescription: string;
  courses?: string;
  dates?: string;
  tiers: string[];
  hero?: string;
  body: string;
};

function parse(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw.trim() };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2].trim() };
}

export function getStorySlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getStory(slug: string): Story | null {
  const p = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(p)) return null;
  const { meta, body } = parse(fs.readFileSync(p, "utf8"));
  return {
    slug,
    title: meta.title || slug,
    longTitle: meta.longTitle || undefined,
    shortDescription: meta.shortDescription || "",
    courses: meta.courses || undefined,
    dates: meta.dates || undefined,
    tiers: (meta.tiers || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    hero: meta.hero || undefined,
    body,
  };
}

export function getStories(): Story[] {
  const stories = getStorySlugs()
    .map(getStory)
    .filter((s): s is Story => s !== null);
  return stories.sort((a, b) => {
    const ia = ORDER.indexOf(a.slug);
    const ib = ORDER.indexOf(b.slug);
    return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
  });
}

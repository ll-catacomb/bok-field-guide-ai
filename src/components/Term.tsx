"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import { GLOSSARY } from "@/data/glossary";

// Inline jargon that reveals a definition card on hover/focus. Use in MDX or TSX:
//   <Term id="token">tokens</Term>
// The id must match a key in src/data/glossary.ts. Unknown ids render the text
// plainly (with a dev warning), so the prose never breaks.
export function Term({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const entry = GLOSSARY[id];

  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[glossary] no entry for id "${id}"`);
    }
    return <>{children}</>;
  }

  return (
    <HoverCard.Root openDelay={120} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <button type="button" className="term-trigger">
          {children}
        </button>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="term-card"
          side="top"
          align="start"
          sideOffset={6}
          collisionPadding={12}
        >
          <span className="term-card-label">{entry.term}</span>
          <p className="term-card-def">{entry.definition}</p>
          {entry.links && entry.links.length > 0 && (
            <ul className="term-card-links">
              {entry.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {l.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <HoverCard.Arrow className="term-card-arrow" width={12} height={6} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

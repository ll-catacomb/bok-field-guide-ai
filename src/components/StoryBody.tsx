"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { wrapChildren } from "@/components/TermText";

// Renders a curated story's markdown body in the field-guide prose style, with
// glossary hover cards woven through the paragraphs and list items.
export function StoryBody({ markdown }: { markdown: string }) {
  return (
    <div className="prose story-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p>{wrapChildren(children)}</p>,
          li: ({ children }) => <li>{wrapChildren(children)}</li>,
          // Strip inline images from bodies (a hero image runs in the header).
          img: () => null,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

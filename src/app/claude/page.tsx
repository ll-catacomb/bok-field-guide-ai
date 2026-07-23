import type { Metadata } from "next";
import ClaudeClient from "./claude-client";

export const metadata: Metadata = {
  title: "The Claude Code Workshop — Bok Field Guide",
  description:
    "The asynchronous companion to the Bok Center's Claude Code faculty workshop: the five primitives — skills, hooks, MCPs, slash commands, and subagents — that turn Claude Code from a chat into a system you extend.",
};

export default function ClaudePage() {
  return <ClaudeClient />;
}

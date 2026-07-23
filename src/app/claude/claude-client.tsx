"use client";

import dynamic from "next/dynamic";

// The experience uses three.js + framer-motion, so it must render client-only.
const ClaudeExperience = dynamic(() => import("./ClaudeExperience"), {
  ssr: false,
});

export default function ClaudeClient() {
  return <ClaudeExperience />;
}

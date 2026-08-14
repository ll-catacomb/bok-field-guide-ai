import type { Metadata } from "next";
import { CatalogStripe } from "@/components/CatalogStripe";
import Tutorial from "@/content/home.mdx";

export const metadata: Metadata = {
  title: "The Bok Field Guide to Generative AI in Higher Education",
  description:
    "Identify the AI tools Harvard provides members of the FAS: what the engine is, what harnesses and tools add, and how the surfaces map.",
};

// All tutorial text lives in src/content/home.mdx — hero and body alike.
export default function TutorialPage() {
  return (
    <main>
      <CatalogStripe />
      <Tutorial />
    </main>
  );
}

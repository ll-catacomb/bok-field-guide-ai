import { CatalogStripe } from "@/components/CatalogStripe";
import Tutorial from "@/content/home.mdx";

// All home-page text lives in src/content/home.mdx — hero and body alike.
export default function Home() {
  return (
    <main>
      <CatalogStripe slug="/" id="TU01" />
      <Tutorial />
    </main>
  );
}

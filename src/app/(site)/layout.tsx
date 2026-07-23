import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";

// The catalog/field-guide chrome. Wraps every route EXCEPT /claude, which is a
// full-bleed immersive experience with its own nav, footer, and grain.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell">
      <Nav />
      <div id="app-root">{children}</div>
      <SiteFooter />
    </div>
  );
}

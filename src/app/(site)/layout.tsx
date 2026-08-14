import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";

// The site chrome: nav, footer, and grain around every route.
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

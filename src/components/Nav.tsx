import Link from "next/link";

export function Nav() {
  return (
    <header className="site-nav">
      <Link href="/" className="brand">
        Bok&nbsp;Field&nbsp;Guide
      </Link>
      <nav className="links">
        <Link href="/">Tutorial</Link>
        <Link href="/recipe">First Project</Link>
        <Link href="/teaching">Teaching</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/claude" className="nav-claude">Claude Code</Link>
      </nav>
    </header>
  );
}

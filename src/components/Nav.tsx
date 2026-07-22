import Link from "next/link";

export function Nav() {
  return (
    <header className="site-nav">
      <Link href="/" className="brand">
        Bok&nbsp;Field&nbsp;Guide
      </Link>
      <nav className="links">
        <Link href="/">Tutorial</Link>
        <Link href="/teaching">Teaching</Link>
        <Link href="/gallery">Gallery</Link>
      </nav>
    </header>
  );
}

import type { Metadata } from "next";
import {
  Fraunces,
  EB_Garamond,
  IBM_Plex_Mono,
  Grenze_Gotisch,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Free blackletter for hero titles / brand. Swap for a licensed face later.
const gothic = Grenze_Gotisch({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Bok Field Guide to Generative AI in Higher Education",
  description:
    "A field guide to generative AI for teaching in higher education — from the engine underneath to the tools Harvard puts on your desk.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${garamond.variable} ${mono.variable} ${gothic.variable}`}
    >
      <body>
        <div id="app-root">
          <Nav />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

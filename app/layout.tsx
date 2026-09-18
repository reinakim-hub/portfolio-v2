import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import ThemeSelector from "@/components/ThemeSelector";
import CustomCursor from "@/components/CustomCursor";
import { LightboxProvider } from "@/components/Lightbox";
import "./globals.css";
import { THEME_INIT_SCRIPT } from "@/components/themes";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reina Kim",
  description: "UX Designer, creative enthusiast, and team player.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full">
        {/* If JS is disabled, force scroll-reveal content back to visible —
            see `.reveal-up` in globals.css and components/Reveal.tsx.
            `.home-reveal` (Home's staggered entrance, see globals.css) is
            pure CSS and plays on its own with no JS dependency, but it's
            included here too so a no-JS visitor sees everything
            immediately rather than waiting out the 1.5s sequence. */}
        <noscript>
          <style>{".reveal-up, .home-reveal, .home-rule-reveal, .case-study-left > *, .case-study-summary > *, .case-study-hero, .case-study-cue, .case-study-rule { opacity: 1 !important; transform: none !important; animation: none !important; }"}</style>
        </noscript>
        <CustomCursor />
        <SiteHeader />
        <ThemeSelector />
        {/* pt-20 reserves space for the fixed-height header above. */}
        <main className="pt-20">
          <LightboxProvider>{children}</LightboxProvider>
        </main>
      </body>
    </html>
  );
}

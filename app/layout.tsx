import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

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
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* If JS is disabled, force scroll-reveal content back to visible —
            see `.reveal-up` in globals.css and components/Reveal.tsx. */}
        <noscript>
          <style>{".reveal-up { opacity: 1 !important; transform: none !important; }"}</style>
        </noscript>
        <CustomCursor />
        <SiteHeader />
        {/* pt-20 reserves space for the fixed-height header above. */}
        <main className="flex-1 pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";

const NAV_LINKS = [
  { href: "/#projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/lab", label: "AI Lab" },
];

export default function SiteHeader() {
  return (
    <header className="animate-fade-in fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between border-b border-rule bg-background px-6 sm:px-10">
      <Link href="/" className="flex items-center" aria-label="Reina Kim, home">
        <Image
          src="/images/logo.webp"
          alt="Reina Kim"
          width={28}
          height={31}
          className="h-7 w-auto"
          priority
        />
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
        <a
          href="/ReinaKim_Resume_2026_Sep.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline-offset-4 hover:text-accent hover:underline focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Resume ↗
        </a>
      </nav>
    </header>
  );
}

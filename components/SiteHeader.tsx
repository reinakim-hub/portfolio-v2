import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-6 sm:px-10">
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
          className="text-ink hover:underline"
        >
          Resume ↗
        </a>
      </nav>
    </header>
  );
}

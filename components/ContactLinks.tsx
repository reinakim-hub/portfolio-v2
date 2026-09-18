const CONTACT_LINKS = [
  { href: "mailto:reinakim1221@gmail.com", label: "reinakim1221@gmail.com" },
  {
    href: "https://www.linkedin.com/in/reina-kim-111587b3/",
    label: "LinkedIn ↗",
    external: true,
  },
];

const contactLinkStyle =
  "text-muted underline-offset-4 hover:text-accent hover:underline focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * The quiet email + LinkedIn list used at the bottom of a left-column
 * sidebar. Shared between Home, About, and AI Lab so all three stay in
 * sync — Resume lives in `SiteHeader`'s nav now, so it isn't repeated
 * here.
 */
export default function ContactLinks() {
  return (
    <ul className="flex flex-col gap-2 text-sm">
      {CONTACT_LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={contactLinkStyle}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

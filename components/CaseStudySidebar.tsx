import EyebrowLabel from "./EyebrowLabel";

type MetaItem = { label: string; value: string };
type SectionLink = { id: string; label: string };

const sectionLinkStyle =
  "text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * The left column of a case-study page: project/company name, its existing
 * role line, concise metadata (dates, tools, team, client — reusing each
 * page's existing `meta` facts, just restyled to match Home/About's quiet
 * sidebar language instead of the old emoji+dt/dd treatment), and a quiet
 * table of contents built from the page's own section headings and anchors.
 * Meant to sit in `TwoColumnLayout`'s `left` slot, which already provides
 * the sticky-without-slide positioning, entrance fade, and spacing rhythm.
 */
export default function CaseStudySidebar({
  name,
  role,
  meta,
  sections,
}: {
  name: string;
  role?: string;
  meta: MetaItem[];
  sections?: SectionLink[];
}) {
  return (
    <>
      <div>
        <h1 className="whitespace-pre-line text-3xl font-extrabold tracking-tight text-ink">
          {name}
        </h1>
        {role && <p className="mt-1 text-base text-muted">{role}</p>}
      </div>

      <dl className="flex flex-col gap-4 text-sm">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="font-semibold text-ink">{item.label}</dt>
            <dd className="mt-1 text-muted">{item.value}</dd>
          </div>
        ))}
      </dl>

      {sections && sections.length > 0 && (
        <nav aria-label="Sections on this page">
          <EyebrowLabel>On this page</EyebrowLabel>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className={sectionLinkStyle}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

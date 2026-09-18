import type { ReactNode } from "react";
import EyebrowLabel from "./EyebrowLabel";

type MetaItem = { label: string; value: ReactNode };
type SectionLink = { id: string; label: string };

const sectionLinkStyle =
  "text-muted underline-offset-4 hover:text-accent hover:underline focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * The left column of a case-study page: project/company name, its existing
 * role line, concise metadata (dates, tools, team, client — reusing each
 * page's existing `meta` facts, just restyled to match Home/About's quiet
 * sidebar language instead of the old emoji+dt/dd treatment), and a quiet
 * table of contents built from the page's own section headings and anchors.
 * Meant to sit in `CaseStudyLayout`'s `left` slot, which already provides
 * the stationary column, entrance fade, and spacing rhythm (see that
 * file's own comment for the fixed-viewport shell this now sits in).
 *
 * Project navigation lives in the right-column summary on desktop and
 * after the narrative on smaller screens.
 */
export default function CaseStudySidebar({
  name,
  role,
  meta,
  sections,
  quietHeading,
  headingClassName,
}: {
  name: string;
  role?: string;
  meta: MetaItem[];
  sections?: SectionLink[];
  /** When true, renders `name` as a quiet identifying label (`role` is
   * never rendered alongside it, even if passed) instead of this
   * column's usual `<h1>` — for a case study whose real page `<h1>` now
   * lives in the middle column instead. No case study currently uses
   * this (SAP reverted back to the normal `<h1>` identity block — see
   * the changelog entry); kept available for a future page that needs
   * the same split. */
  quietHeading?: boolean;
  /** Overrides the `<h1>`'s size/weight classes only (`whitespace-pre-line
   * tracking-tight text-ink` always apply) — defaults to the shared
   * `text-3xl font-extrabold` every case study uses. SAP previously
   * passed a smaller, semibold override for its identity block; that was
   * removed so its title matches Nokia's (and every other case study's)
   * bold styling, per the "Nokia as source of truth" changelog entry.
   * Currently unused by any page, kept available for a future case study
   * that needs a real one-off override. */
  headingClassName?: string;
}) {
  return (
    <>
      <div>
        {quietHeading ? (
          <EyebrowLabel as="p">{name}</EyebrowLabel>
        ) : (
          <>
            <h1
              className={`whitespace-pre-line tracking-tight text-ink ${headingClassName ?? "text-3xl font-extrabold"}`}
            >
              {name}
            </h1>
            {role && <p className="copy-caption mt-1 text-muted">{role}</p>}
          </>
        )}
      </div>

      <dl className="copy-caption flex flex-col gap-4">
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

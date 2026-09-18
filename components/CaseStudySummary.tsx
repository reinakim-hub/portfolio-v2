import CaseStudyNavigation from "./CaseStudyNavigation";
import EyebrowLabel from "./EyebrowLabel";

/**
 * Shared exact wording for the NDA note (see `ndaNote` below) — both SAP and
 * Nokia use this identical text, so it's defined once here rather than
 * duplicated per page, where a copy-paste could drift out of sync.
 */
export const NDA_NOTE_TEXT =
  "The specifics of this work are under NDA. Publicly available visuals are used to illustrate the context.";

/**
 * The right column of a case-study page: a one-sentence Summary
 * condensed from that page's own narrative — no new claims or
 * outcomes beyond what the case study already documents. Meant to sit in
 * `CaseStudyLayout`'s `right` slot, which provides the sticky-without-slide
 * positioning, entrance fade, and spacing rhythm shared with the left
 * sidebar.
 *
 * `ndaNote` is optional sidebar content, not a permanent part of this
 * component — only SAP and Nokia pass it (both rely on public-example
 * substitutions under an NDA); the two academic case studies and everything
 * else that uses `CaseStudySummary` render with no NDA note at all. It's
 * separated from Summary by a hairline divider plus the same 32px vertical
 * rhythm this column's own `flex flex-col gap-8` uses, and it sits in normal content flow
 * (not pinned to the viewport) so it scrolls into reach on a short window
 * exactly like the rest of the sidebar.
 */
export default function CaseStudySummary({
  summary,
  ndaNote,
  nextCaseStudy,
  previousCaseStudy,
}: {
  summary: React.ReactNode;
  ndaNote?: React.ReactNode;
  nextCaseStudy?: { label: string; href: string };
  previousCaseStudy?: { label: string; href: string };
}) {
  return (
    <>
      <div>
        <EyebrowLabel>Summary</EyebrowLabel>
        <p className="copy-body mt-3 text-body">{summary}</p>
      </div>
      {ndaNote && (
        <div className="border-t border-rule pt-8">
          <EyebrowLabel as="p" quiet className="not-italic">
            {ndaNote}
          </EyebrowLabel>
        </div>
      )}
      {(previousCaseStudy || nextCaseStudy) && (
        <div className="hidden xl:mt-auto xl:block xl:pt-6">
          <CaseStudyNavigation previous={previousCaseStudy} next={nextCaseStudy} />
        </div>
      )}
    </>
  );
}

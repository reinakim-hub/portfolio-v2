import EyebrowLabel from "./EyebrowLabel";

/**
 * Shared exact wording for the NDA note (see `ndaNote` below) — both SAP and
 * Nokia use this identical text, so it's defined once here rather than
 * duplicated per page, where a copy-paste could drift out of sync.
 */
export const NDA_NOTE_TEXT =
  "Some details and visuals have been simplified or replaced with public examples due to NDA restrictions. I’m happy to discuss my process and contributions in more detail during an interview.";

/**
 * The right column of a case-study page: short Challenge and Solution
 * summaries condensed from that page's own narrative — no new claims or
 * outcomes beyond what the case study already documents. Meant to sit in
 * `CaseStudyLayout`'s `right` slot, which provides the sticky-without-slide
 * positioning, entrance fade, and spacing rhythm shared with the left
 * sidebar.
 *
 * `ndaNote` is optional sidebar content, not a permanent part of this
 * component — only SAP and Nokia pass it (both rely on public-example
 * substitutions under an NDA); the two academic case studies and everything
 * else that uses `CaseStudySummary` render with no NDA note at all. It's
 * separated from Solution by a hairline divider plus the same 32px vertical
 * rhythm this column's own `flex flex-col gap-8` already uses between
 * Challenge and Solution, and it sits in the column's normal content flow
 * (not pinned to the viewport) so it scrolls into reach on a short window
 * exactly like the rest of the sidebar.
 */
export default function CaseStudySummary({
  challenge,
  solution,
  ndaNote,
}: {
  challenge: React.ReactNode;
  solution: React.ReactNode;
  ndaNote?: React.ReactNode;
}) {
  return (
    <>
      <div>
        <EyebrowLabel>Challenge</EyebrowLabel>
        <p className="mt-3 text-sm leading-relaxed text-body">{challenge}</p>
      </div>
      <div>
        <EyebrowLabel>Solution</EyebrowLabel>
        <p className="mt-3 text-sm leading-relaxed text-body">{solution}</p>
      </div>
      {ndaNote && (
        <div className="border-t border-rule pt-8">
          <EyebrowLabel>NDA Note</EyebrowLabel>
          <p className="mt-3 text-sm leading-relaxed text-body">{ndaNote}</p>
        </div>
      )}
    </>
  );
}

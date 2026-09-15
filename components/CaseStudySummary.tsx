import EyebrowLabel from "./EyebrowLabel";

/**
 * The right column of a case-study page: short Challenge and Solution
 * summaries condensed from that page's own narrative — no new claims or
 * outcomes beyond what the case study already documents. Meant to sit in
 * `CaseStudyLayout`'s `right` slot, which provides the sticky-without-slide
 * positioning, entrance fade, and spacing rhythm shared with the left
 * sidebar.
 */
export default function CaseStudySummary({
  challenge,
  solution,
}: {
  challenge: React.ReactNode;
  solution: React.ReactNode;
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
    </>
  );
}

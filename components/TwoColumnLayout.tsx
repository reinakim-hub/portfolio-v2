// One shared sticky-gate threshold, used by every sidebar site-wide (both
// this component and `CaseStudyLayout`'s `STICKY_GATE_XL`). The gate
// disables `sticky` positioning below a minimum viewport height, so a
// short window can't pin a sidebar whose bottom content could never be
// scrolled into reach.
//
// This used to be several different per-page thresholds (640px/760px/880px)
// picked to just clear each page's own sidebar height. That made sticky
// behavior *inconsistent between routes*: at a viewport height in between
// two pages' thresholds (e.g. ~800px tall), some sidebars would stay
// pinned while others fell back to scrolling away with the page — the
// same route looked broken next to one that "already worked", when really
// every route was working exactly as calibrated, just to a different
// number. One shared threshold, calibrated to the tallest sidebar
// anywhere on the site (Simplii Financial's case-study sidebar, ~704px,
// from its ten-item "On this page" TOC), means every route now engages or
// disengages sticky at the *same* viewport height — a page with a
// shorter sidebar just has extra margin to spare, not a different
// breakpoint. Must stay written out in full here — Tailwind's class
// scanner can't see a value built from a template string or prop.
export const STICKY_GATE = "lg:[@media(min-height:880px)]:sticky";

/**
 * The two-column page shell shared by Home, About, and every case study: a
 * ~27%/73% grid (narrowing further to ~22%/78% from `xl`) separated by a single
 * hairline `border-l` that starts flush with the fixed header's own
 * `border-b`. The left column sits at `top-20` (80px, exactly the header's
 * height) so it's already "stuck" from the first pixel scrolled rather than
 * sliding up to meet the threshold, gated by the shared `STICKY_GATE` so a
 * too-short viewport falls back to normal in-flow stacking instead of
 * pinning content out of reach. Both columns fade in on mount; the right
 * column also establishes a `@container` so descendants (e.g. Home's
 * project grid) can query this column's own rendered width rather than the
 * viewport's.
 */
export default function TwoColumnLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="px-6 pb-24 sm:px-10">
      <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-[minmax(0,0.87fr)_minmax(0,2.4fr)] lg:gap-y-0 xl:grid-cols-[minmax(0,0.87fr)_minmax(0,3fr)]">
        <div className={`lg:top-20 lg:self-start ${STICKY_GATE}`}>
          <div className="animate-fade-in flex flex-col gap-8 pt-10 lg:pt-12 lg:pr-8 xl:pr-10">
            {left}
          </div>
        </div>

        <div className="lg:border-l lg:border-rule">
          <div className="@container pt-10 lg:pt-12 lg:pl-8 xl:pl-10">
            {right}
          </div>
        </div>
      </div>
    </div>
  );
}

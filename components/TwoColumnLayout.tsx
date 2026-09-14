// Literal sticky-gate class strings, one per distinct sidebar height across
// the site. The gate disables the sidebar's `sticky` positioning below a
// minimum viewport height, so a short window can't pin a sidebar whose
// bottom content could never be scrolled into view — the safe threshold
// depends on each page's own sidebar height. Most case-study pages
// (SAP ~444px, Nokia ~416px, SSFB ~592px) fit under the two thresholds
// already established for Home/About; only Simplii Financial's sidebar —
// taller because its case study has more sections, hence a longer "On
// this page" TOC — needed its own. Every variant must stay written out in
// full somewhere in this file's source — Tailwind's class scanner can't
// see a value built from a template string or prop at runtime.
const STICKY_GATE = {
  // Calibrated for Home's ~465px-tall sidebar (name/role/specialty + contact).
  default: "lg:[@media(min-height:640px)]:sticky",
  // Calibrated for About's taller sidebar (heading + portrait + contact);
  // the portrait itself is width-capped (see app/about/page.tsx) so this
  // stays a safe, viewport-width-independent number.
  tall: "lg:[@media(min-height:760px)]:sticky",
  // Calibrated for Simplii Financial's case-study sidebar — its "On this
  // page" TOC has ten links (its case study has the most sections of any
  // page), making its ~704px sidebar the tallest in the site.
  simplii: "lg:[@media(min-height:880px)]:sticky",
} as const;

/**
 * The two-column page shell shared by Home, About, and every case study: a
 * ~27%/73% grid (narrowing further to ~22%/78% from `xl`) separated by a single
 * hairline `border-l` that starts flush with the fixed header's own
 * `border-b`. The left column sits at `top-20` (80px, exactly the header's
 * height) so it's already "stuck" from the first pixel scrolled rather than
 * sliding up to meet the threshold, gated by `stickyGate` so a too-short
 * viewport falls back to normal in-flow stacking instead of pinning content
 * out of reach. Both columns fade in on mount; the right column also
 * establishes a `@container` so descendants (e.g. Home's project grid) can
 * query this column's own rendered width rather than the viewport's.
 */
export default function TwoColumnLayout({
  left,
  right,
  stickyGate = "default",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  stickyGate?: keyof typeof STICKY_GATE;
}) {
  return (
    <div className="px-6 pb-24 sm:px-10">
      <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-[minmax(0,0.87fr)_minmax(0,2.4fr)] lg:gap-y-0 xl:grid-cols-[minmax(0,0.87fr)_minmax(0,3fr)]">
        <div
          className={`lg:top-20 lg:self-start ${STICKY_GATE[stickyGate]}`}
        >
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

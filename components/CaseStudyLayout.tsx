// Same shared height threshold as `TwoColumnLayout`'s `STICKY_GATE` (see
// that file for why it's a single site-wide value, not a per-page one) —
// gated at `xl` instead of `lg` here since that's this shell's own
// column-collapse breakpoint. Kept as its own literal string, not built
// from the imported value, since Tailwind's class scanner needs each class
// written out in full wherever it's actually used.
const STICKY_GATE_XL = "xl:[@media(min-height:880px)]:sticky";

/**
 * The three-column shell for a case-study page: project info + section nav
 * (left), the case-study narrative (middle, normal document scrolling), and
 * a short Challenge/Solution summary (right). Left and right both sit in a
 * sticky-without-slide box (same `top-20` mechanic as `TwoColumnLayout`) so
 * they stay stationary beneath the fixed header while the middle column
 * scrolls; the two hairline dividers are drawn on the middle column's own
 * left/right edges, since it's the one column that always stretches to the
 * full row height (the sticky columns intentionally don't).
 *
 * Columns collapse to a single stacked flow below `xl` — a full three-column
 * row needs more width than `TwoColumnLayout`'s two-column `lg` breakpoint
 * allows before the middle column gets cramped — at which point section-nav,
 * narrative, and summary all follow in normal document order.
 *
 * The left column keeps the exact `0.87fr` share `TwoColumnLayout` uses, and
 * the middle+right columns together keep its `3fr` share, so the first
 * divider lines up with Home/About's own column boundary at `xl` and wider.
 */
export default function CaseStudyLayout({
  left,
  middle,
  right,
}: {
  left: React.ReactNode;
  middle: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="px-6 pb-24 sm:px-10">
      <div className="grid grid-cols-1 gap-y-16 xl:grid-cols-[minmax(0,0.87fr)_minmax(0,2.1fr)_minmax(0,0.9fr)] xl:gap-y-0">
        <div className={`xl:top-20 xl:self-start ${STICKY_GATE_XL}`}>
          <div className="animate-fade-in flex flex-col gap-8 pt-10 xl:pt-12 xl:pr-8">
            {left}
          </div>
        </div>

        <div className="xl:border-x xl:border-rule">
          <div className="@container pt-10 xl:pt-12 xl:px-8">{middle}</div>
        </div>

        <div className={`xl:top-20 xl:self-start ${STICKY_GATE_XL}`}>
          <div className="animate-fade-in flex flex-col gap-8 pt-10 xl:pt-12 xl:pl-8">
            {right}
          </div>
        </div>
      </div>
    </div>
  );
}

import { SITE_GRID_COLUMNS } from "./siteGrid";

/**
 * The three-column shell for a case-study page: project info + section nav
 * (left), the case-study narrative (middle — ordinary document flow, the
 * page's real scroll content), and a one-sentence project summary
 * (right). This is the project's source-of-truth shape for `SITE_GRID_COLUMNS`
 * (see `siteGrid.ts`) — Home's own grid and `TwoColumnLayout` both use the
 * exact same proportions and `xl` breakpoint this shell does, rather than
 * this shell matching them.
 *
 * Native document scrolling, same as `TwoColumnLayout` (see that file's
 * comment for the full reasoning): both side columns are `position:
 * sticky` (`top-20`, at `xl`+ — this shell's own column-collapse
 * breakpoint, a three-column row needs more width before the middle
 * column gets cramped, which is also why `TwoColumnLayout` and Home's own
 * grid now share this same breakpoint instead of the narrower `lg` they
 * used before), and the middle column is plain, unwrapped content — no
 * nested scroll container, no wheel-event forwarding. The two hairline
 * dividers are drawn on the middle column's own left/right edges, which
 * stretches (ordinary CSS Grid `align-items: stretch`) to match the row's
 * real height — normally set by the middle column's own long narrative
 * anyway.
 *
 * Columns collapse to a single stacked flow below `xl`, where section-nav,
 * narrative, and summary all follow in normal document order and the page
 * scrolls normally, as before.
 */
export const STICKY_COLUMN_XL =
  "xl:sticky xl:top-20 xl:self-start xl:max-h-[calc(100dvh-5rem)] xl:overflow-y-auto";

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
    <div className="case-study-page page-gutter">
      <div className={`grid grid-cols-1 gap-y-16 ${SITE_GRID_COLUMNS} xl:gap-y-0`}>
        <div className={STICKY_COLUMN_XL}>
          <div className="case-study-left flex flex-col gap-8 pt-10 xl:min-h-[calc(100dvh-5rem)] xl:pt-12 xl:pr-8 xl:pb-8">
            {left}
          </div>
        </div>

        <div className="relative xl:border-x xl:border-transparent">
          <span aria-hidden="true" className="case-study-rule pointer-events-none absolute inset-y-0 -right-px -left-px hidden border-x border-rule xl:block" />
          <div className="@container pt-10 pb-24 xl:pt-12 xl:px-8">
            {middle}
          </div>
        </div>

        <div className={STICKY_COLUMN_XL}>
          <div className="case-study-summary flex flex-col gap-8 pt-10 xl:min-h-[calc(100dvh-5rem)] xl:pt-12 xl:pl-8 xl:pb-24">
            {right}
          </div>
        </div>
      </div>
    </div>
  );
}

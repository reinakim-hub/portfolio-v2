import { SITE_GRID_COLUMNS } from "./siteGrid";

/**
 * The two-content-column page shell shared by About and AI Lab: a real
 * three-column grid — left sidebar, middle content, and an empty reserved
 * right column — using the exact same `SITE_GRID_COLUMNS` proportions and
 * `xl` breakpoint as Home's own grid and `CaseStudyLayout`, so the hairline
 * divider after the left sidebar lands at the same x position on every
 * route. The right column exists only to keep that rhythm consistent
 * sitewide — neither About nor AI Lab has content for it, so it renders
 * empty and `aria-hidden`, absent below `xl` along with the rest of the
 * desktop grid.
 *
 * Native document scrolling: the middle (content) column is ordinary block
 * content with no scroll container of its own — the page itself scrolls,
 * and the browser's native scrollbar sits at the far edge of the viewport,
 * exactly like every other website. The left sidebar is `position: sticky`
 * (`top-20`, at `xl`+), so it stays visually stationary beneath the fixed
 * header while the content scrolls past it, with no wheel-event forwarding
 * or custom key handling needed — wheel, trackpad, keyboard, and touch
 * scrolling all just work, over any column.
 *
 * `STICKY_COLUMN`'s own `max-h-[calc(100dvh-5rem)]` + `overflow-y-auto`
 * mean a sidebar taller than the space available below the header scrolls
 * *within itself* rather than clipping past the sticky box or being
 * pushed off-screen. The inner content div's `xl:h-full` lets it stretch
 * to match the row's natural height (ordinary CSS Grid `align-items:
 * stretch`, driven by whichever column is tallest) up to that same cap —
 * giving a bottom-pinned item (e.g. `ContactLinks`' `xl:mt-auto`) real
 * room to push into on a page whose content is shorter than one viewport,
 * without ever forcing a short page's column taller than its content
 * needs.
 */
export const STICKY_COLUMN =
  "xl:sticky xl:top-20 xl:max-h-[calc(100dvh-5rem)] xl:overflow-y-auto";

const DEFAULT_TOP_PADDING = "pt-10 xl:pt-12";

export default function TwoColumnLayout({
  left,
  right,
  topPadding = DEFAULT_TOP_PADDING,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  topPadding?: string;
}) {
  return (
    <div className="px-6 sm:px-10">
      <div className={`grid grid-cols-1 gap-y-20 ${SITE_GRID_COLUMNS} xl:gap-y-0`}>
        <div className={STICKY_COLUMN}>
          <div
            className={`animate-fade-in flex flex-col gap-8 ${topPadding} xl:h-full xl:pr-8 xl:pb-8`}
          >
            {left}
          </div>
        </div>

        <div className="xl:border-x xl:border-rule">
          <div className={`@container ${topPadding} pb-24 xl:px-8`}>
            {right}
          </div>
        </div>

        <div className="hidden xl:block" aria-hidden="true" />
      </div>
    </div>
  );
}

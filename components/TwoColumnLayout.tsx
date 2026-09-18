import { SITE_GRID_COLUMNS } from "./siteGrid";

/**
 * The two-content-column page shell shared by About and AI Lab: a real
 * three-column grid — left sidebar, middle content, and an empty reserved
 * right column (or an optional photo aside) — using the exact same `SITE_GRID_COLUMNS` proportions and
 * `xl` breakpoint as Home's own grid and `CaseStudyLayout`, so the hairline
 * divider after the left sidebar lands at the same x position on every
 * route. The right column exists only to keep that rhythm consistent
 * sitewide. An optional `aside` can fill the rail; AI Lab keeps it empty
 * and aria-hidden. The rail is absent below `xl`.
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
 * On desktop the grid fills at least the viewport below the header, so
 * both dividers reach the bottom even when the content is short. The
 * sidebar's inner flex column has the same minimum height, placing contact
 * links 32px above the viewport bottom. A taller sidebar scrolls within
 * its capped sticky wrapper, keeping all content reachable on short
 * windows. Mobile retains its natural stacked height.
 */
export const STICKY_COLUMN =
  "xl:sticky xl:top-20 xl:max-h-[calc(100dvh-5rem)] xl:overflow-y-auto";

const DEFAULT_TOP_PADDING = "pt-10 xl:pt-12";

export default function TwoColumnLayout({
  left,
  right,
  topPadding = DEFAULT_TOP_PADDING,
  aside,
  className = "",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  topPadding?: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`page-gutter ${className}`}>
      <div className={`grid grid-cols-1 gap-y-20 ${SITE_GRID_COLUMNS} xl:min-h-[calc(100dvh-5rem)] xl:gap-y-0`}>
        <div className={`${STICKY_COLUMN} xl:self-start`}>
          <div
            className={`animate-fade-in flex flex-col gap-8 ${topPadding} xl:min-h-[calc(100dvh-5rem)] xl:pr-8 xl:pb-8`}
          >
            {left}
          </div>
        </div>

        <div className="xl:border-x xl:border-rule">
          <div className={`@container ${topPadding} pb-24 xl:px-8`}>
            {right}
          </div>
        </div>

        {aside ? (
          <div className="hidden xl:sticky xl:top-20 xl:block xl:self-start xl:pt-12 xl:pb-24">
            {aside}
          </div>
        ) : (
          <div className="hidden xl:block" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

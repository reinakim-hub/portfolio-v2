/**
 * The three-column proportions shared by every desktop page shell — Home's
 * own grid, `TwoColumnLayout` (About, AI Lab), and `CaseStudyLayout` (every
 * case study) — so a hairline divider between the left sidebar and the
 * middle content lands at the exact same x position on every route at the
 * same viewport width, and the two equally-sized outer columns read as one
 * consistent rhythm sitewide.
 *
 * Nokia's case study is this project's source of truth for these numbers:
 * `0.87fr` outer columns — now equal on both sides; the right column
 * previously drifted to its own, slightly wider `0.9fr` — around a `2.1fr`
 * middle, all activating at `xl` (1280px), the width a case study's three
 * real content columns (sidebar, narrative, Challenge/Solution) already
 * needed to read comfortably without cramping the narrative. Home and
 * About/AI Lab previously collapsed to their own desktop grid at the
 * narrower `lg` (1024px); they now share this same `xl` gate instead, so
 * every route's multi-column layout turns on at one single, common
 * breakpoint — the only way "matching divider positions" can hold for
 * every viewport width, not just the ones at or above the wider of two
 * different breakpoints.
 */
export const SITE_GRID_COLUMNS =
  "xl:grid-cols-[minmax(0,0.87fr)_minmax(0,2.1fr)_minmax(0,0.87fr)]";

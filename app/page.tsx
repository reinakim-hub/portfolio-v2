import ContactLinks from "@/components/ContactLinks";
import HoverExpandPhoto from "@/components/HoverExpandPhoto";
import ProjectHighlight from "@/components/ProjectHighlight";
import { STICKY_COLUMN } from "@/components/TwoColumnLayout";
import { SITE_GRID_COLUMNS } from "@/components/siteGrid";

// Home's own three-column grid: left (identity) and right (availability)
// are both `minmax(0,0.87fr)` — the *same* track size, so they're exactly
// equal width by construction — while the middle column
// (`minmax(0,2.1fr)`) fills whatever the two equal side tracks don't use.
// `SITE_GRID_COLUMNS` (see `components/siteGrid.ts`) is the single shared
// definition of these proportions and their `xl` breakpoint — also used
// by `TwoColumnLayout` (About, AI Lab) and `CaseStudyLayout` (every case
// study, this project's source of truth for the ratio) — so the divider
// after the left column lands at the same x position on every route at
// the same viewport width. No forced row height here: the row's natural
// height comes from its tallest column (ordinary CSS Grid `align-items:
// stretch`), normally the middle project column: the page scrolls
// natively when that's taller than one viewport (see `THUMBNAIL_HEIGHT`
// below for how the project thumbnails are sized to avoid that at
// ordinary desktop/laptop heights). Both side columns are `STICKY_COLUMN`
// (imported from `TwoColumnLayout`) — "stationary on desktop" for both
// sides, not just the identity column — so they stay pinned below the
// fixed header while the middle column scrolls past them, with no nested
// scroll container or wheel-event forwarding: the browser's native
// scrollbar and wheel/keyboard/touch scrolling apply everywhere on the
// page, over any column. Below `xl`, all three stack in normal document
// flow.
const HOME_GRID = `grid grid-cols-1 gap-y-20 ${SITE_GRID_COLUMNS} xl:gap-y-0`;

// Shared by the left and middle columns so their content starts at the
// same y below the fixed header. Matches the shared shell's own default
// top padding (`TwoColumnLayout`/`CaseStudyLayout`, both `pt-10 xl:pt-12`)
// instead of a smaller, Home-only value, so vertical rhythm lines up with
// every other route too.
const TOP_PADDING = "pt-10 xl:pt-12";

// Shared by all three columns at `xl`+, so the middle (scrolling) column
// reserves exactly the same bottom breathing room as both sidebars
// instead of a larger, independently-chosen value — one literal class,
// not three separately-tuned ones, so they can't drift apart again.
// Matches the shared shell's own `xl:pb-8`. Below `xl`, the middle column
// keeps its own larger mobile-only bottom padding (see
// `PROJECT_SECTIONS_WRAPPER`) since there's no sidebar to match once the
// layout stacks.
const BOTTOM_PADDING = "xl:pb-8";

// The project sections' own inner gutter: `@container` so `PROJECT_GRID`'s
// `@min-[…]:` queries below measure this div's actual rendered width (set
// by the middle grid column itself); `xl:px-8` (32px) is the breathing
// room from the middle column's own dividers on both sides.
const PROJECT_SECTIONS_WRAPPER = `@container ${TOP_PADDING} px-5 pb-10 sm:px-6 xl:px-8 ${BOTTOM_PADDING}`;

// Every project thumbnail's frame height, calculated top-down from the
// viewport rather than a fixed aspect ratio or flex-stretched share of a
// fixed-height ancestor: `444px` reserves the fixed header (80px) plus
// this column's own top padding (48px, `TOP_PADDING` above, now matching
// the shared shell's own value) and shared bottom padding (32px,
// `BOTTOM_PADDING` above — matching both sidebars), both section labels
// and their gaps to each grid, the divider between the two sections, and
// both rows' caption+CTA text (reserved at its worst-case two-line height
// via `ProjectHighlight`'s min-h on the caption — see that component's
// comment for why this has to be constant rather than measured per
// breakpoint) — everything *except* the two rows of thumbnails
// themselves — leaving the remainder split evenly between the two rows,
// plus a few px of safety margin so a font-metric or sub-pixel rounding
// difference can never reintroduce a scrollbar. One literal calc(),
// reused by every `ProjectHighlight` instance below via the same prop, so
// all four thumbnails share identical frame dimensions at any given
// viewport height by construction.
//
// Only actually applied once `ProjectHighlight`'s own combined gate
// (`xl:@min-[620px]:`, see that component's comment) holds — i.e. once
// the viewport is `xl`+ *and* the project column's own container has
// reached the 620px `PROJECT_GRID` needs to go two-up. A real gap was
// found and fixed here: at exactly `xl` (1280px) wide, this column is
// only ~582px — under that 620px container threshold, so cards render
// one-per-row even though the viewport itself already cleared `xl` —
// and applying this two-row-assuming height there quadrupled Home's
// total thumbnail height instead of halving it, reintroducing a large
// scroll range. Gating both the aspect-ratio cancellation and this
// height on the *same* combined condition (rather than just the
// viewport breakpoint) is what actually fixes that, falling back to
// ordinary `aspect-[16/10]` sizing whenever either condition alone isn't
// enough for a real two-up grid. Verified live at zero vertical scroll
// range on Home at 1920×1080, 1440×900, and 1366×768 (all comfortably
// past both thresholds) and confirmed the fallback engages correctly in
// the narrow 1280–~1360px gap — if this column's own padding, label
// sizes, or inter-section spacing ever change, this constant needs
// re-measuring to match.
const THUMBNAIL_HEIGHT = "xl:@min-[620px]:h-[calc((100dvh-444px)/2)]";

// Two equal columns once the project column has ~620px to give each card
// (2 × 294px + the 32px column gap) — deliberately lower than an
// aspect-ratio-driven layout would need, since thumbnail *height* no
// longer comes from card width (see `THUMBNAIL_HEIGHT` above): a narrower
// card just letterboxes its `object-contain` image a little more, not a
// visually broken layout. Measured live: at the three required desktop
// breakpoints (1920/1440/1366 nominal window width), the project column's
// actual rendered width is comfortably above this threshold even at its
// new, slightly narrower `2.1fr` share, so all four thumbnails render as
// a real 2×2 grid, not stacked. `gap-y-12` (48px) is the mobile/stacked-
// card gap, dropped to 0 once the two-up layout engages (there's no
// second row at that point).
const PROJECT_GRID =
  "mt-6 grid grid-cols-1 gap-y-12 @min-[620px]:grid-cols-2 @min-[620px]:gap-x-8 @min-[620px]:gap-y-0 xl:mt-4";

// Section labels ("Selected work", "Academic projects"): small, quiet
// captions rather than headings that compete with the project captions
// below them — normal capitalization and letter-spacing, distinguished
// from surrounding content by placement/spacing/dividers alone.
const SECTION_HEADING = "text-sm font-normal text-muted";

// Home's initial entrance: ten content groups reveal in page order, each
// starting 150ms after the previous one (`.home-reveal`, see
// globals.css — opacity 0→1 + an upward 0.5rem→0 shift, 500ms ease-out,
// pure CSS, plays once on mount). The last group starts at 1350ms and
// finishes at 1850ms, under the ~2s target. Named, literal class strings
// (not a computed `${i * 150}ms` template) since Tailwind's class
// scanner needs literal text to find the arbitrary `[animation-delay:…]`
// value — the same pattern this file already uses for `PROJECT_GRID`/
// `THUMBNAIL_HEIGHT` above. Replaces this page's previous `Reveal`
// (scroll-triggered) and `animate-fade-in` (one blanket fade for the
// whole left column) — this is Home-only; every other route's own
// `Reveal`/`animate-fade-in` usage is untouched.
const REVEAL = {
  nameRole: "home-reveal [animation-delay:0ms]",
  introduction: "home-reveal [animation-delay:150ms]",
  photo: "home-reveal [animation-delay:300ms]",
  selectedWorkLabel: "home-reveal [animation-delay:450ms]",
  sapCard: "home-reveal [animation-delay:600ms]",
  nokiaCard: "home-reveal [animation-delay:750ms]",
  academicProjectsLabel: "home-reveal [animation-delay:900ms]",
  simpliiCard: "home-reveal [animation-delay:1050ms]",
  ssfbCard: "home-reveal [animation-delay:1200ms]",
  contactsAvailability: "home-reveal [animation-delay:1350ms]",
} as const;

export default function Home() {
  return (
    <div className="px-6 sm:px-10">
      <div className={HOME_GRID}>
        <div className={STICKY_COLUMN}>
          <div
            className={`flex flex-col gap-8 ${TOP_PADDING} xl:h-full xl:pr-8 ${BOTTOM_PADDING}`}
          >
            <div className={REVEAL.nameRole}>
              <h1 className="text-3xl font-extrabold tracking-tight text-ink">
                Hello!
                <br />
                I&apos;m Reina
              </h1>
              <p className="mt-1 text-base text-muted">
                UX Designer · Vancouver
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p
                className={`xl:max-w-[15rem] text-[15px] leading-[1.6] font-normal text-body ${REVEAL.introduction}`}
              >
                Focused on design systems and
                interaction patterns for SaaS products, with experience
                building component libraries at Nokia and SAP.
              </p>
              <HoverExpandPhoto
                src="/images/reina-profile.webp"
                alt="Reina standing on a train station platform with arms raised"
                className={REVEAL.photo}
              />
            </div>

            <div className={`xl:mt-auto ${REVEAL.contactsAvailability}`}>
              <ContactLinks />
            </div>
          </div>
        </div>

        {/* Middle column: the project grid, and (at `xl`+) the natural
            document scroll content. `border-l`/`border-r` are the pair of
            thin dividers framing this column — matching color
            (`border-rule`), thickness (1px), and vertical coverage on
            both sides since they're the same two classes on the same
            box. */}
        <div className="xl:border-l xl:border-r xl:border-rule">
          <div className={PROJECT_SECTIONS_WRAPPER}>
            <section id="projects" className="scroll-mt-24">
              <h2 className={`${SECTION_HEADING} ${REVEAL.selectedWorkLabel}`}>
                Selected work
              </h2>

              <div className={PROJECT_GRID}>
                <div className={REVEAL.sapCard}>
                  <ProjectHighlight
                    href="/sap"
                    company="SAP"
                    descriptor="Cross-product UX patterns"
                    image="/images/sap-cover.webp"
                    imageFit="cover"
                    imageHeightClassName={THUMBNAIL_HEIGHT}
                    priority
                    whiteCursorRing
                  />
                </div>

                <div className={REVEAL.nokiaCard}>
                  <ProjectHighlight
                    href="/nokia"
                    company="Nokia"
                    descriptor="Components & accessibility"
                    image="/images/nokia-cover.webp"
                    imageFit="cover"
                    imageHeightClassName={THUMBNAIL_HEIGHT}
                    whiteCursorRing
                  />
                </div>
              </div>
            </section>

            <section className="mt-8 xl:mt-6">
              <div className="border-t border-rule pt-5">
                <h2
                  className={`${SECTION_HEADING} ${REVEAL.academicProjectsLabel}`}
                >
                  Academic projects
                </h2>
              </div>

              <div className={PROJECT_GRID}>
                <div className={REVEAL.simpliiCard}>
                  <ProjectHighlight
                    href="/simpliifinancial"
                    company="Simplii Financial"
                    descriptor="Newcomer financial guidance"
                    image="/images/simplii-hero.webp"
                    imageBg="bg-neutral-950"
                    imageOffsetClassName="translate-y-[6.5%]"
                    imageHeightClassName={THUMBNAIL_HEIGHT}
                  />
                </div>

                <div className={REVEAL.ssfbCard}>
                  <ProjectHighlight
                    href="/ssfb"
                    company="Strange Sounds from Beyond"
                    descriptor="Branding & microsite"
                    image="/images/ssfb-hero.gif"
                    imageBg="bg-black"
                    imageHeightClassName={THUMBNAIL_HEIGHT}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right column: just the availability indicator, bottom-pinned
            to match the left column's `ContactLinks`. A plain static dot
            — no cursor interaction of any kind lives here. */}
        <div className={`hidden xl:block ${STICKY_COLUMN}`}>
          <div
            className={`flex h-full flex-col justify-end ${BOTTOM_PADDING} xl:items-end xl:pl-8`}
          >
            <div
              className={`flex items-center gap-2 ${REVEAL.contactsAvailability}`}
            >
              <span
                className="size-2 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              <p className="text-sm text-muted">Available for work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

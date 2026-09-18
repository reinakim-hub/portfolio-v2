/**
 * The opening shared by every case study: an approved hero visual —
 * `children`, shown at its own natural width in a plain `px-4` inset, not
 * the narrower `ProseColumn` reading width used by the rest of the
 * narrative — followed by a centered "Scroll to view more" cue, a
 * real, keyboard-focusable anchor to `#introduction` (`scroll-mt-24` on
 * that section clears the fixed header the same way every other in-page
 * anchor on this site already does), not a decorative element. Only the
 * arrow (`.scroll-cue-arrow`, `globals.css`) animates; the label text
 * never does.
 *
 * At `xl`+, the pair is sized to fill exactly the first screen below the
 * fixed header: the visible area there is `100dvh - 5rem`, and
 * `CaseStudyLayout` (shared, not touched by this component) already
 * applies its own `xl:pt-12` (3rem) to the middle column before this div
 * even starts — so this div's own `min-height` has to be
 * `100dvh - 5rem - 3rem` for hero + cue to end exactly at the bottom of
 * that first-screen area "including padding," not `100dvh - 5rem` on its
 * own, which would double-count the padding and run one `pt-12` past a
 * single screen. `xl:flex-col` plus the cue's own `xl:mt-auto` then pins
 * the cue to the bottom of that reserved space rather than leaving one
 * large gap wherever the hero happens to end, so a short scroll from the
 * cue's own position always brings the introduction in next, regardless
 * of how much (or little) slack a given hero height leaves.
 *
 * Below `xl`, none of this sizing applies — the hero and cue simply sit
 * in normal, natural-height document flow, no forced fullscreen opening.
 *
 * First established on `/nokia`; now the shared template every case
 * study's own opening is built from — see `PROJECT_STATUS.md` for the
 * "Nokia as source of truth" changelog entry.
 */
export default function CaseStudyOpening({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="xl:flex xl:min-h-[calc(100dvh-8rem)] xl:flex-col">
      <div className="px-4">{children}</div>

      <div className="mt-8 flex flex-col items-center gap-2 px-4 pb-10 text-center xl:mt-auto xl:pb-12">
        <a
          href="#introduction"
          className="inline-flex flex-col items-center gap-2 text-sm font-normal text-muted underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span>Scroll to view more</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="scroll-cue-arrow"
          >
            <path d="M12 4v16m0 0-6-6m6 6 6-6" />
          </svg>
        </a>
      </div>
    </div>
  );
}

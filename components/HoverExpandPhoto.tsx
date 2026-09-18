import Image from "next/image";

/**
 * Reina's sidebar photo on Home: starts small and grows on hover,
 * shrinking back on pointer leave.
 *
 * Small is a fixed 150×200; large is the outer `.hover-expand` wrapper's
 * own box — `w-full max-w-[15rem]` capped (~240px at the browser default
 * 16px root, but expressed in `rem` — like the rest of this project's
 * spacing — so it scales with the user's own root font-size/zoom rather
 * than staying visually fixed), `aspect-[3/4]` instead of a separately
 * fixed height, so the box's proportions stay 3:4 at every width rather
 * than drifting whenever the sidebar itself is narrower than that.
 * `aspect-[3/4]` scales width and height together as one unit, so the
 * image's crop framing — how much of the source photo is visible — is
 * identical at every width, and the large state can never render wider
 * than the sidebar actually has room for ("keep expansion within the
 * sidebar"), unlike a hard-coded max-width would at narrower breakpoints.
 * `15rem` also matches the introduction paragraph above it (see
 * `app/page.tsx`), so both share one max-width with the same left/right
 * edges.
 *
 * The outer wrapper is *always* rendered at this large footprint at `xl`+
 * — the same breakpoint Home's own grid switches to its desktop columns
 * at (see `siteGrid.ts`) — so it's reserved layout space that never
 * itself changes size, meaning hovering can never shift the paragraph
 * above it or the contacts row below it. Only the inner frame's own
 * `width`/`height` animate (350ms ease-in-out, both directions, via a
 * plain CSS `:hover` rule — no JS, so rapid hover in/out always
 * interrupts and reverses smoothly rather than risking a stuck or
 * flickering intermediate state), absolutely positioned within that
 * reserved box and clipped to it, growing from 150×200 to fill it
 * completely (`100%`/`100%`) rather than past it.
 *
 * Below `xl` — and on any device without real hover, regardless of
 * width, since the hover rule itself is also gated (see below) — the
 * outer wrapper is just the small 150×200 box outright, not the large
 * reserved footprint: there's no hover to expand into on a touch device,
 * so reserving extra space there would only leave a visibly empty gap
 * around a small photo. This is what actually keeps the photo small on
 * touch, not just the hover rule failing to fire.
 *
 * The hover rule itself only exists under `@media (hover: hover) and
 * (pointer: fine)` (`.hover-expand-frame` in `globals.css`) — on a touch
 * device the rule is absent entirely, so the frame simply always renders
 * at its default small size, with no reliance on `:hover` ever
 * un-sticking itself after a tap. `prefers-reduced-motion` drops the
 * transition (the size still changes on hover, just instantly).
 *
 * No link, button, `tabindex`, or click handler — purely a decorative
 * hover response, same as this project's established rule for a photo
 * with no click destination (see About's portrait in the changelog);
 * `CustomCursor`'s interactive-hover ring is unaffected, since a plain
 * `<div>` never matches its interactive-element selector.
 *
 * `className` (optional) is appended to this same outer, always-large-
 * footprint box — e.g. Home's `.home-reveal` entrance class (see
 * `app/page.tsx`), which only ever animates `opacity`/`transform` and so
 * can't conflict with `.hover-expand-frame`'s own hover-driven
 * `width`/`height` transition on the inner frame beneath it.
 */
export default function HoverExpandPhoto({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`hover-expand relative h-[200px] w-[150px] overflow-hidden xl:h-auto xl:w-full xl:max-w-[15rem] xl:aspect-[3/4] ${className}`}
    >
      <div className="hover-expand-frame absolute top-0 left-0 h-[200px] w-[150px] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="15rem"
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}

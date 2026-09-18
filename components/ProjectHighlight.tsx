import Image from "next/image";
import Link from "next/link";

/**
 * A single project entry on the homepage: the thumbnail first, then a
 * compact one-line caption (company/project name plus a short work
 * descriptor, separated by a middle dot), then a quiet "View case study"
 * link. No large heading, no separate descriptive headline, no
 * paragraph-length summary or meta row — those live on the corresponding
 * case-study page instead, not duplicated here. The image is contained
 * rather than cropped, so `imageBg` should match the artwork's own
 * background for a seamless frame.
 *
 * The caption is a real `<h3>` for semantic structure even though it's
 * visually small — `company` renders at medium weight, `descriptor` at
 * regular weight in the shared secondary text color, both on one baseline
 * so they read as a single caption rather than two competing labels. It's
 * plain, non-interactive text, wrapping naturally with no truncation.
 *
 * `imageFit` (default `"contain"`) picks the `<Image>`'s `object-fit`.
 * `"cover"` is for a source whose own canvas aspect is close enough to
 * the frame's that filling edge-to-edge crops only the artwork's own
 * background, never its subject — used by the SAP/Nokia cards, whose
 * source images are a solid brand-color field with a small, centered
 * logo mark, so cropping the field never touches the logo itself. Every
 * other card keeps the default `"contain"`, where `imageBg` matters (see
 * above).
 *
 * Only two things are interactive, as separate sibling links to the same
 * `href`: the thumbnail image frame, and the "View case study" CTA below
 * the caption. There's no card-wide wrapper link, stretched-link overlay,
 * or click handler — the caption and surrounding whitespace are not part
 * of any link. Each link gets its own descriptive `aria-label`.
 *
 * Hover/focus feedback lives entirely on the `<Image>` itself, via the
 * shared `.hover-zoom` style (see `globals.css` — also used by the About
 * portrait) applied to the thumbnail link: the frame stays stationary
 * (`overflow: hidden`, from `.hover-zoom` itself) and only the image
 * transforms, scoped to this link alone.
 *
 * `imageOffsetClassName` (optional) applies a static transform to a thin
 * wrapper div between the frame and the `<Image>` — for a source asset
 * whose own visible content sits off-center within its canvas. Kept on
 * its own wrapper, never on the `<Image>` itself, so it can never combine
 * with or fight `.hover-zoom`'s hover-driven transform on the image.
 *
 * `whiteCursorRing` (optional) marks the thumbnail link (and only that
 * link — never the CTA below it) with `data-cc-cursor-white`, which
 * `CustomCursor` reads to swap the decorative cursor ring's stroke to
 * white while hovering/focusing it or anything inside it (see
 * `.cc-cursor-dot--white` in globals.css) — for a thumbnail whose own
 * background is close enough to the ring's default brand-blue that the
 * ring would otherwise nearly disappear against it. Currently only the
 * SAP and Nokia cards on Home pass this.
 *
 * Thumbnail sizing is gated on two conditions together, not just the `xl`
 * viewport breakpoint alone: `xl:@min-[620px]:aspect-auto` only cancels
 * the default `aspect-[16/10]` (in favor of `imageHeightClassName` — one
 * literal calc() height, shared by every call site on Home, see
 * `app/page.tsx`'s `THUMBNAIL_HEIGHT`) once the viewport is `xl`+ *and*
 * the project column's own container has reached the same `620px` this
 * card's parent grid needs to actually go two-up (`PROJECT_GRID`'s
 * `@min-[620px]:grid-cols-2` in `app/page.tsx`). Below either threshold —
 * including a real, verified gap at exactly `xl` (1280px) wide, where the
 * project column is still only ~582px, under the two-up grid's own
 * container-query threshold, so cards render one-per-row — the frame
 * falls back to the ordinary `aspect-[16/10]` sizing every card already
 * uses on mobile, rather than reserving a fixed calc() height that
 * assumes a two-row grid that isn't actually there. That fixed height
 * only ever makes sense once both conditions hold; combining them is
 * what actually keeps Home's one-screen desktop layout accurate rather
 * than assuming they always agree. `object-contain` on the `<Image>`
 * means this never stretches or crops the artwork itself — a frame shape
 * further from 16:10 just letterboxes more visibly against `imageBg`,
 * exactly as an unusually-shaped source image already does today.
 */
export default function ProjectHighlight({
  href,
  company,
  descriptor,
  image,
  imageBg,
  imageFit = "contain",
  imageOffsetClassName,
  imageHeightClassName,
  priority = false,
  cta = "View case study",
  whiteCursorRing = false,
}: {
  href: string;
  company: string;
  descriptor: string;
  image: string;
  imageBg?: string;
  imageFit?: "contain" | "cover";
  imageOffsetClassName?: string;
  imageHeightClassName?: string;
  priority?: boolean;
  cta?: string;
  whiteCursorRing?: boolean;
}) {
  return (
    <article>
      <Link
        href={href}
        aria-label={`${company} — ${descriptor}`}
        {...(whiteCursorRing ? { "data-cc-cursor-white": "" } : {})}
        className={`hover-zoom block aspect-[16/10] border border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent xl:@min-[620px]:aspect-auto ${imageHeightClassName ?? ""} ${imageBg ?? "bg-neutral-50"}`}
      >
        <div className={`h-full w-full ${imageOffsetClassName ?? ""}`}>
          <Image
            src={image}
            alt=""
            width={1200}
            height={750}
            priority={priority}
            unoptimized={image.endsWith(".gif")}
            sizes="(min-width: 1280px) 33vw, 100vw"
            className={`h-full w-full ${imageFit === "cover" ? "object-cover" : "object-contain"}`}
          />
        </div>
      </Link>

      {/* `xl:@min-[620px]:min-h-[41.25px]` reserves exactly two lines of
          caption text (15px / `leading-snug` = 1.375 → 20.625px × 2) —
          gated on the same combined condition as the frame's own
          `aspect-auto` above, since it only matters once cards are
          actually two-up in the same CSS Grid row (e.g. "Strange Sounds
          from Beyond · Branding & microsite" only wraps at narrower
          desktop widths). Without this, a one-line caption next to a
          two-line one in the same grid row let CSS Grid's default
          `align-items: stretch` grow the whole row — and so Home's
          shared `THUMBNAIL_HEIGHT` reserved-space budget — inconsistently
          by breakpoint. Reserving the worst case unconditionally (once
          two-up) keeps every row's real height, and so
          `THUMBNAIL_HEIGHT`'s own math, constant regardless of how any
          one caption happens to wrap. */}
      <h3 className="mt-3 text-[15px] leading-snug text-ink xl:@min-[620px]:min-h-[41.25px]">
        <span className="font-medium">{company}</span>
        <span className="ml-1.5 text-sm font-normal text-muted">
          · {descriptor}
        </span>
      </h3>

      <Link
        href={href}
        aria-label={`${cta}: ${company}`}
        className="mt-2 inline-block w-fit text-sm font-normal text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {cta} →
      </Link>
    </article>
  );
}

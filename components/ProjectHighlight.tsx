import Image from "next/image";
import Link from "next/link";
import EyebrowLabel from "./EyebrowLabel";

/**
 * A single project entry on the homepage: company name and work-focused
 * title first (plain, non-interactive text — so the work is identifiable
 * before the image loads), then a large 16:10 image, a short summary, an
 * optional meta line, and a "View case study" call to action. The image is
 * contained rather than cropped, so `imageBg` should match the artwork's
 * own background for a seamless frame.
 *
 * Only two things are interactive, as separate sibling links to the same
 * `href`: the thumbnail image frame, and the "View case study" CTA below
 * the description. There's no card-wide wrapper link, stretched-link
 * overlay, or click handler — the company name, title, description, meta,
 * and surrounding whitespace are all plain text, not part of any link.
 * Each link gets its own descriptive `aria-label` (the image has no text
 * of its own to announce; the CTA's visible text repeats on every card, so
 * a screen reader navigating by links list would otherwise hear the same
 * name four times).
 *
 * Hover/focus feedback lives entirely on the `<Image>` itself, via the
 * shared `.hover-zoom` style (see `globals.css` — also used by the About
 * portrait) applied to the thumbnail link: the frame stays stationary
 * (`overflow: hidden`, from `.hover-zoom` itself) and only the image
 * transforms, scoped to this link alone, so hovering or focusing the
 * summary, CTA, or anywhere else on the card has no effect on it.
 *
 * `imageOffsetClassName` (optional) applies a static transform to a thin
 * wrapper div between the frame and the `<Image>` — for a source asset
 * whose own visible content sits off-center within its canvas (uneven
 * baked-in padding), when `object-position` has no room to work because
 * the image already touches the frame on that axis. Kept on its own
 * wrapper, never on the `<Image>` itself, so it can never combine with or
 * fight `.hover-zoom`'s hover-driven `scale`/`brightness` transform on the
 * image. The frame's own background (`imageBg`) shows through the gap this
 * opens up on the opposite edge, exactly as it already shows through the
 * source's transparent margins, so no separate fill color is needed.
 */
export default function ProjectHighlight({
  href,
  company,
  title,
  summary,
  meta,
  image,
  imageBg,
  imageOffsetClassName,
  priority = false,
  cta = "View case study",
}: {
  href: string;
  company: string;
  title: string;
  summary: string;
  meta?: string[];
  image: string;
  imageBg?: string;
  imageOffsetClassName?: string;
  priority?: boolean;
  cta?: string;
}) {
  return (
    <article className="flex flex-col">
      {/* min-height only from the 2-up breakpoint up, matched to fit the
          longest heading among the four projects at two lines — so both
          cards' thumbnails start at the same y regardless of whether a
          given title wraps to one line or two. No min-height below that
          breakpoint: on mobile the cards stack, so nothing needs to line
          up, and the heading returns to its natural height. */}
      <div className="@min-[752px]:min-h-[104px]">
        <EyebrowLabel as="p">{company}</EyebrowLabel>
        <h3 className="mt-2 text-xl leading-snug font-bold text-ink sm:text-2xl">
          {title}
        </h3>
      </div>

      <Link
        href={href}
        aria-label={`${company} — ${title}`}
        className={`hover-zoom mt-5 block aspect-[16/10] border border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${imageBg ?? "bg-neutral-50"}`}
      >
        <div className={`h-full w-full ${imageOffsetClassName ?? ""}`}>
          <Image
            src={image}
            alt=""
            width={1200}
            height={750}
            priority={priority}
            unoptimized={image.endsWith(".gif")}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <p className="mt-4 text-lg leading-relaxed text-body">{summary}</p>
      {meta && meta.length > 0 && (
        <p className="mt-4 text-sm text-muted">{meta.join(" · ")}</p>
      )}
      <Link
        href={href}
        aria-label={`${cta}: ${title}`}
        className="mt-5 inline-block w-fit text-base font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {cta} →
      </Link>
    </article>
  );
}

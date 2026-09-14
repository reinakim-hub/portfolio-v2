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
 * Hover/focus feedback lives entirely on the `<Image>` itself (frame stays
 * stationary, `overflow-hidden`) and is scoped to the image link alone via
 * `group`/`group-hover`/`group-focus-visible` — hovering or focusing the
 * summary, CTA, or anywhere else on the card has no effect on it. At rest
 * the image sits at `scale(1.04) brightness(1)`; hovering or focusing the
 * thumbnail link settles it to `scale(1) brightness(.94)` over 500ms
 * ease-out, reversing the same way on exit. `motion-reduce:transition-none`
 * drops the animated tween for `prefers-reduced-motion` while leaving the
 * two states themselves intact.
 */
export default function ProjectHighlight({
  href,
  company,
  title,
  summary,
  meta,
  image,
  imageBg,
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
        className={`group mt-5 block aspect-[16/10] overflow-hidden border border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${imageBg ?? "bg-neutral-50"}`}
      >
        <Image
          src={image}
          alt=""
          width={1200}
          height={750}
          priority={priority}
          unoptimized={image.endsWith(".gif")}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="h-full w-full scale-[1.04] object-contain brightness-100 transition duration-500 ease-out group-hover:scale-100 group-hover:brightness-[.94] group-focus-visible:scale-100 group-focus-visible:brightness-[.94] motion-reduce:transition-none"
        />
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

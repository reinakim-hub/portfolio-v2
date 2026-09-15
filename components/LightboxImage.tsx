"use client";

import Image from "next/image";
import { useLightbox } from "./Lightbox";

/**
 * A clickable case-study image: opens the shared lightbox (see
 * `Lightbox.tsx`) for closer inspection, with the image's own `alt` text
 * shown as the caption beneath the enlarged view. Used by `CaseStudyFigure`
 * and `ImageGallery`, and directly for standalone diagrams/screenshots
 * within a case-study page.
 *
 * Deliberately looks like plain inline content, not an obviously
 * interactive control: no hover zoom/dim/shadow, the native cursor stays
 * the default arrow (`cursor-default` overrides the browser's own
 * `cursor: pointer` on `<button>`), and `data-cc-cursor-exclude` tells
 * `CustomCursor` to leave its decorative dot in the resting 10px state
 * here instead of growing it into the usual interactive ring — checked
 * before the cursor's normal interactive-element detection. It's still a
 * real `<button>` underneath: fully clickable, tappable, and keyboard
 * operable, with a visible `focus-visible` outline.
 */
export default function LightboxImage({
  src,
  alt,
  width,
  height,
  className,
  wrapperClassName,
  pngBackground,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  wrapperClassName?: string;
  /** Set for a source image that's a PNG with real transparent regions
   * (a diagram or screenshot with a transparent background, not a photo) —
   * see `Lightbox.tsx`. Gives the enlarged lightbox view a white backdrop
   * so transparent areas (and any dark annotations drawn on them) stay
   * readable against the lightbox's own dark overlay. */
  pngBackground?: boolean;
}) {
  const openLightbox = useLightbox();

  return (
    <button
      type="button"
      onClick={(event) =>
        openLightbox({ src, alt, width, height, pngBackground }, event.currentTarget)
      }
      aria-label={alt ? `View larger image: ${alt}` : "View larger image"}
      data-cc-cursor-exclude
      className={`block w-full cursor-default text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${wrapperClassName ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized={src.endsWith(".gif")}
        className={className ?? "h-auto w-full object-cover"}
      />
    </button>
  );
}

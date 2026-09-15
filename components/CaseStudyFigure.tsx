import LightboxImage from "./LightboxImage";

export default function CaseStudyFigure({
  src,
  alt,
  width,
  height,
  imageBg,
  imageOffsetClassName,
  pngBackground,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  imageBg?: string;
  /** Forwarded to `LightboxImage` — see its own doc comment. */
  pngBackground?: boolean;
  /** Static vertical shift for a source image whose own visible content
   * sits off-center within its canvas (baked-in uneven padding), applied
   * to an inner wrapper rather than the image itself — see
   * `ProjectHighlight`'s prop of the same name. Locks the frame's own
   * `aspect-ratio` to `width`/`height` (the same ratio the frame already
   * rendered at via the image's natural `h-auto` sizing) so the frame's
   * rendered dimensions are unchanged, but now with actual room for the
   * shifted image to spill past an edge and get clipped by
   * `overflow-hidden` instead of always exactly filling the frame. Omit
   * this prop (every other `CaseStudyFigure` call) and nothing changes:
   * same `h-auto` sizing, same single-element render as before. */
  imageOffsetClassName?: string;
}) {
  if (imageOffsetClassName) {
    return (
      <div
        className={`overflow-hidden ${imageBg ?? "bg-neutral-50"}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <div className={`h-full w-full ${imageOffsetClassName}`}>
          <LightboxImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-full w-full object-cover"
            pngBackground={pngBackground}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${imageBg ?? "bg-neutral-50"}`}>
      <LightboxImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
        pngBackground={pngBackground}
      />
    </div>
  );
}

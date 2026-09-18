import LightboxImage from "./LightboxImage";

export default function CaseStudyFigure({
  src,
  alt,
  width,
  height,
  imageBg,
  imageOffsetClassName,
  pngBackground,
  frame,
  fullBleed,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  imageBg?: string;
  /** Forwarded to `LightboxImage` — see its own doc comment. */
  pngBackground?: boolean;
  /** Bypasses the shared `.case-study-image` height cap (60svh/480px) in
   * favor of plain `w-full h-auto` — for an image meant to render at its
   * full natural size within whatever width its container provides
   * (e.g. Nokia's top-of-page dashboard collage, shown nearly edge to
   * edge in the middle column) rather than scaled down to the ordinary
   * case-study body-image cap. The page still controls the reading
   * width separately by choosing whether to wrap this in `ProseColumn`.
   * Only supported on this default (non-offset) branch. */
  fullBleed?: boolean;
  /** Opt-in pale-gray presentation frame (see `.screenshot-frame` in
   * `globals.css`) for a screenshot whose own white background would
   * otherwise blend into the page — square corners, no shadow, no
   * border, inline presentation only (the lightbox is unaffected).
   * Overrides `imageBg` when set (the frame supplies its own
   * background). Only supported on this default (non-offset) branch —
   * `imageOffsetClassName` locks its own aspect-ratio/crop treatment,
   * a different mechanism this doesn't combine with. */
  frame?: boolean;
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
   * same `h-auto` sizing, same single-element render as before.
   *
   * Also forwarded to `LightboxImage` as its own `imageOffsetClassName`
   * (see that component and `Lightbox.tsx`), so the enlarged lightbox
   * view gets the same correction instead of showing the raw, unshifted
   * asset — this used to stop at the inline frame only. */
  imageOffsetClassName?: string;
}) {
  // A white-background image (e.g. SAP's title/hero image, or any other
  // screenshot composited onto white) has no natural edge against this
  // site's own white page background — a hairline `border-rule` outline
  // (the same 1px token every other frame/divider on the site already
  // uses) gives it a visible boundary. Skipped when `frame` is set: the
  // pale-gray `.screenshot-frame` background already supplies its own
  // separation from the page, so the two treatments never stack.
  const isWhiteBg = imageBg === "bg-white";

  if (imageOffsetClassName) {
    return (
      <div
        className={`overflow-hidden ${imageBg ?? "bg-neutral-50"} ${isWhiteBg ? "border border-rule" : ""}`}
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
            imageOffsetClassName={imageOffsetClassName}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden ${frame ? "screenshot-frame" : (imageBg ?? "bg-neutral-50")} ${!frame && isWhiteBg ? "border border-rule" : ""}`}
    >
      <LightboxImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={fullBleed ? "h-auto w-full" : "case-study-image"}
        pngBackground={pngBackground}
      />
    </div>
  );
}

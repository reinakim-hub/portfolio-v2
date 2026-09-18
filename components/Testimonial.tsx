/**
 * A quote block used on Home, inside a full-width section (its own
 * top/bottom dividers span the whole right-hand content area, across both
 * project columns — that's handled by the call site, not this
 * component). The quote and attribution live in one wrapper, centered
 * within that full-width section but capped at ~820px so lines stay
 * readable — `w-full max-w-[820px] mx-auto`, constrained further by the
 * page's own existing padding whenever the viewport is narrower than
 * 820px plus that padding. Text inside stays left-aligned; only the
 * wrapper itself centers.
 */
export default function Testimonial({
  quote,
  source,
}: {
  quote: string;
  source: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[820px] text-left">
      <p className="text-xl font-normal leading-normal text-ink sm:text-2xl">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="mt-4 text-sm text-muted">{source}</p>
    </div>
  );
}

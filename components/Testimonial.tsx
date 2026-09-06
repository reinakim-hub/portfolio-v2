export default function Testimonial({
  quote,
  source,
}: {
  quote: string;
  source: string;
}) {
  return (
    <div className="max-w-xl">
      <p className="text-xl font-semibold leading-snug text-ink sm:text-2xl">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="mt-4 text-sm text-muted">{source}</p>
    </div>
  );
}

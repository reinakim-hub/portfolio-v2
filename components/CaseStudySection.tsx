export default function CaseStudySection({
  title,
  paragraphs,
  challenge,
  impact,
}: {
  title: string;
  paragraphs: React.ReactNode[];
  challenge?: React.ReactNode[];
  impact?: React.ReactNode[];
}) {
  return (
    <section>
      <h2 className="text-3xl font-extrabold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-body">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {challenge && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-ink">Challenge</h3>
          <div className="mt-3 space-y-4 text-body">
            {challenge.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {impact && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-ink">Impact</h3>
          <div className="mt-3 space-y-4 text-body">
            {impact.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

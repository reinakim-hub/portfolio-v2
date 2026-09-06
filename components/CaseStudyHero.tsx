type Meta = { icon: string; label: string; value: string };

export default function CaseStudyHero({
  subtitle,
  title,
  paragraphs,
  meta,
}: {
  subtitle: string;
  title: string;
  paragraphs: React.ReactNode[];
  meta: Meta[];
}) {
  return (
    <div>
      <p className="whitespace-pre-line text-xl font-bold text-accent sm:text-2xl">
        {subtitle}
      </p>
      <h1 className="mt-2 whitespace-pre-line text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      <div className="mt-6 space-y-4 text-body">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:max-w-sm">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="font-semibold text-ink">
              <span aria-hidden="true">{item.icon} </span>
              {item.label}
            </dt>
            <dd className="mt-1 text-muted">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

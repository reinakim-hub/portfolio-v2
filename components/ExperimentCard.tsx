export default function ExperimentCard({
  title,
  description,
  status,
  href,
}: {
  title: string;
  description: string;
  status: "live" | "soon";
  href?: string;
}) {
  const isLive = status === "live" && Boolean(href);

  return (
    <div className="flex flex-col gap-3 rounded-tile bg-neutral-50 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div>
        <h3 className="text-lg font-bold text-ink">
          {isLive ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:no-underline"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="mt-2 text-body">{description}</p>
      </div>
      <span
        className={`shrink-0 text-sm font-semibold ${
          isLive ? "text-accent" : "text-muted"
        }`}
      >
        {isLive ? "Live ↗" : "Coming soon"}
      </span>
    </div>
  );
}

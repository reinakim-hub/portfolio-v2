import ExternalLinkIcon from "./ExternalLinkIcon";

/**
 * One row in the AI Lab's experiment list — plain list content, not a card:
 * no background, border, or rounded corners of its own (the hairline
 * dividers between rows come from the parent's `divide-y`, in `app/lab/page.tsx`).
 * Title and description are always plain, non-interactive text; only the
 * action link (a live experiment's destination) or the status text (a
 * documented "coming soon") is ever rendered, and only the link is ever
 * interactive. The title and its action link share one row when the
 * container is wide enough (`@min-[480px]`, evaluated against the nearest
 * `@container` ancestor — `TwoColumnLayout`'s right column); below that, the
 * link drops beneath the description instead of beneath the title, via
 * `order` rather than DOM position, since all three sit in one flex
 * container together.
 */
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
    <div className="py-6">
      <div className="flex flex-col gap-2 @min-[480px]:flex-row @min-[480px]:flex-wrap @min-[480px]:items-baseline @min-[480px]:justify-between @min-[480px]:gap-x-6 @min-[480px]:gap-y-1">
        <h3 className="order-1 text-lg font-bold text-ink @min-[480px]:flex-1">
          {title}
        </h3>

        {isLive ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="order-3 shrink-0 text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent @min-[480px]:order-2"
          >
            Live
            <ExternalLinkIcon />
          </a>
        ) : (
          <span className="copy-caption order-3 shrink-0 text-muted @min-[480px]:order-2">
            Coming soon
          </span>
        )}

        <p className="copy-body order-2 text-body @min-[480px]:order-3 @min-[480px]:w-full">
          {description}
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";
import { RadialProjectLink } from "./portfolio-motion/RadialProjectLink";
import type { ProjectKey } from "./portfolio-motion/motion-config";

/** Separate thumbnail and CTA links; captions and card whitespace stay inert.
 * Frame sizing still uses Home's viewport/container gates. Radial backgrounds
 * accompany a subtle foreground zoom-out on hover and keyboard focus.
 */
export default function ProjectHighlight({
  href, company, descriptor, image, project, imageHeightClassName,
  priority = false, cta = "View case study",
}: {
  href: string;
  company: string;
  descriptor: string;
  image: string;
  project: ProjectKey;
  imageHeightClassName?: string;
  priority?: boolean;
  cta?: string;
}) {
  const brand = project === "sap" || project === "nokia" ? project : null;
  const thumbnailId = `${project}-thumbnail`;
  return (
    <article>
      <RadialProjectLink
        id={thumbnailId}
        href={href}
        project={project}
        aria-label={`${company} — ${descriptor}`}
        {...(brand ? { "data-cc-cursor-white": "" } : {})}
        className={`${brand ? `brand-thumbnail--${brand}` : ""} block aspect-[16/10] border border-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent xl:@min-[620px]:aspect-auto ${imageHeightClassName ?? ""}`}
      >
        {project === "simplii" || project === "ssfb" ? (
          <svg
            data-project-artwork
            viewBox="28 24 3984 2433"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
            focusable="false"
          >
                <defs>
                  <clipPath id={`${thumbnailId}-screen`}>
                    <rect x="388" y="76" width="3264" height="2110" rx="40" />
                  </clipPath>
                </defs>
                <g clipPath={`url(#${thumbnailId}-screen)`}>
                  <rect x="388" y="76" width="3264" height="2110" fill="black" />
                  <image
                    href={`/images/${project}-thumbnail-still.webp`}
                    x="388" y="76" width="3264" height="2110"
                    preserveAspectRatio="xMidYMid meet"
                  />
                  <image
                    data-thumbnail-animation
                    href={image}
                    x="388" y="76" width="3264" height="2110"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </g>
                {/* Transparent screen reveals the animated GIF below the bezel. */}
                <image href="/images/MAC%20mock.png" width="4040" height="2481" />
          </svg>
        ) : (
        <Image
          data-project-artwork
          src={image}
          alt=""
          width={brand === "sap" ? 1030 : brand === "nokia" ? 1570 : 1200}
          height={brand === "sap" ? 506 : brand === "nokia" ? 369 : 750}
          unoptimized={Boolean(brand) || image.endsWith(".gif")}
          priority={priority}
          sizes="(min-width: 1280px) 33vw, 100vw"
          className={brand ? "brand-thumbnail-logo" : "h-full w-full object-contain"}
        />
        )}
      </RadialProjectLink>

      {/* `xl:@min-[620px]:min-h-[2.234375rem]` reserves exactly two lines
          of caption text (`copy-caption`'s `0.8125rem` × `leading-snug`'s
          1.375 = 1.1171875rem/line × 2 — recomputed from the previous
          `15px`/`41.25px` figures when the caption moved onto the shared
          `copy-caption` token, see PROJECT_STATUS.md) — gated on the same
          combined condition as the frame's own `aspect-auto` above, since
          it only matters once cards are actually two-up in the same CSS
          Grid row (e.g. "Strange Sounds from Beyond · Branding &
          microsite" only wraps at narrower desktop widths). Without
          this, a one-line caption next to a two-line one in the same
          grid row let CSS Grid's default `align-items: stretch` grow the
          whole row — and so Home's shared `THUMBNAIL_HEIGHT`
          reserved-space budget — inconsistently by breakpoint. Reserving
          the worst case unconditionally (once two-up) keeps every row's
          real height, and so `THUMBNAIL_HEIGHT`'s own math, constant
          regardless of how any one caption happens to wrap. Both spans
          share this same `copy-caption` size (inherited from the `h3`)
          rather than the company/descriptor halves reading at two
          different sizes, as they did before. */}
      <h3 className="copy-caption mt-3 leading-snug text-ink xl:@min-[620px]:min-h-[2.234375rem]">
        <span className="font-medium">{company}</span>
        <span className="ml-1.5 font-normal text-muted">· {descriptor}</span>
      </h3>

      <RadialProjectLink
        href={href}
        project={project}
        variant="cta"
        aria-label={`${cta}: ${company}`}
        className="mt-2 inline-block w-fit text-sm font-normal text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {cta} →
      </RadialProjectLink>
    </article>
  );
}

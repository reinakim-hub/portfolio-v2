# Project Status

## Complete

- Migrated all pages from the live Squarespace site to code: Home, About, `/sap`, `/nokia`, `/simpliifinancial`, `/ssfb` — content, images, and layout matched against the live site.
- Applied a Manrope (headings) / Inter (body) font pairing site-wide via `next/font/google`.
- Light design-system refactor: extracted `SectionLabel`, `PullQuote`, and `CalloutNote`; introduced semantic tokens for color, radius, and content width.
- All 6 routes regression-checked visually after each change.

## Current structure

**Components** (`components/`)
- Layout: `SiteHeader`, `SiteFooter`
- Case study: `CaseStudyHero`, `CaseStudySection`, `CaseStudyFigure`, `ImageGallery`
- Shared primitives: `SectionLabel`, `PullQuote`, `CalloutNote`
- Home-only: `ProjectHighlight`, `AcademicProjectCard`, `Testimonial`

**Tokens** (`app/globals.css`)
- Color: `--color-ink`, `--color-body`, `--color-muted`, `--color-accent`
- Radius: `--radius-card`, `--radius-tile`
- Layout: `--container-content`
- Font: `--font-heading` (Manrope), `--font-sans` (Inter)

**Known gaps** (not yet formalized): multiple unreconciled H1/H2 sizes, no `Surface/Tint-*` background tokens, no spacing scale, no breakpoint token — see code-to-Figma mapping report.

## Next steps

1. Code-to-Figma library mapping
2. Figma component library generation
3. GIF/video performance optimization
4. AI Lab section and `/lab` exploration

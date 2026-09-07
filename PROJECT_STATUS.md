# Project Status

## Complete

- Migrated all pages from the live Squarespace site to code: Home, About, `/sap`, `/nokia`, `/simpliifinancial`, `/ssfb` — content, images, and layout matched against the live site.
- Applied a Manrope (headings) / Inter (body) font pairing site-wide via `next/font/google`.
- Light design-system refactor: extracted `SectionLabel`, `PullQuote`, and `CalloutNote`; introduced semantic tokens for color, radius, and content width.
- All 6 routes regression-checked visually after each change.
- Reconciled `NavLink` between Figma and code: extracted the inline nav-link pattern out of `SiteHeader` into a standalone `components/NavLink.tsx` (self-contained — reads the active route via `usePathname` itself), matching the Figma `NavLink` atom's Default/Active variants exactly. `SiteHeader` now composes `NavLink` and no longer needs `"use client"` itself. Visual design and navigation behavior are unchanged; type-checked and all 6 routes regression-checked in-browser (including active-state underlining on `/` and `/about`) with no console errors.
- Finalized the Figma library's typography scale (Display/Heading/Body/UI/Meta/Quote styles) and base spacing scale (4–96, plus Medium/Large radius and Content/Default layout width) — see [code-to-Figma mapping report](docs/figma-library-mapping.md). Figma library and code not yet updated to match.
- **Figma design system: v1 complete.** ["Portfolio Design System"](https://www.figma.com/design/chYokhtJIt88qHcDMqLJGx/Portfolio-Design-System), in the Reina's Workshop (Professional) workspace, **is the canonical Figma file going forward.** The earlier Starter-plan file (`JCXgB2CD971EPjsb6ra9Ks`) hit that plan's 20-reads/month MCP cap partway through the build and is superseded — it still holds partial work (Foundations + variables/styles + `SectionLabel`) but should not be used or updated.
  - **Foundations — complete.** Variables: Primitives + Color (6 semantic vars), Spacing (4–96), Radius (Medium/Large), Layout (content-default 672) — all scoped, all with WEB code syntax back to the real CSS custom properties. Text styles: all 12 from the mapping doc. Documented on the Foundations page (Cover, Color, Typography, Spacing/Radius/Layout).
  - **Components — complete.** All 13 components live on the single Components page, one Section per component, ordered by purpose (Layout → Case Study → Shared primitives → Home-only) after a QA pass fixed discoverability/naming: `SectionLabel` (sm/md variants), `PullQuote`, `Testimonial`, `CalloutNote`, `CaseStudyFigure`, `ImageGallery`, `CaseStudyHero`, `CaseStudySection` (Show Challenge/Show Impact boolean properties — presence toggles, not content-count variants), `ProjectHighlight`, `AcademicProjectCard`, `NavLink` (Default/Active variants, matched by `components/NavLink.tsx`), `SiteHeader`, `SiteFooter`. Each screenshot-verified against its `components/` source.
  - **Patterns/Templates — complete.** A "Patterns / Templates" page holds two representative patterns built entirely from existing component instances (no new components, nothing redesigned): **Case Study / Default** (SiteHeader → CaseStudyHero → CaseStudySection → CaseStudyFigure → SiteFooter) and **Home / Project Listing** (SiteHeader → PullQuote intro → 2× ProjectHighlight + 1× AcademicProjectCard → SiteFooter). Both validated visually and structurally (all instances confirmed pointing to their correct main components).
  - Known approximation carried into v1: `CaseStudyHero`'s title uses the Display/Medium text style, since the code's `text-4xl sm:text-5xl` h1 doesn't map 1:1 to any tier in the finalized Heading scale (same unreconciled gap called out below and in the mapping doc — Display/Medium was picked as the nearest match, not a new decision).

## Current structure

**Components** (`components/`)
- Layout: `SiteHeader`, `SiteFooter`, `NavLink`
- Case study: `CaseStudyHero`, `CaseStudySection`, `CaseStudyFigure`, `ImageGallery`
- Shared primitives: `SectionLabel`, `PullQuote`, `CalloutNote`
- Home-only: `ProjectHighlight`, `AcademicProjectCard`, `Testimonial`

**Tokens** (`app/globals.css`)
- Color: `--color-ink`, `--color-body`, `--color-muted`, `--color-accent`
- Radius: `--radius-card`, `--radius-tile`
- Layout: `--container-content`
- Font: `--font-heading` (Manrope), `--font-sans` (Inter)

**Known gaps** (not yet formalized): H1/H2 sizes in code not yet reconciled with the finalized Heading scale, no `Surface/Tint-*` background tokens, no breakpoint token — see [code-to-Figma mapping report](docs/figma-library-mapping.md).

## Next steps

1. GIF/video performance optimization
2. AI Lab section and `/lab` exploration
3. Reconcile remaining code/Figma divergence: H1/H2 sizes vs. the finalized Heading scale, and `Quote/Testimonial` (Figma is Manrope 600, code is currently Inter semibold)

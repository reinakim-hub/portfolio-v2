# Code → Figma Library Mapping — v2

**Figma file:** ["Reina Portfolio — Design System v2"](https://www.figma.com/design/9Hbpw8SWrqIKsThgzE7LU2), in the **Reina's Workshop** (Professional) workspace. Created fresh this session; **does not replace or modify** the earlier "Portfolio Design System" v1 file (`chYokhtJIt88qHcDMqLJGx`, same workspace) — v1 is preserved untouched and was only read from (page/variable naming conventions) to keep v2 consistent with it.

Status: **built and verified against current code**, not a proposal. Every variable, text style, and component below exists as a real, editable Figma object (native components with Auto Layout, bound variables, real variant sets) — nothing here is a flattened screenshot standing in for a component.

## Pages

| Page | Contents |
|---|---|
| Cover | Title, generation date, one-line scope note |
| Foundations | Color swatches, Typography specimens, Spacing bars, Radius swatches, Layout width bars — all rendered directly from the bound variables/styles below, not redrawn by hand |
| Components | One frame per component (or component set), in dependency order, each with a `description` documenting its code source and any route-specific exception |
| Patterns | 6 compositions built from component **instances**: Home / Desktop, Home / Mobile, Case Study / Desktop, Case Study / Mobile, AI Lab / Desktop, AI Lab / Mobile |

## Variables

### Primitives (1 mode, scopes hidden — internal only)
`neutral/900` `#171717`, `neutral/700` `#404040`, `neutral/600` `#525252`, `neutral/200` `#e5e5e5`, `blue/600` `#2563eb`, `white` `#ffffff`.

### Color (1 mode — the site has no dark mode)
| Variable | Aliases | WEB code syntax |
|---|---|---|
| `color/ink` | neutral/900 | `var(--color-ink)` |
| `color/body` | neutral/700 | `var(--color-body)` |
| `color/muted` | neutral/600 | `var(--color-muted)` |
| `color/accent` | blue/600 | `var(--color-accent)` |
| `color/rule` | neutral/200 | `var(--color-rule)` |
| `color/background` | white | `var(--background)` |
| `color/foreground` | neutral/900 | `var(--foreground)` |

### Spacing (1 mode)
`4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96` — extends v1's scale with `20`, `56`, `80`, all real values introduced by this session's Home/SAP spacing rework (`pt-5`, `mt-14`, `mt-56`/`xl:mt-56`, etc.).

### Radius (1 mode)
| Variable | Value | Note |
|---|---|---|
| `radius/none` | 0 | **The only value actually applied anywhere in current code** — square corners sitewide, no exceptions. |
| `radius/card` | 24 | Defined in CSS (`--radius-card`) but unused by any component. Kept only because the custom property still exists in `globals.css`. |
| `radius/tile` | 16 | Same history as `radius/card` (`--radius-tile`). |

### Layout (1 mode)
`layout/content-default` 672px (`var(--container-content)`, ProseColumn's ~65ch reading width), `layout/project-wrapper` 1160px (Home's `PROJECT_SECTIONS_WRAPPER` max-width), `layout/testimonial` 820px (Testimonial's max-width).

## Text styles

| Style | Font / weight | Size / line-height | Code source |
|---|---|---|---|
| Heading/Large | Manrope ExtraBold | 30/38, −0.75 tracking | Every page `<h1>` **and** every case-study `<h2>` — literally the same class in code (`text-3xl font-extrabold tracking-tight`) |
| Heading/Small | Manrope Bold | 20/28 | `CaseStudySection`'s Challenge/Impact `<h3>` |
| Display/Statement | Manrope Bold | 36/44 (desktop) | About/Nokia/Simplii Financial/SSFB/AI Lab's opening line (`text-2xl sm:text-3xl font-bold`) — steps down to 24/32 on mobile, noted in the style's description |
| Opening/SAP-exception | Manrope Regular | 27/36.45 | **Route-specific, `/sap` only** — the approved 26–28px exception; never apply elsewhere |
| Body/Default | Inter Regular | 16/26 | Case-study narrative paragraphs (`text-body`) |
| Body/Lead | Inter Regular | 18/28 | About/AI Lab's intro paragraph — a deliberately lighter "lead" treatment, distinct from case-study narrative body copy |
| Meta/Default | Inter Regular | 14/20 | TOC links, `dd` values, contact links, `ExperimentCard` description/status |
| Meta/Strong | Inter Semi Bold | 14/20 | `dt` meta labels ("Year", "Tools") |
| Label/Eyebrow | Inter Semi Bold, uppercase, 0.1em tracking | 13/20 | `EyebrowLabel` |
| Label/Section | Inter Regular | 14/20 | Home-only "Selected work"/"Academic projects" — deliberately **not** uppercase/tracked, a distinct role from Label/Eyebrow |
| Card/Caption-name | Inter Medium | 15/21 | `ProjectHighlight`'s company name |
| CTA/Default | Inter Regular | 14/20 | Shared text-link CTA color/size (pair with `color/accent` + underline-on-hover, fixed sitewide this session) |
| CTA/Strong | Inter Semi Bold | 14/20 | `ExperimentCard`'s "Live ↗" only |
| Quote/Pull | Inter Extra Bold | 30/38 (desktop) | `PullQuote` (Simplii Financial, SSFB) |
| Quote/Testimonial | Inter Regular | 24/36 (desktop) | `Testimonial` — **currently unused on any live page** (removed from Home; preserved in code and here) |

Corrected from v1's speculation: v1 guessed `Quote/Testimonial` as Manrope 600 and `UI/Label` as Inter 500 — neither matches real code (Testimonial is Inter 400; nav is Inter 400, not a dedicated "UI/Label" weight). v2 reflects the real values.

## Components

| Component | Variants | Code source |
|---|---|---|
| EyebrowLabel | — | `components/EyebrowLabel.tsx` |
| SectionLabel | Size=Small / Medium | `components/SectionLabel.tsx` |
| PullQuote | — | `components/PullQuote.tsx` |
| Testimonial | — | `components/Testimonial.tsx` (unused live, preserved) |
| NavLink | State=Default/Hover/Focus/Active | `components/NavLink.tsx` — Hover/Focus both fixed to `color/accent` this session; Focus's visible ring was previously **entirely missing**, a real accessibility gap |
| TextLink / CTA | State=Default/Hover/Focus | Shared pattern behind `ProjectHighlight`'s CTA, `CaseStudySidebar`/`CaseStudyNextNav`'s "All work", TOC links |
| ContactLinks | — | `components/ContactLinks.tsx` |
| ExperimentCard | Status=Live/Coming soon | `components/ExperimentCard.tsx` |
| CustomCursor / dot | State=Rest/Active/Active-White | `components/CustomCursor.tsx` — Active-White is the new Home-only SAP/Nokia thumbnail exception (`data-cc-cursor-white`) |
| ProjectHighlight | Thumbnail=Rest/Hover | `components/ProjectHighlight.tsx` |
| CaseStudySidebar | HeadingWeight=Extrabold (default)/Semibold (SAP) | `components/CaseStudySidebar.tsx` — the Semibold variant is SAP's one route-specific `headingClassName` override |
| CaseStudySummary | NDA=False/True | `components/CaseStudySummary.tsx` |
| CaseStudyFigure / ImageFrame | Frame=Default/Screenshot | `components/CaseStudyFigure.tsx` default branch + `.screenshot-frame` opt-in |
| Lightbox | — | `components/Lightbox.tsx` + `LightboxImage.tsx` |

### Deliberately excluded (not deprecated — out of scope for a static file)
- **`Reveal`** — a scroll-animation behavior, not a visual node; documented as a note on the Case Study pattern instead of a component.
- **`ProseColumn`** — a width/centering wrapper with no visual identity of its own; represented by the `layout/content-default` token instead of a component.
- **`TwoColumnLayout`/`CaseStudyLayout`** — page shells, not components; represented directly as the Patterns' own composition structure (matching "built from component instances," not a nested shell component).
- **`CaseStudyNextNav`** — the mobile/narrow counterpart to `CaseStudySidebar`'s own next-case-study block; functionally identical content, differing only in breakpoint visibility, so it was not duplicated as a second component this session. **Known gap**, listed in PROJECT_STATUS.md's Next steps.
- **`CaseStudySection`** — its heading/paragraph/Challenge/Impact structure is fully covered by Heading/Large + Heading/Small + Body/Default text styles and is shown inline in the Case Study pattern; not built as a separate standalone component this session. **Known gap.**
- **`ImageGallery`** — a grid of `CaseStudyFigure/ImageFrame` instances; not built as its own wrapper component this session. **Known gap.**

### Confirmed excluded as genuinely deprecated (do not exist in current code)
`CaseStudyHero`, `AcademicProjectCard`, `SiteFooter`, `CalloutNote` — all removed from code in earlier sessions (see `PROJECT_STATUS.md`); none carried into v2.

## Patterns

All six built from real instances of the components above (not redrawn shapes):
- **Home / Desktop** and **Home / Mobile** — sidebar (identity, Specialties, ContactLinks instance) + project grid (4 differentiated `ProjectHighlight` instances: SAP, Nokia, Simplii Financial, Strange Sounds from Beyond).
- **Case Study / Desktop** and **Case Study / Mobile** — `CaseStudySidebar` instance (Extrabold default) + sample narrative heading/paragraph + `CaseStudyFigure/ImageFrame` instance + `CaseStudySummary` instance (NDA=True).
- **AI Lab / Desktop** and **AI Lab / Mobile** — identity + ContactLinks instance + opening statement + `ExperimentCard` instances (Live, Coming soon).

## Verification performed this session

Representative computed styles from the real running site (`localhost:3000`, desktop) cross-checked against the Figma values above:

| Element | Live site | Figma |
|---|---|---|
| Home `<h1>` | 30px / 800 / Manrope | Heading/Large ✓ |
| Home "Selected work" `<h2>` | 14px / 400 | Label/Section ✓ |
| Card company caption | 15px / 500 | Card/Caption-name ✓ |
| CTA "View case study" | 14px / accent blue | CTA/Default ✓ |
| Nav "Work" (rest) | 14px / ink | NavLink State=Default ✓ |
| SAP sidebar `<h1>` | 30px / 600 (semibold) / Manrope | CaseStudySidebar HeadingWeight=Semibold (SAP) ✓ |
| SAP opening statement | 27px / 400 / 36.45 line-height / Manrope | Opening/SAP-exception ✓ |

All seven checks matched exactly. No Figma tool limitation was hit — variables, component sets with real variants, and instance-based patterns all created successfully via the Plugin API (`use_figma`).

## Explicitly deferred (unchanged from v1's own scope discipline)
- No dark-mode color modes — the site has none.
- No semantic spacing aliases beyond the single base scale.
- `CaseStudyNextNav`, `CaseStudySection`, and `ImageGallery` as standalone components (see gaps above) — next session.

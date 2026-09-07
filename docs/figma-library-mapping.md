# Code → Figma Library Mapping (Proposed)

Status: proposal only. No code or Figma changes made yet — this document is the
spec to implement against once approved. See `PROJECT_STATUS.md` → "Next steps
→ Code-to-Figma library mapping" for where this fits.

## Typography

Two families carried over from code: `--font-heading` (Manrope) and
`--font-sans` (Inter).

| Figma text style       | Font / weight  | Size / line-height | Current code equivalent |
|-------------------------|----------------|---------------------|--------------------------|
| Display/Large           | Manrope 800    | 48/56               | *(new — no current usage; largest hero size)* |
| Display/Medium          | Manrope 800    | 36/44               | *(new)* |
| Heading/Large           | Manrope 800    | 30/38               | `h1`/`h2` `text-3xl font-extrabold` (CaseStudySection title) |
| Heading/Medium          | Manrope 700    | 24/32               | *(new — fills gap between `text-xl` and `text-3xl` h3/h2 uses)* |
| Heading/Small           | Manrope 700    | 20/28               | `h3 text-xl font-bold` (CaseStudySection Challenge/Impact headings) |
| Body/Default            | Inter 400      | 16/26               | `text-body` paragraph copy (CaseStudyHero, CaseStudySection) |
| Body/Strong             | Inter 600      | 16/26               | `dt font-semibold text-ink` (CaseStudyHero meta labels) |
| UI/Label                | Inter 500      | 14/20               | *(new — nav/button label weight, currently unstyled)* |
| Meta/Default            | Inter 400      | 14/20               | `text-sm text-muted` (Testimonial source, CaseStudyHero meta values) |
| Meta/Strong             | Inter 600      | 14/20               | *(new — bold meta variant)* |
| Quote/Pull              | Manrope 800    | 30/38               | `PullQuote` (`text-2xl sm:text-3xl font-extrabold text-accent`) |
| Quote/Testimonial       | Manrope 600    | 24/32               | `Testimonial` quote (`text-xl sm:text-2xl font-semibold text-ink`) — **note:** currently Inter/semibold in code; mapping promotes it to Manrope 600 per this spec, to reconcile in code later |

Reuse rules (no new dedicated styles):
- **Case-study subtitles** (`CaseStudyHero` subtitle, currently `text-xl sm:text-2xl font-bold text-accent`) and **`SectionLabel`** both map to **Heading/Small + Accent/Primary**, rather than getting their own text style.
- **Small labels** (e.g. Business Value / Customer Value–type callouts) map to **Body/Strong + Accent/Primary**.

Open reconciliation items carried from `PROJECT_STATUS.md`'s "known gaps": the
current `text-4xl sm:text-5xl` hero `h1` and `text-3xl` section `h2` don't yet
line up 1:1 with Display/Heading tiers above — resolving that mismatch is part
of the eventual code update, not this mapping pass.

## Spacing

Single base scale, no semantic aliases yet:

```
4, 8, 12, 16, 24, 32, 40, 48, 64, 96
```

| Usage                    | Value | Current code equivalent |
|---------------------------|-------|--------------------------|
| Paragraph gap              | 16    | `space-y-4` (paragraph stacks in CaseStudyHero/CaseStudySection) |
| Content block gap          | 32    | *(new — currently `mt-8` for Challenge/Impact blocks, closest existing step)* |
| Section gap                | 64    | *(new — no explicit token today)* |
| Major Home gap             | 96    | *(new — no explicit token today)* |
| Page horizontal padding    | 24    | *(new — not yet tokenized; likely lives in page-level container padding)* |

## Radius

| Figma token | Value | Current code equivalent |
|-------------|-------|--------------------------|
| Medium      | 16    | `--radius-tile` (`rounded-tile`, `ImageGallery`) |
| Large       | 24    | `--radius-card` (`rounded-card`, `CaseStudyFigure`, `ProjectHighlight`, `AcademicProjectCard`) |

## Layout

| Figma token       | Value | Current code equivalent |
|--------------------|-------|--------------------------|
| Content/Default    | 672px | `--container-content: 42rem` |

## Explicitly deferred

- No semantic spacing aliases (e.g. `space-sm`/`space-lg`) — one base scale only, for now.
- No further code or Figma edits until this mapping is reviewed and approved.

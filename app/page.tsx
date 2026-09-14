import ContactLinks from "@/components/ContactLinks";
import EyebrowLabel from "@/components/EyebrowLabel";
import ProjectHighlight from "@/components/ProjectHighlight";
import Reveal from "@/components/Reveal";
import Testimonial from "@/components/Testimonial";
import TwoColumnLayout from "@/components/TwoColumnLayout";

// Project grid: a shared 32px gap (Tailwind's `gap-8`), two equal columns
// once each card would be at least ~360px wide. Tailwind's class scanner
// needs the literal string below, so this can't be computed from a
// variable — the math is 2 × 360px card + 32px gap = 752px, checked
// against the container's own width via `@min-[752px]:grid-cols-2` (see
// the `@container` note in `components/TwoColumnLayout.tsx`).
const PROJECT_GRID =
  "mt-10 grid grid-cols-1 gap-8 @min-[752px]:grid-cols-2";

const NOKIA_QUOTE = `Reina has demonstrated critical thinking, problem solving and has shown that she can drive projects forward independently.
She backs up her decision making with research and she is able to clarly and articulately share her work and conclusions. Reina's design are visually pleasing and she delivers with quality.`;

export default function Home() {
  return (
    <TwoColumnLayout
      left={
        <>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">
              Reina Kim
            </h1>
            <p className="mt-1 text-base text-muted">
              UX Designer · Vancouver
            </p>
            <p className="mt-3 text-base leading-relaxed text-body">
              Design systems &amp; product design
            </p>
          </div>

          <ContactLinks />
        </>
      }
      right={
        <>
          <Reveal className="max-w-3xl">
            <p className="font-heading text-2xl leading-snug font-bold text-ink sm:text-3xl">
              Designing clearer experiences for complex products.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              At SAP and Nokia, I designed reusable components and aligned
              interaction patterns across enterprise products.
            </p>
          </Reveal>

          <section id="projects" className="mt-16 scroll-mt-24">
            <div className="flex items-baseline justify-between border-t border-rule pt-5">
              <EyebrowLabel>Selected work</EyebrowLabel>
              <span className="text-sm text-muted tabular-nums">(4)</span>
            </div>

            {/* Two equal columns once each card would be at least ~360px
                wide (2 × 360px + the 32px gap = 752px), one column below
                that — evaluated against this container's own width, not
                the viewport, so it holds regardless of sidebar width. */}
            <div className={PROJECT_GRID}>
              <Reveal>
                <ProjectHighlight
                  href="/sap"
                  company="SAP Canada Inc."
                  title="Aligning UX patterns across three SAP data products"
                  summary="On SAP’s design system team, I turned complex product requirements into scalable Figma components, guidelines, and implementation-ready specs — improving consistency across diagrams, side panels, and notifications in SAP Analytics Cloud, SAP Datasphere, and SAP Business Data Cloud."
                  meta={["13-month UX Design Internship"]}
                  image="/images/sap-cover.webp"
                  imageBg="bg-[#EEF4FA]"
                  priority
                />
              </Reveal>

              <Reveal>
                <ProjectHighlight
                  href="/nokia"
                  company="Nokia"
                  title="Building and maintaining a cross-product component library"
                  summary="On the Nokia Design System team, I built and maintained reusable UI components and supported documentation, accessibility, and cross-team consistency — through accessibility reviews, design audits, icon library management, and interaction research."
                  meta={["12-month UX Design Co-op"]}
                  image="/images/nokia-cover.webp"
                  imageBg="bg-[#F4F5F7]"
                />
              </Reveal>
            </div>

            <div className="mt-16 border-t border-rule pt-16">
              <Reveal>
                <Testimonial
                  quote={NOKIA_QUOTE}
                  source="Head of UX, Cloud & Network Services, Nokia"
                />
              </Reveal>
            </div>
          </section>

          <section className="mt-20">
            <div className="border-t border-rule pt-5">
              <EyebrowLabel>Academic projects</EyebrowLabel>
            </div>

            <div className={PROJECT_GRID}>
              <Reveal>
                <ProjectHighlight
                  href="/simpliifinancial"
                  company="Simplii Financial"
                  title="Streamlining onboarding for newcomers to Canada"
                  summary="Designed a new feature to streamline onboarding for newcomers to Canada, leading content strategy and optimizing the UI for clear information delivery."
                  meta={[
                    "Conceptual client",
                    "Team of 6",
                    "Figma, Adobe AE, Google Docs",
                    "Oct 2023 – Dec 2023",
                  ]}
                  image="/images/simplii-hero.webp"
                  imageBg="bg-neutral-950"
                />
              </Reveal>

              <Reveal>
                <ProjectHighlight
                  href="/ssfb"
                  company="Strange Sounds From Beyond"
                  title="An interactive microsite for a music festival"
                  summary="Developed an interactive microsite that integrates visual and auditory elements, leading the conceptualization and implementation of UI features that showcase the festival’s identity."
                  meta={[
                    "Conceptual client",
                    "Team of 5",
                    "Figma, Adobe AE",
                    "Sep 2023 – Oct 2023",
                  ]}
                  image="/images/ssfb-hero.gif"
                  imageBg="bg-black"
                />
              </Reveal>
            </div>
          </section>
        </>
      }
    />
  );
}

import type { Metadata } from "next";
import CaseStudySidebar from "@/components/CaseStudySidebar";
import CaseStudyFigure from "@/components/CaseStudyFigure";
import CaseStudyOpening from "@/components/CaseStudyOpening";
import CaseStudySection from "@/components/CaseStudySection";
import CaseStudyNextNav from "@/components/CaseStudyNextNav";
import CaseStudySummary, { NDA_NOTE_TEXT } from "@/components/CaseStudySummary";
import ProseColumn from "@/components/ProseColumn";
import Reveal from "@/components/Reveal";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import ExternalLinkIcon from "@/components/ExternalLinkIcon";

export const metadata: Metadata = {
  title: "Nokia Design System — Reina Kim",
};

const SECTIONS = [
  { id: "enhancing-accessibility", label: "Enhancing accessibility" },
  { id: "icon-library", label: "Icon library management" },
  { id: "ai-components", label: "Designing components for AI tools" },
  { id: "design-audits", label: "Conducting design audits" },
];

export default function Nokia() {
  return (
    <CaseStudyLayout
      left={
        <CaseStudySidebar
          name="Nokia Design System"
          role="Junior UX Designer"
          meta={[
            { label: "Year", value: "Jan 2024 - Dec 2024" },
            {
              label: "Tools",
              value: (
                <>
                  Figma, Storybook, Miro, Jira,
                  <br />
                  Supernova, JAWS, MS Excel
                </>
              ),
            },
          ]}
          sections={SECTIONS}
        />
      }
      right={
        <CaseStudySummary
          previousCaseStudy={{ label: "SAP", href: "/sap" }}
          nextCaseStudy={{ label: "Simplii Financial", href: "/simpliifinancial" }}
          summary={
            <>
              I contributed to Nokia&rsquo;s shared design system through
              accessibility testing, icon library management, AI component
              design and documentation, and audits of how product teams used
              existing components.
            </>
          }
          ndaNote={NDA_NOTE_TEXT}
        />
      }
      middle={
        <>
          {/* Vimeo reports a native 1920 × 1080 presentation. Keep the
              shared opening wrapper and its scroll cue unchanged. */}
          <CaseStudyOpening>
            <figure className="w-full">
              <iframe
                src="https://player.vimeo.com/video/997847814?h=acca60c00d&background=1&autoplay=1&loop=1&muted=1&controls=0"
                title="Nokia Design System overview"
                width={1920}
                height={1080}
                // This background player has no controls. Keep pointer
                // movement on the page so the trailing cursor can follow.
                className="pointer-events-none aspect-video h-auto w-full border-0"
                tabIndex={-1}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
              <figcaption className="copy-caption mt-3 text-muted">
                Video by Nokia ·{" "}
                <a
                  href="https://vimeo.com/997847814/acca60c00d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline-offset-4 hover:text-accent hover:underline focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  View original on Vimeo
                  <ExternalLinkIcon />
                </a>
              </figcaption>
            </figure>
          </CaseStudyOpening>

          {/* Introduction — unchanged copy, just now below the opening
              above instead of directly under the image. `id`/
              `scroll-mt-24` on this wrapper (not on `Reveal`, which
              doesn't take an `id` prop) is the cue's own anchor target,
              matching the same `id`+`scroll-mt-24` pattern already used
              for every other in-page section link on this page (see
              `SECTIONS` above). Still wrapped in the same `Reveal` every
              other below-the-fold section on this page already uses —
              not a new opacity-hiding mechanism, the ordinary
              scroll-into-view fade already established sitewide, now
              simply reached one screen later than before. */}
          <section id="introduction" className="scroll-mt-24">
            <Reveal className="mt-14">
              <ProseColumn>
                <p className="case-study-heading whitespace-pre-line">
                  Building accessible, scalable, and innovative design system for
                  designers
                </p>
                <div className="copy-body mt-6 space-y-4 text-body">
                  <p>
                    Nokia is a global leader in telecommunications and networking
                    technology, driving innovation in 5G, cloud infrastructure,
                    IoT, and digital health.
                  </p>
                  <p>
                    As a Junior UX Designer, I have collaborated with a dynamic
                    team of developers and designers to create and maintain the
                    internal design system for multiple Nokia digital products.
                  </p>
                  <p>
                    My primary role involved{" "}
                      ensuring accessibility compliance
                    {" "}
                    with WCAG standards, managing the{" "}
                      icon library,
                    documenting new patterns and{" "}
                      guidelines for AI
                    {" "}
                    products, and conducting{" "}
                      design audits.
                  </p>
                </div>
              </ProseColumn>
            </Reveal>
          </section>

          <div className="mt-16">
            <Reveal>
              <div>
                <CaseStudySection
                  divider
                  id="enhancing-accessibility"
                  title="Enhancing accessibility"
                  paragraphs={[
                    <>
                      Ensuring accessibility was one of the core priorities
                      for our team. In addition to adhering to{" "}
                        WCAG AA
                      {" "}
                      standards, the library supported{" "}
                        AAA color contrast
                      {" "}
                      by implementing high-contrast modes for both light and
                      dark themes. I conducted accessibility reviews on
                      several components, focusing on{" "}
                        touch target sizes and color contrast across themes.
                      I also utilized JAWS screen reader software to
                      ensure our design system was{" "}
                        fully keyboard navigable and optimized for screen
                        reader use.
                    </>,
                    "During this process, we uncovered several accessibility issues within our chart components, which led me to research industry standards and user expectations to improve their usability and accessibility.",
                  ]}
                />
                <ProseColumn className="mt-8">
                  <CaseStudyFigure
                    src="/images/nokia-accessibility.webp"
                    alt="Nokia design system overview showing form controls, charts, navigation, and light and dark components"
                    width={1139}
                    height={655}
                  />
                </ProseColumn>
              </div>
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <div>
                <CaseStudySection
                  divider
                  id="icon-library"
                  title="Icon library management"
                  paragraphs={[
                    "Starting in May, I took on the responsibility of managing the icon library for our design system. This involved handling requests for new icons, making edits, and leading initiatives like introducing animated icons. The role required strong task management, clear communication with both designers requesting the icons and developers implementing them, and a solid understanding of icon design guidelines and library management.",
                  ]}
                />
                <ProseColumn className="mt-8">
                  <CaseStudyFigure
                    src="/images/nokia-icon-library.webp"
                    alt="Nokia icon library grid alongside a microphone icon construction grid"
                    width={2500}
                    height={1406}
                  />
                </ProseColumn>
              </div>
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <CaseStudySection
                divider
                id="ai-components"
                title="Designing new components and patterns for AI tools"
                paragraphs={[
                  "In September, I collaborated with a senior designer to develop new components and patterns specifically for AI tools. The goal was to design intuitive, user-friendly UI components that not only showcased AI capabilities in line with industry standards but also blended seamlessly with our existing component library. I focused on crafting patterns that were adaptable and ensured smooth interaction with AI systems.",
                  <>
                    Given that NokiaGPT{" "}
                      already had over 10,000 users
                    {" "}
                    prior to my involvement, it was essential that my
                    designs integrated harmoniously into the existing system
                    without causing disruption. I also prepared a clear,
                    well-organized documentation with the team lead to
                    ensure that future teams could easily access and
                    implement the new components and patterns.
                  </>,
                ]}
              />
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <CaseStudySection
                divider
                id="design-audits"
                title="Conducting design audits"
                paragraphs={[
                  "In October, our team began conducting design audits with product team designers to better understand the effectiveness of our components. It was essential for us to identify both what was working well and areas that needed improvement. I took charge of assessing the use of slots within our library, as well as analyzing how the data grid component was being implemented in various products.",
                  "The audit process involved 1:1 meetings with designers, where I gathered insights into their workflows, pain points, positive feedback, and suggestions for system improvements. This collaborative effort provided valuable input for refining our design system.",
                ]}
              />
            </Reveal>
          </div>

          <Reveal>
            <CaseStudyNextNav
              previous={{ label: "SAP", href: "/sap" }}
              next={{ label: "Simplii Financial", href: "/simpliifinancial" }}
            />
          </Reveal>
        </>
      }
    />
  );
}

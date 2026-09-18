import type { Metadata } from "next";
import CaseStudySidebar from "@/components/CaseStudySidebar";
import CaseStudySummary, { NDA_NOTE_TEXT } from "@/components/CaseStudySummary";
import ExternalLinkIcon from "@/components/ExternalLinkIcon";
import CaseStudyOpening from "@/components/CaseStudyOpening";
import CaseStudySection from "@/components/CaseStudySection";
import CaseStudyNextNav from "@/components/CaseStudyNextNav";
import ImageGallery from "@/components/ImageGallery";
import LightboxImage from "@/components/LightboxImage";
import ProseColumn from "@/components/ProseColumn";
import Reveal from "@/components/Reveal";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "SAP UX Design — Reina Kim",
};

const SECTIONS = [
  { id: "aligning-ux-patterns", label: "Aligning UX patterns" },
  { id: "ai-mcp-workshop", label: "Leading an AI & MCP workshop" },
  { id: "new-product-workflows", label: "Supporting new product workflows" },
  { id: "validating-through-research", label: "Validating through research" },
  { id: "ux-community", label: "Contributing to the UX community" },
];

export default function Sap() {
  return (
    <CaseStudyLayout
      left={
        <CaseStudySidebar
          name="SAP"
          role="UX Design Intern"
          meta={[
            { label: "Year", value: "May 2025 - May 2026" },
            { label: "Tools", value: "Figma, FigJam, Jira, Claude" },
          ]}
          sections={SECTIONS}
        />
      }
      right={
        <CaseStudySummary
          nextCaseStudy={{ label: "Nokia", href: "/nokia" }}
          summary={
            <>
              Across three SAP data and analytics products, I helped align UX
              patterns through reusable components and accessibility guidance,
              supported product design and research, and helped deliver an
              AI-assisted design workshop.
            </>
          }
          ndaNote={NDA_NOTE_TEXT}
        />
      }
      middle={
        <>
          <CaseStudyOpening>
            <figure className="w-full">
              <video
                src="/images/SAP%20intro%20video.mp4"
                aria-label="SAP Design overview"
                className="pointer-events-none block aspect-video h-auto w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                tabIndex={-1}
                preload="auto"
              />
              <figcaption className="copy-caption mt-3 text-muted">
                Video by SAP ·{" "}
                <a
                  href="https://www.youtube.com/watch?v=PsH6tVSBFpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline-offset-4 hover:text-accent hover:underline focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  View original on YouTube
                  <ExternalLinkIcon />
                </a>
              </figcaption>
            </figure>
          </CaseStudyOpening>

          {/* Introduction — same typography, reading width, and entrance
              behavior as every other case study's opening heading/body
              (see `/nokia`'s equivalent block): a bold heading-style line
              plus supporting paragraphs, wrapped in `Reveal` since it now
              starts below the first screen instead of being immediately
              visible. Copy is unchanged from the previous text-only
              opening — only the typography and structure changed to
              match the shared pattern. */}
          <section id="introduction" className="scroll-mt-24">
            <Reveal className="mt-14">
              <ProseColumn>
                <p className="case-study-heading">
                  Aligning scalable UX patterns across complex data products
                </p>
                <div className="copy-body mt-6 space-y-4 text-body">
                  <p>
                    During my 13-month UX Design internship, I worked on
                    SAP’s Data & Analytics Design System team, supporting SAP
                    Analytics Cloud, SAP Datasphere, and SAP Business Data Cloud.
                  </p>
                  <p>
                    I aligned UX patterns across these products, creating
                    scalable Figma components, developer specs, and
                    accessibility guidelines — working closely with product
                    designers, developers, PMs, and the central design system
                    team to balance cross-product consistency with each
                    product’s own workflow needs.
                  </p>
                </div>
              </ProseColumn>
            </Reveal>
          </section>

          <div className="mt-16">
            <Reveal>
              <section id="aligning-ux-patterns" className="scroll-mt-24">
                <ProseColumn className="border-t border-rule pt-10">
                  <h2 className="case-study-heading">Aligning UX patterns</h2>
                  <div className="copy-body mt-4 space-y-4 text-body">
                    <p>
                      A large part of my work focused on improving consistency
                      across SAP Analytics Cloud, SAP Datasphere, and SAP
                      Business Data Cloud. Although the products often
                      supported similar workflows, years of independent
                      development had resulted in different implementations of
                      the same UX patterns.
                    </p>
                    <p>
                      For projects including{" "}
                        diagram nodes, side panels, and notifications,
                      I began by collecting existing implementations and
                      meeting with product design leads to understand their
                      requirements, edge cases, and technical constraints. I
                      then compared these needs across products and explored
                      how a shared pattern could support as many real use
                      cases as possible.
                    </p>
                    <p>
                      Once a direction presented by me was agreed on with
                      product leads, I created or updated the supporting{" "}
                        Figma components, developer specifications, usability
                        guidelines, and accessibility guidance.
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-base font-semibold text-ink">Challenge</h3>
                    <div className="copy-body mt-3 space-y-4 text-body">
                      <p>
                        Some products relied heavily on legacy or custom-built
                        patterns that no longer aligned with current design
                        system guidance. These patterns often supported
                        product-specific requirements that could not simply be
                        removed.
                      </p>
                      <p>
                        I worked with product leads and senior designers to
                        understand why each variation existed, which
                        requirements were still necessary, and where products
                        could move toward a shared solution.
                      </p>
                      <p>
                        When an existing pattern conflicted with current
                        standards, I backed up my reasonings with guidance
                        from the central design system and proposed
                        alternatives rather than simply removing functionality.
                      </p>
                      <p>
                        For requirements that were not fully supported by the
                        existing design system, I explored how components
                        could be extended for data complex products.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-base font-semibold text-ink">Impact</h3>
                    <div className="copy-body mt-3 space-y-4 text-body">
                      <p>
                        The resulting components, guidelines, developer specs,
                        and accessibility documentation gave product teams a
                        shared reference for future implementation.
                      </p>
                      <p>
                        Instead of approaching similar UX problems
                        independently, teams could work from a common pattern
                        while still supporting the requirements unique to
                        their products.
                      </p>
                    </div>
                  </div>
                </ProseColumn>

                <ProseColumn className="my-8">
                  <LightboxImage
                    src="/images/sap-fiori-principles.webp"
                    alt="SAP Fiori dashboard mockups showing light and dark theme components"
                    width={1200}
                    height={701}
                    className="case-study-image"
                  />
                </ProseColumn>

                <ProseColumn className="copy-body space-y-4 text-body">
                  <p>
                    The Side Panel project was one of the areas where I
                    had the most ownership. I worked as the sole designer
                    from the initial audit through component design and
                    documentation.
                  </p>
                  <p>
                    I collected examples across the three products, met
                    with product leads both individually and as a group,
                    and mapped differences in content, actions,
                    navigation, and interaction requirements.
                  </p>
                  <p>
                    The challenge was creating a shared structure that
                    remained flexible enough for different data-heavy
                    workflows without becoming overly complex.
                  </p>
                  <p>
                    I translated these requirements into a reusable Figma
                    component and created the supporting developer
                    specification, usability guidelines, and accessibility
                    instructions.
                  </p>
                </ProseColumn>
              </section>
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <CaseStudySection
                divider
                id="ai-mcp-workshop"
                title="Leading an AI & MCP workshop for designers"
                paragraphs={[
                  <>
                    As AI tools became more integrated into design
                    workflows, I worked with my team to plan and deliver a
                    hands-on{" "}
                      Claude + Model Context Protocol (MCP) workshop
                    {" "}
                    for UX and UA designers in Vancouver.
                  </>,
                  <>
                    The workshop covered{" "}
                      MCP setup, Figma workflows, and practical prompting
                      techniques,
                    with hands-on exercises using existing design system
                    components. I helped shape the content, prepare
                    examples, and create supporting guides and resources for
                    attendees.
                  </>,
                  <>
                    During the workshop, I introduced{" "}
                      core MCP terminology,
                    participated in the Q&amp;A panel, and provided{" "}
                      1:1 support
                    {" "}
                    during the hands-on exercises to help participants
                    troubleshoot and follow along.
                  </>,
                ]}
                challenge={[
                  <>
                    Participants had different levels of technical
                    experience, so we needed to make MCP approachable
                    without oversimplifying it. I focused on creating{" "}
                      clear, step-by-step exercises
                    {" "}
                    tied to realistic design system use cases.
                  </>,
                ]}
                impact={[
                  <>
                    The workshop gave Vancouver UX and UA designers a{" "}
                      practical starting point for experimenting with MCP
                      and AI-assisted design workflows,
                    supported by resources they could continue using after
                    the session.
                  </>,
                  <>
                    Our team also became{" "}
                      one of the first design teams within SAP to create
                      internal MCP and AI workflow guidance.
                    As interest grew, design teams from other countries
                    reached out for our{" "}
                      setup guides, tutorial videos, workshop materials, and
                      presentation recordings,
                    extending the impact beyond the original workshop.
                  </>,
                ]}
              />
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <CaseStudySection
                divider
                id="new-product-workflows"
                title="Supporting new product workflows"
                paragraphs={[
                  <>
                    I supported feature design for the{" "}
                      My Metrics
                    {" "}
                    project after its MVP release, helping the team expand
                    the experience into a dedicated dashboard where users
                    could{" "}
                      view, organize, and create metrics.
                  </>,
                  <>
                    My work included reviewing{" "}
                      global UX feedback,
                    exploring user flows, contributing to{" "}
                      feature prototyping and floorplan exploration,
                    and researching how existing design system components
                    could support the new experience. I also worked with the
                    central design system team when existing components
                    needed to be adapted or extended.
                  </>,
                ]}
                challenge={[
                  "The experience needed to display a large amount of information within limited space, especially in card-based layouts. Existing components did not always support the content requirements without becoming crowded or requiring custom solutions.",
                  <>
                    I reviewed existing card patterns and identified what
                    information was essential for users to see at a glance.
                    I then explored ways to{" "}
                      extend existing components instead of creating new
                      one-off patterns,
                    testing different content hierarchies and layouts
                    within the available space. When I reached the limits of
                    the current system, I connected with the central design
                    system team to confirm constraints and discuss scalable
                    extensions.
                  </>,
                ]}
                impact={[
                  <>
                    I helped the team{" "}
                      reuse and enhance existing components
                    {" "}
                    instead of creating unnecessary patterns, improving
                    consistency while still supporting the needs of the new
                    Metrics experience. This helped balance{" "}
                      feature flexibility with long-term design system
                      scalability.
                  </>,
                ]}
              />
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <CaseStudySection
                divider
                id="validating-through-research"
                title="Validating through research"
                paragraphs={[
                  "Throughout my internship, I also participated in research activities to better understand how both customers and internal designers were using SAP products.",
                  <>
                    I joined{" "}
                      eight customer research sessions,
                    working alongside UX researchers to synthesize notes
                    and identify recurring needs and actionable findings.
                  </>,
                  <>
                    Later, I helped create a{" "}
                      design system user survey
                    {" "}
                    to understand how internal teams interacted with the
                    system. I contributed to deciding what we wanted to
                    learn, building the survey, and analyzing the results.
                  </>,
                  "These projects reminded me that good design decisions aren't just about consistency and technical requirements. They also need to hold up when real people actually use the product and system.",
                ]}
              />
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <div>
                <CaseStudySection
                  divider
                  id="ux-community"
                  title="Contributing to the UX community at SAP"
                  paragraphs={[
                    "I also had opportunities to contribute to the wider UX community at SAP.",
                    <>
                      For{" "}
                        Impulse,
                      a full-day internal UX event, I worked alongside the
                      Head of UX, full-time designers, and other interns to
                      help organize the event. I supported merchandise and
                      physical preparation and led the activity portion of
                      the day, creating six interactive stations designed to
                      encourage creativity and engagement.
                    </>,
                    "I also participated in planning smaller team events and activities throughout my internship.",
                    "These experiences gave me opportunities to work with people outside my immediate project teams and contribute to the design culture around me.",
                  ]}
                />

                <ProseColumn className="mt-8">
                  <ImageGallery
                    images={[
                      {
                        src: "/images/sap-impulse-1.jpg",
                        alt: "Impulse 25 event cutout signage on a table",
                        width: 2500,
                        height: 1667,
                      },
                      {
                        src: "/images/sap-impulse-2.jpg",
                        alt: "Group photo of the UX/UA intern team holding signage at Impulse",
                        width: 1814,
                        height: 2500,
                      },
                      {
                        src: "/images/sap-impulse-3.jpg",
                        alt: "Attendees gathered around the UX Sticker Rally table at Impulse",
                        width: 2500,
                        height: 1345,
                      },
                      {
                        src: "/images/sap-img-2.jpg",
                        alt: "Close-up of Impulse 25 event stickers and badges",
                        width: 2500,
                        height: 1786,
                      },
                      {
                        src: "/images/sap-impulse-4.jpg",
                        alt: "Attendees at an Impulse activity station",
                        width: 2500,
                        height: 1667,
                      },
                    ]}
                  />
                </ProseColumn>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <CaseStudyNextNav next={{ label: "Nokia", href: "/nokia" }} />
          </Reveal>
        </>
      }
    />
  );
}

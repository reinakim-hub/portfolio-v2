import type { Metadata } from "next";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyFigure from "@/components/CaseStudyFigure";
import CalloutNote from "@/components/CalloutNote";
import CaseStudySection from "@/components/CaseStudySection";
import ImageGallery from "@/components/ImageGallery";
import Image from "next/image";

export const metadata: Metadata = {
  title: "SAP UX Design — Reina Kim",
};

export default function Sap() {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-16 px-6 py-16 sm:px-0">
      <CaseStudyHero
        subtitle="Aligning scalable UX patterns across complex data products"
        title="SAP UX Design Intern"
        paragraphs={[
          "During my 13-month UX Design internship, I worked on SAP’s Data & Analytics Design System team, supporting SAP Analytics Cloud, SAP Datasphere, and SAP Business Data Cloud.",
          "My work focused on aligning UX patterns across products, creating scalable Figma components and guidelines, and preparing developer specs and accessibility requirements.",
          "I collaborated with product designers, developers, PMs, and the central design system team to balance cross-product consistency with the needs of complex, data-heavy workflows.",
        ]}
        meta={[
          { icon: "📅", label: "Year", value: "May 2025 - May 2026" },
          { icon: "🔧", label: "Tools", value: "Figma, FigJam, Jira, Claude" },
        ]}
      />

      <CaseStudyFigure
        src="/images/sap-hero.webp"
        alt="SAP brand mark on a design-system reference grid"
        width={1200}
        height={630}
        imageBg="bg-sky-50"
      />

      <CalloutNote
        label="NDA Note"
        paragraphs={[
          "Some details and visuals have been simplified or replaced with public examples due to NDA restrictions. I’m happy to discuss my process and contributions in more detail during an interview.",
        ]}
      />

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Aligning UX patterns
        </h2>
        <div className="mt-4 space-y-4 text-body">
          <p>
            A large part of my work focused on improving consistency across
            SAP Analytics Cloud, SAP Datasphere, and SAP Business Data Cloud.
            Although the products often supported similar workflows, years of
            independent development had resulted in different implementations
            of the same UX patterns.
          </p>
          <p>
            For projects including{" "}
            <strong className="font-semibold text-ink">
              diagram nodes, side panels, and notifications
            </strong>
            , I began by collecting existing implementations and meeting with
            product design leads to understand their requirements, edge
            cases, and technical constraints. I then compared these needs
            across products and explored how a shared pattern could support
            as many real use cases as possible.
          </p>
          <p>
            Once a direction presented by me was agreed on with product
            leads, I created or updated the supporting{" "}
            <strong className="font-semibold text-ink">
              Figma components, developer specifications, usability
              guidelines, and accessibility guidance
            </strong>
            .
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-ink">Challenge</h3>
          <div className="mt-3 space-y-4 text-body">
            <p>
              Some products relied heavily on legacy or custom-built patterns
              that no longer aligned with current design system guidance.
              These patterns often supported product-specific requirements
              that could not simply be removed.
            </p>
            <p>
              I worked with product leads and senior designers to understand
              why each variation existed, which requirements were still
              necessary, and where products could move toward a shared
              solution.
            </p>
            <p>
              When an existing pattern conflicted with current standards, I
              backed up my reasonings with guidance from the central design
              system and proposed alternatives rather than simply removing
              functionality.
            </p>
            <p>
              For requirements that were not fully supported by the existing
              design system, I explored how components could be extended for
              data complex products.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-ink">Impact</h3>
          <div className="mt-3 space-y-4 text-body">
            <p>
              The resulting components, guidelines, developer specs, and
              accessibility documentation gave product teams a shared
              reference for future implementation.
            </p>
            <p>
              Instead of approaching similar UX problems independently, teams
              could work from a common pattern while still supporting the
              requirements unique to their products.
            </p>
          </div>

          <div className="my-8 overflow-hidden rounded-tile">
            <Image
              src="/images/sap-fiori-principles.webp"
              alt="SAP Fiori dashboard mockups showing light and dark theme components"
              width={1200}
              height={701}
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="space-y-4 text-body">
            <p>
              The Side Panel project was one of the areas where I had the
              most ownership. I worked as the sole designer from the initial
              audit through component design and documentation.
            </p>
            <p>
              I collected examples across the three products, met with
              product leads both individually and as a group, and mapped
              differences in content, actions, navigation, and interaction
              requirements.
            </p>
            <p>
              The challenge was creating a shared structure that remained
              flexible enough for different data-heavy workflows without
              becoming overly complex.
            </p>
            <p>
              I translated these requirements into a reusable Figma component
              and created the supporting developer specification, usability
              guidelines, and accessibility instructions.
            </p>
          </div>
        </div>
      </section>

      <CaseStudySection
        title="Leading an AI & MCP workshop for designers"
        paragraphs={[
          <>
            As AI tools became more integrated into design workflows, I
            worked with my team to plan and deliver a hands-on{" "}
            <strong className="font-semibold text-ink">
              Claude + Model Context Protocol (MCP) workshop
            </strong>{" "}
            for UX and UA designers in Vancouver.
          </>,
          <>
            The workshop covered{" "}
            <strong className="font-semibold text-ink">
              MCP setup, Figma workflows, and practical prompting techniques
            </strong>
            , with hands-on exercises using existing design system
            components. I helped shape the content, prepare examples, and
            create supporting guides and resources for attendees.
          </>,
          <>
            During the workshop, I introduced{" "}
            <strong className="font-semibold text-ink">
              core MCP terminology
            </strong>
            , participated in the Q&amp;A panel, and provided{" "}
            <strong className="font-semibold text-ink">
              1:1 support
            </strong>{" "}
            during the hands-on exercises to help participants troubleshoot
            and follow along.
          </>,
        ]}
        challenge={[
          <>
            Participants had different levels of technical experience, so we
            needed to make MCP approachable without oversimplifying it. I
            focused on creating{" "}
            <strong className="font-semibold text-ink">
              clear, step-by-step exercises
            </strong>{" "}
            tied to realistic design system use cases.
          </>,
        ]}
        impact={[
          <>
            The workshop gave Vancouver UX and UA designers a{" "}
            <strong className="font-semibold text-ink">
              practical starting point for experimenting with MCP and
              AI-assisted design workflows
            </strong>
            , supported by resources they could continue using after the
            session.
          </>,
          <>
            Our team also became{" "}
            <strong className="font-semibold text-ink">
              one of the first design teams within SAP to create internal MCP
              and AI workflow guidance
            </strong>
            . As interest grew, design teams from other countries reached out
            for our{" "}
            <strong className="font-semibold text-ink">
              setup guides, tutorial videos, workshop materials, and
              presentation recordings
            </strong>
            , extending the impact beyond the original workshop.
          </>,
        ]}
      />

      <CaseStudySection
        title="Supporting new product workflows"
        paragraphs={[
          <>
            I supported feature design for the{" "}
            <strong className="font-semibold text-ink">
              My Metrics
            </strong>{" "}
            project after its MVP release, helping the team expand the
            experience into a dedicated dashboard where users could{" "}
            <strong className="font-semibold text-ink">
              view, organize, and create metrics
            </strong>
            .
          </>,
          <>
            My work included reviewing{" "}
            <strong className="font-semibold text-ink">
              global UX feedback
            </strong>
            , exploring user flows, contributing to{" "}
            <strong className="font-semibold text-ink">
              feature prototyping and floorplan exploration
            </strong>
            , and researching how existing design system components could
            support the new experience. I also worked with the central
            design system team when existing components needed to be adapted
            or extended.
          </>,
        ]}
        challenge={[
          "The experience needed to display a large amount of information within limited space, especially in card-based layouts. Existing components did not always support the content requirements without becoming crowded or requiring custom solutions.",
          <>
            I reviewed existing card patterns and identified what information
            was essential for users to see at a glance. I then explored ways
            to{" "}
            <strong className="font-semibold text-ink">
              extend existing components instead of creating new one-off
              patterns
            </strong>
            , testing different content hierarchies and layouts within the
            available space. When I reached the limits of the current
            system, I connected with the central design system team to
            confirm constraints and discuss scalable extensions.
          </>,
        ]}
        impact={[
          <>
            I helped the team{" "}
            <strong className="font-semibold text-ink">
              reuse and enhance existing components
            </strong>{" "}
            instead of creating unnecessary patterns, improving consistency
            while still supporting the needs of the new Metrics experience.
            This helped balance{" "}
            <strong className="font-semibold text-ink">
              feature flexibility with long-term design system scalability
            </strong>
            .
          </>,
        ]}
      />

      <CaseStudySection
        title="Validating through research"
        paragraphs={[
          "Throughout my internship, I also participated in research activities to better understand how both customers and internal designers were using SAP products.",
          <>
            I joined{" "}
            <strong className="font-semibold text-ink">
              eight customer research sessions
            </strong>
            , working alongside UX researchers to synthesize notes and
            identify recurring needs and actionable findings.
          </>,
          <>
            Later, I helped create a{" "}
            <strong className="font-semibold text-ink">
              design system user survey
            </strong>{" "}
            to understand how internal teams interacted with the system. I
            contributed to deciding what we wanted to learn, building the
            survey, and analyzing the results.
          </>,
          "These projects gave me another way to evaluate design decisions—not only through consistency and technical requirements, but through feedback from the people actually using the products and design system.",
        ]}
      />

      <div>
        <CaseStudySection
          title="Contributing to the UX community at SAP"
          paragraphs={[
            "I also had opportunities to contribute to the wider UX community at SAP.",
            <>
              For <strong className="font-semibold text-ink">Impulse</strong>,
              a full-day internal UX event, I worked alongside the Head of
              UX, full-time designers, and other interns to help organize the
              event. I supported merchandise and physical preparation and led
              the activity portion of the day, creating six interactive
              stations designed to encourage creativity and engagement.
            </>,
            "I also participated in planning smaller team events and activities throughout my internship.",
            "These experiences gave me opportunities to work with people outside my immediate project teams and contribute to the design culture around me.",
          ]}
        />

        <div className="mt-8">
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
                alt: "Attendees gathered around a registration table at Impulse",
                width: 1814,
                height: 2500,
              },
              {
                src: "/images/sap-impulse-3.jpg",
                alt: "Close-up of Impulse 25 event stickers and badge",
                width: 2500,
                height: 1345,
              },
              {
                src: "/images/sap-img-2.jpg",
                alt: "Group photo of the Impulse event team holding signage",
                width: 2500,
                height: 1786,
              },
              {
                src: "/images/sap-impulse-4.jpg",
                alt: "Attendees working at a table during an Impulse activity station",
                width: 2500,
                height: 1667,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

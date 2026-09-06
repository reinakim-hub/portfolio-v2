import Image from "next/image";
import Link from "next/link";
import ProjectHighlight from "@/components/ProjectHighlight";
import AcademicProjectCard from "@/components/AcademicProjectCard";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-24 px-6 pb-24 pt-16 sm:px-0">
      {/* Hero */}
      <section className="flex flex-col gap-8">
        <Image
          src="/images/hero-icon.webp"
          alt=""
          width={168}
          height={168}
          priority
          className="h-32 w-32 self-center sm:h-40 sm:w-40"
        />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Hi, I&rsquo;m Reina <span aria-hidden="true">✨</span>
          </h1>
          <p className="mt-2 text-xl font-bold text-ink sm:text-2xl">
            UX Designer, creative enthusiast, and team player
          </p>
          <div className="mt-6 space-y-4 text-body">
            <p>
              I&rsquo;m a UX Designer passionate about creating intuitive and
              user-friendly digital experiences. My work has focused on{" "}
              <strong className="font-semibold text-ink">
                design systems and cross-product consistency
              </strong>
              , from building and maintaining component libraries at Nokia to
              aligning UX patterns across multiple products at SAP.
            </p>
            <p>
              Along the way, I&rsquo;ve worked closely with designers,
              developers, and product managers to turn complex requirements
              into scalable components, clear guidelines, and practical
              solutions.
            </p>
            <p>Check out my work below!</p>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section id="projects" className="flex flex-col gap-24">
        <ProjectHighlight
          href="/sap"
          title="SAP Canada Inc."
          subtitle="13-months UX Design Internship"
          image="/images/sap-hero.webp"
          imageAlt="SAP brand mark on a design-system reference grid"
          imageBg="bg-sky-50"
          paragraphs={[
            <>
              During my 13-month internship on SAP&rsquo;s design system
              team, I helped align UX patterns across{" "}
              <strong className="font-semibold text-ink">
                SAP Analytics Cloud, SAP Datasphere, and SAP Business Data
                Cloud
              </strong>
              . I worked with design leads, developers, and PMs to turn
              complex product requirements into scalable Figma components,
              guidelines, and implementation-ready specs.
            </>,
            <>
              My work focused on improving{" "}
              <strong className="font-semibold text-ink">
                cross-product consistency across diagrams, side panels, and
                notifications
              </strong>
              , while balancing existing product needs with company-wide
              design system and accessibility requirements.
            </>,
          ]}
        />

        <ProjectHighlight
          href="/nokia"
          title="Nokia Design System"
          subtitle="12-month UX Design Co-op"
          image="/images/nokia-hero.webp"
          imageAlt="Nokia design system dashboard components"
          paragraphs={[
            "During my 12-month co-op on the Nokia Design System team, I helped build and maintain reusable UI components and supported design system documentation, accessibility, and cross-team consistency. I collaborated closely with designers and developers to improve handoff and ensure components were practical to use across products.",
            <>
              My work included{" "}
              <strong className="font-semibold text-ink">
                component design and maintenance, accessibility reviews,
                design audits, icon library management, and interaction
                research
              </strong>
              , using tools such as Figma, Jira, Miro, Storybook, and
              Supernova.
            </>,
          ]}
        />

        <Testimonial
          quote="Reina has demonstrated critical thinking, problem solving and has shown that she can drive projects forward independently.
She backs up her decision making with research and she is able to clarly and articulately share her work and conclusions. Reina's design are visually pleasing and she delivers with quality."
          source="Head of UX, Cloud & Network Services, Nokia"
        />

        <div className="flex flex-col gap-16">
          <h2 className="text-2xl font-extrabold text-ink">
            Academic projects
          </h2>

          <AcademicProjectCard
            href="/simpliifinancial"
            title={
              <>
                Simplii Financial
                <br />
                Design Intervention
              </>
            }
            image="/images/simplii-hero.webp"
            imageAlt="Simplii Financial onboarding microsite shown on laptop and phone"
            description="Designed a new feature for Simplii Financial to streamline onboarding for newcomers to Canada. Led content strategy and optimized UI for clear information delivery and increased user engagement."
            meta={[
              { icon: "💪", label: "Team", value: "6 people" },
              { icon: "🔧", label: "Tools", value: "Figma, Adobe AE, Google Docs" },
              { icon: "🏢", label: "Conceptual Client", value: "Simplii Financial" },
              { icon: "📅", label: "Year", value: "Oct 2023 - Dec 2023" },
            ]}
          />

          <AcademicProjectCard
            href="/ssfb"
            title="SSFB Microsite UX/UI"
            image="/images/ssfb-hero.gif"
            imageAlt="Strange Sounds From Beyond microsite animated preview"
            description="Developed an interactive microsite for a music festival, integrating visual and auditory elements. Led the conceptualization and implementation of UI features to showcase the festival's identity."
            meta={[
              { icon: "💪", label: "Team", value: "5 people" },
              { icon: "🔧", label: "Tools", value: "Figma, Adobe AE" },
              { icon: "🏢", label: "Conceptual Client", value: "Strange Sounds From Beyond" },
              { icon: "📅", label: "Year", value: "Sep 2023 - Oct 2023" },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

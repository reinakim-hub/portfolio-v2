import type { Metadata } from "next";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyFigure from "@/components/CaseStudyFigure";
import CaseStudySection from "@/components/CaseStudySection";
import CalloutNote from "@/components/CalloutNote";

export const metadata: Metadata = {
  title: "Nokia Design System — Reina Kim",
};

export default function Nokia() {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-16 px-6 py-16 sm:px-0">
      <CaseStudyHero
        subtitle={
          "Building accessible, scalable,\nand innovative design system for designers"
        }
        title="Nokia Design System"
        paragraphs={[
          "Nokia is a global leader in telecommunications and networking technology, driving innovation in 5G, cloud infrastructure, IoT, and digital health.",
          "As a Junior UX Designer, I have collaborated with a dynamic team of developers and designers to create and maintain the internal design system for multiple Nokia digital products.",
          <>
            My primary role involved{" "}
            <strong className="font-semibold text-ink">
              ensuring accessibility compliance
            </strong>{" "}
            with WCAG standards, managing the{" "}
            <strong className="font-semibold text-ink">
              icon library
            </strong>
            , documenting new patterns and{" "}
            <strong className="font-semibold text-ink">
              guidelines for AI
            </strong>{" "}
            products, and conducting{" "}
            <strong className="font-semibold text-ink">
              design audits
            </strong>
            .
          </>,
        ]}
        meta={[
          { icon: "📅", label: "Year", value: "Jan 2024 - Dec 2024" },
          {
            icon: "🔧",
            label: "Tools",
            value: "Figma, Storybook, Miro, Jira, Supernova, JAWS, MS Excel",
          },
        ]}
      />

      <CaseStudyFigure
        src="/images/nokia-hero.webp"
        alt="Nokia Design System wordmark above dashboard components in light and dark themes"
        width={1139}
        height={667}
      />

      <CalloutNote
        label="Note"
        paragraphs={[
          "Due to NDA restrictions, this case study highlights the key tasks I contributed to during my co-op experience at a high level.",
          <>
            If you&rsquo;d like more details about my work, feel free to
            contact me via{" "}
            <a
              href="mailto:reinakim1221@gmail.com"
              className="underline hover:no-underline"
            >
              email
            </a>
            !
          </>,
        ]}
      />

      <div>
        <CaseStudySection
          title="Enhancing accessibility"
          paragraphs={[
            <>
              Ensuring accessibility was one of the core priorities for our
              team. In addition to adhering to{" "}
              <strong className="font-semibold text-ink">
                WCAG AA
              </strong>{" "}
              standards, the library supported{" "}
              <strong className="font-semibold text-ink">
                AAA color contrast
              </strong>{" "}
              by implementing high-contrast modes for both light and dark
              themes. I conducted accessibility reviews on several
              components, focusing on{" "}
              <strong className="font-semibold text-ink">
                touch target sizes and color contrast across themes
              </strong>
              . I also utilized JAWS screen reader software to ensure our
              design system was{" "}
              <strong className="font-semibold text-ink">
                fully keyboard navigable and optimized for screen reader use
              </strong>
              .
            </>,
            "During this process, we uncovered several accessibility issues within our chart components, which led me to research industry standards and user expectations to improve their usability and accessibility.",
          ]}
        />
        <div className="mt-8">
          <CaseStudyFigure
            src="/images/nokia-accessibility.webp"
            alt="Nokia design system components shown with accessibility annotations"
            width={1139}
            height={655}
          />
        </div>
      </div>

      <div>
        <CaseStudySection
          title="Icon library management"
          paragraphs={[
            "Starting in May, I took on the responsibility of managing the icon library for our design system. This involved handling requests for new icons, making edits, and leading initiatives like introducing animated icons. The role required strong task management, clear communication with both designers requesting the icons and developers implementing them, and a solid understanding of icon design guidelines and library management.",
          ]}
        />
        <div className="mt-8">
          <CaseStudyFigure
            src="/images/nokia-icon-library.webp"
            alt="Nokia icon library grid alongside an animated microphone icon concept"
            width={2500}
            height={1406}
          />
        </div>
      </div>

      <CaseStudySection
        title="Designing new components and patterns for AI tools"
        paragraphs={[
          "In September, I collaborated with a senior designer to develop new components and patterns specifically for AI tools. The goal was to design intuitive, user-friendly UI components that not only showcased AI capabilities in line with industry standards but also blended seamlessly with our existing component library. I focused on crafting patterns that were adaptable and ensured smooth interaction with AI systems.",
          <>
            Given that NokiaGPT{" "}
            <strong className="font-semibold text-ink">
              already had over 10,000 users
            </strong>{" "}
            prior to my involvement, it was essential that my designs
            integrated harmoniously into the existing system without causing
            disruption. I also prepared a clear, well-organized documentation
            with the team lead to ensure that future teams could easily
            access and implement the new components and patterns.
          </>,
        ]}
      />

      <CaseStudySection
        title="Conducting design audits"
        paragraphs={[
          "In October, our team began conducting design audits with product team designers to better understand the effectiveness of our components. It was essential for us to identify both what was working well and areas that needed improvement. I took charge of assessing the use of slots within our library, as well as analyzing how the data grid component was being implemented in various products.",
          "The audit process involved 1:1 meetings with designers, where I gathered insights into their workflows, pain points, positive feedback, and suggestions for system improvements. This collaborative effort provided valuable input for refining our design system.",
        ]}
      />
    </div>
  );
}

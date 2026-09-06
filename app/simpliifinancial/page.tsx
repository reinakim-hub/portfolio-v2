import type { Metadata } from "next";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyFigure from "@/components/CaseStudyFigure";
import ImageGallery from "@/components/ImageGallery";
import SectionLabel from "@/components/SectionLabel";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "Simplii Financial — Reina Kim",
};

export default function SimpliiFinancial() {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-16 px-6 py-16 sm:px-0">
      <CaseStudyHero
        subtitle={
          "Building trust and financial confidence\nfor newcomers to Canada"
        }
        title={"Simplii Financial\nUX Design Intervention"}
        paragraphs={[
          <>
            This was a seven-week senior-level project where my team and I
            were tasked with designing a new feature for Simplii
            Financial&rsquo;s new customers, particularly newcomers to
            Canada. Our goal was to{" "}
            <strong className="font-semibold text-ink">
              identify a problem space within the existing website and create
              a solution
            </strong>{" "}
            that simplifies the onboarding process for these users.
          </>,
          <>
            My primary role was in{" "}
            <strong className="font-semibold text-ink">
              content strategy
            </strong>
            , focusing on{" "}
            <strong className="font-semibold text-ink">
              content layout
            </strong>{" "}
            and{" "}
            <strong className="font-semibold text-ink">
              interaction design
            </strong>
            . I researched and implemented UI features to ensure clear
            information delivery and increased engagement through effective
            call-to-action elements, benefiting all stakeholders.
          </>,
        ]}
        meta={[
          { icon: "🏢", label: "Conceptual Client", value: "Simplii Financial" },
          { icon: "💪", label: "Team", value: "Chris, Muhan, Vito, Andy, Kristen" },
          { icon: "📅", label: "Year", value: "Oct 2023 - Dec 2023" },
          { icon: "🔧", label: "Tools", value: "Figma, Adobe AE, Google Docs" },
        ]}
      />

      <CaseStudyFigure
        src="/images/simplii-hero.webp"
        alt="Simplii Financial onboarding microsite shown on laptop and phone"
        width={2500}
        height={1700}
      />

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Identifying the problem space
        </h2>
        <div className="mt-4 space-y-4 text-body">
          <p>
            Through research, we discovered that{" "}
            <strong className="font-semibold text-ink">
              many new Canadian immigrants, particularly in their first two
              years, struggle with low credit visibility, which hinders their
              ability to build financial security.
            </strong>{" "}
            <span className="underline">(Statistics Canada, 2023)</span> The
            complexities of the Canadian banking system further add to these
            challenges, leaving newcomers feeling overwhelmed and unable to
            establish credit histories.{" "}
            <span className="underline">(Scotiabank, 2022)</span>
          </p>
          <p>
            Given that nearly 1 in 5 people in Canada are immigrants, our
            team recognized this as a key problem area where financial
            institutions could develop digital solutions to benefit both
            newcomers and themselves.
          </p>
          <p>
            To present this opportunity, our team created a 1-minute video to
            pitch the problem space to teaching staff and invited UX
            designers from the industry.
          </p>
        </div>
        <div className="mt-8">
          <ImageGallery
            images={[
              {
                src: "/images/simplii-problem-walking.gif",
                alt: "Newcomers walking through an airport with luggage",
                width: 854,
                height: 480,
              },
              {
                src: "/images/simplii-problem-stat.gif",
                alt: "Statistic showing the projected number of new immigrants to Canada",
                width: 1280,
                height: 720,
              },
            ]}
          />
        </div>
      </section>

      <section className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-12">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            Selecting the client
          </h2>
          <div className="mt-4 space-y-4 text-body">
            <p>
              Simplii Financial allows newcomers to open a bank account even
              before arriving in Canada. We identified this as an opportunity
              to introduce a digital solution that offers accessible
              resources, helping immigrants better prepare for the financial
              landscape ahead of their arrival.
            </p>
            <p>
              Additionally, Simplii Financial&rsquo;s target audience aligns
              with the majority of immigrants, who primarily fall within the
              20-34 age demographic.
            </p>
          </div>
        </div>
        <CaseStudyFigure
          src="/images/simplii-selecting-client.webp"
          alt="Simplii Financial mobile app and debit card"
          width={2240}
          height={2800}
        />
      </section>

      <PullQuote>
        How might Simplii Financial create a compelling experience for the
        working group of immigrants to help them to build financial
        confidence and security in Canada?
      </PullQuote>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Value to stakeholders
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <SectionLabel size="sm">Business value</SectionLabel>
            <p className="mt-2 text-body">
              This intervention contributes to the business by educating
              newcomers about the Canadian financial system, showcasing
              expertise, and{" "}
              <strong className="font-semibold text-ink">
                building trust with potential customers
              </strong>
              . It also acts as a compelling tool to{" "}
              <strong className="font-semibold text-ink">
                attract new clients
              </strong>
              , encouraging them to open an account and start their credit
              journey with Simplii Financial.
            </p>
          </div>
          <div>
            <SectionLabel size="sm">Customer value</SectionLabel>
            <p className="mt-2 text-body">
              Newcomers gain valuable insights into the Canadian financial
              system,{" "}
              <strong className="font-semibold text-ink">
                enabling them to make more informed financial decisions
              </strong>
              . The solution also provides a seamless entry point for
              choosing Simplii Financial as their primary bank, allowing them
              to open an account before even arriving in Canada.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Design sprints
        </h2>
        <p className="mt-4 text-body">
          We utilized{" "}
          <a
            href="https://www.gv.com/sprint/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            The Design Sprint
          </a>{" "}
          method from Google Ventures, which involved mapping out the
          challenge, sketching ideas, creating a mock prototype, and
          conducting user testing to refine the solution based on feedback.
        </p>

        <div className="mt-8">
          <SectionLabel>Mapping the challenge</SectionLabel>
        </div>
        <div className="mt-4">
          <CaseStudyFigure
            src="/images/simplii-mapping-challenge.webp"
            alt="Diagram mapping the immigrant and Simplii Financial journey to the intervention goal"
            width={2500}
            height={720}
            imageBg="bg-white"
          />
        </div>

        <div className="mt-8">
          <SectionLabel>Sketching prototype ideas</SectionLabel>
        </div>
        <div className="mt-4">
          <ImageGallery
            images={[
              {
                src: "/images/simplii-sketch-notes.webp",
                alt: "Sticky notes exploring storytelling, chunking, toggling, and consequences concepts",
                width: 1376,
                height: 877,
              },
              {
                src: "/images/simplii-sketch-corkboard.webp",
                alt: "Hand-drawn sketch of a knowledge bank concept with archive and improvement sticky notes",
                width: 2304,
                height: 2320,
              },
            ]}
          />
        </div>

        <div className="mt-8">
          <SectionLabel>Creating a mock prototype on Figma</SectionLabel>
        </div>
        <div className="mt-4">
          <ImageGallery
            images={[
              {
                src: "/images/simplii-credit-system-demo-2.gif",
                alt: "Early Figma prototype walkthrough of the credit system education flow",
                width: 1280,
                height: 720,
              },
              {
                src: "/images/simplii-5components-demo.gif",
                alt: "Prototype screen asking what are the 5 components of credit scores",
                width: 2208,
                height: 1236,
              },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Participants didn&rsquo;t like it!
        </h2>
        <div className="mt-4 space-y-4 text-body">
          <p>
            In our user testing with nine recent newcomers to Canada,
            participants found the initial prototype ineffective. They felt
            the information was{" "}
            <strong className="font-semibold text-ink">
              too shallow
            </strong>
            , the interactions were{" "}
            <strong className="font-semibold text-ink">
              difficult to navigate
            </strong>
            , and the design&rsquo;s disconnect from Simplii Financial&rsquo;s
            brand{" "}
            <strong className="font-semibold text-ink">
              raised concerns about trustworthiness
            </strong>
            .
          </p>
          <p>
            However, many participants resonated with the problem space and
            provided valuable insights into the type of information they
            would prefer to see in this experience.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          So we went back and pivoted
        </h2>
        <p className="mt-4 text-body">
          A major pivot we made was integrating the new content directly into
          Simplii Financial&rsquo;s existing website, rather than creating a
          separate microsite. This decision enhanced trust, a critical factor
          for financial institutions.
        </p>

        <div className="my-8">
          <CaseStudyFigure
            src="/images/simplii-styleguide.webp"
            alt="Simplii Financial style guide showing brand colours, text styles, and image work"
            width={2500}
            height={906}
            imageBg="bg-white"
          />
        </div>

        <p className="text-body">
          As the lead for content strategy, I was responsible for addressing
          the issue of shallow information by diving deeper and ensuring the
          clear delivery of the now more detailed content. My focus was on
          identifying the essential information newcomers need and
          structuring the content around key pain points, such as
          unfamiliarity with credit systems and financial tools.
        </p>

        <div className="my-8">
          <CaseStudyFigure
            src="/images/simplii-feedback-row1.webp"
            alt="Prototype screens with feedback annotations for landing page, credit system, and credit score component"
            width={2500}
            height={867}
            imageBg="bg-white"
          />
        </div>

        <div className="my-8">
          <CaseStudyFigure
            src="/images/simplii-feedback-row2.webp"
            alt="Prototype screens with feedback annotations for credit decisions, testimonies, and here to help sections"
            width={2500}
            height={865}
            imageBg="bg-white"
          />
        </div>

        <p className="text-body">
          I researched interactive UI elements to help simplify complex
          financial concepts, making it easier for users to engage with and
          absorb the newly incorporated content.
        </p>
        <div className="mt-8">
          <ImageGallery
            images={[
              {
                src: "/images/simplii-credit-system-demo.gif",
                alt: "Interactive credit system education page walkthrough",
                width: 2208,
                height: 1236,
              },
              {
                src: "/images/simplii-gradient-demo.gif",
                alt: "Interactive credit report page with a colourful gradient background",
                width: 1280,
                height: 720,
              },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Understanding the real user needs
        </h2>
        <div className="mt-4 space-y-4 text-body">
          <p>
            From the user testing, the team recognized the importance of
            making this intervention multi-language friendly. We identified
            the most common languages spoken by Canadian newcomers and
            developed a prototype to showcase the design&rsquo;s flexibility
            in accommodating different languages.
          </p>
          <p>
            The responsiveness was also an important factor. Research showed
            that our target age demographic prefers to bank via mobile
            devices, so we created a mobile prototype to visualize this
            experience.
          </p>
        </div>
        <div className="mt-8">
          <ImageGallery
            images={[
              {
                src: "/images/simplii-language-demo.gif",
                alt: "Language switcher demo showing English, Chinese, French, Korean, Arabic, Tagalog, and Farsi",
                width: 1280,
                height: 720,
              },
              {
                src: "/images/simplii-mobile-demo.gif",
                alt: "Mobile prototype of the New to Canada onboarding experience",
                width: 1920,
                height: 1080,
              },
            ]}
          />
        </div>
        <div className="mt-8 space-y-4 text-body">
          <p>
            The &ldquo;Simplii Stories&rdquo; section in our initial
            prototype was well received by user testing participants. It was
            designed to showcase stories of Canadian newcomers and their
            financial journeys.
          </p>
          <p>
            We expanded on this idea to foster relatability and empathy,
            providing valuable insights for potential customers of Simplii
            Financial.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Reiterating value to both stakeholders
        </h2>
        <p className="mt-4 text-body">
          As the content design lead, I aimed to implement call-to-action UI
          elements throughout the page to enhance the business value of this
          design intervention. This approach not only supports Simplii
          Financial in promoting its offerings to newcomers but also
          provides an accessible pathway for new customers to explore and
          engage with these services, making it easier for them to start
          banking with Simplii Financial.
        </p>
        <div className="mt-8">
          <CaseStudyFigure
            src="/images/simplii-cta-getstarted.webp"
            alt="Want to get started call-to-action panel showing Simplii Financial products"
            width={2500}
            height={957}
            imageBg="bg-white"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-extrabold text-ink">
          <span aria-hidden="true">✨ </span>Final presentation and key
          takeaways
        </h2>
        <p className="mt-4 text-body">
          Our final presentation was very well received by the teaching team
          and industry UX designers who were invited as critics. They were
          particularly impressed with how clearly we presented the problem
          space and found our design intervention highly appropriate. The
          multi-language support stood out as a key feature that resonated
          with the audience, as it effectively addressed the needs of our
          target users.
        </p>
        <div className="mt-8">
          <CaseStudyFigure
            src="/images/simplii-final-presentation.webp"
            alt="The team presenting the Simplii Financial project to an audience"
            width={2500}
            height={3333}
          />
        </div>
      </section>

      <div>
        <h2 className="text-2xl font-extrabold text-ink">
          <span aria-hidden="true">💪 </span>The team
        </h2>
        <div className="mt-8">
          <ImageGallery
            images={[
              {
                src: "/images/simplii-whiteboard-1.webp",
                alt: "The team presenting long-term goals at a whiteboard",
                width: 2500,
                height: 3338,
              },
              {
                src: "/images/simplii-whiteboard-2.webp",
                alt: "Two team members mapping the challenge on a whiteboard",
                width: 1834,
                height: 1357,
              },
              {
                src: "/images/simplii-whiteboard-3.webp",
                alt: "The team discussing goals around a table with a whiteboard",
                width: 1838,
                height: 1371,
              },
              {
                src: "/images/simplii-team-tree-1.webp",
                alt: "The team posing in front of a lit Christmas tree outside a gallery",
                width: 1080,
                height: 961,
              },
              {
                src: "/images/simplii-team-tree-2.webp",
                alt: "The team taking a group selfie in front of a Christmas tree",
                width: 1080,
                height: 1440,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import CaseStudyHero from "@/components/CaseStudyHero";
import ImageGallery from "@/components/ImageGallery";
import SectionLabel from "@/components/SectionLabel";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "SSFB — Reina Kim",
};

export default function Ssfb() {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-16 px-6 py-16 sm:px-0">
      <CaseStudyHero
        subtitle="Creating a unique digital experience for music lovers"
        title="Strange Sounds from Beyond: Brand and Microsite Design"
        paragraphs={[
          <>
            This five-week school project was centered around developing a
            visually engaging and interactive microsite for &ldquo;Strange
            Sounds from Beyond,&rdquo; an avant-garde music festival held in
            Amsterdam. The festival attracts a niche audience with a love for
            underground and experimental music. The challenge was to{" "}
            <strong className="font-semibold text-ink">
              create a compelling microsite experience that incorporate both
              visual and auditorial concepts
            </strong>{" "}
            that are appealing for visitors who may not be familiar with the
            festival&rsquo;s style or artists.
          </>,
          <>
            As the primary{" "}
            <strong className="font-semibold text-ink">
              interaction designer
            </strong>
            , I led the{" "}
            <strong className="font-semibold text-ink">
              conceptualization and implementation of the interactive UI
              features
            </strong>
            . I focused on creating a user journey that allowed music
            enthusiasts to explore the festival&rsquo;s unique identity while
            balancing an engaging aesthetic with functional usability.
          </>,
        ]}
        meta={[
          { icon: "🏢", label: "Reference Client", value: "Strange Sounds from Beyond" },
          { icon: "💪", label: "Team", value: "Chris, Vito, Andy, Kristen" },
          { icon: "📅", label: "Year", value: "Sep 2023 - Oct 2023" },
          { icon: "🔧", label: "Tools", value: "Figma, Adobe AE" },
        ]}
      />

      <ImageGallery
        images={[
          {
            src: "/images/ssfb-hero-landing.gif",
            alt: "Green landing screen reading this is an Amsterdam-based music festival",
            width: 1280,
            height: 720,
          },
          {
            src: "/images/ssfb-hero-nav.gif",
            alt: "Black landing screen with a glowing green square and listen to the strange sounds prompt",
            width: 1280,
            height: 720,
          },
          {
            src: "/images/ssfb-hero.gif",
            alt: "Dark screen with an ENTER button over African Acid Is The Future text",
            width: 1280,
            height: 720,
          },
          {
            src: "/images/ssfb-hero-active.gif",
            alt: "Bright green African Acid Is The Future screen with a track selected",
            width: 1280,
            height: 720,
          },
        ]}
      />

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Understanding brand foundations
        </h2>
        <p className="mt-4 text-body">
          The biggest challenge of this project was developing a festival
          brand that was adaptable and translatable across various physical
          mediums. To guide our approach, our team referred to several key
          professional resources:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
          <li>
            Experience Design: A Framework for Integrating Brand, Experience,
            and Value{" "}
            <span className="italic">
              by Patrick Newbery and Kevin Farnham
            </span>
          </li>
          <li>
            Laws of UX: Using Psychology to Design Better Products and
            Services <span className="italic">by Jon Yablonski</span>
          </li>
          <li>
            Graphic Design The New Basics{" "}
            <span className="italic">by Ellen Lupton and Jennifer Cole Phillips</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Setting the visual language
        </h2>
        <p className="mt-4 text-body">
          Our team went through several iterations to solidify the visual
          language with the teaching team acting as the client. We started
          with the festival poster as our primary medium, focusing on
          ensuring the design&rsquo;s responsiveness, the festival&rsquo;s
          identity, and the emotional impact we aimed to convey.
        </p>

        <div className="mt-8">
          <ImageGallery
            images={[
              { src: "/images/ssfb-poster-1.webp", alt: "Blue festival poster with typographic layout", width: 612, height: 792 },
              { src: "/images/ssfb-poster-2.webp", alt: "Blue festival poster with a portrait photo", width: 612, height: 792 },
              { src: "/images/ssfb-poster-3.webp", alt: "Green festival poster with black geometric shapes", width: 612, height: 792 },
              { src: "/images/ssfb-poster-4.webp", alt: "Black and green festival poster with a portrait photo", width: 612, height: 792 },
            ]}
          />
        </div>

        <div className="mt-8 space-y-4 text-body">
          <p>
            This is the final visual identity our team landed with. We
            designed so that the{" "}
            <strong className="font-semibold text-ink">
              Geometric shapes that frame elements
            </strong>{" "}
            and the elements breaking out of grid structure to be the
            transferable qualities across different design mediums.
          </p>
          <p>
            Degular is a versatile font with bold stroke width and curvature.
            We wanted to use bold, rounded typeface that could fill in the
            space within our frames. To contrast the boldness of Degular, we
            used JetBrains Mono, to maintain legibility to balance the two
            typefaces.
          </p>
          <p>
            As we wanted to use typography and framing shapes as our focal
            point, we decided to turn our images greyscale and added grain
            and noise. This way, the images blend into the composition
            without taking away from the typography.
          </p>
          <p>
            We used vibrant green to capture attention and highlight parts of
            the composition. White and black is used for a cleaner aesthetic
            with the vibrant green.
          </p>
        </div>

        <div className="mt-8">
          <ImageGallery
            images={[
              { src: "/images/ssfb-collage.webp", alt: "Green duotone photo collage with festival date and location details", width: 612, height: 792 },
              { src: "/images/ssfb-banner-street.webp", alt: "Street banners reading See Hear Feel and Strange Sounds From Beyond in Amsterdam", width: 1091, height: 696 },
              { src: "/images/ssfb-banner-pole.webp", alt: "Street banners reading Strange Sounds From Beyond and June 22 2019", width: 603, height: 696 },
              { src: "/images/ssfb-banner-museum.webp", alt: "Strange Sounds From Beyond banner mockup on the Rijksmuseum facade", width: 1127, height: 698 },
            ]}
          />
        </div>
      </section>

      <PullQuote>
        How might we provide compelling experience with sound interaction in
        order to inspire site visitors unfamiliar with the festival to attend
        the festival in person?
      </PullQuote>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Crafting the microsite experience
        </h2>
        <div className="mt-4 space-y-4 text-body">
          <p>
            After establishing the visual language and framing the design
            problem for our microsite, we shifted our focus to exploring
            interactive UI elements. This was particularly challenging
            because our client heavily relied on conveying auditory
            experiences, which are difficult to translate into a visual
            digital medium.
          </p>
          <p>
            We carefully planned this out alongside the content strategy to
            determine the types of screens needed to effectively guide the
            user journey.
          </p>
        </div>

        <div className="mt-8">
          <SectionLabel>Content strategy</SectionLabel>
        </div>
        <div className="mt-4">
          <Image
            src="/images/ssfb-content-strategy.webp"
            alt="Content strategy flow diagram from landing page to exploratory page, artist music page, and ticket page"
            width={1760}
            height={629}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="mt-8">
          <SectionLabel>Interactive UI exploration</SectionLabel>
        </div>
        <div className="mt-4">
          <ImageGallery
            images={[
              { src: "/images/ssfb-ui-explore-bar.gif", alt: "Green noise-textured bar exploration screen", width: 854, height: 480 },
              { src: "/images/ssfb-ui-explore-logo.gif", alt: "Outlined SSFB event music logo animation", width: 854, height: 480 },
              { src: "/images/ssfb-ui-explore-eq.gif", alt: "Explore strange sounds equalizer bar visualization", width: 854, height: 480 },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Pushing the design forward
        </h2>
        <div className="mt-4 space-y-4 text-body">
          <p>
            My suggestion to intentionally hide the artist information and
            guide users solely through sound received a lot of positive
            feedback. We aimed to make the music the focal point of the
            experience. By deliberately concealing the artists&rsquo;
            information in the selection menu, we allowed users to navigate
            purely based on the sounds created by each artist.
          </p>
          <p>
            This positive feedback led to me taking on the role of lead
            interaction designer for the main homepage. The following design
            decisions were made and implemented:
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <Image
            src="/images/ssfb-annotation-landing.webp"
            alt="Annotated landing page explaining the background noise transition to festival music"
            width={1824}
            height={586}
            className="h-auto w-full rounded-tile object-contain"
          />
          <Image
            src="/images/ssfb-annotation-enter-nav.webp"
            alt="Annotated screens explaining the hover-to-reveal artist name interaction and the sound sample navigation bar"
            width={1829}
            height={754}
            className="h-auto w-full rounded-tile object-contain"
          />
          <Image
            src="/images/ssfb-annotation-tracks.webp"
            alt="Annotated screen explaining the track selection squares and back button"
            width={1824}
            height={586}
            className="h-auto w-full rounded-tile object-contain"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Balancing emotion with functionality
        </h2>
        <div className="mt-4 space-y-4 text-body">
          <p>
            Our team recognized that the auditory-based navigation could
            present challenges for users. Returning users might seek a
            quicker way to navigate to specific artists or purchase tickets,
            and the site could be confusing for users without sound access.
          </p>
          <p>
            In other words, we realized that the emotional experience needed
            to be balanced with functional features to improve usability. As
            a result, we implemented options for users to directly access
            artist information and purchase tickets easily.
          </p>
        </div>
        <div className="mt-8">
          <Image
            src="/images/ssfb-annotation-nav-returning.webp"
            alt="Annotated screen explaining the functional navigation bar for returning visitors"
            width={1829}
            height={581}
            className="h-auto w-full rounded-tile object-contain"
          />
        </div>
        <div className="mt-8">
          <ImageGallery
            images={[
              { src: "/images/ssfb-artist-list.webp", alt: "Artist selection list with Lulu & Mata Hari highlighted and album art shown", width: 1920, height: 1080 },
              { src: "/images/ssfb-ticket-purchase.webp", alt: "Ticket purchase screen with price, quantity, and payment fields", width: 1042, height: 585 },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-extrabold text-ink">
          <span aria-hidden="true">✨ </span>Reflection
        </h2>
        <p className="mt-4 text-body">
          This project provided me with a deeper understanding of the
          challenges in creating a digital experience that balances emotional
          engagement with functional usability. Designing for &ldquo;Strange
          Sounds from Beyond&rdquo; required me to push creative boundaries,
          incorporating auditory elements into a visually driven interface.
          As the lead interaction designer, I refined my ability to craft an
          immersive user journey while addressing practical needs for
          accessibility and ease of use. Beyond design, this experience
          enhanced my critical thinking, task management, and ability to
          clearly communicate and present ideas.
        </p>
      </section>
    </div>
  );
}

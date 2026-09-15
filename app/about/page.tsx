import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactLinks from "@/components/ContactLinks";
import EyebrowLabel from "@/components/EyebrowLabel";
import Reveal from "@/components/Reveal";
import TwoColumnLayout from "@/components/TwoColumnLayout";

export const metadata: Metadata = {
  title: "About — Reina Kim",
};

export default function About() {
  return (
    <TwoColumnLayout
      left={
        <>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">
              About
            </h1>
          </div>

          {/* max-w caps the portrait's own size so the sidebar's total
              height stays predictable — the sidebar column is a fraction
              of viewport WIDTH, unrelated to viewport height, so an
              uncapped w-full image could grow taller than any fixed
              min-height sticky threshold on a wide-but-short window.
              Plain, non-interactive image: no link, button, role, or
              hover/focus treatment — clicking or hovering it does nothing,
              so it shouldn't look like it does. (Previously shared
              `.hover-zoom` with the homepage thumbnails; deliberately
              removed since this photo has no click destination.) */}
          <div className="max-w-[15rem] border border-rule overflow-hidden">
            <Image
              src="/images/about-photo.webp"
              alt="Reina Kim standing in front of a floor-to-ceiling window overlooking a city skyline"
              width={800}
              height={1200}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <ContactLinks />
        </>
      }
      right={
        <>
          <Reveal className="max-w-3xl">
            <p className="font-heading text-2xl leading-snug font-bold text-ink sm:text-3xl">
              Hi, I&rsquo;m Reina, a UX designer based in Vancouver.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Outside of work, I enjoy gaming, singing, and recording songs.
              Lately, I&rsquo;ve also been building small games with AI,
              turning ideas into something I can actually play.
            </p>
          </Reveal>

          <section className="mt-16">
            <div className="border-t border-rule pt-5">
              <EyebrowLabel>Outside of work</EyebrowLabel>
            </div>

            <Reveal>
              <div className="mt-10 grid grid-cols-1 gap-8 @min-[560px]:grid-cols-2">
                <div>
                  <h3 className="text-base font-bold text-ink">
                    Gaming
                  </h3>
                  <p className="mt-2 text-body">
                    I&rsquo;m an avid gamer, and I like paying attention to
                    how different games design their interfaces.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-ink">
                    Music
                  </h3>
                  <p className="mt-2 text-body">
                    I enjoy singing and recording songs in my spare time.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-ink">
                    My dog
                  </h3>
                  <p className="mt-2 text-body">
                    I have a dog, a Norfolk terrier.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-ink">
                    AI experiments
                  </h3>
                  <p className="mt-2 text-body">
                    I&rsquo;ve been building small games with AI — you can
                    see some of them in my{" "}
                    <Link
                      href="/lab"
                      className="text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      AI Lab
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="mt-20">
            <div className="border-t border-rule pt-5">
              <EyebrowLabel>Background</EyebrowLabel>
            </div>

            <Reveal>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-body">
                I completed a UX Design internship at SAP in May 2026, and a
                UX Design co-op at Nokia in December 2024. Before that, I
                worked in customer service at a local credit union.
              </p>
              <a
                href="/ReinaKim_Resume_2026_Sep.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-base font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                View Resume ↗
              </a>
            </Reveal>
          </section>
        </>
      }
    />
  );
}

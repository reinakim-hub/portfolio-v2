import type { Metadata } from "next";
import AboutPhotoCollage from "@/components/AboutPhotoCollage";
import ContactLinks from "@/components/ContactLinks";
import EyebrowLabel from "@/components/EyebrowLabel";
import Reveal from "@/components/Reveal";
import ProseColumn from "@/components/ProseColumn";
import { SITE_GRID_COLUMNS } from "@/components/siteGrid";

export const metadata: Metadata = {
  title: "About — Reina Kim",
};

export default function About() {
  return (
    <div className={`about-layout page-gutter grid grid-cols-1 ${SITE_GRID_COLUMNS}`}>
      <aside className="about-photo-rail" aria-label="Personal photos">
        <AboutPhotoCollage side="left" />
      </aside>
      <div className="about-center">
        <ProseColumn className="about-copy">
          <Reveal>
            <h1 className="font-heading text-xl leading-snug font-medium text-ink">
              Hi, I&rsquo;m Reina, a UX designer based in Vancouver.
            </h1>
            <p className="copy-body mt-4 text-body">
              I enjoy designing interfaces that feel intuitive and look
              engaging. I recently completed my UX Design internship at SAP
              and am open to new opportunities.
            </p>
          </Reveal>

          <section className="mt-16" aria-labelledby="about-background">
            <div className="border-t border-rule pt-5">
              <EyebrowLabel quiet>
                <span id="about-background">Background</span>
              </EyebrowLabel>
            </div>
            <Reveal className="mt-6">
              <p className="copy-body text-body">
                I graduated from Simon Fraser University in June 2025 with a
                B.Sc. in Interactive Arts and Technology, concentrating in
                Design. Through academic projects, I explored interaction
                design, user research, and prototyping.
              </p>
              <p className="copy-body mt-4 text-body">
                While studying, I also worked in customer service at a local
                credit union, helping customers with their everyday banking
                transactions and financial services.
              </p>
            </Reveal>
          </section>

          <section className="mt-16" aria-labelledby="about-beyond-design">
            <div className="border-t border-rule pt-5">
              <EyebrowLabel quiet>
                <span id="about-beyond-design">Beyond design</span>
              </EyebrowLabel>
            </div>
            <Reveal className="mt-6">
              <p className="copy-body text-body">
                Outside of design, I love spending time with my dog and
                singing, and I&rsquo;m currently learning to play pickleball.
              </p>
              <p className="copy-body mt-4 text-body">
                I&rsquo;m also an avid gamer with an interest in game design
                and development. Lately, I&rsquo;ve been experimenting with
                building small games using AI.
              </p>
            </Reveal>
          </section>
          <AboutPhotoCollage side="mobile" />
          <div className="about-contacts"><ContactLinks /></div>
        </ProseColumn>
      </div>
      <aside className="about-photo-rail" aria-label="More personal photos">
        <AboutPhotoCollage side="right" />
      </aside>
    </div>
  );
}

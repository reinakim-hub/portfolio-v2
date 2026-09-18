import type { Metadata } from "next";
import ContactLinks from "@/components/ContactLinks";
import EyebrowLabel from "@/components/EyebrowLabel";
import ExperimentCard from "@/components/ExperimentCard";
import Reveal from "@/components/Reveal";
import ProseColumn from "@/components/ProseColumn";
import TwoColumnLayout from "@/components/TwoColumnLayout";

export const metadata: Metadata = {
  title: "AI Lab — Reina Kim",
};

export default function Lab() {
  return (
    <TwoColumnLayout
      left={
        <>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">
              AI Lab
            </h1>
            <p className="copy-body mt-3 text-body">
              Turning small ideas into working prototypes with AI.
            </p>
          </div>

          <div className="xl:mt-auto">
            <ContactLinks />
          </div>
        </>
      }
      right={
        <ProseColumn>
          <Reveal>
            <p className="font-heading text-2xl leading-snug font-bold text-ink sm:text-3xl">
              AI-assisted experiments and working prototypes
            </p>
            <div className="copy-body mt-4 space-y-4 text-muted">
              <p>
                This isn&rsquo;t a game gallery — it&rsquo;s a space where I
                use AI tools like Claude Code and MCP to explore design and
                prototyping ideas faster than I could on my own.
              </p>
              <p>
                Some of these are live and playable, others are still in
                progress. All of them are real prototypes, built and shipped,
                not just concepts.
              </p>
            </div>
          </Reveal>

          <section className="mt-16">
            <div className="border-t border-rule pt-5">
              <EyebrowLabel>Experiments</EyebrowLabel>
            </div>

            <div className="mt-10 flex flex-col divide-y divide-rule">
              <Reveal>
                <ExperimentCard
                  title="Fruit Smash"
                  description="A fast, juicy match-and-smash game prototyped with AI-assisted coding."
                  status="live"
                  href="https://fruit-smash-beige.vercel.app/"
                />
              </Reveal>
              <Reveal>
                <ExperimentCard
                  title="Apple Merge"
                  description="A merge puzzle experiment, currently in progress."
                  status="soon"
                />
              </Reveal>
              <Reveal>
                <ExperimentCard
                  title="Drink Merge"
                  description="A drink-themed merge game, currently in progress."
                  status="soon"
                />
              </Reveal>
            </div>
          </section>
        </ProseColumn>
      }
    />
  );
}

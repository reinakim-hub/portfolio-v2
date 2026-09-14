import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import ExperimentCard from "@/components/ExperimentCard";

export const metadata: Metadata = {
  title: "AI Lab — Reina Kim",
};

export default function Lab() {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-16 px-6 py-16 sm:px-0">
      <div className="max-w-xl">
        <SectionLabel>AI Lab</SectionLabel>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          AI-assisted experiments and working prototypes
        </h1>
        <div className="mt-6 space-y-4 text-body">
          <p>
            This isn&rsquo;t a game gallery — it&rsquo;s a space where I use
            AI tools like Claude Code and MCP to explore design and
            prototyping ideas faster than I could on my own.
          </p>
          <p>
            Some of these are live and playable, others are still in
            progress. All of them are real prototypes, built and shipped, not
            just concepts.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <ExperimentCard
          title="Fruit Smash"
          description="A fast, juicy match-and-smash game prototyped with AI-assisted coding."
          status="live"
          href="https://fruit-smash-beige.vercel.app/"
        />
        <ExperimentCard
          title="Apple Merge"
          description="A merge puzzle experiment, currently in progress."
          status="soon"
        />
        <ExperimentCard
          title="Drink Merge"
          description="A drink-themed merge game, currently in progress."
          status="soon"
        />
      </div>
    </div>
  );
}

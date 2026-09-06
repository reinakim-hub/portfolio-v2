import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Reina Kim",
};

export default function About() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16 sm:flex-row sm:items-start sm:gap-16 sm:px-0">
      <div className="mx-auto w-full max-w-xs shrink-0 overflow-hidden rounded-t-full sm:mx-0">
        <Image
          src="/images/about-photo.webp"
          alt="Reina Kim standing in front of a floor-to-ceiling window overlooking a city skyline"
          width={800}
          height={1200}
          className="h-auto w-full object-cover"
          priority
        />
      </div>

      <div className="max-w-xl">
        <p className="text-2xl" aria-hidden="true">
          ✨
        </p>
        <h1 className="mt-4 text-2xl font-extrabold leading-snug text-ink sm:text-3xl">
          I am a dedicated UX Designer with a passion for creating intuitive
          and visually engaging user interfaces.
        </h1>
        <div className="mt-6 space-y-4 text-body">
          <p>
            In addition to design, I have a background in banking services,
            where I worked as a customer service representative at a local
            credit union, assisting customers with financial transactions and
            services.
          </p>
          <p>
            I also have a strong interest in game design and development. As
            an avid gamer, I enjoy analyzing interface design techniques
            across various games.
          </p>
          <p>
            I recently completed my UX Design Internship at SAP and am now
            open to job opportunities!
          </p>
          <p>
            Feel free to reach out to me at{" "}
            <a
              href="mailto:reinakim1221@gmail.com"
              className="text-ink underline hover:no-underline"
            >
              reinakim1221@gmail.com
            </a>
            . I&rsquo;d love to share more about my passion for UX design!
          </p>
        </div>
      </div>
    </div>
  );
}

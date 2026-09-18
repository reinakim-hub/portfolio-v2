"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";

const photos = [
  { suffix: "_04", alt: "Reina by a window overlooking the city", width: 4284, height: 5712 },
  { suffix: "_11", alt: "Reina celebrating graduation in front of flowering bushes", width: 4284, height: 5712 },
  { suffix: "", alt: "A dog enjoying the grass on a sunny day", width: 1050, height: 1400 },
  { suffix: "_01", alt: "Reina standing beneath red torii gates", width: 3024, height: 4032 },
  { suffix: "_08", alt: "A colourful illustrated jigsaw puzzle on a table", width: 5712, height: 4284, fill: true },
  { suffix: "_10", alt: "Reina holding a blue booklet", width: 2316, height: 3088 },
  { suffix: "_05", alt: "Reina wearing a cap at a cafe", width: 3024, height: 2419, fill: true },
  { suffix: "_07", alt: "A fluffy dog resting on a blanket", width: 4284, height: 5712 },
  { suffix: "_02", alt: "Reina with arms raised on a train station platform", width: 4284, height: 5712 },
  { suffix: "_03", alt: "Reina sitting beside flowering hydrangeas", width: 4284, height: 5712 },
  { suffix: "_06", alt: "Reina holding a paddle on an indoor court", width: 3024, height: 4032 },
  { suffix: "_09", alt: "Reina taking a selfie with her dog", width: 2316, height: 3088 },
];

const placements = {
  left: [[1, 1, 5], [2, 1, 4], [1, 6, 4], [2, 5, 4], [1, 10, 3], [2, 9, 4]],
  right: [[1, 1, 3], [2, 1, 4], [1, 4, 5], [2, 5, 4], [1, 9, 4], [2, 9, 4]],
};

/** Original photos stay intact; only their presentation is transformed. */
export default function AboutPhotoCollage({ side }: { side: "left" | "right" | "mobile" }) {
  const collageRef = useRef<HTMLDivElement>(null);
  const selection = side === "mobile" ? photos : photos.slice(side === "left" ? 0 : 6, side === "left" ? 6 : 12);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    collageRef.current?.querySelectorAll(".about-photo").forEach((photo) => observer.observe(photo));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={collageRef} className={`about-collage about-collage--${side}`}>
      <noscript><style>{".about-photo { animation: none; }"}</style></noscript>
      {selection.map((photo, index) => (
        <div
          key={photo.suffix}
          className={`about-photo${photo.fill ? " about-photo--fill" : ""}`}
          style={{
            "--photo-delay": `${120 + index * 65}ms`,
            ...(side !== "mobile" && {
              "--photo-column": placements[side][index][0],
              "--photo-row": placements[side][index][1],
              "--photo-span": placements[side][index][2],
            }),
          } as CSSProperties}
        >
          <Image
            src={`/images/KakaoTalk_20260918_062017726${photo.suffix}.jpg`}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1280px) 240px, (min-width: 640px) 200px, 45vw"
            className="about-photo-image"
          />
        </div>
      ))}
    </div>
  );
}

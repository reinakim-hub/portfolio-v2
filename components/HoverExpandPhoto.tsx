"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const REVEAL_DURATION = 500;

// Reserve the full illustration on desktop; touch users can tap to toggle.
export default function HoverExpandPhoto({
  src,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [occupied, setOccupied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => () => animationRef.current?.cancel(), []);

  function reveal(open: boolean) {
    if (open === expanded) return;
    setExpanded(open);
    const button = buttonRef.current;
    if (!button) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationRef.current?.cancel();
      animationRef.current = null;
      setOccupied(open);
      return;
    }
    setOccupied(true);
    if (!animationRef.current) {
      const crop = "inset(40.75% 24.78095238% var(--portrait-crop-bottom) 27.6% round 999px)";
      const animation = button.animate([
        { offset: 0, width: "calc(var(--portrait-idle-size) * 2.1)", transform: "translate(-27.6%, -40.75%)", clipPath: crop, easing: "cubic-bezier(.2, 1.45, .35, 1)" },
        // Independent property tracks: move for 300ms, reveal from 200ms.
        { offset: 0.4, clipPath: crop, easing: "cubic-bezier(.22, 1, .36, 1)" },
        { offset: 0.6, width: "100%", transform: "translate(0, 0)" },
        { offset: 1, width: "100%", transform: "translate(0, 0)", clipPath: "inset(0 0 0 0 round 0)" },
      ], { duration: REVEAL_DURATION, fill: "both" });
      animation.pause();
      animation.currentTime = expanded ? REVEAL_DURATION : 0;
      animation.onfinish = () => {
        if (animation.playbackRate < 0) setOccupied(false);
      };
      animationRef.current = animation;
    }
    // Reverse the same timeline, including when a hover is interrupted.
    animationRef.current.updatePlaybackRate(open ? 1 : -1);
    animationRef.current.play();
  }
  return (
    <div
      className={`hover-expand relative w-full max-w-[18rem] ${className}`}
      style={{
        "--portrait-idle-size": "75px",
        "--photo-aspect-ratio": `${width} / ${height}`,
        "--portrait-crop-bottom": `${100 - 40.75 - (100 * width) / (2.1 * height)}%`,
      } as CSSProperties}
      data-expanded={occupied}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") reveal(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="hover-expand-frame"
        aria-label={expanded ? "Show portrait crop" : "Show full illustration of Reina"}
        aria-expanded={expanded}
        data-expanded={expanded}
        data-cc-cursor-exclude
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") reveal(true);
        }}
        onClick={(event) => {
          // Mouse users reveal on hover; keep tap and keyboard activation.
          if (event.detail !== 0) {
            const pointerType = (event.nativeEvent as PointerEvent).pointerType;
            if (pointerType === "mouse" || (!pointerType && window.matchMedia("(hover: hover) and (pointer: fine)").matches)) return;
          }
          reveal(!expanded);
        }}
        onBlur={() => reveal(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") reveal(false);
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="315px"
          className="hover-expand-image h-auto w-full"
        />
      </button>
    </div>
  );
}

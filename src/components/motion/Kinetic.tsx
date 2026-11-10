"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Kinetic Typography — แถบตัวอักษรยักษ์ที่เลื่อนตามการ scroll
 * direction 1 = ไปซ้าย, -1 = ไปขวา
 */
export function Kinetic({ text, direction = 1, outline = false }: { text: string; direction?: 1 | -1; outline?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const track = ref.current.querySelector(".marquee");
      gsap.fromTo(
        track,
        { xPercent: direction === 1 ? 0 : -30 },
        {
          xPercent: direction === 1 ? -30 : 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
    },
    { scope: ref }
  );
  const items = Array.from({ length: 4 });
  return (
    <div ref={ref} className="overflow-hidden py-4" aria-hidden="true">
      <div className="marquee t-display gap-[0.3em] whitespace-nowrap text-[clamp(64px,13vw,220px)]">
        {items.map((_, i) => (
          <span
            key={i}
            style={
              outline || i % 2
                ? { WebkitTextStroke: "1px var(--blood)", color: "transparent" }
                : { color: "var(--oxblood)" }
            }
          >
            {text}&nbsp;—
          </span>
        ))}
      </div>
    </div>
  );
}

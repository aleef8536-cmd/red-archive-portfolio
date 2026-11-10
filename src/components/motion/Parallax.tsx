"use client";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Parallax depth: speed เป็น % ของความสูง (ลบ = ขึ้นช้ากว่า) — ลดลงครึ่งหนึ่งบนมือถือ */
export function Parallax({ children, speed = 10, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const s = innerWidth < 768 ? speed / 2 : speed;
      gsap.fromTo(ref.current, { yPercent: -s }, {
        yPercent: s,
        ease: "none",
        scrollTrigger: { trigger: ref.current.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: ref }
  );
  return <div ref={ref} className={className}>{children}</div>;
}

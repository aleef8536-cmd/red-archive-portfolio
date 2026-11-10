"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** lines = Mask reveal ทีละบรรทัด (ลูกที่มี .mask-line), fade = ค่อยปรากฏ, image = เปิดผ่านหน้ากาก */
  mode?: "lines" | "fade" | "image";
  delay?: number;
  stagger?: number;
  id?: string;
};

/** Scroll-triggered reveal ที่ทำความสะอาดตัวเองเมื่อ component ถูกปิด */
export function Reveal({ children, as: Tag = "div", className = "", mode = "fade", delay = 0, stagger = 0.08, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const st = { trigger: el, start: "top 88%", once: true };
      if (mode === "lines") {
        gsap.from(el.querySelectorAll(".mask-line > span"), { yPercent: 105, duration: 1.1, ease: "power4.out", stagger, delay, scrollTrigger: st });
      } else if (mode === "image") {
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut", delay, scrollTrigger: st });
        const inner = el.querySelector("[data-reveal-inner]");
        if (inner) gsap.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power3.out", delay, scrollTrigger: st });
      } else {
        gsap.from(el.children.length > 1 ? el.children : el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger, delay, scrollTrigger: st });
      }
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

/** แยกข้อความเป็นบรรทัดสำหรับ mask reveal: ส่งเป็นอาร์เรย์ของบรรทัด */
export function Lines({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className={`mask-line ${className}`}>
          <span>{l}</span>
        </span>
      ))}
    </>
  );
}

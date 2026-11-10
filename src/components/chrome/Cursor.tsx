"use client";
import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/gsap";

/**
 * เคอร์เซอร์กำหนดเอง (เฉพาะอุปกรณ์ที่มีเมาส์)
 * - ใส่ data-cursor="ข้อความ" ให้ element เพื่อแสดงวงกลมพร้อมข้อความ
 * - ลิงก์/ปุ่มทั่วไปจะเป็นวงแหวน
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isFinePointer() || !dot.current) return;
    const el = dot.current;
    document.documentElement.classList.add("has-cursor");
    const reduce = prefersReducedMotion();
    const xTo = gsap.quickTo(el, "x", { duration: reduce ? 0 : 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: reduce ? 0 : 0.35, ease: "power3" });
    gsap.set(el, { opacity: 0 });

    const move = (e: PointerEvent) => {
      gsap.set(el, { opacity: 1 });
      xTo(e.clientX);
      yTo(e.clientY);
      const t = (e.target as Element | null)?.closest?.("[data-cursor], a, button, [role='button'], input, textarea, label");
      const label = t?.getAttribute("data-cursor");
      el.classList.toggle("is-label", !!label);
      el.classList.toggle("is-hover", !label && !!t);
      if (text.current && label) text.current.innerText = label.replace("|", "\n");
    };
    const leave = () => gsap.set(el, { opacity: 0 });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={dot} className="cursor hidden [@media(hover:hover)_and_(pointer:fine)]:grid" aria-hidden="true">
      <span ref={text} className="cursor-label" />
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { INTRO_EVENT, INTRO_KEY } from "@/lib/intro";
import { useApp } from "@/components/providers/AppProvider";

/**
 * หน้าเปิดแบบภาพยนตร์: "กำลังเปิดคลังผลงาน…" → "ยืนยันการเข้าถึง" → เปิดเผยหน้าแรก
 * เล่นครั้งเดียวต่อเซสชัน, ข้ามได้ (ปุ่ม / Esc / Enter), ไม่เล่นเมื่อผู้ใช้ลดการเคลื่อนไหว
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { lenis } = useApp();

  useEffect(() => {
    const html = document.documentElement;
    if (html.getAttribute("data-intro") !== "playing" || !root.current) return;
    const el = root.current;
    const q = gsap.utils.selector(el);
    html.style.overflow = "hidden";
    lenis.current?.stop();

    const finish = () => {
      try { sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
      html.setAttribute("data-intro", "seen");
      html.style.overflow = "";
      lenis.current?.start();
      window.dispatchEvent(new Event(INTRO_EVENT));
    };

    let t!: gsap.core.Timeline;
    const ctx = gsap.context(() => {
      t = gsap.timeline({ onComplete: finish });
      t.from(el, { opacity: 0, duration: 0.4 })
      .from(q(".i-loading .ch"), { yPercent: 110, opacity: 0, stagger: 0.025, duration: 0.6, ease: "power3.out" })
      .from(q(".i-meta"), { opacity: 0, duration: 0.4 }, "<0.2")
      .to(q(".intro-bar > span"), { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, "<")
      .to(q(".i-loading"), { yPercent: -110, opacity: 0, duration: 0.4, ease: "power3.in" })
      .fromTo(q(".i-granted"), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
      .fromTo(q(".i-stamp"), { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, "<0.15")
      .fromTo(q(".intro-sweep"), { opacity: 1, yPercent: 0, y: -innerHeight * 0.5 }, { y: innerHeight * 0.5, duration: 0.7, ease: "power2.inOut" }, "+=0.25")
      .to(el, { clipPath: "inset(50% 0 50% 0)", duration: 0.8, ease: "power4.inOut" }, "-=0.35");
    }, el);
    tl.current = t;

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter") t.progress(1); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      // คืนค่าทั้งหมด (รองรับ React Strict Mode ที่ mount ซ้ำ)
      ctx.revert();
      if (html.getAttribute("data-intro") === "playing") {
        html.style.overflow = "";
        lenis.current?.start();
      }
    };
  }, [lenis]);

  const loading = "กำลังเปิดคลังผลงาน…";

  return (
    <div ref={root} className="intro" style={{ clipPath: "inset(0 0 0 0)" }} role="dialog" aria-label="กำลังเปิดคลังผลงาน" aria-live="polite">
      <div className="intro-sweep" />
      <div className="i-meta t-mono text-dim absolute left-[var(--gutter)] top-6 flex gap-6">
        <span>THE RED ARCHIVE</span>
        <span className="hidden sm:inline">TERMINAL // 015</span>
      </div>
      <div className="flex flex-col items-center gap-8 px-4 text-center">
        <div className="relative h-[1.6em] overflow-hidden text-[clamp(22px,4vw,40px)]">
          <p className="i-loading t-thai-head m-0" aria-label={loading}>
            {Array.from(loading).map((c, i) => (
              <span key={i} className="ch inline-block" aria-hidden="true">{c === " " ? " " : c}</span>
            ))}
          </p>
          <p className="i-granted t-thai-head absolute inset-0 m-0 opacity-0" style={{ color: "var(--signal)" }}>
            ยืนยันการเข้าถึง
          </p>
        </div>
        <div className="intro-bar"><span /></div>
        <span className="i-stamp stamp opacity-0">ACCESS GRANTED</span>
      </div>
      <button
        type="button"
        onClick={() => tl.current?.progress(1)}
        className="t-mono absolute bottom-6 right-[var(--gutter)] border border-[var(--line)] px-4 py-3 text-dim hover:text-[var(--bone)]"
      >
        ข้าม INTRO →
      </button>
    </div>
  );
}

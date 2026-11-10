"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const beats = [
  { k: "EXHIBIT A", th: "ทุกผลงาน", em: "คือแฟ้มข้อมูล" },
  { k: "EXHIBIT B", th: "ทุกภาพ", em: "คือหลักฐานของความสามารถ" },
  { k: "EXHIBIT C", th: "ทุกการเคลื่อนไหว", em: "คือส่วนหนึ่งของเรื่องราว" },
];

/**
 * Scroll Storytelling: ปักหมุด section แล้วเปลี่ยนข้อความทีละฉากตามการเลื่อน (จอ ≥ 768px)
 * บนมือถือ / ลดการเคลื่อนไหว จะแสดงเป็นรายการซ้อนกันตามปกติ
 */
export function Story() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const q = gsap.utils.selector(root);
        const items = q(".beat");
        gsap.set(items, { position: "absolute", inset: 0, opacity: 0, yPercent: 20 });
        gsap.set(items[0], { opacity: 1, yPercent: 0 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: `+=${beats.length * 90}%`, pin: true, scrub: 0.8 },
        });
        items.forEach((el, i) => {
          if (i === 0) return;
          tl.to(items[i - 1], { opacity: 0, yPercent: -20, duration: 1 })
            .to(el, { opacity: 1, yPercent: 0, duration: 1 }, "<0.3")
            .to(q(".story-bar"), { scaleX: (i + 1) / beats.length, duration: 1 }, "<");
        });
        tl.to({}, { duration: 0.6 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-[var(--ink-red)] md:h-[100svh]" aria-label="แนวคิดของคลังผลงาน">
      <div className="absolute inset-0 bg-[radial-gradient(50%_70%_at_15%_50%,rgba(142,24,36,.45),transparent_70%)]" aria-hidden="true" />
      <div className="grid-lines" />
      <div className="shell relative flex h-full flex-col justify-center py-24">
        <div className="relative md:h-[50vh]">
          {beats.map((b, i) => (
            <div key={b.k} className={`beat flex flex-col justify-center ${i ? "mt-20 md:mt-0" : ""}`}>
              <p className="t-mono m-0 text-[var(--brass)]">{b.k} — {String(i + 1).padStart(2, "0")}/{String(beats.length).padStart(2, "0")}</p>
              <p className="t-thai-head thai-keep m-0 mt-4 text-[clamp(40px,8.4vw,136px)] font-extrabold leading-[1.08]">
                {b.th}
                <br />
                <span className="text-[var(--signal)]">{b.em}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 hidden h-px w-full bg-[var(--line)] md:block" aria-hidden="true">
          <div className="story-bar h-px origin-left bg-[var(--signal)]" style={{ transform: `scaleX(${1 / beats.length})` }} />
        </div>
      </div>
    </section>
  );
}

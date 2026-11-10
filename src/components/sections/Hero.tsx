"use client";
import { useRef } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { gsap, useGSAP, prefersReducedMotion, isFinePointer } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { TLink } from "@/components/ui/TLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { Lines } from "@/components/motion/Reveal";
import { Plate } from "@/components/media/Plate";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const reduce = prefersReducedMotion();
      gsap.set(q(".h-light"), { xPercent: -50, yPercent: -50 });

      // ซ่อนไว้ก่อน แล้วเล่นเมื่อ Intro จบ
      if (!reduce) {
        gsap.set(q(".h-line > span"), { yPercent: 110 });
        gsap.set(q(".h-fade"), { opacity: 0, y: 24 });
        gsap.set(q(".h-bg"), { scale: 1.18, opacity: 0 });
      }
      const play = contextSafe!(() => {
        if (reduce) return;
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.to(q(".h-bg"), { scale: 1, opacity: 1, duration: 2.2, ease: "power3.out" })
          .to(q(".h-line > span"), { yPercent: 0, duration: 1.3, stagger: 0.09 }, 0.15)
          .to(q(".h-fade"), { opacity: 1, y: 0, duration: 1, stagger: 0.07 }, 0.7);
      });
      const off = onIntroDone(play);

      // Parallax ตามการ scroll
      if (!reduce) {
        gsap.to(q(".h-bg-inner"), { yPercent: 14, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        gsap.to(q(".h-title"), { yPercent: -18, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      }

      // ภาพและแสงเคลื่อนตามเมาส์
      if (!reduce && isFinePointer()) {
        const bx = gsap.quickTo(q(".h-bg-inner"), "x", { duration: 1.2, ease: "power3" });
        const by = gsap.quickTo(q(".h-bg-inner"), "y", { duration: 1.2, ease: "power3" });
        const lx = gsap.quickTo(q(".h-light"), "x", { duration: 0.9, ease: "power3" });
        const ly = gsap.quickTo(q(".h-light"), "y", { duration: 0.9, ease: "power3" });
        const move = contextSafe!((e: PointerEvent) => {
          const nx = e.clientX / innerWidth - 0.5;
          const ny = e.clientY / innerHeight - 0.5;
          bx(nx * -26); by(ny * -18);
          lx(e.clientX - innerWidth / 2); ly(e.clientY - innerHeight / 2);
        });
        el.addEventListener("pointermove", move);
        return () => { el.removeEventListener("pointermove", move); off(); };
      }
      return off;
    },
    { scope: root }
  );

  const featured = projects.find((p) => p.featured) ?? projects[0];

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      {/* พื้นหลัง Cinematic */}
      <div className="h-bg absolute inset-0" aria-hidden="true">
        <div className="h-bg-inner absolute -inset-[6%]">
          <Plate variant={0} uid="hero" className="h-full w-full opacity-80 md:ml-[18%] md:w-[82%]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_8%,transparent_60%),linear-gradient(0deg,var(--ink)_2%,transparent_45%)]" />
        <div className="h-light absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(215,43,59,.28),transparent_60%)] mix-blend-screen" />
      </div>
      <div className="grid-lines" />

      {/* แถบข้อมูลแฟ้ม */}
      <div className="shell relative mt-24 flex items-start justify-between md:mt-28">
        <div className="h-fade t-mono text-dim">
          FILE / RA-INDEX<br />
          <span className="text-[var(--signal)]">● </span>CLEARANCE: PUBLIC
        </div>
        <div className="h-fade t-mono hidden text-right text-dim sm:block">
          {site.owner.location}<br />
          LAT 13.75 / LON 100.50
        </div>
      </div>

      {/* หัวข้อหลัก */}
      <div className="shell relative mt-auto pb-8 pt-16">
        <p className="h-fade t-mono mb-5 text-[var(--brass)]">
          <span className="text-dim">[01]</span>&nbsp;&nbsp;NOT HERE TO BE ORDINARY.
        </p>
        <h1 id="hero-title" className="h-title t-thai-head thai-keep m-0 text-[clamp(44px,10.5vw,168px)] font-extrabold leading-[1.02]">
          <Lines className="h-line" lines={["ผลงานที่ไม่จำเป็น", <span key="b" className="text-[var(--signal)]">ต้องเหมือนใคร</span>]} />
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <p className="h-fade m-0 text-[17px] leading-[1.7] text-dim md:col-span-4 md:text-[19px]">
            {site.owner.roleTh.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </p>
          <div className="h-fade flex flex-col gap-3 sm:flex-row md:col-span-5">
            <Magnetic>
              <TLink href="/works" className="btn btn-primary w-full sm:w-auto">
                เข้าสู่คลังผลงาน <ArrowRight size={18} aria-hidden="true" />
              </TLink>
            </Magnetic>
            <Magnetic>
              <TLink href="/about" className="btn w-full sm:w-auto">ทำความรู้จักฉัน</TLink>
            </Magnetic>
          </div>
          <TLink href={`/works/${featured.slug}`} className="h-fade group hidden border-l border-[var(--line-red)] pl-5 md:col-span-3 md:block" data-cursor="เปิดแฟ้ม|VIEW CASE">
            <span className="t-mono block text-dim">LATEST FILE — {featured.fileNo}</span>
            <span className="t-display mt-1 block text-3xl transition-colors group-hover:text-[var(--signal)]">{featured.title}</span>
          </TLink>
        </div>
      </div>

      <div className="shell relative flex items-center justify-between border-t border-[var(--line)] py-4">
        <span className="h-fade t-mono flex items-center gap-2 text-dim">
          <ArrowDownRight size={14} aria-hidden="true" /> SCROLL TO EXPLORE
        </span>
        <span className="h-fade t-mono text-dim">
          <span className="text-[var(--bone)]">01</span> / 05
        </span>
      </div>
    </section>
  );
}

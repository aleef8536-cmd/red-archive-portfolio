"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/data/site";
import { projects } from "@/data/projects";
import { useApp } from "@/components/providers/AppProvider";
import { TLink } from "@/components/ui/TLink";
import { Plate } from "@/components/media/Plate";

const ease = [0.77, 0, 0.175, 1] as const;

export function Header() {
  const { menuOpen, setMenuOpen } = useApp();
  const pathname = usePathname();
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(0);
  const reduce = useReducedMotion();

  // คีย์บอร์ด: Esc ปิด, Tab วนอยู่ในเมนู
  useEffect(() => {
    if (!menuOpen) return;
    const first = panel.current?.querySelector<HTMLElement>("a, button");
    setTimeout(() => first?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); btn.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>("a, button"));
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  const activeIdx = navItems.findIndex((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)));

  return (
    <>
      <header className="shell pointer-events-none fixed inset-x-0 top-0 z-[120] flex items-center justify-between py-5 mix-blend-difference">
        <TLink href="/" className="pointer-events-auto flex items-center gap-3" aria-label={`${site.owner.displayName} — หน้าแรก`}>
          <span className="t-display grid h-10 w-10 place-items-center border border-[var(--bone)] text-lg">{site.owner.monogram}</span>
          <span className="t-mono hidden leading-tight sm:block">
            {site.owner.displayName}
            <br />
            <span className="text-dim">THE RED ARCHIVE</span>
          </span>
        </TLink>
        <button
          ref={btn}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          className="pointer-events-auto flex min-h-11 items-center gap-3 px-1"
        >
          <span className="t-label">{menuOpen ? "CLOSE" : "MENU"}</span>
          <span className="relative block h-3 w-7" aria-hidden="true">
            <span className={`absolute left-0 block h-px w-full bg-[var(--bone)] transition-transform duration-500 ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 block h-px w-full bg-[var(--bone)] transition-transform duration-500 ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="เมนูหลัก"
            className="fixed inset-0 z-[110] overflow-y-auto bg-[var(--ink)]"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0% 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            {/* ภาพตัวอย่าง/แสงแดงด้านหลังตามรายการที่ชี้ */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={hover}
                  className="absolute right-0 top-0 h-full w-full opacity-30 md:w-[45%] md:opacity-60"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Plate variant={projects[hover % projects.length].cover.plate} uid={`menu${hover}`} className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_60%,rgba(142,24,36,.45),transparent_70%)]" />
              <div className="grid-lines" />
            </div>

            <nav className="shell relative flex min-h-full flex-col justify-between pb-8 pt-28">
              <ul className="m-0 list-none p-0">
                {navItems.map((n, i) => (
                  <li key={n.href} className="rule overflow-hidden">
                    <motion.div
                      initial={reduce ? false : { y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.07 }}
                    >
                      <TLink
                        href={n.href}
                        onMouseEnter={() => setHover(i)}
                        onFocus={() => setHover(i)}
                        aria-current={activeIdx === i ? "page" : undefined}
                        className="group flex items-baseline gap-4 py-3 md:gap-8 md:py-4"
                      >
                        <span className="t-mono w-10 shrink-0 text-[var(--signal)]">{n.no} /</span>
                        <span className="t-thai-head thai-keep text-[clamp(36px,8vw,104px)] leading-[1.05] transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-[var(--signal)] group-focus-visible:text-[var(--signal)]">
                          {n.label}
                        </span>
                        <span className="t-mono ml-auto hidden text-dim md:block">{n.en}</span>
                      </TLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                className="rule mt-10 flex flex-wrap items-center justify-between gap-4 pt-6"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="t-mono link-line">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <span className="t-mono text-dim">กด ESC เพื่อปิด</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

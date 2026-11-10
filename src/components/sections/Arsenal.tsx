"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { skills } from "@/data/skills";

/** คลังอุปกรณ์: Accordion ที่ใช้งานด้วยคีย์บอร์ดได้ ไม่มีแถบเปอร์เซ็นต์ */
export function Arsenal() {
  const [open, setOpen] = useState<string | null>(skills[0]?.no ?? null);
  const reduce = useReducedMotion();

  return (
    <ul className="m-0 list-none border-b border-[var(--line)] p-0">
      {skills.map((s) => {
        const isOpen = open === s.no;
        const id = `skill-${s.no}`;
        return (
          <li key={s.no} className={`rule relative transition-colors duration-500 ${isOpen ? "bg-[var(--ink-red)]" : ""}`}>
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : s.no)}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[80px_1fr_1fr_auto] md:gap-8 md:py-8"
              >
                <span className="t-mono text-[var(--signal)]">{s.no} /</span>
                <span className="t-thai-head thai-keep text-[clamp(24px,4vw,56px)] transition-transform duration-500 group-hover:translate-x-2">{s.title}</span>
                <span className="t-mono hidden text-dim md:block">{s.titleEn}</span>
                <span className={`grid h-11 w-11 place-items-center border transition-all duration-500 ${isOpen ? "rotate-45 border-[var(--signal)] bg-[var(--signal)] text-[var(--ink)]" : "border-[var(--line)]"}`} aria-hidden="true">
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  role="region"
                  aria-label={s.title}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-10 md:grid-cols-[80px_1fr_1fr_auto] md:gap-8">
                    <span className="hidden md:block" />
                    <div>
                      <p className="m-0 text-[17px] text-dim">{s.description}</p>
                      <p className="t-mono m-0 mt-6 text-dim">PRACTICE</p>
                      <ul className="m-0 mt-2 grid list-none gap-1 p-0">
                        {s.practices.map((x) => <li key={x}>— {x}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="t-mono m-0 text-dim">TOOLS / EQUIPMENT</p>
                      <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
                        {s.tools.map((t, i) => (
                          <motion.li
                            key={t}
                            className="border border-[var(--line-red)] px-3 py-1.5 font-[family-name:var(--font-condensed)] text-[20px] tracking-[0.06em]"
                            initial={reduce ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                          >
                            {t}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <span className="hidden w-11 md:block" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

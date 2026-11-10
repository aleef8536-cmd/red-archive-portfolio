"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import type { Category, Project } from "@/data/types";
import { categories } from "@/data/projects";
import { CaseCard } from "./CaseCard";

/**
 * Editorial grid แบบอสมมาตร + ระบบกรองประเภทผลงาน
 * จังหวะ: ใหญ่(7) เล็ก(5 เลื่อนลง) / เล็ก(5) ใหญ่(7) / เต็มจอ สำหรับผลงานเด่น
 */
const rhythm = [
  "md:col-span-7",
  "md:col-span-5 md:mt-48",
  "md:col-span-5 md:col-start-1",
  "md:col-span-6 md:col-start-7 md:mt-32",
];

export function CaseGrid({ projects, showFilter = true }: { projects: Project[]; showFilter?: boolean }) {
  const [filter, setFilter] = useState<Category | "ALL">("ALL");
  const reduce = useReducedMotion();

  const available = useMemo(() => categories.filter((c) => projects.some((p) => p.category === c)), [projects]);
  const list = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);

  let r = 0;
  const items = list.map((p) => {
    const full = !!p.featured && filter === "ALL";
    const cls = full ? "md:col-span-12" : rhythm[r++ % rhythm.length];
    const size: "full" | "large" | "small" = full ? "full" : cls.includes("col-span-7") || cls.includes("col-span-6") ? "large" : "small";
    return { p, cls, size };
  });

  return (
    <div>
      {showFilter && (
        <div className="sticky top-20 z-20 -mx-[var(--gutter)] mb-12 bg-[var(--ink)]/85 px-[var(--gutter)] py-3 backdrop-blur-sm md:mb-20">
          <div role="group" aria-label="กรองประเภทผลงาน" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {(["ALL", ...available] as const).map((c) => {
              const count = c === "ALL" ? projects.length : projects.filter((p) => p.category === c).length;
              const on = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(c)}
                  className={`t-mono shrink-0 border px-4 py-2.5 transition-colors ${
                    on ? "border-[var(--signal)] bg-[var(--signal)] text-[var(--ink)]" : "border-[var(--line)] text-dim hover:border-[var(--bone-dim)] hover:text-[var(--bone)]"
                  }`}
                >
                  {c === "ALL" ? "ALL FILES" : c} <span className="opacity-60">({String(count).padStart(2, "0")})</span>
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">แสดง {list.length} ผลงาน</p>
        </div>
      )}

      <motion.ul layout={!reduce} className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-16 p-0 md:grid-cols-12 md:gap-y-28">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map(({ p, cls, size }, i) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              className={cls}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <CaseCard project={p} size={size} priority={i === 0} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";
import { TLink } from "@/components/ui/TLink";
import { ArchiveMedia } from "@/components/media/ArchiveMedia";

type Props = { project: Project; size: "full" | "large" | "small"; priority?: boolean };

const aspect = { full: "aspect-[4/5] sm:aspect-[16/8]", large: "aspect-[4/5] md:aspect-[5/4]", small: "aspect-[4/5]" };
const sizes = { full: "100vw", large: "(min-width: 768px) 58vw, 100vw", small: "(min-width: 768px) 40vw, 100vw" };

/** การ์ดแฟ้มคดี: hover = ภาพขยาย, แสงแดง, ชื่อเลื่อนขึ้น, เคอร์เซอร์ "เปิดแฟ้ม", รายละเอียดเพิ่ม */
export function CaseCard({ project: p, size, priority }: Props) {
  return (
    <TLink
      href={`/works/${p.slug}`}
      className="case-card group block"
      data-cursor="เปิดแฟ้ม|VIEW CASE"
      aria-label={`เปิดแฟ้ม ${p.fileNo}: ${p.title} — ${p.category}, ${p.year}`}
    >
      <div className={`relative overflow-hidden ${aspect[size]}`}>
        <div className="case-media absolute inset-0">
          <ArchiveMedia media={p.cover} uid={`card-${p.slug}`} sizes={sizes[size]} priority={priority} label={p.fileNo} />
        </div>
        <div className="case-glow absolute inset-0" aria-hidden="true" />
        <div className="absolute left-3 top-3 flex gap-2 sm:left-4 sm:top-4">
          <span className="tag bg-[var(--ink)]/70 text-[var(--bone)]">{p.fileNo}</span>
          {p.demo && <span className="tag bg-[var(--ink)]/70 text-[var(--brass)]">DEMO</span>}
        </div>
        <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center border border-[var(--line)] bg-[var(--ink)]/60 transition-colors group-hover:border-[var(--signal)] group-hover:bg-[var(--signal)] sm:right-4 sm:top-4" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="rule mt-4 pt-3">
        <div className="case-title flex items-baseline justify-between gap-4">
          <h3 className={`t-display m-0 ${size === "full" ? "text-[clamp(36px,6vw,88px)]" : "text-[clamp(30px,3.6vw,52px)]"}`}>{p.title}</h3>
          <span className="t-mono shrink-0 text-dim">{p.year}</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="t-mono text-[var(--signal)]">{p.category}</span>
          {p.titleTh && <span className="text-sm text-dim">{p.titleTh}</span>}
        </div>
        <div className="case-more">
          <div>
            <p className="m-0 mt-3 max-w-xl text-[15px] text-dim">{p.summary}</p>
            <p className="t-mono m-0 mt-3 text-dim">ROLE — {p.role.join(" / ")}</p>
            <span className="t-mono mt-3 inline-flex items-center gap-2 text-[var(--bone)]">
              เปิดดูรายละเอียด <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </TLink>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getNextProject, getProject, projects } from "@/data/projects";
import { Reveal, Lines } from "@/components/motion/Reveal";
import { ArchiveMedia } from "@/components/media/ArchiveMedia";
import { TLink } from "@/components/ui/TLink";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.fileNo} ${p.title}`,
    description: p.summary,
    alternates: { canonical: `/works/${p.slug}` },
    openGraph: {
      type: "article",
      title: `${p.fileNo} — ${p.title}`,
      description: p.summary,
      url: `/works/${p.slug}`,
      ...(p.cover.src ? { images: [{ url: p.cover.src, alt: p.cover.alt }] } : {}),
    },
  };
}

function Chapter({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rule grid gap-6 py-14 md:grid-cols-12 md:py-24">
      <div className="md:col-span-4">
        <p className="t-mono m-0 text-[var(--signal)]">{no} /</p>
        <h2 className="t-thai-head m-0 mt-2 text-[clamp(26px,3vw,40px)]">{title}</h2>
      </div>
      <div className="md:col-span-8">{children}</div>
    </section>
  );
}

export default async function CasePage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const next = getNextProject(p.slug);

  return (
    <article>
      {/* Cover */}
      <header className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden">
        <Reveal mode="image" className="absolute inset-0">
          <div data-reveal-inner className="absolute inset-0">
            <ArchiveMedia media={p.cover} uid={`cover-${p.slug}`} priority label={`${p.fileNo} / COVER`} />
          </div>
        </Reveal>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--ink)_5%,transparent_70%)]" aria-hidden="true" />
        <div className="shell relative pb-10 pt-40">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="stamp">CASE FILE {p.fileNo}</span>
            {p.demo && <span className="tag text-[var(--brass)]">DEMO DATA</span>}
          </div>
          <Reveal as="h1" mode="lines" className="t-display m-0 text-[clamp(56px,13vw,220px)]">
            <Lines lines={[p.title]} />
          </Reveal>
          {p.titleTh && <p className="t-thai-head m-0 mt-3 text-[clamp(20px,2.4vw,32px)] text-dim">{p.titleTh}</p>}
        </div>
      </header>

      <div className="shell">
        <Chapter no="01" title="ข้อมูลโครงการ">
          <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
            {[
              ["FILE NO.", p.fileNo],
              ["ประเภท", p.category],
              ["ปีที่จัดทำ", String(p.year)],
              ["บทบาท", p.role.join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="border-l border-[var(--line-red)] pl-4">
                <dt className="t-mono text-dim">{k}</dt>
                <dd className="m-0 mt-1 text-[17px]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="m-0 mt-10 max-w-2xl text-[19px] leading-[1.8]">{p.summary}</p>
        </Chapter>

        <Chapter no="02" title="จุดเริ่มต้น">
          <Reveal><p className="m-0 max-w-2xl text-[18px] leading-[1.85] text-dim">{p.origin}</p></Reveal>
        </Chapter>

        <Chapter no="03" title="แนวคิดสร้างสรรค์">
          <Reveal><p className="t-thai-head m-0 max-w-3xl text-[clamp(22px,2.6vw,34px)] font-medium leading-[1.5]">{p.concept}</p></Reveal>
        </Chapter>

        <Chapter no="04" title="กระบวนการทำงาน">
          <ol className="m-0 grid list-none gap-12 p-0">
            {p.process.map((s, i) => (
              <li key={s.title} className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="t-mono m-0 text-[var(--brass)]">STEP {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="t-thai-head m-0 mt-1 text-2xl">{s.title}</h3>
                  <p className="m-0 mt-3 text-dim">{s.body}</p>
                </div>
                {s.media && (
                  <Reveal mode="image" className="relative aspect-[4/3] overflow-hidden">
                    <div data-reveal-inner className="absolute inset-0">
                      <ArchiveMedia media={s.media} uid={`proc-${p.slug}-${i}`} sizes="(min-width: 768px) 33vw, 100vw" />
                    </div>
                  </Reveal>
                )}
              </li>
            ))}
          </ol>
        </Chapter>
      </div>

      {/* 05 ผลงานที่เสร็จสมบูรณ์ — ภาพขนาดใหญ่ */}
      <section className="rule py-14 md:py-24">
        <div className="shell mb-10">
          <p className="t-mono m-0 text-[var(--signal)]">05 /</p>
          <h2 className="t-thai-head m-0 mt-2 text-[clamp(26px,3vw,40px)]">ผลงานที่เสร็จสมบูรณ์</h2>
        </div>
        <div className="grid gap-4 md:gap-8">
          {p.final.map((m, i) => (
            <figure key={i} className={`m-0 ${i % 2 ? "shell md:pl-[30%]" : ""}`}>
              <Reveal mode="image" className={`relative overflow-hidden ${i % 2 ? "aspect-[4/5] md:aspect-[4/3]" : "aspect-[4/5] md:aspect-[16/8]"}`}>
                <div data-reveal-inner className="absolute inset-0">
                  <ArchiveMedia media={m} uid={`final-${p.slug}-${i}`} sizes={i % 2 ? "(min-width: 768px) 70vw, 100vw" : "100vw"} label={`PLATE ${String(i + 1).padStart(2, "0")}`} />
                </div>
              </Reveal>
              {m.caption && <figcaption className={`t-mono mt-3 text-dim ${i % 2 ? "" : "shell"}`}>{m.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      <div className="shell">
        <Chapter no="06" title="ผลลัพธ์">
          <Reveal><p className="m-0 max-w-2xl text-[18px] leading-[1.85]">{p.outcome}</p></Reveal>
          {p.links && p.links.length > 0 && (
            <ul className="m-0 mt-8 flex list-none flex-wrap gap-3 p-0">
              {p.links.map((l) =>
                l.href === "#" ? (
                  <li key={l.label}><span className="btn" aria-disabled="true">{l.label}</span></li>
                ) : (
                  <li key={l.label}>
                    <a className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label} <ArrowUpRight size={16} aria-hidden="true" /></a>
                  </li>
                )
              )}
            </ul>
          )}
        </Chapter>
      </div>

      {/* 07 เปิดแฟ้มถัดไป */}
      <TLink href={`/works/${next.slug}`} className="case-card group relative block overflow-hidden border-t border-[var(--line-red)]" data-cursor="แฟ้มถัดไป|NEXT CASE">
        <div className="case-media absolute inset-0 opacity-40">
          <ArchiveMedia media={next.cover} uid={`next-${next.slug}`} label={next.fileNo} />
        </div>
        <div className="case-glow absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-24 md:py-36">
          <p className="t-mono m-0 text-[var(--signal)]">07 / เปิดแฟ้มถัดไป — {next.fileNo}</p>
          <p className="case-title t-display m-0 mt-4 text-[clamp(56px,12vw,200px)]">{next.title}</p>
          <p className="t-mono m-0 mt-2 text-dim">{next.category} — {next.year}</p>
        </div>
      </TLink>
    </article>
  );
}

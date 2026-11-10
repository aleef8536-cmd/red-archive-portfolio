import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { site } from "@/data/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal, Lines } from "@/components/motion/Reveal";
import { Plate } from "@/components/media/Plate";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/ui/Magnetic";

export const metadata: Metadata = {
  title: "The Mind Behind the Work — เกี่ยวกับฉัน",
  description: `ทำความรู้จัก ${site.owner.displayName} — ${site.owner.role}`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { owner, about } = site;
  return (
    <>
      <section className="shell relative pb-16 pt-36 md:pt-44">
        <div className="grid-lines" />
        <SectionHead as="h1" no="03" kicker="SUBJECT PROFILE" title={["THE MIND", "BEHIND", "THE WORK"]} sub={["เบื้องหลังทุกผลงาน", "คือคนที่ไม่หยุดสร้างสรรค์"]} />
      </section>

      <section className="shell relative grid gap-10 pb-24 md:grid-cols-12 md:gap-8">
        {/* Portrait */}
        <div className="md:col-span-6 lg:col-span-5">
          <Reveal mode="image" className="relative aspect-[4/5] overflow-hidden">
            <div data-reveal-inner className="absolute inset-0">
              <Parallax speed={-8} className="absolute -inset-[8%]">
                {owner.portrait ? (
                  <Image src={owner.portrait} alt={`ภาพบุคคลของ ${owner.firstName} ${owner.lastName}`} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" priority />
                ) : (
                  <Plate variant={1} uid="portrait" label="SUBJECT / PORTRAIT" className="h-full w-full" />
                )}
              </Parallax>
            </div>
            <span className="stamp absolute bottom-5 right-5">IDENTIFIED</span>
          </Reveal>
          <p className="t-mono mt-3 text-dim">{owner.portrait ? "PORTRAIT" : "[DEMO] ใส่รูป Portrait ที่ src/data/site.ts → owner.portrait"}</p>
        </div>

        {/* ข้อมูล */}
        <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="t-mono m-0 text-[var(--signal)]">NAME</p>
            <p className="t-thai-head m-0 mt-1 text-[clamp(32px,4vw,56px)]">{owner.firstName} {owner.lastName}</p>
            <p className="t-mono m-0 mt-2 text-dim">{owner.role}</p>
            <p className="m-0 mt-8 text-[18px] leading-[1.85]">{about.bio}</p>
          </Reveal>

          <dl className="m-0 mt-12 grid gap-0">
            <InfoRow label="ความสนใจ">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {about.interests.map((x) => <li key={x} className="tag">{x}</li>)}
              </ul>
            </InfoRow>
            <InfoRow label="แนวคิดในการทำงาน"><p className="m-0 text-dim">{about.philosophy}</p></InfoRow>
            <InfoRow label="ประสบการณ์">
              <ul className="m-0 grid list-none gap-4 p-0">
                {about.experience.map((e) => (
                  <li key={e.period + e.title}>
                    <span className="t-mono block text-[var(--brass)]">{e.period}</span>
                    <span className="block">{e.title} — <span className="text-dim">{e.org}</span></span>
                  </li>
                ))}
              </ul>
            </InfoRow>
            <InfoRow label="ความสำเร็จ">
              <ul className="m-0 grid list-none gap-2 p-0 text-dim">
                {about.achievements.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </InfoRow>
          </dl>

          <div className="mt-10">
            {owner.cvUrl ? (
              <Magnetic>
                <a href={owner.cvUrl} download className="btn btn-primary">
                  <Download size={18} aria-hidden="true" /> ดาวน์โหลดประวัติส่วนตัว
                </a>
              </Magnetic>
            ) : (
              <div>
                <button type="button" className="btn" disabled aria-describedby="cv-note">
                  <Download size={18} aria-hidden="true" /> ดาวน์โหลดประวัติส่วนตัว
                </button>
                <p id="cv-note" className="t-mono m-0 mt-2 text-[var(--brass)]">[DEMO] ยังไม่ได้อัปโหลดไฟล์ CV — ตั้งค่า owner.cvUrl</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ข้อความขนาดใหญ่ */}
      <section className="relative overflow-hidden border-y border-[var(--line-red)] bg-[var(--oxblood)] py-24 md:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_50%,rgba(215,43,59,.25),transparent_70%)]" aria-hidden="true" />
        <Reveal as="blockquote" mode="lines" stagger={0.12} className="shell t-thai-head thai-keep relative m-0 text-[clamp(32px,6.4vw,104px)] font-extrabold leading-[1.12]">
          <Lines lines={["ฉันไม่ได้สร้างงาน", "เพื่อให้ดูดีเท่านั้น", <span key="c" className="text-[var(--signal)]">แต่สร้างเพื่อให้มีความหมาย</span>]} />
        </Reveal>
      </section>
    </>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="rule grid gap-3 py-6 sm:grid-cols-[160px_1fr]">
      <dt className="t-mono text-dim">{label}</dt>
      <dd className="m-0">{children}</dd>
    </Reveal>
  );
}

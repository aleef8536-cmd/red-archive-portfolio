import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Kinetic } from "@/components/motion/Kinetic";
import { SectionHead } from "@/components/ui/SectionHead";
import { CaseGrid } from "@/components/works/CaseGrid";
import { TLink } from "@/components/ui/TLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal, Lines } from "@/components/motion/Reveal";

const featuredFirst = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 5);

const index = [
  { no: "03", en: "THE MIND BEHIND THE WORK", th: "เกี่ยวกับฉัน", href: "/about" },
  { no: "04", en: "THE ARSENAL", th: "ความสามารถ", href: "/arsenal" },
  { no: "05", en: "OPEN CHANNEL", th: "ติดต่อฉัน", href: "/contact" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Kinetic text="THE RED ARCHIVE" />

      <section className="shell relative py-20 md:py-32" aria-labelledby="files-title">
        <SectionHead no="02" kicker="SELECTED EVIDENCE" title={["THE CASE", "FILES"]} sub={["ทุกผลงานมีเบื้องหลัง", "ทุกความคิดมีเรื่องราว"]} id="files-title" />
        <div className="mt-16 md:mt-24">
          <CaseGrid projects={featuredFirst} showFilter={false} />
        </div>
        <div className="mt-20 flex justify-center">
          <Magnetic>
            <TLink href="/works" className="btn">ดูแฟ้มทั้งหมด ({projects.length}) <ArrowRight size={18} aria-hidden="true" /></TLink>
          </Magnetic>
        </div>
      </section>

      <Story />

      <section className="shell relative py-20 md:py-32" aria-label="ดัชนีเนื้อหา">
        <p className="t-mono m-0 mb-8 text-dim">CONTINUE INVESTIGATION</p>
        <ul className="m-0 list-none border-b border-[var(--line)] p-0">
          {index.map((n) => (
            <li key={n.href} className="rule">
              <TLink href={n.href} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-7 md:gap-10 md:py-10">
                <span className="t-mono text-[var(--signal)]">{n.no} /</span>
                <span>
                  <span className="t-display block text-[clamp(30px,6vw,96px)] transition-colors duration-500 group-hover:text-[var(--signal)]">{n.en}</span>
                  <span className="text-dim">{n.th}</span>
                </span>
                <ArrowRight className="transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true" />
              </TLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-[#050506] py-28 text-center md:py-44">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(142,24,36,.35),transparent_60%)]" aria-hidden="true" />
        <div className="shell relative">
          <Reveal as="h2" mode="lines" className="t-display m-0 text-[clamp(48px,10vw,170px)] text-[var(--signal)]">
            <Lines lines={["LET’S CREATE", "SOMETHING LEGENDARY."]} />
          </Reveal>
          <p className="t-thai-head mt-6 text-[clamp(20px,2.4vw,30px)] font-medium">มีไอเดียที่อยากทำให้เกิดขึ้นจริงไหม?</p>
          <div className="mt-10">
            <Magnetic>
              <TLink href="/contact" className="btn btn-primary">เปิดช่องทางติดต่อ <ArrowRight size={18} aria-hidden="true" /></TLink>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}

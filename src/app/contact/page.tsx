import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Reveal, Lines } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact — ติดต่อฉัน",
  description: "มีไอเดียที่อยากทำให้เกิดขึ้นจริงไหม? ติดต่อเพื่อร่วมสร้างผลงาน",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-[#050506] pb-24 pt-36 md:pt-44">
      <div className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(142,24,36,.35),transparent_60%)]" aria-hidden="true" />
      <div className="shell relative">
        <p className="t-mono m-0 mb-6 flex items-center gap-3 text-dim">
          <span className="text-[var(--signal)]">05</span>
          <span className="h-px w-10 bg-[var(--line-red)]" aria-hidden="true" />
          FINAL SCENE / OPEN CHANNEL
        </p>
        <Reveal as="h1" mode="lines" stagger={0.1} className="t-display m-0 text-[clamp(56px,12.5vw,210px)] text-[var(--signal)]">
          <Lines lines={["LET’S CREATE", "SOMETHING", "LEGENDARY."]} />
        </Reveal>
        <Reveal>
          <p className="t-thai-head m-0 mt-8 text-[clamp(22px,3vw,40px)] font-medium">มีไอเดียที่อยากทำให้เกิดขึ้นจริงไหม?</p>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="t-mono m-0 text-dim">CHANNELS</p>
            <ul className="m-0 mt-4 list-none p-0">
              {site.socials.map((s) => (
                <li key={s.label} className="rule">
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="t-label block text-[26px] transition-colors group-hover:text-[var(--signal)]">{s.label}</span>
                      <span className="t-mono text-dim">{s.handle}</span>
                    </span>
                    <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            {site.demoMode && <p className="t-mono mt-4 text-[var(--brass)]">[DEMO] ช่องทางเหล่านี้เป็นตัวอย่าง — แก้ที่ src/data/site.ts</p>}
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="t-mono m-0 text-dim">TRANSMIT A MESSAGE</p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

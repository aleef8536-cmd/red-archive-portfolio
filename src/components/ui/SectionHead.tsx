import { Reveal, Lines } from "@/components/motion/Reveal";

type Props = { no: string; kicker: string; title: string[]; sub?: string[]; as?: "h1" | "h2"; id?: string };

/** หัวข้อ section แบบโปสเตอร์ภาพยนตร์: ตัวเลข + kicker + หัวข้อยักษ์ + คำอธิบายไทย */
export function SectionHead({ no, kicker, title, sub, as = "h2", id }: Props) {
  const H = as;
  return (
    <div className="relative grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <p className="t-mono m-0 mb-4 flex items-center gap-3 text-dim">
          <span className="text-[var(--signal)]">{no}</span>
          <span className="h-px w-10 bg-[var(--line-red)]" aria-hidden="true" />
          {kicker}
        </p>
        <Reveal as={H} mode="lines" className="t-display m-0 text-[clamp(52px,11vw,176px)]" id={id}>
          <Lines lines={title} />
        </Reveal>
      </div>
      {sub && (
        <Reveal mode="lines" className="t-thai-head thai-keep m-0 text-[clamp(18px,2.2vw,28px)] font-medium text-dim md:col-span-4 md:pb-3" delay={0.2}>
          <Lines lines={sub} />
        </Reveal>
      )}
    </div>
  );
}

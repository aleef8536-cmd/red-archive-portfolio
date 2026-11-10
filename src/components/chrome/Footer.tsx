import { navItems, site } from "@/data/site";
import { TLink } from "@/components/ui/TLink";

export function Footer() {
  return (
    <footer className="shell relative border-t border-[var(--line)] py-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="t-display m-0 text-[clamp(40px,7vw,96px)] text-[var(--oxblood)]">THE RED ARCHIVE</p>
          <p className="t-mono m-0 mt-2 text-dim">ทุกผลงานมีเรื่องราว — © {new Date().getFullYear()} {site.owner.displayName}</p>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          {navItems.map((n) => (
            <li key={n.href}>
              <TLink href={n.href} className="t-mono link-line">
                {n.no} {n.en}
              </TLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export function DemoBanner() {
  if (!site.demoMode) return null;
  return (
    <div className="t-mono fixed bottom-3 left-3 z-[95] max-w-[calc(100vw-24px)] border border-[var(--brass)] bg-[var(--ink)]/90 px-3 py-2 text-[10px] text-[var(--brass)]">
      DEMO DATA — ข้อมูลและภาพทั้งหมดเป็นตัวอย่าง แก้ได้ที่ src/data
    </div>
  );
}

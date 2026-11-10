import type { Metadata } from "next";
import { SectionHead } from "@/components/ui/SectionHead";
import { Arsenal } from "@/components/sections/Arsenal";
import { Kinetic } from "@/components/motion/Kinetic";

export const metadata: Metadata = {
  title: "The Arsenal — ความสามารถ",
  description: "เครื่องมือ ความคิด และทักษะที่ใช้สร้างผลงาน",
  alternates: { canonical: "/arsenal" },
};

export default function ArsenalPage() {
  return (
    <>
      <section className="shell relative pb-24 pt-36 md:pt-44">
        <div className="grid-lines" />
        <SectionHead as="h1" no="04" kicker="EQUIPMENT INVENTORY" title={["THE", "ARSENAL"]} sub={["เครื่องมือ ความคิด", "และทักษะที่ใช้สร้างผลงาน"]} />
        <div className="mt-16 md:mt-24">
          <Arsenal />
        </div>
      </section>
      <Kinetic text="TOOLS DON'T MAKE THE WORK" direction={-1} outline />
    </>
  );
}

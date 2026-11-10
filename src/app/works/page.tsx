import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { SectionHead } from "@/components/ui/SectionHead";
import { CaseGrid } from "@/components/works/CaseGrid";
import { Kinetic } from "@/components/motion/Kinetic";

export const metadata: Metadata = {
  title: "The Case Files — คลังผลงาน",
  description: "คลังแฟ้มผลงาน: Graphic Design, Photography, Video, Motion Graphics, Web และ Creative Project",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return (
    <>
      <section className="shell relative pb-24 pt-36 md:pt-44">
        <div className="grid-lines" />
        <SectionHead
          as="h1"
          no="02"
          kicker={`ARCHIVE / ${String(projects.length).padStart(3, "0")} FILES`}
          title={["THE CASE", "FILES"]}
          sub={["ทุกผลงานมีเบื้องหลัง", "ทุกความคิดมีเรื่องราว"]}
        />
        <div className="mt-16 md:mt-24">
          <CaseGrid projects={projects} />
        </div>
      </section>
      <Kinetic text="EVERY FILE HAS A STORY" />
    </>
  );
}

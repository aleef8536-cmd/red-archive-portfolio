import { TLink } from "@/components/ui/TLink";

export default function NotFound() {
  return (
    <section className="shell relative grid min-h-[90svh] place-content-center py-32 text-center">
      <span className="stamp mx-auto">FILE NOT FOUND</span>
      <h1 className="t-display m-0 mt-8 text-[clamp(96px,22vw,320px)] text-[var(--oxblood)]">404</h1>
      <p className="t-thai-head m-0 text-2xl">แฟ้มนี้ไม่มีอยู่ในคลัง หรือถูกย้ายไปแล้ว</p>
      <div className="mt-10">
        <TLink href="/works" className="btn btn-primary">กลับสู่คลังผลงาน</TLink>
      </div>
    </section>
  );
}

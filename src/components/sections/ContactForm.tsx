"use client";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { site } from "@/data/site";

type Status = { kind: "idle" | "sending" | "sent" | "error" | "offline"; msg?: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MSG = {
  sent: "ได้รับข้อความแล้ว ขอบคุณที่ติดต่อมา จะตอบกลับโดยเร็วที่สุด",
  offline: "ระบบส่งข้อความยังไม่ได้เชื่อมต่อ — ข้อความของคุณยังไม่ถูกส่ง",
  error: "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อทางอีเมลโดยตรง",
};

function validate(d: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร";
  if (!EMAIL.test(d.email.trim())) e.email = "รูปแบบอีเมลไม่ถูกต้อง";
  if (d.message.trim().length < 10) e.message = "กรุณาเขียนข้อความอย่างน้อย 10 ตัวอักษร";
  return e;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const mail = site.socials.find((s) => s.label === "Email");

  // สถานะจากการส่งแบบไม่มี JavaScript (redirect กลับมาพร้อม ?status=)
  useEffect(() => {
    const s = new URLSearchParams(location.search).get("status");
    const map: Record<string, Status> = {
      sent: { kind: "sent", msg: MSG.sent },
      offline: { kind: "offline", msg: MSG.offline },
      invalid: { kind: "error", msg: "ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบแล้วส่งใหม่" },
      error: { kind: "error", msg: MSG.error },
    };
    if (s && map[s]) setStatus(map[s]);
  }, []);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""),
    };
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        setStatus({ kind: "sent", msg: MSG.sent });
        form.reset();
      } else if (res.status === 503) {
        setStatus({ kind: "offline", msg: MSG.offline });
      } else {
        setStatus({ kind: "error", msg: MSG.error });
      }
    } catch {
      setStatus({ kind: "error", msg: "เชื่อมต่อไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่" });
    }
  }

  const field = (name: keyof Errors, label: string, input: React.ReactNode) => (
    <div className="field" data-invalid={!!errors[name]}>
      <label htmlFor={`f-${name}`} className="t-mono text-dim">{label}</label>
      {input}
      {errors[name] && <p id={`e-${name}`} className="t-mono m-0 pb-2 text-[var(--signal)]" role="alert">{errors[name]}</p>}
    </div>
  );

  return (
    <form method="post" action="/api/contact" onSubmit={onSubmit} noValidate className="grid gap-6" aria-describedby="form-status">
      {field("name", "ชื่อ / NAME", <input id="f-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />)}
      {field("email", "อีเมล / EMAIL", <input id="f-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />)}
      {field("message", "ข้อความ / MESSAGE", <textarea id="f-message" name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} />)}
      {/* honeypot กันสแปม */}
      <div className="hidden" aria-hidden="true">
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button type="submit" className="btn btn-primary" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : null}
          {status.kind === "sending" ? "กำลังส่ง…" : "ส่งข้อความ"}
          {status.kind !== "sending" && <ArrowRight size={18} aria-hidden="true" />}
        </button>
        <p id="form-status" aria-live="polite" className={`m-0 text-[15px] ${status.kind === "sent" ? "text-[var(--brass)]" : status.kind === "idle" || status.kind === "sending" ? "" : "text-[var(--signal)]"}`}>
          {status.msg}
          {(status.kind === "offline" || status.kind === "error") && mail && (
            <> — <a href={mail.href} className="link-line underline">ส่งอีเมลถึง {mail.handle}</a></>
          )}
        </p>
      </div>
    </form>
  );
}

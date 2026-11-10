import { NextResponse } from "next/server";

/**
 * ส่งต่อข้อความจากฟอร์มไปยังผู้ให้บริการภายนอก (เช่น Formspree)
 * ตั้งค่า CONTACT_FORM_ENDPOINT ใน Vercel → Settings → Environment Variables
 * หากไม่ได้ตั้งค่า จะตอบกลับ 503 และหน้าเว็บจะไม่แสดงว่าส่งสำเร็จ
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const isForm = !(req.headers.get("content-type") ?? "").includes("application/json");
  let body: Record<string, unknown>;
  try {
    body = isForm ? Object.fromEntries(await req.formData()) : await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const res = await handle(body);
  // ส่งแบบฟอร์มปกติ (ก่อน JavaScript โหลด) → กลับไปหน้าติดต่อพร้อมสถานะจริง
  if (isForm) {
    const status = res.ok ? "sent" : res.status === 503 ? "offline" : res.status === 422 ? "invalid" : "error";
    return NextResponse.redirect(new URL(`/contact?status=${status}#form-status`, req.url), 303);
  }
  return res;
}

async function handle(body: Record<string, unknown>) {

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const trap = String(body.company ?? "");

  if (trap) return NextResponse.json({ error: "rejected" }, { status: 400 });
  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 100) errors.name = "invalid";
  if (!EMAIL.test(email) || email.length > 200) errors.email = "invalid";
  if (message.length < 10 || message.length > 5000) errors.message = "invalid";
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", fields: errors }, { status: 422 });

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message, _replyto: email }),
    });
    if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}

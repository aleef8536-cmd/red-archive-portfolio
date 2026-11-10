import type { Social } from "./types";

/**
 * ============================================================
 *  ข้อมูลส่วนกลางของเจ้าของเว็บไซต์
 *  ทุกค่าที่มีคำว่า [DEMO] คือข้อมูลสาธิต — แก้เป็นข้อมูลจริงของคุณ
 * ============================================================
 */
export const site = {
  /** true = แสดงแถบแจ้งว่าเป็นข้อมูลสาธิต ปิดเมื่อใส่ข้อมูลจริงครบแล้ว */
  demoMode: true,

  owner: {
    firstName: "อาลีฟ",
    lastName: "ลาเต๊ะ",
    displayName: "alif",
    monogram: "YN",
    role: "Creative / Visual Storyteller / Digital Experience Designer",
    roleTh: ["นักสร้างสรรค์ผลงาน", "นักเล่าเรื่องผ่านภาพ", "และผู้ออกแบบประสบการณ์ดิจิทัล"],
    location: "phattalung, TH",
    /** วางไฟล์รูปไว้ที่ /public/profile.jpg แล้วใส่ "/profile.jpg" — ถ้าว่างจะแสดงภาพสาธิต */
    portrait: "",
    /** วางไฟล์ไว้ที่ /public/cv.pdf แล้วใส่ "/cv.pdf" — ถ้าว่าง ปุ่มดาวน์โหลดจะถูกปิดใช้งาน */
    cvUrl: "",
  },

  about: {
    bio: "[DEMO] พื้นที่สำหรับประวัติย่อ 2–3 ประโยค เล่าว่าคุณเป็นใคร ทำงานด้านไหน และอะไรทำให้ผลงานของคุณแตกต่าง แทนที่ข้อความนี้ด้วยเรื่องจริงของคุณ",
    interests: ["[DEMO] ภาพยนตร์แนวสืบสวน", "[DEMO] การถ่ายภาพกลางคืน", "[DEMO] งานพิมพ์และตัวอักษร"],
    philosophy:
      "[DEMO] แนวคิดในการทำงานของคุณ เช่น วิธีที่คุณเริ่มจากคำถาม ไม่ใช่คำตอบ และเลือกทุกองค์ประกอบด้วยเหตุผล",
    experience: [
      { period: "[DEMO] 20XX — ปัจจุบัน", title: "[DEMO] ตำแหน่ง / บทบาท", org: "[DEMO] องค์กร" },
      { period: "[DEMO] 20XX — 20XX", title: "[DEMO] ตำแหน่ง / บทบาท", org: "[DEMO] องค์กร" },
    ],
    /** ใส่เฉพาะความสำเร็จที่เกิดขึ้นจริงและตรวจสอบได้ */
    achievements: ["[DEMO] ใส่ความสำเร็จจริงที่นี่ หรือลบรายการนี้ออก"],
  },

  /** แสดงเฉพาะช่องทางที่มีในรายการนี้ ลบช่องทางที่ไม่ใช้ออกได้เลย */
  socials: [
    { label: "Email", href: "mailto:hello@example.com", handle: "hello@example.com" },
    { label: "Instagram", href: "https://instagram.com/", handle: "@your.handle" },
    { label: "Behance", href: "https://behance.net/", handle: "/your-handle" },
    { label: "GitHub", href: "https://github.com/", handle: "/your-handle" },
  ] satisfies Social[],

  seo: {
    title: "THE RED ARCHIVE — คลังผลงานลับ",
    description:
      "Portfolio ของนักสร้างสรรค์ผลงาน นักเล่าเรื่องผ่านภาพ และผู้ออกแบบประสบการณ์ดิจิทัล — ทุกผลงานมีเรื่องราว",
    keywords: ["portfolio", "graphic design", "photography", "motion graphics", "web development"],
    locale: "th_TH",
  },
};

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const navItems = [
  { no: "01", label: "หน้าแรก", en: "INDEX", href: "/" },
  { no: "02", label: "คลังผลงาน", en: "CASE FILES", href: "/works" },
  { no: "03", label: "เกี่ยวกับฉัน", en: "THE MIND", href: "/about" },
  { no: "04", label: "ความสามารถ", en: "ARSENAL", href: "/arsenal" },
  { no: "05", label: "ติดต่อฉัน", en: "CONTACT", href: "/contact" },
] as const;

import type { Category, Project } from "./types";

/**
 * ============================================================
 *  คลังผลงาน — เพิ่มผลงานใหม่ได้โดยเพิ่ม object ในอาร์เรย์นี้
 *  หน้า /works และ /works/[slug] จะสร้างให้อัตโนมัติ
 *
 *  ผลงานทั้งหมดด้านล่างคือ "ข้อมูลสาธิต" (demo: true)
 *  ห้ามใส่รางวัล ลูกค้า หรือสถิติที่ไม่มีอยู่จริง
 * ============================================================
 */

const demoNote = "[DEMO] ";

export const projects: Project[] = [
  {
    slug: "night-signal",
    fileNo: "RA-001",
    title: "NIGHT SIGNAL",
    titleTh: "สัญญาณยามค่ำ",
    category: "Event & Creative Project",
    year: 2025,
    role: ["Creative Direction", "Key Visual", "Event Identity"],
    summary: demoNote + "ตัวอย่างโครงการกิจกรรม — ออกแบบธีม ภาพหลัก และประสบการณ์หน้างานทั้งหมด",
    cover: { alt: "แผ่นหลักฐานสาธิตสำหรับโครงการ NIGHT SIGNAL", plate: 0 },
    featured: true,
    demo: true,
    origin: demoNote + "อธิบายที่มาของโครงการ: ใครเป็นผู้ริเริ่ม ปัญหาหรือโจทย์คืออะไร และข้อจำกัดที่ต้องทำงานด้วย",
    concept: demoNote + "อธิบายแนวคิดหลัก: คำสำคัญที่ใช้กำหนดทิศทาง เหตุผลในการเลือกสี ตัวอักษร และองค์ประกอบภาพ",
    process: [
      { title: "ภาพร่างแรก", body: demoNote + "เล่าการสำรวจไอเดียช่วงแรก", media: { alt: "ภาพร่างสาธิต", plate: 3 } },
      { title: "พัฒนาระบบภาพ", body: demoNote + "เล่าการทดลองและการตัดสินใจสำคัญ", media: { alt: "ขั้นตอนสาธิต", plate: 4 } },
    ],
    final: [
      { alt: "ผลงานสาธิตชิ้นที่ 1", plate: 0, caption: "[DEMO] คำบรรยายภาพ" },
      { alt: "ผลงานสาธิตชิ้นที่ 2", plate: 2 },
    ],
    outcome: demoNote + "อธิบายผลลัพธ์ที่เกิดขึ้นจริง เช่น สิ่งที่เปลี่ยนไป หรือคำติชมที่ได้รับ (เฉพาะข้อมูลที่ตรวจสอบได้)",
  },
  {
    slug: "red-room-portraits",
    fileNo: "RA-002",
    title: "RED ROOM",
    titleTh: "ห้องแสงแดง",
    category: "Photography",
    year: 2025,
    role: ["Photographer", "Lighting", "Retouch"],
    summary: demoNote + "ตัวอย่างชุดภาพบุคคลจัดแสงสีแดงแบบภาพยนตร์",
    cover: { alt: "แผ่นหลักฐานสาธิตสำหรับชุดภาพ RED ROOM", plate: 1 },
    demo: true,
    origin: demoNote + "ที่มาของชุดภาพนี้",
    concept: demoNote + "แนวคิดการจัดแสงและอารมณ์ภาพ",
    process: [{ title: "ผังไฟ", body: demoNote + "อธิบายการวางไฟและอุปกรณ์", media: { alt: "ผังไฟสาธิต", plate: 5 } }],
    final: [
      { alt: "ภาพสาธิต 1", plate: 1 },
      { alt: "ภาพสาธิต 2", plate: 2 },
    ],
    outcome: demoNote + "ผลลัพธ์ของชุดภาพ",
  },
  {
    slug: "the-last-frame",
    fileNo: "RA-003",
    title: "THE LAST FRAME",
    titleTh: "เฟรมสุดท้าย",
    category: "Video Production",
    year: 2024,
    role: ["Director", "Editor", "Colorist"],
    summary: demoNote + "ตัวอย่างหนังสั้นแนวสืบสวน ตั้งแต่บทจนถึงเกรดสี",
    cover: { alt: "แผ่นหลักฐานสาธิตสำหรับ THE LAST FRAME", plate: 2 },
    demo: true,
    origin: demoNote + "ที่มาของโปรเจกต์วิดีโอ",
    concept: demoNote + "แนวคิดการเล่าเรื่องและภาษาภาพ",
    process: [
      { title: "สตอรีบอร์ด", body: demoNote + "เล่าการวางช็อต", media: { alt: "สตอรีบอร์ดสาธิต", plate: 3 } },
      { title: "เกรดสี", body: demoNote + "เล่าการกำหนดโทนสี" },
    ],
    final: [{ alt: "เฟรมสาธิตจากวิดีโอ", plate: 2 }],
    outcome: demoNote + "ผลลัพธ์ของวิดีโอ",
  },
  {
    slug: "glitch-ritual",
    fileNo: "RA-004",
    title: "GLITCH RITUAL",
    titleTh: "พิธีกรรมดิจิทัล",
    category: "Motion Graphics",
    year: 2024,
    role: ["Motion Design", "Sound Sync"],
    summary: demoNote + "ตัวอย่างงาน Motion Graphics ไตเติลเปิดกิจกรรม",
    cover: { alt: "แผ่นหลักฐานสาธิตสำหรับ GLITCH RITUAL", plate: 4 },
    demo: true,
    origin: demoNote + "ที่มาของงานโมชัน",
    concept: demoNote + "แนวคิดจังหวะและการเคลื่อนไหว",
    process: [{ title: "Styleframes", body: demoNote + "เฟรมกำหนดสไตล์", media: { alt: "สไตล์เฟรมสาธิต", plate: 0 } }],
    final: [{ alt: "เฟรมสาธิตจากงานโมชัน", plate: 4 }],
    outcome: demoNote + "ผลลัพธ์ของงาน",
  },
  {
    slug: "archive-type",
    fileNo: "RA-005",
    title: "ARCHIVE TYPE",
    titleTh: "ตัวอักษรแห่งแฟ้มลับ",
    category: "Graphic Design",
    year: 2024,
    role: ["Graphic Designer", "Typography"],
    summary: demoNote + "ตัวอย่างชุดโปสเตอร์ทดลองตัวอักษรไทย–อังกฤษ",
    cover: { alt: "แผ่นหลักฐานสาธิตสำหรับ ARCHIVE TYPE", plate: 3 },
    featured: true,
    demo: true,
    origin: demoNote + "ที่มาของชุดโปสเตอร์",
    concept: demoNote + "แนวคิดการจัดวางตัวอักษร",
    process: [{ title: "ทดลองกริด", body: demoNote + "การทดลองโครงสร้างหน้า", media: { alt: "กริดสาธิต", plate: 5 } }],
    final: [
      { alt: "โปสเตอร์สาธิต 1", plate: 3 },
      { alt: "โปสเตอร์สาธิต 2", plate: 1 },
    ],
    outcome: demoNote + "ผลลัพธ์ของงาน",
  },
  {
    slug: "case-index",
    fileNo: "RA-006",
    title: "CASE INDEX",
    titleTh: "ดัชนีคดี",
    category: "Web Development",
    year: 2025,
    role: ["UI/UX", "Frontend Developer"],
    summary: demoNote + "ตัวอย่างเว็บไซต์แบบ Interactive Storytelling",
    cover: { alt: "แผ่นหลักฐานสาธิตสำหรับ CASE INDEX", plate: 5 },
    demo: true,
    origin: demoNote + "ที่มาของเว็บไซต์",
    concept: demoNote + "แนวคิด UX และการเคลื่อนไหว",
    process: [{ title: "Wireframe", body: demoNote + "โครงหน้าแรก", media: { alt: "ไวร์เฟรมสาธิต", plate: 4 } }],
    final: [{ alt: "หน้าจอสาธิต", plate: 5 }],
    outcome: demoNote + "ผลลัพธ์ของเว็บไซต์",
    links: [{ label: "[DEMO] ลิงก์ตัวอย่าง (ยังไม่มีปลายทางจริง)", href: "#" }],
  },
];

export const categories: Category[] = [
  "Graphic Design",
  "Photography",
  "Video Production",
  "Motion Graphics",
  "Web Development",
  "Event & Creative Project",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

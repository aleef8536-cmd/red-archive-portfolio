export type Category =
  | "Graphic Design"
  | "Photography"
  | "Video Production"
  | "Motion Graphics"
  | "Web Development"
  | "Event & Creative Project";

/**
 * ภาพ/สื่อของผลงาน
 * - ถ้ามี `src` จะแสดงด้วย next/image (วางไฟล์ไว้ใน /public/works/...)
 * - ถ้าไม่มี `src` จะแสดง "แผ่นหลักฐาน" แบบกราฟิกสาธิตแทน (ไม่ใช้ภาพที่มีลิขสิทธิ์)
 */
export type Media = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  /** ใช้ลายของแผ่นสาธิต 0–5 เมื่อไม่มีรูปจริง */
  plate?: number;
  /** วิดีโอ (mp4) — จะโหลดเมื่อเลื่อนมาถึงเท่านั้น */
  video?: string;
  caption?: string;
};

export type Project = {
  slug: string;
  fileNo: string;
  title: string;
  titleTh?: string;
  category: Category;
  year: number;
  role: string[];
  summary: string;
  cover: Media;
  featured?: boolean;
  /** true = เป็นข้อมูลสาธิต ให้แทนที่ด้วยข้อมูลจริง */
  demo?: boolean;
  origin: string;
  concept: string;
  process: { title: string; body: string; media?: Media }[];
  final: Media[];
  /** ผลลัพธ์ที่เกิดขึ้นจริงเท่านั้น — ห้ามแต่งตัวเลขขึ้นเอง */
  outcome: string;
  links?: { label: string; href: string }[];
};

export type SkillGroup = {
  no: string;
  title: string;
  titleEn: string;
  description: string;
  tools: string[];
  practices: string[];
};

export type Social = {
  label: "Email" | "Instagram" | "Facebook" | "Behance" | "GitHub";
  href: string;
  handle: string;
};

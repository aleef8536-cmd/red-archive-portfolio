import type { SkillGroup } from "./types";

/** [DEMO] ปรับรายการเครื่องมือให้ตรงกับที่คุณใช้จริง */
export const skills: SkillGroup[] = [
  {
    no: "01",
    title: "การออกแบบกราฟิก",
    titleEn: "GRAPHIC DESIGN",
    description: "อัตลักษณ์แบรนด์ โปสเตอร์ งานพิมพ์ และระบบตัวอักษร",
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma"],
    practices: ["Brand Identity", "Poster & Key Visual", "Editorial Layout", "Typography"],
  },
  {
    no: "02",
    title: "การตัดต่อวิดีโอ",
    titleEn: "VIDEO EDITING",
    description: "ตัดต่อเล่าเรื่อง เกรดสี และออกแบบเสียงประกอบ",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve", "CapCut"],
    practices: ["Narrative Editing", "Color Grading", "Sound Design"],
  },
  {
    no: "03",
    title: "การถ่ายภาพ",
    titleEn: "PHOTOGRAPHY",
    description: "ภาพบุคคล ภาพกิจกรรม และการจัดแสงแบบภาพยนตร์",
    tools: ["Adobe Lightroom", "Capture One"],
    practices: ["Portrait", "Event Coverage", "Low-light & Cinematic Lighting"],
  },
  {
    no: "04",
    title: "การออกแบบเว็บไซต์",
    titleEn: "WEB DESIGN & DEV",
    description: "ออกแบบ UI/UX และพัฒนาเว็บไซต์ที่มีการเคลื่อนไหว",
    tools: ["Figma", "Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    practices: ["UI/UX Design", "Interaction Design", "Frontend Development"],
  },
  {
    no: "05",
    title: "การสร้างสรรค์กิจกรรม",
    titleEn: "CREATIVE EVENTS",
    description: "ออกแบบประสบการณ์ ธีมงาน และสื่อประกอบกิจกรรม",
    tools: ["Miro", "Notion", "Canva"],
    practices: ["Concept & Theme", "Experience Design", "On-site Visual System"],
  },
  {
    no: "06",
    title: "การบริหารโครงการ",
    titleEn: "PROJECT MANAGEMENT",
    description: "วางแผน ประสานทีม และส่งมอบงานตามกำหนด",
    tools: ["Notion", "Google Workspace", "Trello"],
    practices: ["Planning & Timeline", "Team Coordination", "Stakeholder Communication"],
  },
];

# THE RED ARCHIVE — คลังผลงานลับ

เว็บไซต์ Portfolio แนว Cinematic Brutalism × Dark Editorial × Mystery Archive
สร้างด้วย Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Motion for React · Lenis · Lucide

> ⚠️ ข้อมูล ภาพ และช่องทางติดต่อทั้งหมดเป็น **ข้อมูลสาธิต [DEMO]** — ภาพผลงานเป็นกราฟิก SVG ที่สร้างขึ้นด้วยโค้ด (ไม่มีภาพลิขสิทธิ์ภายนอก)

---

## 1. ติดตั้งและรัน

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # ตรวจสอบ build สำหรับ production
npm start
```

ต้องใช้ Node.js 18.18 ขึ้นไป

## 2. เปลี่ยนข้อมูลส่วนตัว (ไม่ต้องแตะโค้ดหน้าเว็บ)

| ไฟล์ | สิ่งที่แก้ |
|---|---|
| `src/data/site.ts` | ชื่อ, บทบาท, ประวัติ, ความสนใจ, ประสบการณ์, ความสำเร็จ, รูปโปรไฟล์, ไฟล์ CV, ช่องทางติดต่อ, SEO |
| `src/data/projects.ts` | รายการผลงานทั้งหมด |
| `src/data/skills.ts` | หมวดความสามารถและเครื่องมือ |

เมื่อใส่ข้อมูลจริงครบแล้ว ตั้ง `demoMode: false` ใน `site.ts` เพื่อซ่อนแถบ "DEMO DATA"

- **รูปโปรไฟล์**: วางไฟล์ที่ `public/profile.jpg` แล้วตั้ง `owner.portrait: "/profile.jpg"`
- **CV**: วางไฟล์ที่ `public/cv.pdf` แล้วตั้ง `owner.cvUrl: "/cv.pdf"` (ถ้าว่าง ปุ่มดาวน์โหลดจะปิดใช้งานพร้อมคำอธิบาย)
- **ช่องทางติดต่อ**: แสดงเฉพาะรายการที่อยู่ใน `socials` — ลบรายการที่ไม่ใช้ออกได้เลย (รองรับ Email, Instagram, Facebook, Behance, GitHub)

## 3. เพิ่มผลงานใหม่

เพิ่ม object ใหม่ใน `projects` (`src/data/projects.ts`) — หน้า `/works`, `/works/<slug>`, sitemap และ metadata จะสร้างให้อัตโนมัติ

```ts
{
  slug: "my-new-project",          // ใช้เป็น URL
  fileNo: "RA-007",
  title: "PROJECT TITLE",
  titleTh: "ชื่อภาษาไทย",
  category: "Photography",          // ต้องเป็นหนึ่งใน categories
  year: 2026,
  role: ["Photographer"],
  summary: "คำอธิบายสั้น",
  cover: { src: "/works/my-new-project/cover.jpg", alt: "คำอธิบายภาพ" },
  featured: false,                  // true = แสดงเต็มความกว้าง
  origin: "...", concept: "...",
  process: [{ title: "...", body: "...", media: { src: "/works/.../sketch.jpg", alt: "..." } }],
  final: [{ src: "/works/.../final-1.jpg", alt: "...", caption: "..." }, { video: "/works/.../reel.mp4", alt: "..." }],
  outcome: "ผลลัพธ์ที่เกิดขึ้นจริงเท่านั้น",
  links: [{ label: "ดูเว็บไซต์", href: "https://..." }],
}
```

- รูปภาพใช้ `next/image` (บีบอัดเป็น AVIF/WebP และ lazy-load อัตโนมัติ) — แนะนำความกว้าง 2000px
- วิดีโอ (`video`) โหลดเฉพาะเมื่อเลื่อนมาใกล้ และหยุดเมื่อพ้นจอ
- ถ้าไม่ใส่ `src` จะแสดงแผ่นกราฟิกสาธิต (`plate: 0–5`)
- **ห้ามใส่รางวัล ลูกค้า หรือสถิติที่ไม่มีอยู่จริง**

## 4. เชื่อมต่อฟอร์มติดต่อ

ฟอร์มส่งข้อมูลไปที่ `/api/contact` ซึ่งตรวจสอบข้อมูลแล้วส่งต่อไปยัง `CONTACT_FORM_ENDPOINT`

1. สมัคร [Formspree](https://formspree.io) (หรือบริการที่รับ JSON POST) แล้วคัดลอก endpoint
2. ตั้งค่า environment variable `CONTACT_FORM_ENDPOINT` (ดู `.env.example`)

ถ้ายังไม่ตั้งค่า ฟอร์มจะแจ้งว่า "ระบบส่งข้อความยังไม่ได้เชื่อมต่อ" พร้อมลิงก์อีเมล — **จะไม่แสดงว่าส่งสำเร็จ**

## 5. เผยแพร่ผ่าน Vercel

1. Push โปรเจกต์ขึ้น GitHub
2. ที่ vercel.com → **Add New Project** → เลือก repo (Framework: Next.js ตรวจพบอัตโนมัติ)
3. ใน **Environment Variables** เพิ่ม
   - `NEXT_PUBLIC_SITE_URL` = โดเมนจริง เช่น `https://yourname.com` (ใช้กับ canonical, sitemap, Open Graph)
   - `CONTACT_FORM_ENDPOINT` = endpoint ของฟอร์ม
4. Deploy

## 6. โครงสร้างโปรเจกต์

```
src/
  app/                 หน้าเว็บ (App Router) + sitemap, robots, OG image, API
    works/[slug]/      หน้า Case Study (static generation)
  components/
    chrome/            Intro, Header + เมนูเต็มจอ, Cursor, Footer
    providers/         Lenis smooth scroll + Cinematic page transition
    motion/            Reveal (mask), Kinetic typography, Parallax
    sections/          Hero, Story (scroll storytelling), Arsenal, ContactForm
    works/             CaseCard, CaseGrid (กรองประเภท)
    media/             ArchiveMedia (Image/Video/Plate), Plate (SVG สาธิต)
  data/                ข้อมูลทั้งหมดของเว็บไซต์
  lib/                 GSAP setup, intro helpers
```

## 7. ระบบการเคลื่อนไหวและการเข้าถึง

- Intro เล่นครั้งเดียวต่อเซสชัน ข้ามได้ด้วยปุ่ม / Esc / Enter
- `prefers-reduced-motion`: ปิด Intro, Lenis, parallax, scroll pin, cursor lag และ transition
- มือถือ: ไม่มี custom cursor / magnetic / mouse parallax, ลด parallax ครึ่งหนึ่ง, Scroll Story แสดงแบบซ้อนแทนการปักหมุด
- เมนู: ปิดด้วย Esc, Tab วนในเมนู, คืน focus ไปยังปุ่ม MENU
- ทุก animation ใช้ `useGSAP` / `gsap.context` ซึ่งทำความสะอาดตัวเองเมื่อ component ถูกปิด
- Three.js ไม่ได้ใช้ในเวอร์ชันนี้ เพราะเอฟเฟกต์ทั้งหมดทำได้ด้วย CSS/SVG/GSAP ที่เบากว่า — หากต้องการฉาก 3D ให้เพิ่มด้วย `next/dynamic` (`ssr: false`) เพื่อไม่ให้กระทบเวลาโหลด

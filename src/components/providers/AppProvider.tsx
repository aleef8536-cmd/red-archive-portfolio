"use client";
import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Ctx = {
  navigate: (href: string) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  lenis: React.RefObject<Lenis | null>;
};

const AppCtx = createContext<Ctx | null>(null);
export const useApp = () => {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be used inside <AppProvider>");
  return c;
};

/**
 * - Lenis smooth scroll (ปิดเมื่อผู้ใช้ตั้งค่าลดการเคลื่อนไหว)
 * - Cinematic page transition: แผ่นสีแดงเข้มเลื่อนปิด → เปลี่ยนหน้า → เลื่อนเปิด
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pending = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const l = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    lenis.current = l;
    if (document.documentElement.getAttribute("data-intro") === "playing") l.stop();
    l.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  // หยุด scroll เมื่อเปิดเมนู
  const wasOpen = useRef(false);
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      lenis.current?.stop();
      document.documentElement.style.overflow = "hidden";
    } else if (wasOpen.current) {
      wasOpen.current = false;
      lenis.current?.start();
      document.documentElement.style.overflow = "";
    }
  }, [menuOpen]);

  const navigate = useCallback(
    (href: string) => {
      const target = href.split("#")[0] || "/";
      setMenuOpen(false);
      if (target === pathname) {
        lenis.current ? lenis.current.scrollTo(0) : window.scrollTo({ top: 0 });
        return;
      }
      if (prefersReducedMotion() || !curtain.current) {
        router.push(href);
        return;
      }
      pending.current = true;
      if (label.current) label.current.textContent = `OPENING ${target === "/" ? "INDEX" : target.replace(/\//g, " / ").toUpperCase()}`;
      gsap.killTweensOf(curtain.current);
      gsap.fromTo(
        curtain.current,
        { yPercent: 101 },
        { yPercent: 0, duration: 0.6, ease: "power4.inOut", onComplete: () => router.push(href) }
      );
    },
    [pathname, router]
  );

  // เมื่อหน้าเปลี่ยนแล้ว: กลับไปบนสุด และเปิดม่าน
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    if (!lenis.current) window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    if (pending.current && curtain.current) {
      pending.current = false;
      gsap.to(curtain.current, {
        yPercent: -101,
        duration: 0.75,
        delay: 0.1,
        ease: "power4.inOut",
        onComplete: () => { gsap.set(curtain.current, { yPercent: 101 }); },
      });
    }
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <AppCtx.Provider value={{ navigate, menuOpen, setMenuOpen, lenis }}>
      {children}
      <div ref={curtain} className="curtain" aria-hidden="true">
        <span ref={label} className="t-mono" style={{ color: "var(--bone-dim)" }} />
      </div>
    </AppCtx.Provider>
  );
}

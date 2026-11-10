"use client";
import { useEffect, useRef, useState } from "react";

/** โหลดวิดีโอเมื่อเลื่อนเข้าใกล้หน้าจอเท่านั้น และหยุดเล่นเมื่อพ้นจอ */
export function LazyVideo({ src, label, className }: { src: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          if (!reduce) el.play().catch(() => {});
        } else el.pause();
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} className={className} muted loop playsInline preload="none" aria-label={label} controls={false}>
      {load && <source src={src} type="video/mp4" />}
    </video>
  );
}

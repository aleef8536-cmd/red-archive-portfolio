"use client";
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useApp } from "@/components/providers/AppProvider";

/** ลิงก์ภายในที่เล่น Cinematic Page Transition — ยังรองรับ Ctrl/Cmd+คลิก เปิดแท็บใหม่ */
export function TLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const { navigate } = useApp();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };
  return <Link href={href} onClick={handle} {...rest} />;
}

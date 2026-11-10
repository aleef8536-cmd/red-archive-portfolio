export const INTRO_KEY = "ra-intro-seen";
export const INTRO_EVENT = "ra:intro-done";

/** สคริปต์ที่รันก่อน paint เพื่อไม่ให้ Intro กระพริบเมื่อเคยดูแล้วในเซสชันนี้ หรือผู้ใช้ลดการเคลื่อนไหว */
export const introBootScript = `try{var d=document.documentElement;if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-intro","seen")}else{d.setAttribute("data-intro","playing")}}catch(e){document.documentElement.setAttribute("data-intro","seen")}`;

export function onIntroDone(cb: () => void) {
  if (typeof document === "undefined") return () => {};
  if (document.documentElement.getAttribute("data-intro") !== "playing") {
    cb();
    return () => {};
  }
  const h = () => cb();
  window.addEventListener(INTRO_EVENT, h, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, h);
}

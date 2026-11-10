/**
 * Plate — "แผ่นหลักฐาน" กราฟิกสาธิตแบบ procedural (SVG ล้วน ไม่มีลิขสิทธิ์ภายนอก)
 * ใช้แทนภาพจริงจนกว่าเจ้าของเว็บไซต์จะใส่รูปผลงานของตัวเอง
 */
type Props = { variant?: number; label?: string; uid: string; className?: string };

export function Plate({ variant = 0, label, uid, className = "" }: Props) {
  const v = ((variant % 6) + 6) % 6;
  const id = `p${uid.replace(/[^a-z0-9]/gi, "")}${v}`;
  return (
    <div className={`plate ${className}`} aria-hidden="true">
      <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`${id}-spot`} cx="50%" cy="30%" r="65%">
            <stop offset="0" stopColor="#d72b3b" stopOpacity=".85" />
            <stop offset=".35" stopColor="#8e1824" stopOpacity=".55" />
            <stop offset="1" stopColor="#09090b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#09090b" stopOpacity="0" />
            <stop offset="1" stopColor="#09090b" stopOpacity=".95" />
          </linearGradient>
          <filter id={`${id}-fog`}>
            <feTurbulence type="fractalNoise" baseFrequency=".006 .012" numOctaves="3" seed={v + 3} />
            <feColorMatrix values="0 0 0 0 .55  0 0 0 0 .08  0 0 0 0 .12  0 0 0 .5 0" />
          </filter>
          <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="18" /></filter>
        </defs>

        <rect width="800" height="1000" fill="#16090d" />
        <rect width="800" height="1000" filter={`url(#${id}-fog)`} opacity=".9" />

        {v === 0 && (
          <g>
            <ellipse cx="400" cy="300" rx="420" ry="520" fill={`url(#${id}-spot)`} />
            <path d="M400 330c-58 0-96 46-96 108 0 46 22 82 50 98-96 22-176 92-196 214l-12 250h508l-12-250c-20-122-100-192-196-214 28-16 50-52 50-98 0-62-38-108-96-108z" fill="#09090b" />
            <path d="M400 330c-58 0-96 46-96 108" stroke="#d72b3b" strokeWidth="3" fill="none" opacity=".8" filter={`url(#${id}-blur)`} />
          </g>
        )}
        {v === 1 && (
          <g>
            <rect x="520" y="0" width="70" height="1000" fill="#d72b3b" opacity=".75" filter={`url(#${id}-blur)`} />
            <rect x="548" y="0" width="12" height="1000" fill="#e7e2dd" opacity=".5" />
            <path d="M300 380c-44 0-74 38-74 88 0 36 16 64 38 78-80 20-130 80-146 180l-18 274h400l-18-274c-16-100-66-160-146-180 22-14 38-42 38-78 0-50-30-88-74-88z" fill="#09090b" />
            <path d="M374 468c0 36-16 64-38 78 80 20 130 80 146 180" stroke="#d72b3b" strokeWidth="5" fill="none" opacity=".9" />
          </g>
        )}
        {v === 2 && (
          <g>
            <circle cx="400" cy="560" r="190" fill="#8e1824" />
            <circle cx="400" cy="560" r="190" fill="#d72b3b" opacity=".5" filter={`url(#${id}-blur)`} />
            <rect y="600" width="800" height="400" fill="#09090b" />
            {Array.from({ length: 22 }).map((_, i) => (
              <rect key={i} y={i * 28 + 300} width="800" height="2" fill="#09090b" opacity=".55" />
            ))}
            <rect x="60" y="80" width="680" height="840" fill="none" stroke="#e7e2dd" strokeOpacity=".18" />
          </g>
        )}
        {v === 3 && (
          <g fontFamily="Anton, Impact, sans-serif" fill="#8e1824">
            <text x="-20" y="420" fontSize="440" letterSpacing="-10">R</text>
            <text x="300" y="820" fontSize="440" fill="#d72b3b" opacity=".85">A</text>
            <rect x="60" y="470" width="680" height="3" fill="#e7e2dd" opacity=".5" />
            <text x="60" y="520" fontSize="28" fill="#e7e2dd" fontFamily="monospace" opacity=".7" letterSpacing="6">CLASSIFIED / TYPE STUDY</text>
          </g>
        )}
        {v === 4 && (
          <g>
            {Array.from({ length: 16 }).map((_, i) => {
              const y = (i * 61) % 1000;
              const w = 160 + ((i * 137) % 520);
              const x = (i * 211) % (800 - w / 2);
              return <rect key={i} x={x} y={y} width={w} height={8 + (i % 4) * 14} fill={i % 3 ? "#8e1824" : "#d72b3b"} opacity={0.35 + (i % 5) * 0.12} />;
            })}
            <circle cx="400" cy="500" r="150" fill="none" stroke="#e7e2dd" strokeOpacity=".5" strokeWidth="2" />
          </g>
        )}
        {v === 5 && (
          <g stroke="#e7e2dd" strokeOpacity=".16" fill="none">
            {Array.from({ length: 11 }).map((_, i) => <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="1000" />)}
            {Array.from({ length: 13 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 80} x2="800" y2={i * 80} />)}
            <rect x="160" y="240" width="480" height="300" stroke="#d72b3b" strokeOpacity=".9" strokeWidth="3" />
            <rect x="160" y="580" width="220" height="180" stroke="#c5a35b" strokeOpacity=".7" />
            <rect x="420" y="580" width="220" height="180" stroke="#c5a35b" strokeOpacity=".7" />
            <circle cx="400" cy="390" r="70" fill="#8e1824" fillOpacity=".7" stroke="none" />
          </g>
        )}

        <rect width="800" height="1000" fill={`url(#${id}-fade)`} />
        <g fontFamily="monospace" fontSize="20" fill="#e7e2dd" opacity=".55" letterSpacing="4">
          <text x="40" y="60">{`EVIDENCE ${String(v + 1).padStart(2, "0")}`}</text>
          <text x="760" y="60" textAnchor="end">DEMO PLATE</text>
          {label && <text x="40" y="960">{label}</text>}
        </g>
      </svg>
    </div>
  );
}

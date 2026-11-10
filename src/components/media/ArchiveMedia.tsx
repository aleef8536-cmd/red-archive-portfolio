import Image from "next/image";
import type { Media } from "@/data/types";
import { Plate } from "./Plate";
import { LazyVideo } from "./LazyVideo";

type Props = {
  media: Media;
  uid: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  label?: string;
};

/** แสดงรูปจริงด้วย next/image, วิดีโอแบบ lazy หรือแผ่นสาธิตเมื่อยังไม่มีไฟล์ */
export function ArchiveMedia({ media, uid, sizes = "100vw", priority, className = "", label }: Props) {
  if (media.video) {
    return <LazyVideo src={media.video} label={media.alt} className={`h-full w-full object-cover ${className}`} />;
  }
  if (media.src) {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <>
      <Plate variant={media.plate ?? 0} uid={uid} label={label} className={`absolute inset-0 ${className}`} />
      <span className="sr-only">{media.alt}</span>
    </>
  );
}

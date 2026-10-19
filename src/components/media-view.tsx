import type { Media } from "@/lib/content-types";

export function MediaView({ m, className, controls }: { m: Media; className?: string; controls?: boolean }) {
  if (m.type === "video")
    return <video src={m.src} className={className} autoPlay muted loop playsInline controls={controls} aria-label={m.alt} />;
  return <img src={m.src} alt={m.alt} loading="lazy" className={className} />;
}

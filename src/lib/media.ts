// Auto-loads every photo/video dropped into src/media/**. See src/media/README.md.
import type { Media } from "./content-types";

const files = import.meta.glob("/src/media/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,mp4,webm,MP4}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const isVideo = (p: string) => /\.(mp4|webm)$/i.test(p);

export function mediaIn(folder: string): Media[] {
  const prefix = `/src/media/${folder}/`;
  return Object.keys(files)
    .filter((p) => p.startsWith(prefix) && !p.slice(prefix.length).includes("/"))
    .sort()
    .map((p) => {
      const name = p.slice(prefix.length).replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]/g, " ");
      return { src: files[p]!, alt: name || folder, w: 1200, h: 1500, type: isVideo(p) ? "video" : "image" };
    });
}

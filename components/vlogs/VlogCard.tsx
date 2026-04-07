import Image from "next/image";
import { VlogItem } from "@/data/vlogs";

export default function VlogCard({ youtubeId, title, channel }: VlogItem) {
  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "16/9", background: "#1a1a1a" }}
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />

        {/* Dark overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-40"
          style={{ background: "#1a1a1a" }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
            style={{ background: "rgba(251, 215, 69, 0.92)" }}
          >
            {/* Triangle */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: "2px" }}
            >
              <path d="M4 2L14 8L4 14V2Z" fill="#1a1a1a" />
            </svg>
          </div>
        </div>

        {/* Channel badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(26, 26, 26, 0.7)",
              color: "#f5f0e8",
              fontFamily: "var(--font-mono), monospace",
              backdropFilter: "blur(8px)",
            }}
          >
            {channel}
          </span>
        </div>
      </div>

      {/* Title row */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-[#1a1a1a] leading-snug group-hover:text-[#6b5040] transition-colors line-clamp-2">
          {title}
        </h3>
        <span
          className="text-xs text-[#a09890] flex-shrink-0 mt-0.5 transition-colors group-hover:text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          watch _
        </span>
      </div>
    </a>
  );
}

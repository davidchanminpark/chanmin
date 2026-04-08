"use client";

import Image from "next/image";
import { useState } from "react";
import { VlogItem } from "@/data/vlogs";
import { formatDurationClock } from "@/lib/duration";

export default function VlogCard({
  youtubeId,
  title,
  durationSeconds,
  featured = false,
}: VlogItem & { featured?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(
    `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  );
  const durationLabel = formatDurationClock(durationSeconds);

  return (
    <article
      data-square-blocker
      className="group rounded-2xl p-3 md:p-4 transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: featured ? "var(--surface-high)" : "var(--surface-low)",
        border: featured
          ? "1px solid var(--primary)"
          : "1px solid var(--outline-variant)",
        boxShadow: featured ? "0 10px 30px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "16/9", background: "var(--surface-highest)" }}
      >
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 block h-full w-full cursor-pointer text-left"
            aria-label={`Play ${title}`}
          >
            <Image
              src={thumbnailSrc}
              alt={title}
              fill
              className="object-cover"
              sizes={featured ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 100vw, 50vw"}
              unoptimized
              priority={featured}
              onError={() => {
                if (thumbnailSrc.includes("maxresdefault")) {
                  setThumbnailSrc(
                    `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                  );
                }
              }}
            />
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(180deg, rgba(26,22,20,0.08) 0%, rgba(26,22,20,0.3) 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border"
                style={{
                  background: "rgba(255,252,247,0.82)",
                  borderColor: "rgba(255,252,247,0.65)",
                  backdropFilter: "blur(12px)",
                  color: "var(--primary)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: "2px" }}
                >
                  <path d="M5 3.5L16 10L5 16.5V3.5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <h3
          className={`font-semibold leading-snug transition-colors ${
            featured ? "text-lg md:text-xl line-clamp-3" : "text-sm line-clamp-2"
          }`}
          style={{ color: "var(--on-surface)" }}
        >
          {title}
        </h3>
        {durationLabel && (
          <span
            className="text-xs flex-shrink-0 mt-0.5"
            style={{ color: "var(--outline)" }}
          >
            {durationLabel}
          </span>
        )}
      </div>
    </article>
  );
}

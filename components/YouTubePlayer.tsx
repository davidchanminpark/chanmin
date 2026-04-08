"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_CHAIN = ["maxresdefault", "sddefault", "hqdefault"] as const;

function thumbnailUrl(videoId: string, quality: string) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export default function YouTubePlayer({
  videoId,
  title,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  videoId: string;
  title: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [qualityIdx, setQualityIdx] = useState(0);

  const src = thumbnailUrl(videoId, FALLBACK_CHAIN[qualityIdx]);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        className="h-full w-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className="absolute inset-0 block h-full w-full cursor-pointer text-left"
      aria-label={`Play ${title}`}
    >
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover"
        sizes={sizes}
        unoptimized
        priority={priority}
        onError={() => {
          if (qualityIdx < FALLBACK_CHAIN.length - 1) {
            setQualityIdx(qualityIdx + 1);
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
  );
}

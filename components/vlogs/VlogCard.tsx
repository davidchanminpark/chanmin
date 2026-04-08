import { VlogItem } from "@/data/vlogs";
import { formatDurationClock } from "@/lib/duration";
import YouTubePlayer from "@/components/YouTubePlayer";
import MediaFrame from "@/components/MediaFrame";

export default function VlogCard({
  youtubeId,
  title,
  durationSeconds,
  featured = false,
}: VlogItem & { featured?: boolean }) {
  const durationLabel = formatDurationClock(durationSeconds);

  return (
    <MediaFrame as="article" featured={featured} className="rounded-2xl p-3 md:p-4">
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "16/9", background: "var(--surface-highest)" }}
      >
        <YouTubePlayer
          videoId={youtubeId}
          title={title}
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 80vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          priority={featured}
        />
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
    </MediaFrame>
  );
}

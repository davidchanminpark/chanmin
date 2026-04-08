import { MusicItem } from "@/data/music";
import { formatDurationClock } from "@/lib/duration";
import YouTubePlayer from "@/components/YouTubePlayer";
import MediaFrame from "@/components/MediaFrame";

export default function MediaCard({
  type,
  embedId,
  title,
  roles,
  subtype,
  durationSeconds,
}: MusicItem) {
  const durationLabel = formatDurationClock(durationSeconds);

  if (type === "youtube") {
    return (
      <MediaFrame className="flex-shrink-0 w-[30.8rem] max-w-[93vw] rounded-2xl p-3 md:p-4 flex flex-col gap-3">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ aspectRatio: "16/9", background: "var(--surface-highest)" }}
        >
          <YouTubePlayer
            videoId={embedId}
            title={title}
            sizes="(max-width: 768px) 93vw, 30.8rem"
          />
        </div>
        <div className="flex items-center justify-between gap-2 px-1">
          <p
            className="text-xs truncate"
            style={{ color: "var(--on-surface-variant)" }}
            title={title}
          >
            {title}
          </p>
          {durationLabel && (
            <span
              className="text-xs flex-shrink-0"
              style={{ color: "var(--outline)" }}
            >
              {durationLabel}
            </span>
          )}
        </div>
      </MediaFrame>
    );
  }

  if (type === "spotify") {
    return (
      <MediaFrame className="flex-shrink-0 w-[19.8rem] flex flex-col rounded-xl overflow-hidden">
        <iframe
          src={`https://open.spotify.com/embed/track/${embedId}`}
          title={title}
          width="317"
          height="167"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        {roles && roles.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-3 py-3">
            {roles.map((role) => (
              <span
                key={role}
                className="text-xs px-2.5 py-0.5 rounded-full"
                style={{
                  background: "var(--primary-container)",
                  color: "var(--primary)",
                }}
              >
                {role}
              </span>
            ))}
          </div>
        )}
      </MediaFrame>
    );
  }

  if (type === "instagram") {
    const permalink =
      subtype === "reel"
        ? `https://www.instagram.com/reel/${embedId}/`
        : `https://www.instagram.com/p/${embedId}/`;
    return (
      <MediaFrame className="flex-shrink-0 w-[17.6rem] rounded-2xl p-3 md:p-4 flex flex-col gap-2">
        <div
          style={{
            position: "relative",
            height: "440px",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          <div
            style={{ position: "absolute", top: "-30px", left: "-40px", right: "0px", transform: "scale(1.1)", transformOrigin: "center center" }}
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={permalink}
              data-instgrm-version="14"
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-1">
          <span
            className="text-xs truncate"
            style={{ color: "var(--on-surface-variant)" }}
            title={title}
          >
            {title}
          </span>
          {durationLabel && (
            <span
              className="text-xs flex-shrink-0 ml-2"
              style={{ color: "var(--outline)" }}
            >
              {durationLabel}
            </span>
          )}
        </div>
      </MediaFrame>
    );
  }

  return null;
}

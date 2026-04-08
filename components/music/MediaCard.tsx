import { MusicItem } from "@/data/music";
import { formatDurationClock } from "@/lib/duration";

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
      <div
        data-square-blocker
        className="group flex-shrink-0 w-[30.8rem] max-w-[93vw] rounded-2xl p-3 md:p-4 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1"
        style={{
          background: "var(--surface-low)",
          border: "1px solid var(--outline-variant)",
        }}
      >
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--surface-highest)" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${embedId}`}
            title={title}
            width="493"
            height="277"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
      </div>
    );
  }

  if (type === "spotify") {
    return (
      <div
        data-square-blocker
        className="group flex-shrink-0 w-[19.8rem] flex flex-col rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
        style={{
          background: "var(--surface-low)",
          border: "1px solid var(--outline-variant)",
        }}
      >
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
      </div>
    );
  }

  if (type === "instagram") {
    const permalink =
      subtype === "reel"
        ? `https://www.instagram.com/reel/${embedId}/`
        : `https://www.instagram.com/p/${embedId}/`;
    return (
      <div
        data-square-blocker
        className="group flex-shrink-0 w-[17.6rem] rounded-2xl p-3 md:p-4 flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-1"
        style={{
          background: "var(--surface-low)",
          border: "1px solid var(--outline-variant)",
        }}
      >
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
      </div>
    );
  }

  return null;
}

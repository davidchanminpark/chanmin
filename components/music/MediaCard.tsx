import Script from "next/script";
import { MusicItem } from "@/data/music";

export default function MediaCard({
  type,
  embedId,
  title,
  roles,
  subtype,
  views,
}: MusicItem) {
  if (type === "youtube") {
    return (
      <div className="flex-shrink-0 w-72 flex flex-col gap-2">
        <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a1a" }}>
          <iframe
            src={`https://www.youtube.com/embed/${embedId}`}
            title={title}
            width="288"
            height="162"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        <p
          className="text-xs text-[#6b6460] truncate px-1"
          title={title}
        >
          {title}
        </p>
      </div>
    );
  }

  if (type === "spotify") {
    return (
      <div
        className="flex-shrink-0 w-72 flex flex-col rounded-xl overflow-hidden border border-[#e8e0d8]"
        style={{ background: "#fffcf7" }}
      >
        <iframe
          src={`https://open.spotify.com/embed/track/${embedId}`}
          title={title}
          width="288"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        {roles && roles.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-3 py-3">
            {roles.map((role) => (
              <span
                key={role}
                className="text-xs px-2.5 py-0.5 rounded-full"
                style={{ background: "#f0e6d8", color: "#6b5040" }}
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
      <div className="flex-shrink-0 w-64 flex flex-col gap-2">
        <div
          style={{
            position: "relative",
            height: "400px",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          <div
            style={{ position: "absolute", top: "-60px", left: "-5px", right: 0 }}
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={permalink}
              data-instgrm-version="14"
            />
          </div>
        </div>
        <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-[#6b6460] truncate" title={title}>
            {title}
          </span>
          {views != null && (
            <span
              className="text-xs text-[#a09890] flex-shrink-0 ml-2"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              {views.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
}

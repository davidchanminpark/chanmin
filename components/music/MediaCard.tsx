import Script from "next/script";
import { MusicItem } from "@/data/music";

export default function MediaCard({ type, embedId, title, roles }: MusicItem) {
  if (type === "youtube") {
    return (
      <div className="flex-shrink-0 w-72">
        <iframe
          src={`https://www.youtube.com/embed/${embedId}`}
          title={title}
          width="288"
          height="162"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  }

  if (type === "spotify") {
    return (
      <div className="flex-shrink-0 w-72 flex flex-col gap-2">
        <iframe
          src={`https://open.spotify.com/embed/track/${embedId}`}
          title={title}
          width="288"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        {roles && roles.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {roles.map((role) => (
              <span
                key={role}
                className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
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
    return (
      <div className="flex-shrink-0 w-72">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={`https://www.instagram.com/p/${embedId}/`}
          data-instgrm-version="14"
        />
        <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
      </div>
    );
  }

  return null;
}

import Script from "next/script";
import { MusicItem } from "@/data/music";

export default function MediaCard({ type, embedId, title }: MusicItem) {
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
      <div className="flex-shrink-0 w-72">
        <iframe
          src={`https://open.spotify.com/embed/track/${embedId}`}
          title={title}
          width="288"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
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

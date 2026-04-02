import { VlogItem } from "@/data/vlogs";

export default function VlogCard({ youtubeId, title }: VlogItem) {
  return (
    <div className="flex-shrink-0 w-full">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        width="100%"
        height="200"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{title}</p>
    </div>
  );
}

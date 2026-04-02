import { MusicItem } from "@/data/music";
import MediaCard from "./MediaCard";

export default function MediaScroll({ items }: { items: MusicItem[] }) {
  return (
    <div className="flex flex-row overflow-x-auto gap-4 p-4">
      {items.map((item) => (
        <MediaCard key={item.embedId} {...item} />
      ))}
    </div>
  );
}

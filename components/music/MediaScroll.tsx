import { MusicItem } from "@/data/music";
import MediaCard from "./MediaCard";

export default function MediaScroll({ items }: { items: MusicItem[] }) {
  return (
    <div
      className="flex flex-row overflow-x-auto gap-4 pb-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
    >
      {items.map((item, i) => (
        <MediaCard key={`${item.type}-${item.embedId}-${i}`} {...item} />
      ))}
    </div>
  );
}

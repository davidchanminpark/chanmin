import music from "@/data/music";
import MediaCard from "./MediaCard";

export default function MediaScroll() {
  return (
    <div className="flex flex-row overflow-x-auto gap-4 p-4">
      {music.items.map((item) => (
        <MediaCard key={item.embedId} {...item} />
      ))}
    </div>
  );
}

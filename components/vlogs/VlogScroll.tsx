import vlogs from "@/data/vlogs";
import VlogCard from "./VlogCard";

export default function VlogScroll() {
  return (
    <div className="flex flex-col overflow-y-auto gap-4 p-4">
      {vlogs.items.map((item) => (
        <VlogCard key={item.youtubeId} {...item} />
      ))}
    </div>
  );
}

import { VlogItem } from "@/data/vlogs";
import VlogCard from "./VlogCard";

export default function VlogScroll({ items }: { items: VlogItem[] }) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm" style={{ color: "var(--outline)" }}>
          no videos yet_
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
      {items.map((item) => (
        <VlogCard key={item.youtubeId} {...item} />
      ))}
    </div>
  );
}

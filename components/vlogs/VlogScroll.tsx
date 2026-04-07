import { VlogItem } from "@/data/vlogs";
import VlogCard from "./VlogCard";

export default function VlogScroll({ items }: { items: VlogItem[] }) {
  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p
          className="text-sm text-[#a09890]"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          no videos yet_
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
        {items.map((item) => (
          <VlogCard key={item.youtubeId} {...item} />
        ))}
      </div>
    </div>
  );
}

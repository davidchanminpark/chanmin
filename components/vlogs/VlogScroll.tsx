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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 pt-2">
      {items.map((item, index) => (
        <div
          key={item.youtubeId}
          className={
            index === 0
              ? "sm:col-span-2 sm:px-5 lg:px-20"
              : undefined
          }
        >
          <VlogCard {...item} featured={index === 0} />
        </div>
      ))}
    </div>
  );
}

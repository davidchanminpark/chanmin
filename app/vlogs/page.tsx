import VlogScroll from "@/components/vlogs/VlogScroll";
import VlogStatsPanel from "@/components/vlogs/VlogStatsPanel";
import vlogs from "@/data/vlogs";

export default function VlogsPage() {
  return (
    <main className="flex flex-row flex-1 bg-zinc-50 dark:bg-black">
      <div className="flex-1 overflow-hidden">
        <VlogScroll />
      </div>
      <VlogStatsPanel stats={vlogs.stats} />
    </main>
  );
}

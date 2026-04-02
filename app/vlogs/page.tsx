import VlogScroll from "@/components/vlogs/VlogScroll";
import VlogStatsPanel from "@/components/vlogs/VlogStatsPanel";
import vlogs from "@/data/vlogs";
import { getLiveVlogStats, getLiveVlogItems } from "@/lib/youtube";

export default async function VlogsPage() {
  const [stats, items] = await Promise.all([
    getLiveVlogStats(vlogs.channels, vlogs.stats),
    getLiveVlogItems(vlogs.channels, vlogs.fallbackItems),
  ]);

  return (
    <main className="flex flex-row flex-1 bg-zinc-50 dark:bg-black">
      <div className="flex-1 overflow-hidden">
        <VlogScroll items={items} />
      </div>
      <VlogStatsPanel stats={stats} />
    </main>
  );
}

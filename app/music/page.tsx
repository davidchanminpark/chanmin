import MediaScroll from "@/components/music/MediaScroll";
import StatsPanel from "@/components/music/StatsPanel";
import music from "@/data/music";
import { getLiveMusicStats, getLiveMusicYouTubeItems } from "@/lib/youtube";

export default async function MusicPage() {
  const [stats, items] = await Promise.all([
    getLiveMusicStats(music.stats),
    getLiveMusicYouTubeItems(music.items),
  ]);

  return (
    <main className="flex flex-row flex-1 bg-zinc-50 dark:bg-black">
      <div className="flex-1 overflow-hidden">
        <MediaScroll items={items} />
      </div>
      <StatsPanel stats={stats} />
    </main>
  );
}

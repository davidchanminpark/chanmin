import MediaScroll from "@/components/music/MediaScroll";
import StatsPanel from "@/components/music/StatsPanel";
import music from "@/data/music";

export default function MusicPage() {
  return (
    <main className="flex flex-row flex-1 bg-zinc-50 dark:bg-black">
      <div className="flex-1 overflow-hidden">
        <MediaScroll />
      </div>
      <StatsPanel stats={music.stats} />
    </main>
  );
}

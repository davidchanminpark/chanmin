import MediaScroll from "@/components/music/MediaScroll";
import StatsPanel from "@/components/music/StatsPanel";
import music, { getTotalSpotifyStreams } from "@/data/music";
import { getLiveMusicStats, getLiveMusicYouTubeItems } from "@/lib/youtube";

export default async function MusicPage() {
  const [liveStats, allItems] = await Promise.all([
    getLiveMusicStats({ ...music.stats, spotifyTotalStreams: 0 }),
    getLiveMusicYouTubeItems(music.items),
  ]);

  const stats = {
    ...liveStats,
    spotifyTotalStreams: getTotalSpotifyStreams(music.items),
  };

  const youtubeItems = allItems.filter((i) => i.type === "youtube");
  const spotifyItems = allItems.filter((i) => i.type === "spotify");
  const instagramItems = allItems.filter((i) => i.type === "instagram");

  return (
    <main className="flex flex-row flex-1 bg-zinc-50 dark:bg-black">
      <div className="flex-1 overflow-hidden flex flex-col">
        {youtubeItems.length > 0 && (
          <section>
            <h2 className="px-4 pt-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              YouTube
            </h2>
            <MediaScroll items={youtubeItems} />
          </section>
        )}
        {spotifyItems.length > 0 && (
          <section>
            <h2 className="px-4 pt-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Spotify
            </h2>
            <MediaScroll items={spotifyItems} />
          </section>
        )}
        {instagramItems.length > 0 && (
          <section>
            <h2 className="px-4 pt-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Instagram
            </h2>
            <MediaScroll items={instagramItems} />
          </section>
        )}
      </div>
      <StatsPanel stats={stats} />
    </main>
  );
}

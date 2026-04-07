import MediaScroll from "@/components/music/MediaScroll";
import music, { getTotalSpotifyStreams, getTotalIgViews } from "@/data/music";
import { getLiveMusicStats, getLiveMusicYouTubeItems } from "@/lib/youtube";

export default async function MusicPage() {
  const [liveStats, allItems] = await Promise.all([
    getLiveMusicStats({ ...music.stats, spotifyTotalStreams: 0, igTotalViews: 0 }),
    getLiveMusicYouTubeItems(music.items),
  ]);

  const stats = {
    ...liveStats,
    spotifyTotalStreams: getTotalSpotifyStreams(music.items),
    igTotalViews: getTotalIgViews(music.items),
  };

  const youtubeItems = allItems.filter((i) => i.type === "youtube");
  const spotifyItems = allItems.filter((i) => i.type === "spotify");

  const igGroups = Array.from(
    new Set(
      allItems
        .filter((i) => i.type === "instagram")
        .map((i) => i.group ?? "Instagram")
    )
  );

  const heroStats = [
    { value: stats.igTotalViews.toLocaleString(), label: "reel views" },
    { value: stats.spotifyTotalStreams.toLocaleString(), label: "streams" },
    { value: stats.igFollowers.toLocaleString(), label: "ig followers" },
  ];

  return (
    <main className="flex-1">
      {/* ── Dark Hero ───────────────────────────────── */}
      <section style={{ background: "#1a1a1a" }} className="px-6 pt-16 pb-14">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs text-[#6b6050] uppercase tracking-widest mb-5"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            — rhythmic archive
          </p>

          <h1
            className="text-6xl sm:text-7xl font-bold leading-[0.95] tracking-tight text-[#f5f0e8] mb-5"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            Sound.
          </h1>

          <p className="text-base text-[#7a6f65] leading-relaxed mb-12 max-w-md">
            A sonic diary curated with intention — original compositions,
            collaborations, and covers.
          </p>

          {/* Inline stats */}
          <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
            {heroStats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-3xl font-bold text-[#fbd745]"
                  style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                >
                  {value}
                </span>
                <span
                  className="text-xs text-[#6b6050] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content sections ────────────────────────── */}
      <div className="bg-[#fbf9f5]">

        {/* Released Tracks */}
        {spotifyItems.length > 0 && (
          <section className="pt-10 pb-6">
            <div className="max-w-6xl mx-auto px-6 mb-5">
              <h2 className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-widest">
                Released Tracks
              </h2>
              <p
                className="text-xs text-[#a09890] mt-1"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                {spotifyItems.length} track{spotifyItems.length !== 1 ? "s" : ""} ·{" "}
                {stats.spotifyTotalStreams.toLocaleString()} streams
              </p>
            </div>
            <MediaScroll items={spotifyItems} />
          </section>
        )}

        {/* Instagram groups */}
        {igGroups.map((group) => {
          const items = allItems
            .filter(
              (i) =>
                i.type === "instagram" && (i.group ?? "Instagram") === group
            )
            .reverse();
          const totalViews = items.reduce((sum, i) => sum + (i.views ?? 0), 0);
          return (
            <section key={group} className="pt-10 pb-6 border-t border-[#e8e0d8]">
              <div className="max-w-6xl mx-auto px-6 mb-5">
                <h2 className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-widest">
                  {group}
                </h2>
                <p
                  className="text-xs text-[#a09890] mt-1"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {items.length} reel{items.length !== 1 ? "s" : ""} ·{" "}
                  {totalViews.toLocaleString()} views
                </p>
              </div>
              <MediaScroll items={items} />
            </section>
          );
        })}

        {/* YouTube */}
        {youtubeItems.length > 0 && (
          <section className="pt-10 pb-6 border-t border-[#e8e0d8]">
            <div className="max-w-6xl mx-auto px-6 mb-5">
              <h2 className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-widest">
                Video
              </h2>
              <p
                className="text-xs text-[#a09890] mt-1"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                {youtubeItems.length} video{youtubeItems.length !== 1 ? "s" : ""}
              </p>
            </div>
            <MediaScroll items={youtubeItems} />
          </section>
        )}

        {/* Footer spacer */}
        <div className="h-16" />
      </div>
    </main>
  );
}

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

  return (
    <main className="grain flex-1 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* ── Hero header ── */}
        <header className="mb-16">
          <h1
            className="text-5xl md:text-7xl font-bold lowercase tracking-tighter mb-6"
            style={{ color: "var(--on-surface)" }}
          >
            sound &amp; <br />archive
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "var(--on-surface-variant)" }}
          >
            a sonic diary curated with intention — original compositions,
            collaborations, and covers.
          </p>
        </header>

        {/* ── Stats bar ── */}
        <div
          className="flex flex-wrap gap-x-10 gap-y-4 py-6 mb-16"
          style={{ borderTop: "1px solid var(--outline-variant)", borderBottom: "1px solid var(--outline-variant)" }}
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {stats.spotifyTotalStreams.toLocaleString()}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
              streams
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {stats.igTotalViews.toLocaleString()}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
              reel views
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {stats.igFollowers.toLocaleString()}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
              ig followers
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {stats.spotifyListeners.toLocaleString()}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
              monthly listeners
            </span>
          </div>
        </div>

        {/* ── Released Tracks ── */}
        {spotifyItems.length > 0 && (
          <section className="mb-14">
            <div className="flex items-baseline justify-between mb-5">
              <h2
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--on-surface)" }}
              >
                Released Tracks
              </h2>
              <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
                {spotifyItems.length} track{spotifyItems.length !== 1 ? "s" : ""} ·{" "}
                {stats.spotifyTotalStreams.toLocaleString()} streams
              </span>
            </div>
            <MediaScroll items={spotifyItems} />
          </section>
        )}

        {/* ── Instagram groups ── */}
        {igGroups.map((group) => {
          const items = allItems
            .filter(
              (i) =>
                i.type === "instagram" && (i.group ?? "Instagram") === group
            )
            .reverse();
          const totalViews = items.reduce((sum, i) => sum + (i.views ?? 0), 0);
          return (
            <section
              key={group}
              className="mb-14 pt-14"
              style={{ borderTop: "1px solid var(--outline-variant)" }}
            >
              <div className="flex items-baseline justify-between mb-5">
                <h2
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--on-surface)" }}
                >
                  {group}
                </h2>
                <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
                  {items.length} reel{items.length !== 1 ? "s" : ""} ·{" "}
                  {totalViews.toLocaleString()} views
                </span>
              </div>
              <MediaScroll items={items} />
            </section>
          );
        })}

        {/* ── YouTube ── */}
        {youtubeItems.length > 0 && (
          <section
            className="mb-14 pt-14"
            style={{ borderTop: "1px solid var(--outline-variant)" }}
          >
            <div className="flex items-baseline justify-between mb-5">
              <h2
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--on-surface)" }}
              >
                Video
              </h2>
              <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
                {youtubeItems.length} video{youtubeItems.length !== 1 ? "s" : ""}
              </span>
            </div>
            <MediaScroll items={youtubeItems} />
          </section>
        )}
      </div>
    </main>
  );
}

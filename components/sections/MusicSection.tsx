import MediaScroll from "@/components/music/MediaScroll";
import InstagramEmbeds from "@/components/music/InstagramEmbeds";
import SectionShell from "@/components/sections/SectionShell";
import music, {
  getSongCounts,
  getTotalContentDuration,
  getTotalSpotifyStreams,
  getTotalIgViews,
  getTotalYouTubeViews,
} from "@/data/music";
import { formatTotalDuration, sumDurationSeconds } from "@/lib/duration";
import { getLiveMusicStats, getLiveMusicYouTubeItems } from "@/lib/youtube";

export default async function MusicSection() {
  const [liveStats, allItems] = await Promise.all([
    getLiveMusicStats({
      ...music.stats,
      spotifyTotalStreams: 0,
      igTotalViews: 0,
    }),
    getLiveMusicYouTubeItems(music.items),
  ]);

  const stats = {
    ...liveStats,
    spotifyTotalStreams: getTotalSpotifyStreams(music.items),
    igTotalViews: getTotalIgViews(music.items),
  };

  const youtubeItems = allItems.filter((i) => i.type === "youtube");
  const spotifyItems = allItems.filter((i) => i.type === "spotify");
  const totalContentDuration = getTotalContentDuration(allItems);
  const totalContentDurationLabel =
    totalContentDuration > 0 ? formatTotalDuration(totalContentDuration) : "soon";
  const totalViews =
    stats.igTotalViews + stats.spotifyTotalStreams + getTotalYouTubeViews(allItems);
  const totalFollowers = stats.igFollowers + stats.ytSubscribers;
  const { originalSongs, totalCovers } = getSongCounts(allItems);
  const youtubeDuration = sumDurationSeconds(youtubeItems);
  const spotifyDuration = sumDurationSeconds(spotifyItems);
  const youtubeInsertBeforeGroup = "Instagram Covers";

  const igGroups = Array.from(
    new Set(
      allItems
        .filter((i) => i.type === "instagram")
        .map((i) => i.group ?? "Instagram")
    )
  );

  return (
    <SectionShell
      id="music"
      eyebrow="music"
      title={
        <>
          music &amp; <br />melodies
        </>
      }
      description="a catalog of songs i've written / produced. edited on logic pro x."
    >
      <InstagramEmbeds />

      <div
        className="flex flex-wrap gap-x-10 gap-y-4 py-6 mb-16"
        style={{
          borderTop: "1px solid var(--outline-variant)",
          borderBottom: "1px solid var(--outline-variant)",
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {totalViews.toLocaleString()}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            total views
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {totalFollowers.toLocaleString()}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            total followers
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {totalContentDurationLabel}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            total content time
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {originalSongs.toLocaleString()}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            originals
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {totalCovers.toLocaleString()}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            covers
          </span>
        </div>
      </div>

      {igGroups.map((group, index) => {
        const items = allItems
          .filter(
            (i) => i.type === "instagram" && (i.group ?? "Instagram") === group
          )
          .reverse();
        const totalDuration = sumDurationSeconds(items);
        const durationLabel =
          totalDuration > 0 ? formatTotalDuration(totalDuration) : "duration soon";
        const isFirstSection = index === 0;

        return (
          <div key={group}>
            {group === youtubeInsertBeforeGroup && youtubeItems.length > 0 && (
              <section
                className={`mb-14 ${isFirstSection ? "" : "pt-14"}`}
                style={{
                  borderTop: isFirstSection
                    ? "none"
                    : "1px solid var(--outline-variant)",
                }}
              >
                <div className="flex items-baseline justify-between mb-5">
                  <h3
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--on-surface)" }}
                  >
                    Youtube Covers
                  </h3>
                  <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
                    {youtubeItems.length} video{youtubeItems.length !== 1 ? "s" : ""}
                    {youtubeDuration > 0 ? ` · ${formatTotalDuration(youtubeDuration)}` : ""}
                  </span>
                </div>
                <MediaScroll items={youtubeItems} />
              </section>
            )}

            <section
              className={`mb-14 ${isFirstSection ? "" : "pt-14"}`}
              style={{
                borderTop: isFirstSection
                  ? "none"
                  : "1px solid var(--outline-variant)",
              }}
            >
              <div className="flex items-baseline justify-between mb-5">
                <h3
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--on-surface)" }}
                >
                  {group}
                </h3>
                <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
                  {items.length} reel{items.length !== 1 ? "s" : ""} · {durationLabel}
                </span>
              </div>
              <MediaScroll items={items} />
            </section>
          </div>
        );
      })}

      {youtubeItems.length > 0 && !igGroups.includes(youtubeInsertBeforeGroup) && (
        <section
          className="mb-14"
          style={{ borderTop: "none" }}
        >
          <div className="flex items-baseline justify-between mb-5">
            <h3
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--on-surface)" }}
            >
              Youtube Covers
            </h3>
            <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
              {youtubeItems.length} video{youtubeItems.length !== 1 ? "s" : ""}
              {youtubeDuration > 0 ? ` · ${formatTotalDuration(youtubeDuration)}` : ""}
            </span>
          </div>
          <MediaScroll items={youtubeItems} />
        </section>
      )}

      {spotifyItems.length > 0 && (
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-5">
            <h3
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--on-surface)" }}
            >
              Released Tracks
            </h3>
            <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
              {spotifyItems.length} track{spotifyItems.length !== 1 ? "s" : ""} ·{" "}
              {/* streams intentionally omitted */}
              {spotifyDuration > 0 ? ` · ${formatTotalDuration(spotifyDuration)}` : ""}
            </span>
          </div>
          <MediaScroll items={spotifyItems} />
        </section>
      )}
    </SectionShell>
  );
}

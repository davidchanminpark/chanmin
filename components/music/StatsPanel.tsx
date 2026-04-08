import { MusicStats } from "@/data/music";
import { formatTotalDuration } from "@/lib/duration";

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>{label}</span>
      <span className="text-xl font-semibold" style={{ color: "var(--on-surface)" }}>
        {value.toLocaleString()}
      </span>
    </div>
  );
}

export default function StatsPanel({
  stats,
  youtubeViews = 0,
  totalDurationSeconds = 0,
  originalSongs = 0,
  totalCovers = 0,
}: {
  stats: MusicStats;
  youtubeViews?: number;
  totalDurationSeconds?: number;
  originalSongs?: number;
  totalCovers?: number;
}) {
  const totalViews =
    stats.igTotalViews + youtubeViews + stats.spotifyTotalStreams;
  const totalFollowers = stats.igFollowers + stats.ytSubscribers;

  return (
    <aside className="flex flex-col gap-6 p-4">
      <StatRow label="Total Followers" value={totalFollowers} />
      <StatRow label="Total Views" value={totalViews} />
      <StatRow label="Original Songs" value={originalSongs} />
      <StatRow label="Total Covers" value={totalCovers} />
      <div className="flex flex-col gap-1">
        <span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>Total Content Time</span>
        <span className="text-xl font-semibold" style={{ color: "var(--on-surface)" }}>
          {formatTotalDuration(totalDurationSeconds)}
        </span>
      </div>
    </aside>
  );
}

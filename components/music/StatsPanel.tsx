import { MusicStats } from "@/data/music";

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

export default function StatsPanel({ stats }: { stats: MusicStats }) {
  return (
    <aside className="flex flex-col gap-6 p-4">
      <StatRow label="IG Followers" value={stats.igFollowers} />
      <StatRow label="IG Total Views" value={stats.igTotalViews} />
      <StatRow label="YT Subscribers" value={stats.ytSubscribers} />
      <StatRow label="YT Total Views" value={stats.ytTotalViews} />
      <StatRow label="Spotify Listeners" value={stats.spotifyListeners} />
      <StatRow label="Spotify Total Streams" value={stats.spotifyTotalStreams} />
    </aside>
  );
}

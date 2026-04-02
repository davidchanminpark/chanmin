import { MusicStats } from "@/data/music";

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

export default function StatsPanel({ stats }: { stats: MusicStats }) {
  return (
    <aside className="flex flex-col gap-6 p-4">
      <StatRow label="Instagram Followers" value={stats.igFollowers} />
      <StatRow label="YouTube Subscribers" value={stats.ytSubscribers} />
      <StatRow label="Spotify Listeners" value={stats.spotifyListeners} />
    </aside>
  );
}

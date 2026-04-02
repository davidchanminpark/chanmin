import { VlogStats } from "@/data/vlogs";

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

export default function VlogStatsPanel({ stats }: { stats: VlogStats }) {
  return (
    <aside className="flex flex-col gap-6 p-4">
      <StatRow label="YouTube Subscribers" value={stats.ytSubscribers} />
      <StatRow label="Total Views" value={stats.totalViews} />
    </aside>
  );
}

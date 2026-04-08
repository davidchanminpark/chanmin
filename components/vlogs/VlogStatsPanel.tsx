import { VlogStats } from "@/data/vlogs";
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

export default function VlogStatsPanel({ stats }: { stats: VlogStats }) {
  return (
    <aside className="flex flex-col gap-6 p-4">
      <StatRow label="YouTube Subscribers" value={stats.ytSubscribers} />
      <StatRow label="Total Views" value={stats.totalViews} />
      <div className="flex flex-col gap-1">
        <span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>Total Duration</span>
        <span className="text-xl font-semibold" style={{ color: "var(--on-surface)" }}>
          {formatTotalDuration(stats.totalDurationSeconds)}
        </span>
      </div>
    </aside>
  );
}

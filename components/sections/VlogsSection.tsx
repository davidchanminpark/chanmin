import VlogScroll from "@/components/vlogs/VlogScroll";
import SectionShell from "@/components/sections/SectionShell";
import { formatTotalDuration } from "@/lib/duration";
import { getLiveVlogItems, getLiveVlogStats } from "@/lib/youtube";
import vlogs from "@/data/vlogs";

export default async function VlogsSection() {
  const [stats, items] = await Promise.all([
    getLiveVlogStats(vlogs.channels, vlogs.stats),
    getLiveVlogItems(vlogs.channels, vlogs.fallbackItems),
  ]);

  const totalDurationLabel =
    stats.totalDurationSeconds > 0
      ? formatTotalDuration(stats.totalDurationSeconds)
      : "soon";

  return (
    <SectionShell
      id="vlogs"
      eyebrow="vlogs"
      title={
        <>
          vlogs &amp; <br />memories
        </>
      }
      description="a collection of retreat episodes for youth group. edited on final cut pro."
    >
      <div
        className="flex flex-wrap gap-x-10 gap-y-4 py-6 mb-16"
        style={{
          borderTop: "1px solid var(--outline-variant)",
          borderBottom: "1px solid var(--outline-variant)",
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {stats.totalViews.toLocaleString()}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            total views
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {stats.ytSubscribers.toLocaleString()}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            subscribers
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {totalDurationLabel}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            total content time
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {items.length > 0 ? items.length : "—"}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            videos
          </span>
        </div>
      </div>

      <VlogScroll items={items} />
    </SectionShell>
  );
}

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
      title={
        <>
          vlogs &amp; <br />memories
        </>
      }
      description="a collection of retreat episodes for youth group. edited on final cut pro."
      stats={[
        { value: stats.totalViews.toLocaleString(), label: "total views" },
        { value: stats.ytSubscribers.toLocaleString(), label: "subscribers" },
        { value: totalDurationLabel, label: "total content time" },
        { value: items.length > 0 ? items.length : "—", label: "videos" },
      ]}
    >
      <VlogScroll items={items} />
    </SectionShell>
  );
}

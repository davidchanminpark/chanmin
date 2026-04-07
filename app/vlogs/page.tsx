import VlogScroll from "@/components/vlogs/VlogScroll";
import vlogs from "@/data/vlogs";
import { getLiveVlogStats, getLiveVlogItems } from "@/lib/youtube";

export default async function VlogsPage() {
  const [stats, items] = await Promise.all([
    getLiveVlogStats(vlogs.channels, vlogs.stats),
    getLiveVlogItems(vlogs.channels, vlogs.fallbackItems),
  ]);

  const heroStats = [
    { value: stats.totalViews.toLocaleString(), label: "total views" },
    { value: stats.ytSubscribers.toLocaleString(), label: "subscribers" },
    { value: items.length > 0 ? items.length.toLocaleString() : "—", label: "videos" },
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
            — kinetic archive
          </p>

          <h1
            className="text-6xl sm:text-7xl font-bold leading-[0.95] tracking-tight text-[#f5f0e8] mb-5"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            Vlogs.
          </h1>

          <p className="text-base text-[#7a6f65] leading-relaxed mb-12 max-w-md">
            Moving fragments of quiet afternoons, busy mornings, and the
            intentional space between. Stories told in motion.
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

      {/* ── Video Grid ──────────────────────────────── */}
      <div className="bg-[#fbf9f5] pt-12 pb-20">
        <VlogScroll items={items} />
      </div>
    </main>
  );
}

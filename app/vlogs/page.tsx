import VlogScroll from "@/components/vlogs/VlogScroll";
import vlogs from "@/data/vlogs";
import { getLiveVlogStats, getLiveVlogItems } from "@/lib/youtube";

export default async function VlogsPage() {
  const [stats, items] = await Promise.all([
    getLiveVlogStats(vlogs.channels, vlogs.stats),
    getLiveVlogItems(vlogs.channels, vlogs.fallbackItems),
  ]);

  return (
    <main className="grain flex-1 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* ── Hero header ── */}
        <header className="mb-16">
          <h1
            className="text-5xl md:text-7xl font-bold lowercase tracking-tighter mb-6"
            style={{ color: "var(--on-surface)" }}
          >
            vlogs &amp; <br />motion
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "var(--on-surface-variant)" }}
          >
            moving fragments of quiet afternoons, busy mornings, and the
            intentional space between. stories told in motion.
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
              {stats.totalViews.toLocaleString()}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
              total views
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {stats.ytSubscribers.toLocaleString()}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
              subscribers
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {items.length > 0 ? items.length : "—"}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
              videos
            </span>
          </div>
        </div>

        {/* ── Video Grid ── */}
        <VlogScroll items={items} />
      </div>
    </main>
  );
}

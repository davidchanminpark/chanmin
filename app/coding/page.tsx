import ProjectsList from "@/components/coding/ProjectsList";
import projects from "@/data/projects";

const totalStars = projects.reduce((sum, p) => sum + (p.stars ?? 0), 0);

export default function CodingPage() {
  return (
    <main className="flex-1">
      {/* ── Dark Hero ───────────────────────────────── */}
      <section style={{ background: "#1a1a1a" }} className="px-6 pt-16 pb-14">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs text-[#6b6050] uppercase tracking-widest mb-5"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            — studio repository
          </p>

          <h1
            className="text-6xl sm:text-7xl font-bold leading-[0.95] tracking-tight text-[#f5f0e8] mb-5"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            Work.
          </h1>

          <p className="text-base text-[#7a6f65] leading-relaxed mb-12 max-w-md">
            A curated collection of technical explorations, open-source
            contributions, and architectural experiments.
          </p>

          {/* Inline stats */}
          <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
            {[
              { value: projects.length.toString(), label: "repositories" },
              { value: totalStars.toString(),       label: "total stars" },
              { value: "2024",                       label: "active since" },
            ].map(({ value, label }) => (
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

      {/* ── Project List ────────────────────────────── */}
      <div className="bg-[#fbf9f5] pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <ProjectsList projects={projects} />
        </div>
      </div>
    </main>
  );
}

import ProjectsList from "@/components/coding/ProjectsList";
import projects from "@/data/projects";

export default function CodingPage() {
  return (
    <main className="grain flex-1 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* ── Hero header ── */}
        <header className="mb-20">
          <h1
            className="text-5xl md:text-7xl font-bold lowercase tracking-tighter mb-6"
            style={{ color: "var(--on-surface)" }}
          >
            work &amp; <br />repository
          </h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
            a curated collection of technical explorations, open-source contributions,
            and architectural experiments. built with intention and documented for the archive.
          </p>
        </header>

        {/* ── Projects bento ── */}
        <ProjectsList projects={projects} />
      </div>
    </main>
  );
}

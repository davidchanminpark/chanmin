import ProjectsList from "@/components/coding/ProjectsList";
import SectionShell from "@/components/sections/SectionShell";
import projects from "@/data/projects";
import { getGitHubOverview } from "@/lib/github";

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default async function CodeSection() {
  const github = await getGitHubOverview();

  return (
    <SectionShell
      id="code"
      eyebrow="code"
      title={
        <>
          code &amp; <br />repositories
        </>
      }
      description="full-stack engineer with a passion for building tools for personal growth and productivity; experience building database systems"
    >
      <p
        className="text-sm md:text-base max-w-2xl leading-relaxed mt-[-1.25rem] mb-12"
        style={{ color: "var(--outline)" }}
      >
        prev @ AWS Aurora MySQL, healthcare ML startup
      </p>

      <div
        className="flex flex-wrap gap-x-10 gap-y-4 py-6 mb-16"
        style={{
          borderTop: "1px solid var(--outline-variant)",
          borderBottom: "1px solid var(--outline-variant)",
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {github.repoCount.toLocaleString()}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            repositories
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {formatCompactNumber(github.contributionsYtd)}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            contributions ytd
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {projects.length}
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
            featured projects
          </span>
        </div>
      </div>

      <ProjectsList projects={projects} />
    </SectionShell>
  );
}

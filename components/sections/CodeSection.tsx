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
      title={
        <>
          code &amp; <br />repositories
        </>
      }
      description="full-stack engineer with a passion for building tools for personal growth and productivity; experience building database systems"
      beforeStats={
        <p
          className="text-sm md:text-base max-w-2xl leading-relaxed mt-[-1.25rem] mb-12"
          style={{ color: "var(--outline)" }}
        >
          prev @ AWS Aurora MySQL, healthcare ML startup
        </p>
      }
      stats={[
        { value: github.repoCount.toLocaleString(), label: "repositories" },
        { value: formatCompactNumber(github.contributionsYtd), label: "contributions ytd" },
        { value: projects.length, label: "featured projects" },
      ]}
    >
      <ProjectsList projects={projects} />
    </SectionShell>
  );
}

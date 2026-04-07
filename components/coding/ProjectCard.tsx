import { Project } from "@/data/projects";

const statusStyles: Record<Project["status"], { bg: string; text: string; label: string }> = {
  active:       { bg: "#e8f5e0", text: "#3a6b20", label: "active" },
  stable:       { bg: "#e8f0fb", text: "#2a4a8b", label: "stable" },
  experimental: { bg: "#fef3e2", text: "#7a5010", label: "experimental" },
  archived:     { bg: "#f0f0f0", text: "#606060", label: "archived" },
};

export default function ProjectCard({
  title,
  description,
  tags,
  status,
  githubUrl,
  stars,
  year,
}: Project) {
  const badge = statusStyles[status];

  return (
    <div
      className="group py-6 border-b border-[#e8e0d8] flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
    >
      {/* Left: year */}
      <span
        className="flex-shrink-0 text-xs text-[#a09890] w-10 pt-0.5 hidden sm:block"
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        {year}
      </span>

      {/* Center: main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
          <h3 className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#6b5040] transition-colors">
            {title}
          </h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: badge.bg, color: badge.text }}
          >
            {badge.label}
          </span>
        </div>

        <p className="text-sm text-[#6b6460] leading-relaxed mb-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "#f0ebe4",
                color: "#6b6460",
                fontFamily: "var(--font-mono), monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: stars + link */}
      <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 flex-shrink-0">
        {stars != null && (
          <span
            className="text-xs text-[#a09890] flex items-center gap-1"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 1l1.39 2.82 3.11.45-2.25 2.19.53 3.09L6 8.09l-2.78 1.46.53-3.09L1.5 4.27l3.11-.45z" />
            </svg>
            {stars}
          </span>
        )}
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#a09890] hover:text-[#1a1a1a] transition-colors"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            source _
          </a>
        ) : (
          <span
            className="text-xs text-[#c8c0b8]"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            private _
          </span>
        )}
      </div>
    </div>
  );
}

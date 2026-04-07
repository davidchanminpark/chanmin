"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

type Filter = "all" | Project["category"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all",       label: "all projects" },
  { value: "frontend",  label: "frontend" },
  { value: "fullstack", label: "fullstack" },
  { value: "tools",     label: "tools" },
];

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");

  const visible =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="tablist"
        aria-label="Filter projects"
      >
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            role="tab"
            aria-selected={active === value}
            onClick={() => setActive(value)}
            className="text-xs px-3.5 py-1.5 rounded-full transition-colors"
            style={
              active === value
                ? {
                    background: "#1a1a1a",
                    color: "#f5f0e8",
                    fontFamily: "var(--font-mono), monospace",
                  }
                : {
                    background: "#f0ebe4",
                    color: "#6b6460",
                    fontFamily: "var(--font-mono), monospace",
                  }
            }
          >
            {label}
          </button>
        ))}
        <span
          className="ml-auto text-xs text-[#a09890] self-center"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          {visible.length} repo{visible.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Project list */}
      <div>
        {/* Table header */}
        <div className="hidden sm:flex gap-8 pb-3 border-b border-[#1a1a1a]">
          <span
            className="w-10 text-xs text-[#1a1a1a] font-semibold uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            year
          </span>
          <span className="flex-1 text-xs text-[#1a1a1a] font-semibold uppercase tracking-widest">
            Project
          </span>
          <span
            className="text-xs text-[#1a1a1a] font-semibold uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            Stars / Link
          </span>
        </div>

        {visible.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}

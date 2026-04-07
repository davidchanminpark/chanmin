"use client";

import { useState } from "react";
import { Project } from "@/data/projects";

type Filter = "all" | Project["category"];
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all",       label: "all projects" },
  { value: "frontend",  label: "frontend" },
  { value: "fullstack", label: "fullstack" },
  { value: "tools",     label: "tools" },
];

function FeaturedCard({ p }: { p: Project }) {
  return (
    <div className="md:col-span-8 group rounded-xl overflow-hidden flex flex-col transition-all duration-500"
      style={{ background: "var(--surface-low)" }}>
      <div className="aspect-video w-full flex items-center justify-center p-8 relative"
        style={{ background: "var(--surface-highest)" }}>
        <div className="w-full max-w-md rounded-lg p-5 text-xs leading-relaxed font-mono"
          style={{ background: "rgba(255,252,247,0.55)", color: "var(--on-surface-variant)", backdropFilter: "blur(4px)", border: "1px solid rgba(186,186,176,0.15)" }}>
          <span style={{ color: "var(--primary)" }}>$</span>{" "}
          <span style={{ color: "var(--on-surface)" }}>git clone</span>{" "}
          {p.githubUrl ?? `github.com/chanmin/${p.title}`}
          <br /><span style={{ color: "var(--outline)" }}>&gt; cloning &apos;{p.title}&apos;...</span>
          <br /><span style={{ color: "var(--primary)" }}>&gt; {p.tags.join(" · ")}</span>
        </div>
        <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg"
          style={{ background: "rgba(255,252,247,0.85)", color: "var(--on-surface)" }}>
          featured
        </div>
      </div>
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-3xl font-bold lowercase leading-tight" style={{ color: "var(--on-surface)" }}>{p.title}</h2>
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-opacity ml-4 flex-shrink-0 text-lg" style={{ color: "var(--primary)" }}>↗</a>
          )}
        </div>
        <p className="leading-relaxed mb-8" style={{ color: "var(--on-surface-variant)" }}>{p.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {p.tags.map((t) => (
              <span key={t} className="text-[11px] px-3 py-1 rounded"
                style={{ background: "var(--surface-highest)", color: "var(--tertiary)" }}>{t}</span>
            ))}
          </div>
          {p.stars != null && (
            <span className="flex items-center gap-1.5 text-xs ml-4" style={{ color: "var(--tertiary)" }}>★ {p.stars}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function SideCard({ p }: { p: Project }) {
  return (
    <div className="md:col-span-4 rounded-xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--surface-highest)" }}>
      <div className="flex items-center justify-between mb-6">
        <span className="text-2xl">⬡</span>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--tertiary)" }}>{p.status}</span>
      </div>
      <h2 className="text-xl font-bold lowercase mb-4" style={{ color: "var(--on-surface)" }}>{p.title}</h2>
      <p className="text-sm leading-relaxed flex-grow" style={{ color: "var(--on-surface-variant)" }}>{p.description}</p>
      <div className="mt-6 pt-4 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(186,186,176,0.2)" }}>
        <span className="text-xs" style={{ color: "var(--tertiary)" }}>{p.year}</span>
        {p.githubUrl
          ? <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-xs font-bold lowercase underline decoration-2 underline-offset-4" style={{ color: "var(--primary)" }}>view source</a>
          : <span className="text-xs lowercase" style={{ color: "var(--outline)" }}>private</span>
        }
      </div>
    </div>
  );
}

function HorizontalCard({ p }: { p: Project }) {
  return (
    <div className="md:col-span-8 rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300"
      style={{ background: "var(--surface-low)" }}>
      <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
        <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--primary)" }}>{p.status}</div>
        <h2 className="text-2xl font-bold lowercase mb-4" style={{ color: "var(--on-surface)" }}>{p.title}</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--on-surface-variant)" }}>{p.description}</p>
        {p.githubUrl && (
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
            className="self-start px-6 py-2 rounded-full text-xs lowercase font-medium transition-all"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}>repository</a>
        )}
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-8" style={{ background: "var(--surface-highest)" }}>
        <div className="w-full rounded-lg p-4 text-[10px] font-mono leading-relaxed"
          style={{ background: "rgba(255,252,247,0.4)", color: "var(--on-surface-variant)", backdropFilter: "blur(4px)" }}>
          {p.tags.map((t, i) => (
            <div key={t}>
              <span style={{ color: "var(--primary)" }}>{i === 0 ? "const stack = [" : ""}</span>
              {i > 0 && <span>{"  "}&quot;{t}&quot;,</span>}
              {i === 0 && <span>{"  "}&quot;{t}&quot;,</span>}
            </div>
          ))}
          <div>];</div>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ p }: { p: Project }) {
  return (
    <div className="md:col-span-4 rounded-xl overflow-hidden transition-all duration-300 hover:brightness-[0.97]"
      style={{ background: "var(--surface-low)" }}>
      <div className="h-36 flex items-center justify-center" style={{ background: "var(--surface-highest)" }}>
        <span className="text-4xl font-bold lowercase opacity-20" style={{ color: "var(--primary)" }}>
          {p.title.slice(0, 2)}
        </span>
      </div>
      <div className="p-6">
        <h2 className="text-lg font-bold lowercase mb-2" style={{ color: "var(--on-surface)" }}>{p.title}</h2>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--on-surface-variant)" }}>{p.description}</p>
        <div className="flex gap-2 flex-wrap">
          {p.tags.slice(0, 2).map((t) => (
            <span key={t} className="text-[10px] uppercase tracking-widest" style={{ color: "var(--tertiary)" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter / stats bar */}
      <div className="flex flex-wrap items-center gap-8 mb-16 py-8"
        style={{ borderTop: "1px solid rgba(186,186,176,0.15)", borderBottom: "1px solid rgba(186,186,176,0.15)" }}>
        <div className="flex items-center gap-3">
          <span className="text-sm lowercase" style={{ color: "var(--tertiary)" }}>filter:</span>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(({ value, label }) => (
              <button key={value} onClick={() => setActive(value)}
                className="px-4 py-1.5 rounded-full text-xs lowercase transition-colors"
                style={active === value
                  ? { background: "var(--primary)", color: "var(--on-primary)" }
                  : { background: "var(--surface-highest)", color: "var(--on-surface-variant)" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="ml-auto hidden lg:flex items-center gap-6">
          <div className="text-right">
            <span className="block text-xl font-bold lowercase" style={{ color: "var(--on-surface)" }}>{visible.length}</span>
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--tertiary)" }}>repositories</span>
          </div>
          <div className="w-px h-8" style={{ background: "rgba(186,186,176,0.3)" }} />
          <div className="text-right">
            <span className="block text-xl font-bold lowercase" style={{ color: "var(--on-surface)" }}>
              {visible.reduce((s, p) => s + (p.stars ?? 0), 0)}
            </span>
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--tertiary)" }}>total_stars</span>
          </div>
        </div>
      </div>

      {/* Bento */}
      {visible.length === 0 ? (
        <p className="text-sm lowercase py-16 text-center" style={{ color: "var(--outline)" }}>no projects in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {visible.map((p, i) => {
            if (i === 0) return <FeaturedCard  key={p.title} p={p} />;
            if (i === 1) return <SideCard      key={p.title} p={p} />;
            if (i === 2) return <SmallCard     key={p.title} p={p} />;
            if (i === 3) return <HorizontalCard key={p.title} p={p} />;
            return <div key={p.title} className="md:col-span-4"><SmallCard p={p} /></div>;
          })}
        </div>
      )}
    </div>
  );
}

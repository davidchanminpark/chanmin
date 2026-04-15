"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";

type Filter = "all" | Project["category"];
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all",    label: "all projects" },
  { value: "web",    label: "web" },
  { value: "mobile", label: "mobile" },
  { value: "tools",  label: "tools" },
];

/** Per-phone placement for the diagonal mockup collage. Percentages are relative to the container. */
const COLLAGE_POSITIONS: { left: string; top: string; rotate: number; z: number }[] = [
  { left: "-2%",  top: "8%",   rotate: -6,  z: 2 },
  { left: "20%",  top: "-10%", rotate: 4,   z: 1 },
  { left: "46%",  top: "12%",  rotate: -3,  z: 3 },
  { left: "68%",  top: "-6%",  rotate: 7,   z: 2 },
];

function PhoneMockup({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute"
      style={{
        width: "28%",
        aspectRatio: "9 / 19.5",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
        border: "3px solid rgba(255,255,255, 0)",
        background: "#000",
        willChange: "transform",
        ...style,
      }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 40vw, 200px" />
    </div>
  );
}

function WebScreenshotStrip({
  screenshots,
  alt,
  padding = "p-4",
  gap = "gap-3",
  radius = 10,
  fullBleed = false,
  limit,
  objectFit = "cover",
}: {
  screenshots: string[];
  alt: string;
  padding?: string;
  gap?: string;
  radius?: number;
  fullBleed?: boolean;
  limit?: number;
  objectFit?: "cover" | "contain";
}) {
  const visible = limit !== undefined ? screenshots.slice(0, limit) : screenshots;
  if (fullBleed) {
    return (
      <div className="absolute inset-0 flex">
        {visible.map((src, i) => (
          <div key={src} className="relative flex-1 overflow-hidden">
            <Image
              src={src}
              alt={`${alt} screenshot ${i + 1}`}
              fill
              style={{ objectFit, objectPosition: "top" }}
              sizes="(max-width: 768px) 50vw, 300px"
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${gap} ${padding}`}>
      {visible.map((src, i) => (
        <div
          key={src}
          className="relative h-full overflow-hidden flex-shrink"
          style={{
            aspectRatio: "9 / 16",
            borderRadius: radius,
            boxShadow: "0 6px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <Image
            src={src}
            alt={`${alt} screenshot ${i + 1}`}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            sizes="(max-width: 768px) 30vw, 180px"
          />
        </div>
      ))}
    </div>
  );
}

function ScreenshotStrip({
  screenshots,
  alt,
  padding = "p-4",
  gap = "gap-3",
  radius = 12,
  fullBleed = false,
  limit,
  objectPositions = [],
  objectFits = [],
  scales = [],
}: {
  screenshots: string[];
  alt: string;
  padding?: string;
  gap?: string;
  radius?: number;
  /** When true, screenshots are zoomed and sit edge-to-edge with no gap, radius, or padding. */
  fullBleed?: boolean;
  /** Max number of screenshots to show. */
  limit?: number;
  /** Per-screenshot objectPosition overrides (fullBleed only). */
  objectPositions?: string[];
  /** Per-screenshot objectFit overrides (fullBleed only). */
  objectFits?: string[];
  /** Per-screenshot scale overrides, e.g. 1.3 = 30% zoom (fullBleed only). */
  scales?: number[];
}) {
  const visible = limit !== undefined ? screenshots.slice(0, limit) : screenshots;

  if (fullBleed) {
    return (
      <div className="absolute inset-0 flex">
        {visible.map((src, i) => (
          <div key={src} className="relative flex-1 overflow-hidden">
            <Image
              src={src}
              alt={`${alt} screenshot ${i + 1}`}
              fill
              style={{
                objectFit: (objectFits[i] ?? "cover") as React.CSSProperties["objectFit"],
                objectPosition: objectPositions[i] ?? "top",
                transform: scales[i] !== undefined ? `scale(${scales[i]})` : undefined,
                transformOrigin: objectPositions[i] ?? "top",
              }}
              sizes="(max-width: 768px) 34vw, 200px"
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${gap} ${padding}`}>
      {screenshots.map((src, i) => (
        <div
          key={src}
          className="relative h-full overflow-hidden flex-shrink"
          style={{
            aspectRatio: "9 / 19.5",
            borderRadius: radius,
            boxShadow: "0 6px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <Image
            src={src}
            alt={`${alt} screenshot ${i + 1}`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 30vw, 180px"
          />
        </div>
      ))}
    </div>
  );
}

function WebFeaturedOverlay({ screenshots, alt }: { screenshots: string[]; alt: string }) {
  return (
    <>
      {screenshots[0] && (
        <Image
          src={screenshots[0]}
          alt={`${alt} screenshot 1`}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="(max-width: 768px) 100vw, 66vw"
        />
      )}
    </>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  const hasImages = p.images?.icon || (p.images?.screenshots?.length ?? 0) > 0;

  return (
    <div data-square-blocker className="md:col-span-8 group rounded-xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1"
      style={{ background: "var(--surface-low)" }}>
      <div className="aspect-video w-full relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]"
        style={{ background: "var(--surface-highest)" }}>
        {hasImages ? (
          <>
            {/* Screenshot area */}
            {p.images?.layout === "strip" ? (
              <ScreenshotStrip
                screenshots={p.images.screenshots ?? []}
                alt={p.title}
                padding="p-6"
                gap="gap-4"
                radius={14}
              />
            ) : p.images?.layout === "web-strip" ? (
              <WebFeaturedOverlay screenshots={p.images.screenshots ?? []} alt={p.title} />
            ) : (
              p.images?.screenshots?.map((src, i) => {
                const pos = COLLAGE_POSITIONS[i % COLLAGE_POSITIONS.length];
                return (
                  <PhoneMockup
                    key={src}
                    src={src}
                    alt={`${p.title} screenshot ${i + 1}`}
                    style={{
                      left: pos.left,
                      top: pos.top,
                      transform: `rotate(${pos.rotate}deg)`,
                      zIndex: pos.z,
                    }}
                  />
                );
              })
            )}
            {/* App icon — top-left, on top of everything */}
            {p.images?.icon && (
              <div className="absolute top-4 left-4" style={{ zIndex: 10 }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}>
                  <Image src={p.images.icon} alt={`${p.title} icon`} width={52} height={52} style={{ objectFit: "cover" }} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full max-w-md rounded-lg p-5 text-xs leading-relaxed font-mono"
              style={{ background: "rgba(255,252,247,0.55)", color: "var(--on-surface-variant)", backdropFilter: "blur(4px)", border: "1px solid rgba(186,186,176,0.15)" }}>
              <span style={{ color: "var(--primary)" }}>$</span>{" "}
              <span style={{ color: "var(--on-surface)" }}>git clone</span>{" "}
              {p.githubUrl ?? `github.com/chanmin/${p.title}`}
              <br /><span style={{ color: "var(--outline)" }}>&gt; cloning &apos;{p.title}&apos;...</span>
              <br /><span style={{ color: "var(--primary)" }}>&gt; {p.tags.join(" · ")}</span>
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg"
          style={{ background: "rgba(255,252,247,0.85)", color: "var(--on-surface)", zIndex: 10 }}>
          featured
        </div>
      </div>
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-3xl font-bold lowercase leading-tight" style={{ color: "var(--on-surface)" }}>{p.title}</h2>
          <div className="flex items-center gap-3 ml-4 flex-shrink-0">
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold lowercase px-4 py-1.5 rounded-full transition-all"
                style={{ background: "var(--primary)", color: "var(--on-primary)" }}>live ↗</a>
            )}
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity text-lg" style={{ color: "var(--primary)" }}>↗</a>
            )}
          </div>
        </div>
        <p className="leading-relaxed mb-8" style={{ color: "var(--on-surface-variant)" }}>{p.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {p.tags.map((t) => (
              <span key={t} className="text-[11px] px-3 py-1 rounded"
                style={{ background: "var(--surface-highest)", color: "var(--tertiary)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SideCard({ p }: { p: Project }) {
  const showStrip = p.images?.layout === "strip" && (p.images?.screenshots?.length ?? 0) > 0;
  const showWebStrip = p.images?.layout === "web-strip" && (p.images?.screenshots?.length ?? 0) > 0;
  return (
    <div data-square-blocker className="group md:col-span-4 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--surface-highest)" }}>
      {showStrip && (
        <div className="relative w-full aspect-[3/4] overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]"
          style={{ background: "var(--surface-low)" }}>
          <ScreenshotStrip
            screenshots={p.images!.screenshots!}
            alt={p.title}
            fullBleed
            limit={2}
            objectFits={["cover", "cover"]}
            objectPositions={["left top", "left top"]}
            scales={[1, 1.3]}
          />
        </div>
      )}
      {showWebStrip && (
        <div className="relative w-full aspect-[3/4] overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]"
          style={{ background: "var(--surface-low)" }}>
          <WebScreenshotStrip
            screenshots={p.images!.screenshots!}
            alt={p.title}
            fullBleed
            limit={2}
          />
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow">
      <div className="flex items-center justify-between mb-6">
        <span className="text-2xl">⬡</span>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--tertiary)" }}>{p.status}</span>
      </div>
      <h2 className="text-xl font-bold lowercase mb-4" style={{ color: "var(--on-surface)" }}>{p.title}</h2>
      <p className="text-sm leading-relaxed flex-grow" style={{ color: "var(--on-surface-variant)" }}>{p.description}</p>
      <div className="mt-6 pt-4 flex items-center justify-end gap-3"
        style={{ borderTop: "1px solid rgba(186,186,176,0.2)" }}>
        <div className="flex items-center gap-3">
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
              className="text-xs font-bold lowercase underline decoration-2 underline-offset-4" style={{ color: "var(--primary)" }}>live ↗</a>
          )}
          {p.githubUrl
            ? <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold lowercase underline decoration-2 underline-offset-4" style={{ color: "var(--primary)" }}>source</a>
            : <span className="text-xs lowercase" style={{ color: "var(--outline)" }}>private</span>
          }
        </div>
      </div>
      </div>
    </div>
  );
}

function HorizontalCard({ p }: { p: Project }) {
  return (
    <div data-square-blocker className="group md:col-span-8 rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--surface-low)" }}>
      <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
        <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--primary)" }}>{p.status}</div>
        <h2 className="text-2xl font-bold lowercase mb-4" style={{ color: "var(--on-surface)" }}>{p.title}</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--on-surface-variant)" }}>{p.description}</p>
        <div className="flex gap-3 flex-wrap">
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
              className="self-start px-6 py-2 rounded-full text-xs lowercase font-medium transition-all"
              style={{ background: "var(--primary)", color: "var(--on-primary)" }}>live ↗</a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
              className="self-start px-6 py-2 rounded-full text-xs lowercase font-medium transition-all"
              style={{ background: "var(--surface-highest)", color: "var(--on-surface)" }}>repository</a>
          )}
        </div>
      </div>
      <div className="md:w-1/2 relative flex items-center justify-center p-8 overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]" style={{ background: "var(--surface-highest)" }}>
        {p.images?.layout === "strip" && (p.images?.screenshots?.length ?? 0) > 0 ? (
          <ScreenshotStrip screenshots={p.images!.screenshots!} alt={p.title} padding="p-5" gap="gap-3" radius={12} />
        ) : p.images?.layout === "web-strip" && (p.images?.screenshots?.length ?? 0) > 0 ? (
          <WebScreenshotStrip screenshots={p.images!.screenshots!} alt={p.title} padding="p-5" gap="gap-3" radius={10} />
        ) : (
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
        )}
      </div>
    </div>
  );
}

function SmallCard({ p }: { p: Project }) {
  return (
    <div data-square-blocker className="group md:col-span-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:brightness-[0.97]"
      style={{ background: "var(--surface-low)" }}>
      <div className="h-36 relative overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.01]" style={{ background: "var(--surface-highest)" }}>
        {p.images?.layout === "strip" && (p.images?.screenshots?.length ?? 0) > 0 ? (
          <ScreenshotStrip
            screenshots={p.images!.screenshots!}
            alt={p.title}
            fullBleed
            objectPositions={["top", "50%", "40%"]}
          />
        ) : p.images?.layout === "web-strip" && (p.images?.screenshots?.length ?? 0) > 0 ? (
          <WebScreenshotStrip
            screenshots={p.images!.screenshots!}
            alt={p.title}
            fullBleed
            limit={2}
          />
        ) : (
          <span className="text-4xl font-bold lowercase opacity-20" style={{ color: "var(--primary)" }}>
            {p.title.slice(0, 2)}
          </span>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-lg font-bold lowercase mb-2" style={{ color: "var(--on-surface)" }}>{p.title}</h2>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--on-surface-variant)" }}>{p.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {p.tags.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] uppercase tracking-widest" style={{ color: "var(--tertiary)" }}>{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold lowercase underline decoration-2 underline-offset-4" style={{ color: "var(--primary)" }}>live ↗</a>
            )}
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold lowercase underline decoration-2 underline-offset-4" style={{ color: "var(--primary)" }}>source</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsList({
  projects,
}: {
  projects: Project[];
}) {
  const [active, setActive] = useState<Filter>("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter bar */}
      <div data-square-blocker className="flex flex-wrap items-center gap-8 mb-8">
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

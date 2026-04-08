import type { ReactNode } from "react";
import PopCount from "@/components/PopCount";

export type SectionStat = {
  value: ReactNode;
  label: string;
};

export default function SectionShell({
  id,
  eyebrow = id,
  title,
  description,
  beforeStats,
  stats,
  children,
}: {
  id: string;
  /** Defaults to `id`. Pass `null` to hide. */
  eyebrow?: string | null;
  title: ReactNode;
  description?: ReactNode;
  /** Optional content rendered between the header and the stats bar. */
  beforeStats?: ReactNode;
  /** When provided, renders the bordered stats bar above `children`. */
  stats?: SectionStat[];
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="max-w-7xl mx-auto px-8 pb-8 scroll-mt-28"
    >
      <p className="text-sm lowercase tracking-widest mb-6" style={{ color: "var(--outline)" }}>
        pops : <PopCount />
      </p>

      <div
        style={{ borderTop: "1px solid var(--outline-variant)" }}
      >
        {eyebrow != null && eyebrow !== "" && (
          <p
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: "var(--outline)" }}
          >
            {eyebrow}
          </p>
        )}

        <header className="mb-12">
          <h2
            className="text-5xl md:text-7xl font-bold lowercase tracking-tighter mb-6"
            style={{ color: "var(--on-surface)" }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {description}
            </p>
          )}
        </header>

        {beforeStats}

        {stats && stats.length > 0 && (
          <div
            className="flex flex-wrap gap-x-10 gap-y-4 py-6 mb-16"
            style={{
              borderTop: "1px solid var(--outline-variant)",
              borderBottom: "1px solid var(--outline-variant)",
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
                  {stat.value}
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--on-surface-variant)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

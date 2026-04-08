import type { ReactNode } from "react";
import PopCount from "@/components/PopCount";

export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
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
        {eyebrow && (
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

        {children}
      </div>
    </section>
  );
}

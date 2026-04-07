import Link from "next/link";
import Image from "next/image";

const sections = [
  {
    num: "01", href: "/coding", label: "work",
    description: "Building tools for productivity, community, and creative work automation",
    meta: "24 repos · 1.2k commits ytd",
    bg: "var(--surface-highest)",
  },
  {
    num: "02", href: "/music", label: "sound",
    description: "Original songs, covers, and live sessions. Edited on Logic Pro X",
    meta: "Spotify · YouTube · Instagram",
    bg: "var(--primary-container)",
  },
  {
    num: "03", href: "/vlogs", label: "vlogs",
    description: "Retreat episodes and highlights. Edited on Final Cut Pro",
    meta: "5 stories and counting",
    bg: "var(--surface-high)",
  },
];

export default function Home() {
  return (
    <main className="grain flex-1 pt-32 pb-24">
      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <p className="text-sm lowercase tracking-widest mb-6" style={{ color: "var(--outline)" }}>
          chanmin park
        </p>

        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold lowercase leading-[0.9] tracking-tighter mb-8"
          style={{ color: "var(--on-surface)" }}
        >
          /create
          <br />
          compose{" "}
          <span className="relative inline-block">
            &amp; capture
            <span
              className="absolute -bottom-1 left-0 w-full h-3 -z-10"
              style={{ background: "var(--primary-container)" }}
            />
          </span>
          .
        </h1>

        <p className="text-xl mb-10 max-w-lg leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
          a portfolio
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/coding"
            className="px-6 py-2.5 rounded-full text-sm lowercase font-medium transition-all"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          >
            explore work
          </Link>
          <Link
            href="/music"
            className="text-sm lowercase font-bold transition-all hover:underline underline-offset-4 decoration-2"
            style={{ color: "var(--primary)" }}
          >
            sound →
          </Link>
        </div>

        {/* Identity tag */}
        <div className="mt-16 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0" style={{ background: "var(--surface-highest)" }}>
            <Image src="/avatar.svg" width={44} height={44} alt="Chanmin" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold lowercase" style={{ color: "var(--on-surface)" }}>chanmin</p>
            <p className="text-xs lowercase" style={{ color: "var(--outline)" }}>currently based in san francisco, ca</p>
          </div>
        </div>
      </section>

      {/* ── Section divider ── */}
      <div className="max-w-7xl mx-auto px-8">
        <div style={{ borderTop: "1px solid rgba(186,186,176,0.2)" }} />
      </div>

      {/* ── Archive cards ── */}
      <section className="max-w-7xl mx-auto px-8 pt-16">
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "var(--outline)" }}>
          selected archive
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="group block">
              <div
                className="rounded-xl p-7 h-full flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-1"
                style={{ background: s.bg }}
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-xs" style={{ color: "var(--outline)", fontFamily: "monospace" }}>{s.num}</span>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-50" style={{ color: "var(--on-surface)" }}>{s.label}</span>
                  </div>
                  <h3 className="text-2xl font-bold lowercase mb-3 leading-tight" style={{ color: "var(--on-surface)" }}>{s.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>{s.description}</p>
                </div>
                <div className="mt-8 flex items-end justify-between gap-2">
                  <p className="text-xs" style={{ color: "var(--outline)", fontFamily: "monospace" }}>{s.meta}</p>
                  <span
                    className="text-xs font-bold lowercase opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--primary)" }}
                  >
                    view →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

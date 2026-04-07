import Link from "next/link";
import Image from "next/image";

const sections = [
  {
    num: "01",
    href: "/coding",
    label: "Work",
    cta: "View repositories _",
    description:
      "Building tools for productivity, community, and creative work automation",
    stats: ["24 repos", "1.2k commits ytd"],
    bg: "#1a1a1a",
    text: "#f5f0e8",
    muted: "#a09080",
    accent: "#fbd745",
  },
  {
    num: "02",
    href: "/music",
    label: "Music",
    cta: "Listen now _",
    description:
      "Original songs, covers, and live sessions. Edited on Logic Pro X",
    stats: ["Spotify", "YouTube", "Instagram"],
    bg: "#fbd745",
    text: "#1a1a1a",
    muted: "#6b5e30",
    accent: "#1a1a1a",
  },
  {
    num: "03",
    href: "/vlogs",
    label: "Vlogs",
    cta: "Watch episodes _",
    description:
      "Retreat episodes and highlights. Edited on Final Cut Pro",
    stats: ["5 stories", "and counting"],
    bg: "#f5ede4",
    text: "#1a1a1a",
    muted: "#8b7b6b",
    accent: "#1a1a1a",
  },
];

export default function Home() {
  return (
    <main className="grain flex-1 bg-[#fbf9f5]">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="max-w-3xl">
          <p
            className="text-xs text-[#a09890] uppercase tracking-widest mb-6"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            Chanmin Park
          </p>

          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold leading-[0.95] tracking-tight text-[#1a1a1a] mb-8"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            /create
            <br />
            compose {" "}
            <span className="relative inline-block">
              & capture
              <span
                className="absolute -bottom-1 left-0 w-full h-3 -z-10"
                style={{ background: "#fbd745", opacity: 0.7 }}
              />
            </span>
            .
          </h1>

          <p className="text-lg text-[#6b6460] leading-relaxed mb-10 max-w-lg">
             a portfolio
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/coding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-[#f5f0e8] text-sm font-semibold rounded-full hover:bg-[#333] transition-colors"
            >
              Explore Work
              <span className="opacity-60">_</span>
            </Link>
            <Link
              href="/music"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#e8e0d8] text-[#6b6460] text-sm font-semibold rounded-full hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
            >
              Music _ 
            </Link>
          </div>
        </div>

        {/* Identity tag */}
        <div className="mt-16 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e8e0d8] flex-shrink-0">
            <Image
              src="/avatar.svg"
              width={48}
              height={48}
              alt="Chanmin"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a1a1a]">Chanmin</p>
            <p
              className="text-xs text-[#a09890]"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              Currently based in San Francisco, CA
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#e8e0d8]" />
      </div>

      {/* ── Studio Intro Block ───────────────────────── */}
      {/* <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p
            className="text-xs text-[#a09890] uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            Studio Aesthetic / 01
          </p>
          <h2 className="text-3xl font-bold text-[#1a1a1a] leading-tight">
            Spatial Design
            <br />
            for the Digital Ecosystem
          </h2>
        </div>
        <div className="space-y-6 pt-1">
          <div>
            <p className="text-xs font-semibold text-[#1a1a1a] mb-1 uppercase tracking-wide">
              Atmospheric Depth
            </p>
            <p className="text-sm text-[#6b6460] leading-relaxed">
              Tonal layering and ambient intention — every project replaces
              noise with deliberate structure.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1a1a1a] mb-1 uppercase tracking-wide">
              The Solarium Effect
            </p>
            <p className="text-sm text-[#6b6460] leading-relaxed">
              Interfaces and experiences built as light-filled studios,
              optimising air, focus, and human optimism.
            </p>
          </div>
        </div>
      // </section> */}

      {/* ── Section Cards ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <p
          className="text-xs text-[#a09890] uppercase tracking-widest mb-8"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          Selected Archive
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="group block">
              <div
                className="rounded-2xl p-7 h-full flex flex-col justify-between transition-transform duration-200 group-hover:-translate-y-1"
                style={{ background: s.bg, color: s.text }}
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="text-xs"
                      style={{
                        color: s.muted,
                        fontFamily: "var(--font-mono), monospace",
                      }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="text-xs font-semibold uppercase tracking-widest opacity-50"
                      style={{ color: s.text }}
                    >
                      {s.label}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-3 leading-tight"
                    style={{ color: s.text }}
                  >
                    {s.label}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: s.muted }}
                  >
                    {s.description}
                  </p>
                </div>

                <div className="mt-8 flex items-end justify-between gap-2">
                  <p
                    className="text-xs"
                    style={{
                      color: s.muted,
                      fontFamily: "var(--font-mono), monospace",
                    }}
                  >
                    {s.stats.join(" · ")}
                  </p>
                  <span
                    className="text-xs font-semibold whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ color: s.accent }}
                  >
                    {s.cta}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-[#e8e0d8]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
          <p
            className="text-xs text-[#a09890]"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            © 2026 chanmin. proverbs 3:5-6
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Instagram", href: "#" },
              { label: "YouTube", href: "#" },
              { label: "GitHub", href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-[#a09890] hover:text-[#1a1a1a] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

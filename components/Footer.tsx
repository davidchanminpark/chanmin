const links = [
  { label: "github",    href: "https://github.com/davidchanminpark" },
  { label: "linkedin",  href: "https://www.linkedin.com/in/chanmin-park" },
  { label: "instagram", href: "https://www.instagram.com/chanmin.mp3" },
  { label: "youtube",   href: "https://youtube.com/@chanmin0315?si=kLj6fcaRctYjfXZD" },
  
];

export default function Footer() {
  return (
    <footer
      data-square-blocker
      style={{ background: "var(--surface)", borderTop: "1px solid rgba(186,186,176,0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-lg font-bold lowercase tracking-tight" style={{ color: "var(--on-surface)" }}>
          chanmin's studio
        </span>
        <div className="flex gap-8">
          {links.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="text-sm lowercase tracking-wide transition-all hover:underline decoration-2 underline-offset-4"
              style={{ color: "var(--tertiary)" }}>
              {label}
            </a>
          ))}
        </div>
        <span className="text-sm lowercase tracking-wide opacity-70" style={{ color: "var(--tertiary)" }}>
        1 thessalonians 5:16-18
        </span>
      </div>
    </footer>
  );
}

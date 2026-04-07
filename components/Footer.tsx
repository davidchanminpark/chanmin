const links = [
  { label: "instagram", href: "#" },
  { label: "youtube",   href: "#" },
  { label: "github",    href: "#" },
  { label: "email",     href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid rgba(186,186,176,0.15)" }}>
      <div className="max-w-7xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-lg font-bold lowercase tracking-tight" style={{ color: "var(--on-surface)" }}>
          chanmin
        </span>
        <div className="flex gap-8">
          {links.map(({ label, href }) => (
            <a key={label} href={href}
              className="text-sm lowercase tracking-wide transition-all hover:underline decoration-2 underline-offset-4"
              style={{ color: "var(--tertiary)" }}>
              {label}
            </a>
          ))}
        </div>
        <span className="text-sm lowercase tracking-wide opacity-70" style={{ color: "var(--tertiary)" }}>
          © 2026 chanmin. proverbs 3:5-6
        </span>
      </div>
    </footer>
  );
}

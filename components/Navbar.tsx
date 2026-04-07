import Link from "next/link";

const navLinks = [
  { href: "/coding", label: "Work" },
  { href: "/music", label: "Sound" },
  { href: "/vlogs", label: "Vlogs" },
];

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(251, 249, 245, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(232, 224, 216, 0.6)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-[#1a1a1a] hover:opacity-70 transition-opacity"
        >
          chanmin
        </Link>

        <div className="flex items-center gap-7">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-[#6b6460] hover:text-[#1a1a1a] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

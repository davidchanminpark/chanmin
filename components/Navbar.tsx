"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/coding", label: "work" },
  { href: "/music",  label: "sound" },
  { href: "/vlogs",  label: "vlogs" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header
      className="fixed top-0 w-full z-50"
      style={{ background: "rgba(255,252,247,0.75)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      <nav className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold lowercase tracking-tight" style={{ color: "var(--on-surface)" }}>
          chanmin
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className="text-sm lowercase tracking-tight transition-colors duration-200"
                style={{
                  color: active ? "var(--primary)" : "var(--tertiary)",
                  borderBottom: active ? "2px solid var(--primary)" : "none",
                  paddingBottom: active ? "2px" : "0",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

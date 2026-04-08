"use client";

import { useEffect, useState } from "react";
import StudioLink from "@/components/StudioLink";

const navLinks = [
  { href: "/#code", label: "code" },
  { href: "/#music",  label: "music" },
  { href: "/#vlogs",  label: "vlogs" },
];

export default function Navbar() {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "");
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  return (
    <header
      data-square-blocker
      className="fixed top-0 w-full z-50"
      style={{ background: "rgba(255,252,247,0.75)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5 flex items-center justify-between">
        <StudioLink href="/" className="text-base md:text-xl font-bold lowercase tracking-tight" style={{ color: "var(--on-surface)" }}>
          chanmin's studio
        </StudioLink>
        <div className="flex items-center gap-5 md:gap-10">
          {navLinks.map(({ href, label }) => {
            const active = activeHash === href.replace("/", "");
            return (
              <StudioLink
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
              </StudioLink>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

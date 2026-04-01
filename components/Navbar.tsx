import Link from "next/link";

const links = [
  { href: "/", label: "Chanmin" },
  { href: "/coding", label: "Coding" },
  { href: "/music", label: "Music" },
  { href: "/vlogs", label: "Vlogs" },
];

export default function Navbar() {
  return (
    <nav>
      {links.map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

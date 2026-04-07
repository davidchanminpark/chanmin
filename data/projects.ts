export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: "active" | "stable" | "experimental" | "archived";
  category: "frontend" | "fullstack" | "tools";
  githubUrl?: string;
  stars?: number;
  year: number;
}

const projects: Project[] = [
  {
    title: "chanmin.dev",
    description:
      "Personal portfolio site — music, vlogs, and work in one place. Built with Next.js App Router and Tailwind CSS v4.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    status: "active",
    category: "frontend",
    githubUrl: "https://github.com/davidchanminpark/chanmin",
    stars: 4,
    year: 2024,
  },
  {
    title: "react-audio-hooks",
    description:
      "Lightweight React hooks for the Web Audio API — gain nodes, analyser, oscillator, and playback state management.",
    tags: ["React", "TypeScript", "Web Audio API"],
    status: "stable",
    category: "frontend",
    stars: 31,
    year: 2023,
  },
  {
    title: "songlog",
    description:
      "50-day songwriting challenge tracker. Logs daily entries, view counts synced from Instagram, and streak data.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    status: "experimental",
    category: "fullstack",
    stars: 7,
    year: 2024,
  },
  {
    title: "vlog-sync",
    description:
      "CLI tool that pulls YouTube and Instagram metadata and writes structured JSON for static site generation.",
    tags: ["Node.js", "YouTube API", "CLI"],
    status: "experimental",
    category: "tools",
    stars: 12,
    year: 2024,
  },
  {
    title: "motion-palette",
    description:
      "Zero-dependency animation utility library. Keyframe helpers, easing curves, and a stagger composition API.",
    tags: ["TypeScript", "CSS", "Animation"],
    status: "stable",
    category: "frontend",
    stars: 58,
    year: 2023,
  },
  {
    title: "stream-dashboard",
    description:
      "Music streaming analytics dashboard — aggregates Spotify for Artists data and renders trend charts.",
    tags: ["Next.js", "Recharts", "Spotify API"],
    status: "experimental",
    category: "fullstack",
    stars: 9,
    year: 2024,
  },
];

export default projects;

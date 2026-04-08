export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: "active" | "stable" | "experimental" | "archived";
  category: "web" | "mobile" | "tools";
  githubUrl?: string;
  year: number;
}

const projects: Project[] = [
  {
    title: "time-my-life",
    description:
      "A time tracking iOS and watchOS app that records and analyzes your daily activities and personal goals. Syncs with Apple Watch. For those curious about how they spend time.",
    tags: ["Swift", "CoreData", "Watch Connectivity"],
    status: "stable",
    category: "mobile",
    githubUrl: "https://github.com/davidchanminpark/time-my-life",
    year: 2024,
  },
  {
    title: "psychiatrist",
    description:
      "An online version of the group game 'psychiatrist,' with a new 'crazy patient' rule variant.",
    tags: ["React", "Node.js", "Socket.io"],
    status: "stable",
    category: "web",
    githubUrl: "https://github.com/davidchanminpark/psychiatrist",
    year: 2023,
  },
  {
    title: "1q-a-day",
    description:
      "Daily journaling app where users get asked the same question the same day of the year.",
    tags: ["Swift", "SwiftUI", "SwiftData"],
    status: "stable",
    category: "mobile",
    githubUrl: "https://github.com/davidchanminpark/1q-a-day",
    year: 2024,
  },
  {
    title: "chanmin.dev",
    description:
      "Personal portfolio site — music, vlogs, and work in one place. Built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    status: "active",
    category: "web",
    githubUrl: "https://github.com/davidchanminpark/chanmin",
    year: 2024,
  },
  {
    title: "roadtrip",
    description:
      "A music playlist sharing app where users can create temporary queues.",
    tags: ["Objective-C", "Swift", "Spotify API"],
    status: "stable",
    category: "mobile",
    githubUrl: "https://github.com/davidchanminpark/roadtrip",
    year: 2024,
  },
  {
    title: "dew",
    description:
      "Clothing marketplace app where users can buy and sell used clothing with a focus on sustainability.",
    tags: ["Node.js", "MongoDB", "HTML", "CSS"],
    status: "stable",
    category: "web",
    githubUrl: "https://github.com/davidchanminpark/csprojects/tree/master/Clothing%20Marketplace%20App",
    year: 2023,
  },
];

export default projects;

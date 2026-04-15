export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: "active" | "stable" | "experimental" | "archived";
  category: "web" | "mobile" | "tools";
  githubUrl?: string;
  liveUrl?: string;
  year: number;
  images?: {
    icon?: string;
    screenshots?: string[];
    /** How the screenshots are rendered on the card. Defaults to "mockup" (tilted phone frames). */
    layout?: "mockup" | "strip" | "web-strip";
  };
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
    images: {
      icon: "/projects/time-my-life/icon.png",
      screenshots: [
        "/projects/time-my-life/screenshot-home.png",
        "/projects/time-my-life/screenshot-timer.png",
        "/projects/time-my-life/screenshot-detail.png",
        "/projects/time-my-life/screenshot-year-dark.png",
      ],
    },
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
    images: {
      layout: "strip",
      screenshots: [
        "/projects/1q-a-day/screenshot-today.png",
        "/projects/1q-a-day/screenshot-past.png",
        "/projects/1q-a-day/screenshot-calendar.png",
      ],
    },
  },
  {
    title: "psychiatrist",
    description:
      "An online version of the group game 'psychiatrist,' with a new 'crazy patient' rule variant.",
    tags: ["React", "Node.js", "Socket.io"],
    status: "stable",
    category: "web",
    githubUrl: "https://github.com/davidchanminpark/psychiatrist",
    liveUrl: "https://psychiatrist-2o7v.onrender.com",
    year: 2023,
    images: {
      layout: "web-strip",
      screenshots: [
        "/projects/psychiatrist/screenshot-home-desktop.png",
        "/projects/psychiatrist/screenshot-game.png",
        "/projects/psychiatrist/screenshot-leaderboard.png",
      ],
    },
  },
  {
    title: "chanmin.studio",
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

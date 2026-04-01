export interface Project {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  linkedinUrl: string;
}

const projects: Project[] = [
  {
    title: "Chanmin Website",
    description: "Personal portfolio site built with Next.js and Tailwind CSS.",
    image: "/projects/chanmin-website.png",
    githubUrl: "https://github.com/davidchanminpark/chanmin",
    linkedinUrl: "",
  },
];

export default projects;

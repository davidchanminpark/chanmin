import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsScroll() {
  return (
    <div className="flex flex-row overflow-x-auto gap-4 p-4">
      {projects.map((project) => (
        <div key={project.title} className="flex-shrink-0 w-72">
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
  );
}

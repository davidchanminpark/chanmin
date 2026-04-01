import Image from "next/image";
import { Project } from "@/data/projects";

export default function ProjectCard({ title, description, image, githubUrl }: Project) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800">
        <Image src={image} alt={`${title} screenshot`} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:underline"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

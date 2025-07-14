import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="container mx-auto py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Mes projets</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

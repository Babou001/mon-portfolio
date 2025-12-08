"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/contexts/LanguageProvider";

export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: t.projects.filters.all },
    { id: "genai", label: t.projects.filters.genai },
    { id: "rag", label: t.projects.filters.rag },
    { id: "cv", label: t.projects.filters.cv },
    { id: "research", label: t.projects.filters.research },
  ];

  const filteredProjects = activeFilter === "all"
    ? t.projects.projects
    : t.projects.projects.filter((project) =>
        project.tags.some((tag) =>
          tag.toLowerCase().includes(activeFilter.toLowerCase()) ||
          (activeFilter === "genai" && tag.toLowerCase().includes("genia")) ||
          (activeFilter === "cv" && tag.toLowerCase().includes("computer vision")) ||
          (activeFilter === "research" && tag.toLowerCase().includes("recherche"))
        )
      );

  return (
    <section id="projects" className="container mx-auto py-20 px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-holographic"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t.projects.title}
      </motion.h2>

      <motion.p
        className="text-center text-foreground/60 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t.projects.subtitle}
      </motion.p>

      {/* Filters */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all cursor-pointer ${
              activeFilter === filter.id
                ? "bg-primary text-background glow-primary"
                : "glass border border-primary/20 text-foreground/80 hover:border-primary/40"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects counter */}
      <motion.p
        className="text-center text-foreground/50 text-sm mb-8"
        key={filteredProjects.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {filteredProjects.length} {filteredProjects.length > 1 ? t.projects.projectsCountPlural : t.projects.projectsCount}
      </motion.p>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        <AnimatePresence>
          {filteredProjects.map((p, index) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                layout: { duration: 0.3 }
              }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-foreground/60 text-lg">Aucun projet trouvé pour ce filtre</p>
        </motion.div>
      )}
    </section>
  );
}

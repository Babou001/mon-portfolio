"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Lock, ExternalLink, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageProvider";

type Project = {
  title: string;
  year: number;
  tags: string[];
  description?: string;
  organization?: string;
  context?: string;
  objective?: string;
  solution?: string;
  status?: string;
  technologies?: string[];
  link?: string;
  image?: string;
  confidential?: boolean;
};

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);

  const isConfidential = project.confidential ||
    (project.organization &&
     !project.organization.toLowerCase().includes("personal") &&
     !project.organization.toLowerCase().includes("personnel") &&
     !project.link);

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1500}
      gyroscope={true}
      className="h-full"
    >
      <motion.div
        className="relative h-full min-h-[400px] cursor-pointer perspective-1000"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Card Container with flip */}
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute inset-0 rounded-2xl glass group overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Header: project image or fallback gradient */}
            <div className="h-44 relative overflow-hidden">
              {project.image ? (
                <>
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </>
              )}
              {isConfidential && (
                <Lock className="absolute top-4 right-4 w-6 h-6 text-foreground/40 drop-shadow" />
              )}
            </div>

            {/* Content */}
            <div className="p-6 -mt-8 relative z-10">
              <motion.h3
                className="text-2xl font-bold text-foreground mb-2 line-clamp-2"
                whileHover={{ scale: 1.02 }}
              >
                {project.title}
              </motion.h3>

              {project.organization && (
                <p className="text-sm text-foreground/60 mb-4 italic">
                  {project.organization} • {project.year}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
                {project.status && (
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 cursor-default"
                  >
                    {project.status}
                  </motion.span>
                )}
              </div>

              {/* Description or Context */}
              <p className="text-sm text-foreground/70 line-clamp-4 mb-6">
                {project.context || project.description}
              </p>

              {/* Flip indicator */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 text-primary/60 text-sm">
                <RotateCcw className="w-4 h-4" />
                <span>{t.projects.flipHint}</span>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl border border-primary/20 group-hover:border-primary/40 transition-colors duration-300" />
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 rounded-2xl glass-strong p-6 overflow-y-auto"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <h3 className="text-xl font-bold text-primary mb-4">{project.title}</h3>

            {project.objective && (
              <div className="mb-4">
                <h4 className="text-sm font-bold text-secondary mb-1">{t.projects.objective}</h4>
                <p className="text-sm text-foreground/80">{project.objective}</p>
              </div>
            )}

            {project.solution && (
              <div className="mb-4">
                <h4 className="text-sm font-bold text-accent mb-1">{t.projects.solution}</h4>
                <p className="text-sm text-foreground/80">{project.solution}</p>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-bold text-primary mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 212, 255, 0.2)" }}
                      className="text-[10px] px-2 py-1 rounded-full bg-muted text-foreground/70 border border-foreground/10 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Confidential badge */}
            {isConfidential && (
              <motion.div
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-foreground/20 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Lock className="w-4 h-4 text-foreground/60" />
                <span className="text-xs text-foreground/60 font-medium">{t.projects.confidential}</span>
              </motion.div>
            )}

            {/* Link if available */}
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-background font-medium text-sm glow-primary cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                {t.projects.viewProject}
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}

            {/* Return indicator */}
            <div className="absolute top-6 right-6 text-foreground/40">
              <RotateCcw className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Tilt>
  );
}

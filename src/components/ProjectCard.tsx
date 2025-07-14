import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          {project.organization && (
            <p className="text-xs italic text-gray-400 mb-2">{project.organization}</p>
          )}
          {project.description && (
            <p className="text-sm mb-4 text-gray-300">{project.description}</p>
          )}

          {project.context && (
            <p className="text-sm mb-2 text-gray-300"><strong>Contexte&nbsp;:</strong> {project.context}</p>
          )}

          {project.objective && (
            <p className="text-sm mb-2 text-gray-300"><strong>Objectif&nbsp;:</strong> {project.objective}</p>
          )}

          {project.solution && (
            <p className="text-sm mb-4 text-gray-300"><strong>Solution&nbsp;:</strong> {project.solution}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t: string) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full bg-indigo-600/20 text-indigo-300"
              >
                {t}
              </span>
            ))}
            <span className="text-xs px-2 py-1 rounded-full bg-orange-600/20 text-orange-300">
              {project.year}
            </span>
            {project.status && (
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-600/20 text-yellow-300">
                {project.status}
              </span>
            )}
          </div>
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-1 rounded-full bg-slate-700 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageProvider";

type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  contractType: string;
  period: string;
  current?: boolean;
  missions: string[];
  technologies?: string[];
};

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const { t } = useLanguage();
  const isLast = index === t.experience.items.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative flex gap-6 pl-2"
    >
      {/* Timeline rail */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className={`w-11 h-11 shrink-0 rounded-full border-2 flex items-center justify-center ${
            item.current
              ? "bg-accent/20 border-accent glow-accent"
              : "bg-primary/20 border-primary glow-primary"
          }`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 + 0.2, type: "spring", stiffness: 200 }}
        >
          <Briefcase className={`w-5 h-5 ${item.current ? "text-accent" : "text-primary"}`} />
        </motion.div>

        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 bg-gradient-to-b from-primary/60 to-primary/10 mt-2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + 0.4, duration: 0.4 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        className={`relative flex-1 rounded-2xl p-6 group cursor-default mb-10 ${
          item.current
            ? "glass-strong border-2 border-accent/40"
            : "glass border border-transparent hover:border-primary/30 transition-colors duration-300"
        }`}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative z-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
            <h3 className="text-xl font-bold text-foreground">{item.role}</h3>
            <span className="text-xs text-foreground/60 font-semibold whitespace-nowrap">
              {item.period}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <p className="text-sm text-primary font-medium">
              {item.company} • {item.location}
            </p>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wide ${
                item.current
                  ? "bg-accent/20 text-accent border-accent/30"
                  : "bg-secondary/20 text-secondary border-secondary/30"
              }`}
            >
              {item.contractType}
            </span>
            {item.current && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-bold uppercase tracking-wide animate-pulse">
                {t.experience.present}
              </span>
            )}
          </div>

          {/* Missions */}
          <ul className="space-y-1.5 mb-4">
            {item.missions.map((mission) => (
              <li key={mission} className="text-sm text-foreground/70 flex gap-2">
                <span className="text-primary mt-1.5 shrink-0">▹</span>
                <span>{mission}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.5 + i * 0.03 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 212, 255, 0.2)" }}
                  className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary/90 border border-primary/20 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative container mx-auto py-20 px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-holographic"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t.experience.title}
      </motion.h2>

      <motion.p
        className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t.experience.subtitle}
      </motion.p>

      <div className="max-w-3xl mx-auto">
        {t.experience.items.map((item, index) => (
          <ExperienceCard key={item.role + item.period} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

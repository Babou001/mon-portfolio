"use client";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageProvider";

type Formation = {
  degree: string;
  institution: string;
  years: string;
  focus: string;
  courses?: string[];
};

function FormationCard({ formation, index }: { formation: Formation; index: number }) {
  const { t } = useLanguage();
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex gap-6 items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Timeline node */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center glow-primary"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
        >
          <GraduationCap className="w-6 h-6 text-primary" />
        </motion.div>

        {/* Connecting line */}
        {index < 2 && (
          <motion.div
            className="w-0.5 h-24 bg-gradient-to-b from-primary to-primary/20 mt-2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        className="flex-1 glass rounded-2xl p-6 group cursor-default"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glow border on hover */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/30 transition-colors duration-300" />

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-foreground mb-2">{formation.degree}</h3>
          <p className="text-sm text-primary font-medium mb-1">
            {formation.institution}
          </p>
          <p className="text-xs text-secondary font-semibold mb-4">{formation.years}</p>

          <p className="text-sm text-foreground/70 mb-4">
            <strong className="text-accent">{t.formations.focus}:</strong> {formation.focus}
          </p>

          {/* Courses */}
          {formation.courses && formation.courses.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formation.courses.map((course, i) => (
                <motion.span
                  key={course}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.6 + i * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 212, 255, 0.2)" }}
                  className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary/90 border border-primary/20 cursor-default"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Decorative gradient */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-secondary/10 blur-2xl group-hover:bg-accent/20 transition-colors duration-500" />
      </motion.div>
    </motion.div>
  );
}

export default function Formations() {
  const { t } = useLanguage();

  return (
    <section id="formations" className="relative container mx-auto py-20 px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-holographic"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t.formations.title}
      </motion.h2>

      <motion.p
        className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t.formations.subtitle}
      </motion.p>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto space-y-8">
        {t.formations.formations.map((formation, index) => (
          <FormationCard
            key={formation.degree + formation.years}
            formation={formation}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

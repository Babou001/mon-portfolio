"use client";
import { motion } from "framer-motion";
import { Brain, BookOpen, Eye, Bot, TrendingUp, Cpu, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageProvider";
import SkillsRadar from "./SkillsRadar";

type SkillCategory = {
  titleKey: "llmRag" | "computerVision" | "aiAgents" | "dataOps" | "machineLearning" | "deepLearning";
  icon: LucideIcon;
  itemsKey: "llmRag" | "computerVision" | "aiAgents" | "dataOps" | "machineLearning" | "deepLearning";
};

const categories: SkillCategory[] = [
  {
    titleKey: "llmRag",
    icon: Brain,
    itemsKey: "llmRag",
  },
  {
    titleKey: "computerVision",
    icon: Eye,
    itemsKey: "computerVision",
  },
  {
    titleKey: "aiAgents",
    icon: Bot,
    itemsKey: "aiAgents",
  },
  {
    titleKey: "dataOps",
    icon: BookOpen,
    itemsKey: "dataOps",
  },
  {
    titleKey: "machineLearning",
    icon: TrendingUp,
    itemsKey: "machineLearning",
  },
  {
    titleKey: "deepLearning",
    icon: Cpu,
    itemsKey: "deepLearning",
  },
];

export default function Skills() {
  const { t } = useLanguage();

  // Radar data
  const radarSkills = [
    { label: "LLM & RAG", value: 95 },
    { label: "Computer Vision", value: 65 },
    { label: "AI Agents", value: 70 },
    { label: "Data Ops", value: 80 },
  ];

  return (
    <section id="skills" className="container mx-auto py-20 px-4 relative">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-holographic"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t.skills.title}
      </motion.h2>

      <motion.p
        className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t.skills.subtitle}
      </motion.p>

      {/* Radar Chart */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <SkillsRadar skills={radarSkills} />
      </motion.div>

      {/* Skills Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ titleKey, icon: Icon, itemsKey }, index) => (
          <motion.div
            key={titleKey}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="relative overflow-hidden rounded-2xl p-6 glass group cursor-default"
          >
            {/* Animated gradient background on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/30 transition-colors duration-300" />

            {/* Content */}
            <motion.div
              className="relative z-10 flex items-center gap-3 mb-4"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground">{t.skills[titleKey]}</h3>
            </motion.div>

            <ul className="relative z-10 space-y-2">
              {t.skills.items[itemsKey].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center gap-2 group/item"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    whileHover={{ scale: 2, backgroundColor: "#b967ff" }}
                  />
                  <span className="text-sm text-foreground/80 group-hover/item:text-primary transition-colors">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Decorative corner gradient */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-secondary/20 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

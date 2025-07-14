"use client";
import { motion } from "framer-motion";
import { Brain, BookOpen, Eye, Bot } from "lucide-react";

type SkillCategory = {
  title: string;
  icon: React.ElementType;
  items: string[];
};

const categories: SkillCategory[] = [
  {
    title: "LLM & RAG",
    icon: Brain,
    items: [
      "LangChain / LangGraph",
      "OpenAI / Azure OpenAI",
      "Llama.cpp, ollama",
      "ChromaDB, Weaviate, RedisVector",
      "Prompt engineering & eval",
    ],
  },
  {
    title: "Computer Vision",
    icon: Eye,
    items: [
      "YOLOv8 / RT-DETR",
      "OpenCV & cv2 cuda",
      "torchvision / ultralytics",
      "Fine-tuning, label-studio",
    ],
  },
  {
    title: "Agents IA",
    icon: Bot,
    items: [
      "Tool routing (ToolSelector)",
      "SQL & Pandas agents",
      "Multi-modal agents (vision + text)",
      "FastAPI + WebSocket gateways",
    ],
  },
  {
    title: "Data Engineering & Ops",
    icon: BookOpen,
    items: [
      "Docker / Docker-compose",
      "AWS (ECS, Fargate, S3)",
      "Streamlit / Gradio",
      "CI/CD Vercel & GitHub Actions",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="container mx-auto py-20">
      <h2 className="text-3xl font-bold mb-12 text-center">Compétences</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {categories.map(({ title, icon: Icon, items }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl"
          >
            {/* halo décoratif */}
            <motion.div
              layoutId="halo"
              className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-700/30 blur-2xl"
            />
            <div className="relative z-10 flex items-center gap-3 mb-4">
              <Icon className="w-6 h-6 text-indigo-400" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>

            <ul className="relative z-10 ml-2 list-disc list-inside space-y-1 text-sm text-gray-300">
              {items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
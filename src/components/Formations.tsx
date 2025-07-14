"use client";
import { motion } from "framer-motion";

type Formation = {
  degree: string;
  institution: string;
  years: string;
  focus: string;
  courses?: string[];
};

const formations: Formation[] = [
  {
    degree: "Licence Informatique",
    institution: "Aix‑Marseille Université",
    years: "2019‑2022",
    focus: "Informatique générale",
    courses: [
      "Réseaux",
      "Développement logiciel",
      "Complexité",
      "Statistiques",
      "Probabilités",
      "Clean code",
    ],
  },
  {
    degree: "Master Recherche IA & Machine/Deep Learning",
    institution: "AMU & École Centrale de Marseille",
    years: "2022‑2024",
    focus: "Recherche en intelligence artificielle",
    courses: [
      "Probabilités & Statistiques avancées",
      "Machine Learning (SVM, XGBoost, RF…)",
      "Deep Learning (CNN, RNN, Transformers, GAN…)",
      "Optimisation & Recherche opérationnelle",
      "Vision par ordinateur",
      "Traitement du signal",
      "Apprentissage par renforcement",
    ],
  },
  {
    degree: "Mastère Chef de Projet IA",
    institution: "Groupe Gema — IA School",
    years: "2024‑2025",
    focus: "Gestion de projet IA",
    courses: [
      "Cloud (AWS)",
      "Gestion de projet",
      "Aspects juridiques de l’IA",
      "Machine Learning",
      "Deep Learning",
    ],
  },
];

function FormationCard({ formation }: { formation: Formation }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="border border-white/10 rounded-2xl p-6 backdrop-blur-lg bg-white/5 shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-1">{formation.degree}</h3>
      <p className="text-sm text-gray-300 italic mb-1">
        {formation.institution}
      </p>
      <p className="text-xs text-indigo-300 mb-4">{formation.years}</p>

      <p className="text-sm text-gray-300 mb-2">
        <strong>Focus&nbsp;:</strong> {formation.focus}
      </p>

      {formation.courses && (
        <div className="flex flex-wrap gap-2 mt-2">
          {formation.courses.map((c) => (
            <span
              key={c}
              className="text-[10px] px-2 py-1 rounded-full bg-slate-700 text-slate-200"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Formations() {
  return (
    <section
      id="formations"
      className="relative container mx-auto py-20"
    >
      {/* Decorative dot grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-10 bg-repeat"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='%23667B9A' fill-opacity='0.3'%3e%3ccircle cx='2' cy='2' r='2'/%3e%3c/svg%3e\")",
        }}
      />
      <h2 className="text-3xl font-bold mb-8 text-center">Formations</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {formations.map((f) => (
          <FormationCard key={f.degree + f.years} formation={f} />
        ))}
      </div>
    </section>
  );
}
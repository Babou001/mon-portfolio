import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center">
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Salut, moi c'est Babou
      </motion.h1>
      <motion.p
        className="max-w-xl text-lg text-gray-300 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Votre prochain agent IA cherche encore son développeur ? RAG, LLM ou vision par ordi&nbsp;: je prends le clavier. Appelez‑moi !
      </motion.p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Link href="#projects">
          <ArrowDownCircle className="w-10 h-10 text-indigo-400 animate-bounce" />
        </Link>
      </motion.div>
    </section>
  );
}

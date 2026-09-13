"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownCircle, Mail, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageProvider";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20"
    >
      {/* Avatar/Logo placeholder stylé */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
      >
        <div className="relative w-40 h-40 rounded-full gradient-animated p-1 pulse-glow">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
            <Image
              src="/avatar.jpg"
              alt="Babou Seye"
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Rotating orbital rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-[-8px] rounded-full border border-secondary/20"
          animate={{ rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Nom avec effet holographique */}
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold mb-4 text-holographic"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {t.hero.title}
      </motion.h1>

      {/* Rôle avec gradient animé */}
      <motion.h2
        className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {t.hero.role}
      </motion.h2>

      {/* Typing animation améliorée */}
      <motion.div
        className="max-w-3xl mb-4 min-h-[3em] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <TypeAnimation
          key={t.hero.subtitle}
          sequence={[
            t.hero.subtitle,
            3000,
            "",
            500,
          ]}
          wrapper="p"
          speed={50}
          className="text-xl md:text-2xl text-foreground/80 font-medium"
          repeat={Infinity}
          cursor={true}
          style={{ display: "inline-block" }}
        />
      </motion.div>

      {/* Description */}
      <motion.p
        className="max-w-2xl text-lg text-foreground/60 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {t.hero.description}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <Link href="#projects">
          <motion.button
            className="px-8 py-4 rounded-lg bg-primary text-background font-bold text-lg glow-primary cursor-pointer group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Briefcase className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t.hero.cta.projects}
            </span>
            <motion.div
              className="absolute inset-0 bg-secondary"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>

        <Link href="#contact">
          <motion.button
            className="px-8 py-4 rounded-lg glass border-2 border-primary text-primary font-bold text-lg cursor-pointer group relative overflow-hidden"
            whileHover={{ scale: 1.05, borderColor: "#b967ff" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t.hero.cta.contact}
            </span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Scroll indicator animé */}
      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.8 },
          y: { repeat: Infinity, duration: 2, delay: 2 },
        }}
      >
        <Link href="#skills" className="cursor-pointer">
          <ArrowDownCircle className="w-10 h-10 text-primary glow-primary" />
        </Link>
      </motion.div>

      {/* Particules décoratives flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background:
                i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#b967ff" : "#05ffa1",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const links = [
    { href: "#hero", label: t.nav.home },
    { href: "#skills", label: t.nav.skills },
    { href: "#formations", label: t.nav.formations },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] via-[#b967ff] to-[#05ffa1] origin-left z-[60]"
        style={{ scaleX }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-strong shadow-lg shadow-primary/5" : "glass"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo avec badge */}
          <Link href="#hero" className="group flex items-center gap-3 cursor-pointer">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* Badge avec gradient border */}
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent p-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-full h-full rounded-lg bg-background flex items-center justify-center">
                  <span className="text-lg font-bold text-holographic">BS</span>
                </div>
              </div>
            </motion.div>

            {/* Nom + titre (hidden on mobile) */}
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Babou Seye
              </span>
              <span className="text-xs text-foreground/60">AI Engineer</span>
            </div>
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className="relative px-4 py-2 rounded-lg text-foreground/80 hover:text-primary transition-colors cursor-pointer group overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 rounded-lg"
                    transition={{ duration: 0.2 }}
                  />
                  <span className="relative z-10 font-medium text-sm">{link.label}</span>

                  {/* Dot indicator */}
                  <motion.div
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Side: Language + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <motion.button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 cursor-pointer text-sm font-medium group overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Changer de langue"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <Globe className="w-4 h-4 text-primary relative z-10 group-hover:rotate-180 transition-transform duration-500" />
              <motion.span
                key={language}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-foreground font-semibold relative z-10 uppercase"
              >
                {language === "fr" ? "EN" : "FR"}
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setOpen(!open)}
              className="md:hidden rounded-lg p-2 glass-strong border border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Menu mobile"
            >
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {open ? (
                  <X className="h-5 w-5 text-primary" />
                ) : (
                  <Menu className="h-5 w-5 text-primary" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-strong border-t border-primary/10 overflow-hidden"
            >
              <ul className="flex flex-col gap-2 px-6 py-4">
                {links.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all font-medium cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

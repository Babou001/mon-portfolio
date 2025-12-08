"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-[2px] cursor-pointer group overflow-hidden shadow-lg shadow-primary/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          aria-label="Retour en haut"
        >
          {/* Gradient background on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />

          {/* Inner circle */}
          <div className="relative w-full h-full rounded-full bg-background flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUp className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
            </motion.div>
          </div>

          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

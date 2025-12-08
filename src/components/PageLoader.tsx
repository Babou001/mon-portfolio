"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo/Initiales avec gradient animé */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <div className="relative w-32 h-32 rounded-full gradient-animated p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-6xl font-bold text-holographic">BS</span>
              </div>
            </div>

            {/* Rotating border */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid transparent",
                borderTopColor: "#00d4ff",
                borderRightColor: "#b967ff",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="text-lg text-foreground/80 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading Experience...
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00d4ff] via-[#b967ff] to-[#05ffa1]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Progress percentage */}
          <motion.span
            className="mt-2 text-sm text-primary font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}%
          </motion.span>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#b967ff" : "#05ffa1",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

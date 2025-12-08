"use client";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

export default function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  // Générer les particules de manière stable
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: (i * 7.3) % 100, // Distribution stable
      y: (i * 11.7) % 100,
      size: 2 + (i % 3),
      duration: 20 + (i % 20),
      delay: (i * 0.5) % 5,
      xOffset: (i % 3) * 10 - 10,
    })), []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

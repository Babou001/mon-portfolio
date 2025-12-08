"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer");

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          background: "#00d4ff",
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9998]"
        style={{
          borderColor: "#00d4ff",
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />

      {/* Glow effect on hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9997]"
          style={{
            background: "radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(0,212,255,0) 70%)",
          }}
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
        />
      )}
    </>
  );
}

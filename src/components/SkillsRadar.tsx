"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type SkillLevel = {
  label: string;
  value: number;
};

type SkillsRadarProps = {
  skills: SkillLevel[];
};

export default function SkillsRadar({ skills }: SkillsRadarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(skills.map(() => 0));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimatedValues((prev) =>
          prev.map((val, i) => {
            const target = skills[i].value;
            if (val < target) {
              return Math.min(val + 2, target);
            }
            return val;
          })
        );
      }, 20);

      return () => clearInterval(interval);
    }
  }, [isVisible, skills]);

  const size = 300;
  const center = size / 2;
  const maxRadius = size / 2 - 40;
  const angleStep = (2 * Math.PI) / skills.length;

  // Generate polygon points
  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = animatedValues
    .map((value, i) => {
      const { x, y } = getPoint(value, i);
      return `${x},${y}`;
    })
    .join(" ");

  // Grid circles (background)
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div ref={ref} className="flex justify-center items-center p-8">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background grid circles */}
        {gridLevels.map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * maxRadius}
            fill="none"
            stroke="rgba(0, 212, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Grid lines from center to each axis */}
        {skills.map((_, i) => {
          const { x, y } = getPoint(100, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(0, 212, 255, 0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="rgba(0, 212, 255, 0.2)"
          stroke="#00d4ff"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          filter="url(#glow)"
        />

        {/* Data points */}
        {animatedValues.map((value, i) => {
          const { x, y } = getPoint(value, i);
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#00d4ff"
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="glow-primary"
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const { x, y } = getPoint(110, i);
          return (
            <motion.text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#e0e0e0"
              fontSize="12"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
            >
              {skill.label}
            </motion.text>
          );
        })}

        {/* Percentage labels */}
        {animatedValues.map((value, i) => {
          if (value > 0) {
            const { x, y } = getPoint(value * 0.6, i);
            return (
              <motion.text
                key={`val-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#00d4ff"
                fontSize="10"
                fontWeight="700"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              >
                {Math.round(value)}%
              </motion.text>
            );
          }
          return null;
        })}

        {/* SVG filter for glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

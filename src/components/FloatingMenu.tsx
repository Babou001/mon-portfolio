"use client";
import { useCycle } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, GraduationCap, FolderGit2, Mail, Sparkles } from "lucide-react";

const items = [
  { href: "#skills",   icon: Sparkles,     label: "Compétences",  y: -160, x:   0 },
  { href: "#formations", icon: GraduationCap, label: "Formations", y: -80, x: -60 },
  { href: "#projects",   icon: FolderGit2,   label: "Projets",     y: -120, x:   0 },
  { href: "#contact",    icon: Mail,        label: "Contact",     y: -80, x:  60 },
];

export default function FloatingMenu() {
  const [open, toggleOpen] = useCycle(false, true);

  return (
    <div className="fixed bottom-10 right-15 z-50">
      {/* Items */}
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={open ? { scale: 1, x: item.x, y: item.y } : { scale: 0, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.05 * i }}
            className="absolute"
          >
            <Link
              href={item.href}
              onClick={() => toggleOpen(0)} // referme le menu après clic
              className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg"
            >
              <Icon className="w-5 h-5" />
            </Link>
          </motion.div>
        );
      })}

      {/* FAB principal */}
      <motion.button
        aria-label="Ouvrir le menu"
        className="w-14 h-14 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-2xl"
        onClick={() => toggleOpen()}
        animate={open ? { rotate: 45 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
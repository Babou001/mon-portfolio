"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { href: "#hero", label: "Accueil" },
  { href: "#skills", label: "Compétences" },
  { href: "#formations", label: "Formations" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-slate-900/70 border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / nom */}
        <Link
          href="#hero"
          className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          El hadji Babou
        </Link>

        {/* Desktop links */}
        <ul className="hidden gap-6 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-gray-300 hover:text-indigo-400 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg p-2 hover:bg-white/10 transition-colors"
          aria-label="Menu mobile"
        >
          {open ? <X className="h-6 w-6 text-indigo-400" /> : <Menu className="h-6 w-6 text-indigo-400" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden flex flex-col gap-4 px-6 pb-6 pt-2 bg-slate-900/90"
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block text-gray-300 hover:text-indigo-400 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
}
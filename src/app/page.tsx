"use client";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Formations from "@/components/Formations";
import FloatingMenu from "@/components/FloatingMenu";
import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">
  <Navbar />
  <Hero />
  <Skills />
  <Formations />
  <Projects />
  <Contact />

  {/* Menu fl ottant */}
  <FloatingMenu />
    </main>
  );
}

"use client";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Formations from "@/components/Formations";
import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NeuralNetworkBackground />
      <Navbar />
      <Hero />
      <Skills />
      <Formations />
      <Projects />
      <Contact />
      <ScrollToTop />
    </main>
  );
}

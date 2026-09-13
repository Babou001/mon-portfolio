"use client";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Formations from "@/components/Formations";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NeuralNetworkBackground />
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Formations />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}

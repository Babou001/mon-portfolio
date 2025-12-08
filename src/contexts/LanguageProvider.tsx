"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fr, Translations } from "@/locales/fr";
import { en } from "@/locales/en";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language;
      if (savedLang && (savedLang === "fr" || savedLang === "en")) {
        setLanguageState(savedLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const t = language === "fr" ? fr : en;

  // Prevent hydration mismatch by rendering a placeholder until mounted
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

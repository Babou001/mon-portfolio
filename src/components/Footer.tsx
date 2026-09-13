"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-primary/10 py-8 px-4">
      <div className="container mx-auto flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-foreground/60">
          © {year} Babou Seye. {t.footer.rights}
        </p>
        <p className="text-sm text-foreground/60 flex items-center gap-1.5">
          {t.footer.madeWith}
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </motion.span>
        </p>
      </div>
    </footer>
  );
}

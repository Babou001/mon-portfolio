"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pour l'instant, ouvre juste le client email
    window.location.href = `mailto:e.b.seye@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
  };

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:e.b.seye@gmail.com",
      color: "from-primary to-secondary",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/el-hadji-babou-seye-128791281/",
      color: "from-secondary to-accent",
    },
  ];

  return (
    <section id="contact" className="relative container mx-auto py-20 px-4">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-center text-holographic"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.contact.title}
        </motion.h2>

        <motion.p
          className="text-center text-foreground/60 mb-12 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.contact.description}
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 mb-12 space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Name */}
          <motion.div
            className="group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              {t.contact.form.name}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-primary/20 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder={t.contact.form.namePlaceholder}
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div
            className="group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              {t.contact.form.email}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-primary/20 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder={t.contact.form.emailPlaceholder}
              required
            />
          </motion.div>

          {/* Message */}
          <motion.div
            className="group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              {t.contact.form.message}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-primary/20 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder={t.contact.form.messagePlaceholder}
              rows={5}
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full px-8 py-4 rounded-lg bg-primary text-background font-bold text-lg glow-primary cursor-pointer group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {t.contact.form.submit}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.form>

        {/* Social Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-6 py-3 rounded-lg glass border border-primary/20 hover:border-primary/40 cursor-pointer group`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 + index * 0.1 }}
            >
              <link.icon className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
              <span className="font-medium text-foreground/80 group-hover:text-primary transition-colors">
                {link.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

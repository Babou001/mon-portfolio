# Explication Technique du Portfolio - Architecture & Concepts

## 📋 Table des matières
1. [Stack Technique](#stack-technique)
2. [Architecture du Projet](#architecture-du-projet)
3. [Concepts Clés par Section](#concepts-clés-par-section)
4. [Librairies Utilisées](#librairies-utilisées)
5. [Patterns & Best Practices](#patterns--best-practices)
6. [Déploiement](#déploiement)

---

## 🛠️ Stack Technique

### Framework Principal
- **Next.js 15** (App Router) - Framework React avec Server-Side Rendering (SSR)
  - Pourquoi ? Performance optimale, SEO, routing automatique
  - App Router vs Pages Router : Plus moderne, meilleure organisation

### Langages
- **TypeScript** - JavaScript typé pour éviter les bugs
- **Tailwind CSS 4** - Framework CSS utility-first
- **CSS personnalisé** - Pour les animations et effets avancés

### Librairies d'Animation
- **Framer Motion** - Animations fluides et déclaratives
- **React Type Animation** - Effet de machine à écrire
- **React Parallax Tilt** - Effet 3D sur les cartes de projets

### 3D & Graphics
- **Three.js** - Rendu 3D (background neural network)
- **@react-three/fiber** - Three.js pour React
- **@react-three/drei** - Helpers pour React Three Fiber

---

## 📁 Architecture du Projet

```
mon-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Layout global (fonts, providers)
│   │   ├── page.tsx            # Page d'accueil (composition des sections)
│   │   └── globals.css         # Styles globaux + variables CSS
│   │
│   ├── components/             # Composants React
│   │   ├── Hero.tsx            # Section héro avec avatar & CTA
│   │   ├── Navbar.tsx          # Navigation sticky avec scroll progress
│   │   ├── Skills.tsx          # Compétences avec radar chart
│   │   ├── SkillsRadar.tsx     # Graphique radar SVG custom
│   │   ├── Projects.tsx        # Liste filtrée de projets
│   │   ├── ProjectCard.tsx     # Carte 3D flip avec détails
│   │   ├── Formations.tsx      # Timeline de formations
│   │   ├── Contact.tsx         # Formulaire de contact
│   │   ├── NeuralNetworkBackground.tsx  # Background 3D animé
│   │   ├── PageLoader.tsx      # Loader au chargement
│   │   └── ScrollToTop.tsx     # Bouton retour en haut
│   │
│   ├── contexts/               # React Contexts
│   │   └── LanguageProvider.tsx # Gestion i18n FR/EN
│   │
│   └── locales/                # Traductions
│       ├── fr.ts               # Contenu français
│       └── en.ts               # Contenu anglais
│
├── public/                     # Assets statiques
└── package.json                # Dépendances npm
```

---

## 🎨 Concepts Clés par Section

### 1. **PageLoader** (Écran de chargement)
**Fichier:** `src/components/PageLoader.tsx`

**Concepts:**
- **useState** pour gérer l'état de chargement (loading → loaded)
- **useEffect** pour timer de 2 secondes
- **AnimatePresence** de Framer Motion pour animation de sortie
- **motion.div** pour animations fluides

**Comment ça marche:**
```typescript
const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 2000);
  return () => clearTimeout(timer); // Cleanup
}, []);
```

### 2. **NeuralNetworkBackground** (Background 3D)
**Fichier:** `src/components/NeuralNetworkBackground.tsx`

**Concepts:**
- **Three.js** : Librairie 3D pour le web
- **React Three Fiber** : Three.js dans React (déclaratif)
- **useFrame** : Hook pour animations 60fps
- **BufferGeometry** : Géométrie optimisée pour GPU
- **Points & Lines** : Objets 3D basiques

**Comment ça marche:**
1. Création de 50 points (nodes) avec positions aléatoires
2. Calcul des connexions entre points proches (distance < seuil)
3. Animation continue avec `useFrame` :
   ```typescript
   useFrame((state) => {
     positions[i * 3] += Math.sin(time) * 0.001; // Mouvement organique
   });
   ```
4. Rendu avec `<Canvas>` en position fixed (z-index: -1)

**Optimisation:**
- `useMemo` pour éviter recalculs inutiles
- `depthWrite: false` pour performances
- Transparent rendering

### 3. **Navbar** (Navigation)
**Fichier:** `src/components/Navbar.tsx`

**Concepts:**
- **Sticky positioning** : Reste en haut au scroll
- **useScroll** de Framer Motion : Détecte position de scroll
- **useSpring** : Animation fluide de la barre de progression
- **Glassmorphism** : Effet de verre flou (`backdrop-filter`)
- **AnimatePresence** : Menu mobile avec animation

**Glassmorphism expliqué:**
```css
.glass {
  background: rgba(22, 22, 26, 0.7);  /* Semi-transparent */
  backdrop-filter: blur(12px);         /* Flou du background */
  border: 1px solid rgba(0, 212, 255, 0.1); /* Border subtile */
}
```

**Scroll Progress Bar:**
```typescript
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

<motion.div style={{ scaleX }} className="h-1 bg-gradient..." />
```

### 4. **Hero** (Section principale)
**Fichier:** `src/components/Hero.tsx`

**Concepts:**
- **TypeAnimation** : Effet machine à écrire
- **Gradient animé** : `background-clip: text` pour texte holographique
- **Motion variants** : Animations séquentielles avec delay
- **CSS animations** : Particules flottantes avec `@keyframes`

**Texte Holographique:**
```css
.text-holographic {
  background: linear-gradient(90deg, #00d4ff, #b967ff, #05ffa1, #00d4ff);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: holographicShine 3s linear infinite;
}
```

**TypeAnimation avec i18n:**
```typescript
<TypeAnimation
  key={t.hero.subtitle}  // Force re-render au changement de langue
  sequence={[t.hero.subtitle, 3000, "", 500]}
  wrapper="p"
  speed={50}
  repeat={Infinity}
/>
```

### 5. **SkillsRadar** (Graphique Radar)
**Fichier:** `src/components/SkillsRadar.tsx`

**Concepts:**
- **SVG custom** : Création manuelle du graphique
- **Trigonométrie** : Calcul positions des points
  ```typescript
  const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
  const x = centerX + Math.cos(angle) * radius * normalizedValue;
  const y = centerY + Math.sin(angle) * radius * normalizedValue;
  ```
- **IntersectionObserver** : Animation au scroll viewport
- **SVG filters** : Effet de glow avec `<filter>`

**Comment le radar est construit:**
1. Cercles concentriques (axes à 20%, 40%, 60%, 80%, 100%)
2. Lignes radiales partant du centre
3. Polygone formé par les valeurs de compétences
4. Labels positionnés avec trigonométrie

### 6. **ProjectCard** (Cartes 3D flip)
**Fichier:** `src/components/ProjectCard.tsx`

**Concepts:**
- **React Parallax Tilt** : Effet 3D au mouvement souris
- **Flip Card** : Animation rotateY 180deg
- **backfaceVisibility: hidden** : Cache l'arrière de la carte
- **transform-style: preserve-3d** : Perspective 3D

**Flip Animation:**
```typescript
const [isFlipped, setIsFlipped] = useState(false);

<motion.div
  animate={{ rotateY: isFlipped ? 180 : 0 }}
  style={{ transformStyle: "preserve-3d" }}
>
  {/* FRONT */}
  <div style={{ backfaceVisibility: "hidden" }}>...</div>

  {/* BACK */}
  <div style={{
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)"
  }}>...</div>
</motion.div>
```

**Tilt 3D:**
```typescript
<Tilt
  tiltMaxAngleX={10}      // Max rotation sur axe X
  tiltMaxAngleY={10}      // Max rotation sur axe Y
  perspective={1000}      // Distance de la caméra
  scale={1.02}            // Zoom au hover
  transitionSpeed={1500}  // Vitesse de transition
>
```

### 7. **Projects** (Filtrage)
**Fichier:** `src/components/Projects.tsx`

**Concepts:**
- **useState** pour filtre actif
- **Array.filter()** pour filtrage dynamique
- **AnimatePresence** : Animations entrée/sortie
- **layout** prop : Animation automatique de réorganisation

**Filtrage intelligent:**
```typescript
const filteredProjects = activeFilter === "all"
  ? t.projects.projects
  : t.projects.projects.filter((project) =>
      project.tags.some((tag) =>
        tag.toLowerCase().includes(activeFilter.toLowerCase())
      )
    );
```

### 8. **Contact** (Formulaire)
**Fichier:** `src/components/Contact.tsx`

**Concepts:**
- **Controlled components** : `value={formData.name}` + `onChange`
- **Form validation** : `required` HTML5
- **mailto:** Ouverture client email
- **Grid pattern background** : CSS `linear-gradient` répété

**Gestion du formulaire:**
```typescript
const [formData, setFormData] = useState({
  name: "", email: "", message: ""
});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  window.location.href = `mailto:e.b.seye@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
};
```

### 9. **LanguageProvider** (Internationalisation)
**Fichier:** `src/contexts/LanguageProvider.tsx`

**Concepts:**
- **React Context API** : Partage d'état global
- **localStorage** : Persistance du choix de langue
- **Custom Hook** : `useLanguage()` pour accès facile

**Architecture i18n:**
```typescript
// 1. Définition du type Translations
export const fr = { nav: { home: "Accueil", ... }, ... };
export type Translations = typeof fr;

// 2. Traduction EN avec typage strict
export const en: Translations = { nav: { home: "Home", ... }, ... };

// 3. Context Provider
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState<Language>("fr");
  const t = language === "fr" ? fr : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 4. Hook custom
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
```

**Utilisation dans composants:**
```typescript
const { t, language, setLanguage } = useLanguage();
<h1>{t.hero.title}</h1>
<button onClick={() => setLanguage(language === "fr" ? "en" : "fr")}>
  {language === "fr" ? "EN" : "FR"}
</button>
```

---

## 📚 Librairies Utilisées (Détails)

### 1. **Framer Motion** (`framer-motion`)
**Pourquoi ?** Animations déclaratives et performantes

**Concepts clés:**
- `motion.div` : Version animable de `<div>`
- `animate` : État cible de l'animation
- `initial` : État de départ
- `transition` : Durée, type (spring, tween), delay
- `whileHover` / `whileTap` : Interactions
- `viewport={{ once: true }}` : Animation une seule fois au scroll

**Exemples:**
```typescript
// Animation simple
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// Animation au hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>

// Animation au scroll dans viewport
<motion.h2
  initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### 2. **Three.js + React Three Fiber**
**Pourquoi ?** Rendu 3D performant dans le navigateur

**Three.js concepts:**
- **Scene** : Conteneur de tous les objets 3D
- **Camera** : Point de vue (PerspectiveCamera)
- **Renderer** : Moteur de rendu WebGL
- **Geometry** : Forme 3D (Points, Lines, Mesh)
- **Material** : Apparence (couleur, opacité)

**React Three Fiber simplifie:**
```typescript
// Three.js vanilla (complexe)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height);
const renderer = new THREE.WebGLRenderer();
const geometry = new THREE.BufferGeometry();
// ... beaucoup de code

// React Three Fiber (déclaratif)
<Canvas camera={{ position: [0, 0, 5] }}>
  <points>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" {...} />
    </bufferGeometry>
    <pointsMaterial color="#00d4ff" size={0.05} />
  </points>
</Canvas>
```

### 3. **Tailwind CSS 4**
**Pourquoi ?** Productivité, cohérence, optimisation automatique

**Utility-first expliqué:**
```html
<!-- Avant (CSS traditionnel) -->
<div class="card">...</div>
<style>
  .card {
    padding: 1.5rem;
    border-radius: 0.5rem;
    background: rgba(22, 22, 26, 0.7);
    backdrop-filter: blur(12px);
  }
</style>

<!-- Après (Tailwind) -->
<div class="p-6 rounded-lg glass">...</div>
```

**Classes custom dans globals.css:**
```css
@layer utilities {
  .glass {
    background: rgba(22, 22, 26, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 212, 255, 0.1);
  }
}
```

### 4. **React Type Animation**
**Pourquoi ?** Effet machine à écrire réaliste

**Options:**
```typescript
<TypeAnimation
  sequence={[
    "Texte 1",    // Tape ce texte
    3000,         // Attends 3 secondes
    "Texte 2",    // Efface et tape texte 2
    2000,         // Attends 2 secondes
  ]}
  wrapper="p"     // Élément HTML wrapper
  speed={50}      // Vitesse de frappe (1-99)
  repeat={Infinity} // Répéter infiniment
  deletionSpeed={70} // Vitesse d'effacement
  cursor={true}   // Afficher curseur
/>
```

---

## 🎯 Patterns & Best Practices

### 1. **Component Composition**
Chaque section est un composant indépendant, assemblé dans `page.tsx`:
```typescript
export default function Home() {
  return (
    <main>
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
```

### 2. **Type Safety avec TypeScript**
Toutes les données sont typées pour éviter les erreurs:
```typescript
type Project = {
  title: string;
  year: number;
  tags: string[];
  description?: string;  // Optionnel
  // ...
};

// Erreur si on oublie une propriété requise
const project: Project = { title: "Test" }; // ❌ Error: year is required
```

### 3. **Performance Optimizations**

**useMemo** : Évite recalculs coûteux
```typescript
const connections = useMemo(() => {
  // Calcul intensif des connexions entre nodes
  return calculateConnections(positions);
}, [positions]); // Recalcule uniquement si positions change
```

**useCallback** : Évite re-création de fonctions
```typescript
const handleSubmit = useCallback((e: React.FormEvent) => {
  e.preventDefault();
  // ...
}, [formData]);
```

**Dynamic imports** : Chargement lazy
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

### 4. **Accessibility (a11y)**
- `aria-label` sur boutons sans texte
- `aria-hidden="true"` sur icônes décoratives
- Focus states visibles
- Contraste couleurs WCAG AA

```typescript
<motion.button
  aria-label="Retour en haut"  // Pour screen readers
  className="focus:ring-2 focus:ring-primary"  // Focus visible
>
  <ArrowUp aria-hidden="true" />  // Icône décorative
</motion.button>
```

### 5. **Responsive Design**
Tailwind breakpoints:
```typescript
className="
  text-2xl           // Mobile (default)
  md:text-4xl        // Tablette (768px+)
  lg:text-5xl        // Desktop (1024px+)
  xl:text-6xl        // Large desktop (1280px+)
"
```

Grid responsive:
```typescript
className="
  grid
  gap-6
  grid-cols-1        // 1 colonne sur mobile
  md:grid-cols-2     // 2 colonnes sur tablette
  lg:grid-cols-3     // 3 colonnes sur desktop
"
```

---

## 🚀 Déploiement

### **Vercel** (Plateforme utilisée)
**Pourquoi Vercel ?**
- Créateurs de Next.js → intégration parfaite
- Déploiement automatique depuis GitHub
- Edge Network mondial (CDN)
- Optimisations SSR/SSG automatiques
- Gratuit pour projets personnels

**Workflow de déploiement:**
1. Push code sur GitHub (`git push origin main`)
2. Vercel détecte le push via webhook
3. Build automatique (`npm run build`)
4. Tests TypeScript + ESLint
5. Déploiement sur CDN mondial
6. Site live en ~2 minutes

**Optimisations Vercel:**
- **Image Optimization** : Next.js Image component
- **Code Splitting** : Chunks JavaScript par page
- **Static Generation** : Pages pré-rendues
- **Edge Caching** : Contenu statique en cache CDN

---

## 🎨 Thème Cyber/Tech

### Palette de Couleurs
```css
:root {
  --primary: #00d4ff;    /* Bleu électrique */
  --secondary: #b967ff;  /* Violet néon */
  --accent: #05ffa1;     /* Vert tech */
  --background: #0a0a0f; /* Noir profond */
  --foreground: #e0e0e0; /* Gris clair */
}
```

### Effets Visuels

**1. Glow (Lueur néon)**
```css
.glow-primary {
  box-shadow:
    0 0 10px rgba(0, 212, 255, 0.3),   /* Proche */
    0 0 20px rgba(0, 212, 255, 0.2),   /* Moyen */
    0 0 30px rgba(0, 212, 255, 0.1);   /* Lointain */
}
```

**2. Glassmorphism**
```css
.glass {
  background: rgba(22, 22, 26, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 212, 255, 0.1);
}
```

**3. Texte Holographique**
```css
.text-holographic {
  background: linear-gradient(90deg, #00d4ff, #b967ff, #05ffa1, #00d4ff);
  background-size: 200% auto;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: holographicShine 3s linear infinite;
}
```

---

## 🧠 Concepts Avancés à Retenir

### 1. **Client vs Server Components** (Next.js 15)
- **Server Components** (défaut) : Rendu côté serveur, pas de JS client
- **Client Components** (`"use client"`) : Interactivité, hooks React

```typescript
// ✅ Server Component (par défaut)
export default function ServerComp() {
  return <div>No interactivity needed</div>;
}

// ✅ Client Component (avec "use client")
"use client";
import { useState } from "react";

export default function ClientComp() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Tous nos composants sont Client Components** car ils utilisent:
- `useState`, `useEffect` (hooks React)
- `motion` (Framer Motion)
- Interactions utilisateur

### 2. **CSS Variables + Tailwind**
Combinaison puissante:
```css
/* globals.css */
:root {
  --primary: #00d4ff;
}

/* Utilisation dans Tailwind */
<div className="text-[var(--primary)]">
<div className="bg-primary"> /* Via theme config */
```

### 3. **Animation Performance**
**GPU Acceleration** : Utiliser `transform` et `opacity` uniquement
```typescript
// ✅ Performant (GPU)
<motion.div animate={{ opacity: 1, translateY: 0 }} />

// ❌ Lent (CPU, reflow)
<motion.div animate={{ top: 0, width: 100 }} />
```

**will-change** : Prépare navigateur à l'animation
```css
.card {
  will-change: transform, opacity;
}
```

### 4. **TypeScript Utility Types**
```typescript
// Pick : Extraire propriétés
type PersonName = Pick<Person, "name" | "age">;

// Omit : Exclure propriétés
type PersonNoId = Omit<Person, "id">;

// Partial : Tout optionnel
type PartialPerson = Partial<Person>;

// Readonly : Immutable
type ReadonlyPerson = Readonly<Person>;
```

---

## 📊 Métriques de Performance

### Lighthouse Score (cible)
- **Performance:** >90
- **Accessibility:** >90
- **Best Practices:** 100
- **SEO:** 100

### Optimisations appliquées
1. **Images Next.js** : Lazy loading + WebP
2. **Code Splitting** : Chunks par route
3. **Tree Shaking** : Suppression code inutilisé
4. **Minification** : CSS/JS compressés
5. **Preload fonts** : Geist chargé en priorité

---

## 🎓 Ce que tu peux apprendre de ce projet

### Pour un débutant
1. **React Basics** : Components, Props, State
2. **CSS moderne** : Flexbox, Grid, Animations
3. **TypeScript** : Typage de base

### Pour un intermédiaire
1. **Next.js App Router** : SSR, routing, metadata
2. **Framer Motion** : Animations déclaratives
3. **Context API** : Gestion état global
4. **Tailwind CSS** : Utility-first workflow

### Pour un avancé
1. **Three.js + R3F** : Rendu 3D performant
2. **Performance optimization** : useMemo, useCallback
3. **TypeScript avancé** : Generics, Utility Types
4. **Animation choreography** : Timing, easing, stagger
5. **Build process** : Webpack, Tree shaking, Code splitting

---

## 🔗 Ressources pour Approfondir

### Documentation Officielle
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tutoriels Recommandés
- **Three.js Journey** par Bruno Simon (payant mais excellent)
- **Framer Motion Tutorial** par Sam Selikoff (YouTube)
- **Next.js 15 Course** par Vercel (gratuit)

### Concepts à Creuser
1. **WebGL Fundamentals** pour comprendre Three.js
2. **GSAP** alternative à Framer Motion (plus puissant, moins React-friendly)
3. **Shader Programming** pour effets 3D custom
4. **React Server Components** architecture moderne
5. **Web Vitals** métriques de performance Google

---

## 💡 Tips & Tricks Utilisés

### 1. **Force re-render avec key**
```typescript
<TypeAnimation
  key={language}  // Change de key → composant détruit et recréé
  sequence={[t.hero.subtitle]}
/>
```

### 2. **Cleanup dans useEffect**
```typescript
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer); // Évite memory leaks
}, []);
```

### 3. **Type inference avec typeof**
```typescript
export const fr = { nav: { home: "Accueil" } };
export type Translations = typeof fr; // Type automatique depuis objet
```

### 4. **Conditional CSS avec template literals**
```typescript
className={`base-class ${isActive ? 'active' : 'inactive'}`}
```

### 5. **SVG dans React (inline)**
```typescript
<svg viewBox="0 0 400 400">
  <circle cx={x} cy={y} r={5} fill="#00d4ff" />
</svg>
```

---

## 🐛 Debugging Tips

### 1. **Framer Motion animations ne marchent pas**
→ Vérifier que le composant parent a `position: relative`

### 2. **Three.js ne s'affiche pas**
→ Vérifier `<Canvas>` a une hauteur définie (pas auto)

### 3. **TypeScript errors dans locales**
→ S'assurer que `en` a EXACTEMENT la même structure que `fr`

### 4. **Hydration errors Next.js**
→ Utiliser `"use client"` + éviter code côté serveur différent du client

### 5. **Performance lente**
→ Ouvrir DevTools > Performance > Record > Analyser flamegraph

---

## 🎉 Conclusion

Ce portfolio combine:
- **Design moderne** : Glassmorphism, néon, 3D
- **Tech stack actuel** : Next.js 15, React 19, TypeScript 5
- **Animations fluides** : Framer Motion + Three.js
- **Accessibilité** : ARIA labels, keyboard navigation
- **Performance** : Optimisations Vercel + Next.js
- **i18n** : Système multilingue propre

**Architecture clé:**
```
Next.js App Router
├── Layout global (fonts, providers)
├── Page (composition des sections)
├── Components (sections réutilisables)
├── Contexts (état global i18n)
└── Locales (traductions FR/EN)
```

**Stack technique:**
- React 19 + Next.js 15 + TypeScript 5
- Framer Motion (animations)
- Three.js + R3F (3D)
- Tailwind CSS 4 (styling)
- Vercel (déploiement)

N'hésite pas si tu as des questions sur une partie spécifique ! 🚀

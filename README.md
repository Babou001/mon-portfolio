# 🚀 Portfolio - Babou Seye

Portfolio moderne et immersif d'un Ingénieur IA spécialisé en Gen AI (LLM), développé avec Next.js 15, React 19 et Tailwind CSS.

[![Déployé avec Vercel](https://vercel.com/button)](https://vercel.com)

## ✨ Fonctionnalités

### 🎨 Design Cyber Immersif
- **Palette Cyber** : Fond noir profond (#0a0a0f) avec accents néon (bleu électrique, violet, vert tech)
- **Background 3D** : Réseau de neurones animé avec Three.js (@react-three/fiber)
- **Glassmorphism** : Effets de verre translucide sur tous les composants (backdrop-blur)
- **Animations avancées** : Particules flottantes, effets holographiques, glow néon
- **Responsive design** : Optimisé pour desktop, tablette et mobile avec simplification des effets 3D sur mobile

### 🌍 Internationalisation (i18n)
- **Bilingue FR/EN** : Bascule instantanée entre français et anglais
- **Sélecteur de langue** : Bouton animé dans la navbar avec sauvegarde localStorage
- **Traductions complètes** : Tous les contenus traduits incluant :
  - Hero (titre, rôle, subtitle avec TypeAnimation, description, CTA)
  - Skills (titre, subtitle, 6 catégories)
  - Formations (titre, subtitle, parcours académique)
  - Projects (titre, subtitle, filtres, compteur)
  - Contact (titre, description, formulaire complet)

### 🎭 Animations & Interactions
- **Hero immersif** :
  - Avatar/logo stylé avec gradient animé et anneaux orbitaux
  - Effet holographique sur le titre
  - TypeAnimation avec machine à écrire (react-type-animation)
  - Particules réactives flottantes
  - CTA buttons avec animations de hover élaborées
- **Skills Radar** : Graphique radar SVG personnalisé avec animation de remplissage
- **Project Cards 3D** : Tilt 3D (react-parallax-tilt) + système de flip cards (recto/verso)
- **Timeline Formations** : Timeline verticale avec animations au scroll
- **Scroll to Top** : Bouton flottant avec gradient animé et flèche rebondissante
- **Custom Cursor** : Curseur personnalisé qui suit la souris avec effet smooth
- **Navbar améliorée** :
  - Badge logo avec gradient border
  - Scroll progress bar en haut
  - Menu items avec hover backgrounds et dot indicators
  - Mobile menu avec animations stagger

### 📁 Sections
1. **Hero** : Avatar stylé, titre holographique, typing animation, CTA animés
2. **Skills** :
   - Radar chart 4 axes (LLM & RAG 95%, Computer Vision 65%, AI Agents 70%, Data Ops 80%)
   - Grid 3 colonnes : LLM & RAG, Computer Vision, AI Agents, Data Ops, Machine Learning, Deep Learning
3. **Formations** : Timeline verticale avec nodes animés
4. **Projects** :
   - Système de filtrage (Tous, Gen AI, RAG, Computer Vision, Recherche)
   - Compteur de projets avec gestion du pluriel
   - Flip cards 3D avec tilt effect
   - Badges confidentiels pour projets entreprise
5. **Contact** :
   - Formulaire interactif avec validation visuelle
   - Liens sociaux (Email, LinkedIn) avec hover glow
   - Background grid pattern

### 🔒 Gestion de confidentialité
- **Badges automatiques** : Détection des projets confidentiels
- **Icône cadenas** : Indication visuelle pour projets entreprise
- **Flexibilité** : Possibilité d'ajouter des liens pour projets publics

## 🛠️ Technologies utilisées

### Core
- **Next.js 15.3.5** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript 5** - Typage statique
- **Tailwind CSS 4** - Styling utility-first

### Animations & UI
- **Framer Motion 12.23.3** - Animations fluides (motion, AnimatePresence, layout animations)
- **react-type-animation 3.3.0** - Effet machine à écrire
- **react-parallax-tilt 1.7.276** - Effets 3D tilt sur les cartes
- **Lucide React 0.525.0** - Icônes modernes

### 3D & Graphics
- **@react-three/fiber 9.0.0** - Renderer React pour Three.js
- **@react-three/drei 9.122.6** - Helpers Three.js
- **three 0.174.0** - Bibliothèque 3D WebGL

### Styling
- **class-variance-authority** - Gestion des variants
- **clsx** & **tailwind-merge** - Composition de classes CSS

## 🚀 Installation & Développement

### Prérequis
- Node.js 20+
- npm, yarn, pnpm ou bun

### Installation

```bash
# Cloner le repo
git clone https://github.com/Babou001/mon-portfolio.git
cd mon-portfolio

# Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install
```

### Développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📂 Structure du projet

```
mon-portfolio/
├── src/
│   ├── app/                 # App Router Next.js
│   │   ├── layout.tsx       # Layout racine avec fonts
│   │   ├── page.tsx         # Page d'accueil
│   │   └── globals.css      # Styles globaux + palette cyber
│   ├── components/          # Composants React
│   │   ├── Hero.tsx         # Hero avec avatar, typing, CTA
│   │   ├── Skills.tsx       # Compétences avec radar
│   │   ├── SkillsRadar.tsx  # Graphique radar SVG
│   │   ├── Formations.tsx   # Timeline formations
│   │   ├── Projects.tsx     # Liste projets + filtres
│   │   ├── ProjectCard.tsx  # Flip card 3D individuelle
│   │   ├── Contact.tsx      # Formulaire + liens sociaux
│   │   ├── Navbar.tsx       # Navbar glassmorphism + scroll progress
│   │   ├── ScrollToTop.tsx  # Bouton scroll to top animé
│   │   ├── NeuralNetworkBackground.tsx # Background 3D Three.js
│   │   └── ui/              # Composants UI (Button, Card)
│   ├── contexts/            # Contextes React
│   │   └── LanguageProvider.tsx # Provider i18n FR/EN
│   ├── locales/             # Traductions
│   │   ├── fr.ts            # Français (toutes sections)
│   │   └── en.ts            # Anglais (toutes sections)
│   └── lib/                 # Utilitaires
│       └── utils.ts         # Helpers (cn, etc.)
├── public/                  # Assets statiques
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🎨 Personnalisation

### Modifier les traductions

Éditer les fichiers dans `src/locales/` :
- `fr.ts` pour le français
- `en.ts` pour l'anglais

Toutes les sections sont structurées de manière cohérente :

```typescript
export const fr = {
  nav: { home: "Accueil", skills: "Compétences", ... },
  hero: {
    title: "Babou Seye",
    role: "Ingénieur IA | Data Scientist",
    subtitle: "Ingénieur IA spécialisé en Gen AI (LLM)",
    cta: { projects: "Voir mes projets", contact: "Me contacter" }
  },
  skills: {
    title: "Compétences",
    subtitle: "Vue d'ensemble de mes compétences techniques en IA",
    llmRag: "LLM & RAG",
    items: { llmRag: [...], ... }
  },
  // ... autres sections
}
```

### Ajouter/Modifier des projets

Les projets sont définis directement dans les fichiers de traduction (`src/locales/fr.ts` et `en.ts`) :

```typescript
projects: {
  projects: [
    {
      title: "Titre du projet",
      organization: "Organisation",
      tags: ["Tag1", "Tag2"],
      year: 2025,
      context: "Contexte du projet",
      objective: "Objectif principal",
      solution: "Solution mise en place",
      technologies: ["Tech1", "Tech2"],
      link: "https://github.com/...", // Optionnel
      confidential: false, // Optionnel
    }
  ]
}
```

### Changer les couleurs (Palette Cyber)

Modifier `src/app/globals.css` :

```css
:root {
  --background: #0a0a0f;        /* Noir profond */
  --foreground: #e0e0e0;        /* Gris clair */
  --primary: #00d4ff;           /* Bleu électrique */
  --secondary: #b967ff;         /* Violet néon */
  --accent: #05ffa1;            /* Vert tech */
  --muted: #1a1a2e;             /* Bleu très sombre */
  --card: #16161a;              /* Carte background */
  --border: rgba(0, 212, 255, 0.2); /* Border glow */
}
```

Classes utilitaires disponibles :
- `.glass` : Glassmorphism léger
- `.glass-strong` : Glassmorphism prononcé
- `.text-holographic` : Gradient texte holographique
- `.glow-primary` : Box-shadow néon primaire
- `.gradient-animated` : Gradient animé

### Ajuster les valeurs du radar

Dans `src/components/Skills.tsx` :

```typescript
const radarSkills = [
  { label: "LLM & RAG", value: 95 },
  { label: "Computer Vision", value: 65 },
  { label: "AI Agents", value: 70 },
  { label: "Data Ops", value: 80 },
];
```

### Ajuster les animations

Les animations sont configurées dans les composants via Framer Motion. Voir la [documentation Framer Motion](https://www.framer.com/motion/).

Exemples d'animations utilisées :
- `whileHover`, `whileTap` : Interactions
- `initial`, `animate`, `exit` : États d'animation
- `layout` : Animations de layout automatiques
- `transition` avec `type: "spring"` : Ressorts physiques

## 📝 SEO & Metadata

Les métadonnées sont configurées dans `src/app/layout.tsx` :

```typescript
export const metadata: Metadata = {
  title: "Babou Seye - AI Engineer",
  description: "AI Engineer specialized in Gen AI (LLM)",
};
```

## 🚀 Déploiement

### Vercel (recommandé)

[![Déployer avec Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Babou001/mon-portfolio)

### Autres plateformes

Ce projet Next.js peut être déployé sur :
- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- Tout service supportant Next.js

Voir la [documentation Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying) pour plus d'infos.

## 🎯 Différenciation & Innovation

Ce portfolio se distingue par :
- **Background 3D immersif** : Réseau de neurones animé en WebGL (Three.js)
- **Glassmorphism systématique** : Tous les composants utilisent des effets de verre
- **Animations poussées** : Spring animations, layout animations, 3D tilt
- **Thème cyber cohérent** : Palette néon qui reflète le domaine de l'IA
- **i18n complète** : Traductions exhaustives avec support TypeAnimation
- **UX soignée** : Micro-interactions, feedback visuel, scroll fluide

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**Babou Seye**
- Email: e.b.seye@gmail.com
- LinkedIn: [El Hadji Babou Seye](https://www.linkedin.com/in/el-hadji-babou-seye-128791281/)

---

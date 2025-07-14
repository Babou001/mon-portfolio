export const projects = [
  {
    title: "Système de recherche de documents avec chatbot RAG intégré",
    organization: "IDEMIA France SAS",
    tags: ["GenIA", "Retrieval Augmented Generation"],
    year: 2025,
    context:
      "Les ingénieurs du support CPS consacrent beaucoup de temps à chercher l’information dans la documentation interne.",
    objective:
      "Accélérer l’accès à l’information et augmenter la productivité des équipes.",
    solution:
      "Combinaison de recherche lexicale (BM25) et sémantique, puis génération de réponses contextualisées par LLaMA-3.2-3B via LlamaCPP.",
    technologies: [
      "Redis",
      "LangChain",
      "Chroma DB",
      "Streamlit",
      "FastAPI",
      "Uvicorn",
      "Docker",
      "spaCy",
      "pymupdf",
      "RecursiveCharacterTextSplitter",
      "BERT"
    ]
  },
  {
    title: "Classification des attitudes sociales à partir de données temporelles",
    organization: "LIS-Lab – CNRS",
    tags: ["Recherche", "Interprétabilité"],
    year: 2024,
    context:
      "Analyse de vidéos de confrontations pour détecter les attitudes sociales (colère chaude, froide, conciliante).",
    objective:
      "Construire des modèles robustes et interprétables pour prédire l’attitude sociale.",
    solution:
      "Prétraitement, séparation stricte Train/Test, comparaison de SVM, forêts aléatoires, réseaux de neurones ; explications SHAP des features.",
    technologies: [
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "Matplotlib",
      "Seaborn",
      "Docker",
      "OpenSmile",
      "OpenFace"
    ]
  },
  {
    title: "Classification non supervisée des modèles Toyota",
    organization: "Euranova (Hackathon)",
    tags: ["Hackathon", "Clustering"],
    year: 2023,
    context:
      "Fiches techniques riches et hétérogènes des véhicules Toyota.",
    objective:
      "Regrouper automatiquement les véhicules en grandes familles sans étiquettes pré-existantes.",
    solution:
      "Vectorisation mixte (champs numériques + embeddings LLM), clustering hiérarchique K-Means++, visualisation t-SNE.",
    technologies: [
      "Scikit-Learn",
      "spaCy",
      "Hugging Face LLMs",
      "Python"
    ]
  },
  {
    title: "Détection multimodale des tours de parole",
    organization: "Projet personnel",
    tags: ["Multimodal", "Speech Segmentation"],
    year: 2024,
    context:
      "Pré-requis à la transcription structurée « speaker : texte ».",
    objective: "Délimiter automatiquement les prises de parole.",
    solution:
      "Fusion d’embeddings texte BERT et de features audio (MFCC, pitch, énergie) dans un classifieur transformeur; micro-service FastAPI sur AWS.",
    technologies: [
      "HuggingFace Transformers",
      "librosa",
      "spaCy",
      "BERT",
      "FastAPI",
      "AWS ECS/Fargate"
    ]
  },
  {
    title: "Agent IA d’analyse de DataFrames",
    organization: "LangChain / Pandas",
    tags: ["Agent IA", "DataFrames"],
    year: 2025,
    status: "en cours",
    context:
      "Permettre aux équipes métier d’interroger des jeux de données tabulaires en langage naturel.",
    objective:
      "Router dynamiquement la requête utilisateur vers l’outil d’analyse approprié.",
    solution:
      "Déclaration d’outils LangChain (query_df, describe_df, plot_df) et routing via ToolSelector ; micro-service FastAPI.",
    technologies: [
      "LangChain",
      "pandas",
      "pandasql",
      "Matplotlib",
      "Python",
      "FastAPI"
    ]
  },
  {
    title: "Détection de déchets par YOLOv8",
    organization: "Projet personnel",
    tags: ["Computer Vision", "YOLOv8"],
    year: 2024,
    context:
      "Reconnaître et localiser des types d’ordures pour un usage environnemental.",
    objective:
      "Déployer un service de détection temps-réel sur images ou flux vidéo.",
    solution:
      "Fine-tune YOLOv8 sur TACO + dataset maison ; API FastAPI ; visualisation Streamlit ; conteneurisation Docker (GPU/CPU).",
    technologies: [
      "YOLOv8",
      "OpenCV",
      "Streamlit",
      "FastAPI",
      "Python",
      "Docker"
    ]
  }
];

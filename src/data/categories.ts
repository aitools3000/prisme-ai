import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'video',
    name: 'Vidéo & Animation',
    slug: 'video',
    icon: 'Video',
    toolCount: 34,
    description: 'Avatars synthétiques, montage assisté, génération text-to-video et sous-titrage automatique.',
    longDescription: 'Le secteur de la vidéo par intelligence artificielle connaît une accélération spectaculaire. Qu\'il s\'agisse de transformer un script en vidéo promotionnelle courte (Shorts, TikTok, Reels) ou de générer des avatars ultra-réalistes pour des présentations d\'entreprise, les outils d\'IA vidéo permettent de réduire les coûts de production de 70% tout en démultipliant la cadence de publication.',
    keyUseCases: [
      'Génération de vidéos courtes pour les réseaux sociaux',
      'Avatars IA multilingues pour la formation d\'équipes',
      'Sous-titrage et recadrage automatique de podcasts',
      'Text-to-video cinématique pour la publicité'
    ],
    metaTitle: 'Meilleurs Outils IA Vidéo & Générateurs Vidéo 2024 | Prisme IA',
    metaDescription: 'Découvrez notre sélection des meilleurs outils d\'intelligence artificielle pour la création et le montage vidéo : Revid AI, HeyGen, Runway Gen-3, CapCut AI.',
    faq: [
      {
        question: 'Quel est le meilleur outil d\'IA pour créer des vidéos courtes sur TikTok et Reels ?',
        answer: 'Pour les créateurs et agences focalisés sur les formats verticaux courts (Reels, TikTok, Shorts), Revid AI et OpusClip offrent le meilleur ratio rapidité/qualité grâce à la détection automatique des moments forts et aux sous-titres dynamiques.'
      },
      {
        question: 'Quelle est la différence entre un outil text-to-video comme Runway et un outil d\'avatar comme HeyGen ?',
        answer: 'Un générateur text-to-video (comme Runway ou Luma) produit des séquences visuelles cinématiques à partir de descriptions textuelles, tandis qu\'une plateforme d\'avatars (comme HeyGen) anime un présentateur humain virtuel synchronisé sur une voix off pour des tutoriels ou communications.'
      }
    ]
  },
  {
    id: 'image',
    name: 'Image & Design',
    slug: 'image',
    icon: 'Image',
    toolCount: 42,
    description: 'Génération visuelle haute résolution, retouche vectorielle et photographie d\'art synthétique.',
    longDescription: 'De Midjourney v6 à Flux.1 en passant par Photoshop Generative Fill, la création visuelle par IA offre un contrôle inédit sur la typographie, l\'éclairage et les textures. Notre répertoire recense les modèles générateurs de pointe ainsi que les utilitaires d\'agrandissement (upscaling) et d\'édition sélective.',
    keyUseCases: [
      'Création d\'illustrations pour articles et sites web',
      'Shooting photo e-commerce virtuel sans studio',
      'Inpainting et suppression d\'éléments indésirables',
      'Génération de concepts visuels et de chartes graphiques'
    ],
    metaTitle: 'Meilleurs Outils IA Image & Générateurs Visuels 2024 | Prisme IA',
    metaDescription: 'Comparatif et guide des meilleurs générateurs d\'images par IA : Midjourney, Flux.1, Stable Diffusion et Leonardo AI testés sans filtre.',
    faq: [
      {
        question: 'Quel outil d\'IA produit les images les plus photoréalistes ?',
        answer: 'En 2024, Flux.1 (développé par les créateurs originaux de Stable Diffusion) et Midjourney v6 dominent le rendu photoréaliste de la peau humaine, de l\'éclairage naturel et de l\'intégration de texte lisible.'
      }
    ]
  },
  {
    id: 'texte',
    name: 'Texte & Rédaction',
    slug: 'texte',
    icon: 'FileText',
    toolCount: 48,
    description: 'Modèles de langage de pointe, assistants de rédaction longue et synthèse documentaire.',
    longDescription: 'Les grands modèles de langage (LLM) transforment la rédaction professionnelle. Au-delà de simples requêtes, les solutions sélectionnées s\'intègrent dans vos processus de relecture juridique, de reformulation technique et de synthèse de volumineux corpus documentaires avec une exigence absolue de fidélité au français.',
    keyUseCases: [
      'Rédaction d\'articles de fond et livres blancs',
      'Synthèse de rapports financiers et juridiques',
      'Reformulation et adaptation tonale selon la cible',
      'Traduction contextuelle et localisation multilingue'
    ],
    metaTitle: 'Outils IA Texte & Rédaction Professionnelle 2024 | Prisme IA',
    metaDescription: 'Sélection des meilleurs assistants de rédaction par intelligence artificielle : Claude 3.5 Sonnet, Mistral Large 2 et ChatGPT pour la langue française.'
  },
  {
    id: 'seo',
    name: 'SEO & Contenu',
    slug: 'seo',
    icon: 'Search',
    toolCount: 26,
    description: 'Recherche sémantique avancée, cocons sémantiques et audit de positionnement organique.',
    longDescription: 'Le référencement naturel à l\'ère de l\'IA exige une maîtrise de la sémantique et des intentions de recherche. Les outils sélectionnés permettent d\'analyser les Search Generative Experience (SGE), de concevoir des architectures éditoriales robustes et d\'optimiser la densité lexicale sans générer de contenu générique pénalisable.',
    keyUseCases: [
      'Analyse d\'intention de recherche et regroupement de mots-clés',
      'Optimisation sémantique des balises et contenus éditoriaux',
      'Audit de conformité Helpful Content de Google',
      'Veille concurrentielle automatisée sur les requêtes stratégiques'
    ],
    metaTitle: 'Outils IA SEO & Optimisation Sémantique 2024 | Prisme IA',
    metaDescription: 'Guide des meilleurs outils d\'IA pour le référencement naturel (SEO) : analyse d\'intentions, cocons sémantiques et audits de contenu.'
  },
  {
    id: 'marketing',
    name: 'Marketing & Vente',
    slug: 'marketing',
    icon: 'TrendingUp',
    toolCount: 38,
    description: 'Copywriting publicitaire, prospection ciblée, séquences email et analyse de campagnes.',
    longDescription: 'L\'IA marketing permet d\'hyper-personnaliser les interactions commerciales à grande échelle. Découvrez les outils capables de générer des déclinaisons d\'annonces publicitaires, d\'enrichir des bases de prospects B2B et d\'automatiser le suivi commercial avec un ton humain et engageant.',
    keyUseCases: [
      'Création de variantes publicitaires pour Meta et Google Ads',
      'Enrichissement de prospects et personnalisation de cold emails',
      'Analyse prédictive de performance de conversion',
      'Génération de landing pages et pages de vente ciblées'
    ],
    metaTitle: 'Outils IA Marketing & Prospection Commerciale 2024 | Prisme IA',
    metaDescription: 'Découvrez les solutions d\'intelligence artificielle dédiées aux directeurs marketing et commerciaux pour accélérer l\'acquisition client.'
  },
  {
    id: 'productivite',
    name: 'Productivité',
    slug: 'productivite',
    icon: 'Zap',
    toolCount: 62,
    description: 'Comptes-rendus de réunions automatiques, organisation de bases de connaissances et prise de notes.',
    longDescription: 'La productivité individuelle et collective est le premier domaine d\'adoption de l\'IA. Ces applications éliminent les tâches administratives répétitives : enregistrement et synthèse de visioconférences, gestion dynamique de projets et interrogation en langage naturel de vos documents internes.',
    keyUseCases: [
      'Prise de notes et comptes-rendus automatisés de réunions',
      'Moteur de recherche interne sur les documents d\'entreprise',
      'Organisation automatique de boîtes de réception saturées',
      'Assistance à la planification et hiérarchisation de tâches'
    ],
    metaTitle: 'Outils IA Productivité & Organisation du Travail 2024 | Prisme IA',
    metaDescription: 'Gagnez jusqu\'à 10 heures par semaine grâce aux meilleures applications d\'IA pour la productivité et la gestion documentaire.'
  },
  {
    id: 'audio',
    name: 'Audio & Voix',
    slug: 'audio',
    icon: 'Mic',
    toolCount: 28,
    description: 'Clonage vocal ultra-réaliste, synthèse vocale multilingue, transcription et production musicale.',
    longDescription: 'Les progrès de la synthèse vocale permettent aujourd\'hui de générer des voix off au timbre naturel, avec gestion des respirations et émotions, ou de cloner votre propre voix pour doubler un contenu dans 30 langues en conservant votre intonation originale.',
    keyUseCases: [
      'Doublage multilingue de vidéos avec préservation du timbre',
      'Création de voix off professionnelles pour vidéos et publicités',
      'Transcription ultra-précise de réunions et interviews',
      'Nettoyage et élimination des bruits de fond en direct'
    ],
    metaTitle: 'Outils IA Audio, Voix & Clonage Vocal 2024 | Prisme IA',
    metaDescription: 'Explorez les meilleurs générateurs de voix par IA et outils de transcription audio : ElevenLabs, Whisper et Adobe Podcast.'
  },
  {
    id: 'presentations',
    name: 'Présentations',
    slug: 'presentations',
    icon: 'Presentation',
    toolCount: 21,
    description: 'Génération instantanée de diapositives, storytelling visuel et pitch decks percutants.',
    longDescription: 'Finies les heures passées à aligner des zones de texte sur PowerPoint. Les outils d\'IA pour présentations conçoivent des diaporamas complets, structurés et chartés à partir d\'un simple document Word, d\'un brief ou d\'un lien web.',
    keyUseCases: [
      'Génération de pitch decks pour levées de fonds',
      'Transformation de rapports écrits en diaporamas de synthèse',
      'Création de supports de formation interactifs',
      'Mise en page automatique respectant une charte graphique'
    ],
    metaTitle: 'Outils IA Présentations & Slides Automatiques 2024 | Prisme IA',
    metaDescription: 'Créez des présentations professionnelles en quelques secondes avec les meilleures IA : Gamma, Beautiful.ai et Tome.'
  },
  {
    id: 'chatbots',
    name: 'Chatbots & Assistants',
    slug: 'chatbots',
    icon: 'MessageSquare',
    toolCount: 39,
    description: 'Agents conversationnels, support client automatisé et recherche augmentée avec sources.',
    longDescription: 'Les chatbots modernes ne s\'appuient plus sur des arbres de décision rigides. Connectés à vos bases documentaires via des architectures RAG (Retrieval Augmented Generation), ils répondent précisément aux questions de vos clients et collaborateurs 24/7 avec citations des sources.',
    keyUseCases: [
      'Support client automatisé de premier et second niveau',
      'Assistant RH interne répondant aux questions des salariés',
      'Moteur de recherche conversationnel connecté au web',
      'Agent de qualification de prospects en ligne'
    ],
    metaTitle: 'Meilleurs Chatbots & Agents Conversationnels IA 2024 | Prisme IA',
    metaDescription: 'Découvrez les assistants conversationnels d\'IA les plus performants pour le grand public et les entreprises : Mistral Le Chat, ChatGPT, Perplexity.'
  },
  {
    id: 'automatisation',
    name: 'Automatisation',
    slug: 'automatisation',
    icon: 'Workflow',
    toolCount: 31,
    description: 'Connexion d\'APIs sans code, flux de travail intelligents et agents IA autonomes.',
    longDescription: 'L\'alliance du no-code et des grands modèles d\'IA permet d\'automatiser des chaînes de tâches complexes : réception d\'un email client, analyse des pièces jointes, classification, extraction de données et réponse pré-rédigée sans intervention humaine.',
    keyUseCases: [
      'Tri et réponse automatique aux demandes de support',
      'Extraction de données non structurées depuis des factures et contrats',
      'Publication automatisée de contenus cross-plateformes',
      'Synchronisation intelligente entre CRM, ERP et bases de données'
    ],
    metaTitle: 'Outils IA Automatisation & Workflows No-Code 2024 | Prisme IA',
    metaDescription: 'Automatisez vos processus métier grâce à l\'intelligence artificielle avec Make, Zapier AI et les agents autonomes.'
  }
];

import { ToolItem } from '../types';

export const TOOLS: ToolItem[] = [
  {
    id: 'revid-ai',
    name: 'Revid AI',
    slug: 'revid-ai',
    logo: 'RA',
    logoBg: '#fee2e2',
    accentColor: '#dc2626',
    shortDescription: 'Générateur de vidéos courtes par IA optimisé pour TikTok, Instagram Reels et YouTube Shorts.',
    description: 'Revid AI est une solution d\'automatisation vidéo par intelligence artificielle conçue pour convertir des idées textuelles, des articles de blog ou des scripts en vidéos verticales percutantes prêtes à poster. Il génère automatiquement la voix off réaliste, sélectionne les séquences B-roll correspondantes, synchronise les sous-titres animés et applique les transitions adaptées aux codes des réseaux sociaux.',
    category: 'Vidéo & Animation',
    subcategories: ['Vidéos courtes', 'Social Media', 'Sous-titrage automatique', 'Text-to-Video'],
    pricing: 'À partir de 29 $ / mois (Essai gratuit disponible)',
    pricingType: 'Freemium',
    freePlan: true,
    features: [
      'Génération text-to-video en format vertical 9:16 en un clic',
      'Bibliothèque de voix off IA en français avec intonation naturelle',
      'Sous-titres dynamiques synchronisés avec mise en avant mot par mot',
      'Intégration de médias libres de droits et génération d\'illustrations IA contextuelles',
      'Planificateur et export haute définition sans filigrane (version payante)'
    ],
    useCases: [
      'Création quotidienne de vidéos courtes pour TikTok et Instagram',
      'Recyclage de newsletters et articles de blog en capsules vidéo',
      'Vidéos publicitaires virales pour marques de e-commerce',
      'Synthèse visuelle de concepts pédagogiques pour formateurs'
    ],
    pros: [
      'Gain de temps spectaculaire pour les créateurs de formats courts',
      'Sous-titres animés fidèles aux codes des réseaux sociaux actuels',
      'Prise en charge de la langue française pour les voix et la transcription',
      'Interface intuitive ne nécessitant aucune compétence préalable en montage'
    ],
    limitations: [
      'Moins adapté aux vidéos de format long (au-delà de 3 minutes)',
      'Personnalisation fine des pistes audio plus limitée qu\'un logiciel de montage traditionnel',
      'Crédits de génération consommés rapidement sur les vidéos complexes'
    ],
    alternatives: [
      {
        slug: 'heygen',
        name: 'HeyGen',
        shortDescription: 'Plateforme leader d\'avatars IA parlants et de doublage vidéo multilingue.'
      },
      {
        slug: 'runway-gen3',
        name: 'Runway Gen-3',
        shortDescription: 'Générateur cinématique text-to-video pour créatifs et réalisateurs.'
      }
    ],
    websiteUrl: 'https://revid.ai',
    affiliateUrl: 'https://revid.ai/?ref=prismeia',
    affiliateEnabled: true,
    lastUpdated: '18 septembre 2024',
    releaseYear: 2023,
    originCountry: 'États-Unis',
    frenchSupport: true,
    verifiedBadge: true,
    featured: true,
    pricingPlans: [
      {
        name: 'Gratuit (Essai)',
        price: '0 $',
        period: '3 vidéos d\'essai',
        features: ['3 crédits vidéo', 'Sous-titrage automatique', 'Résolution 720p', 'Filigrane Revid']
      },
      {
        name: 'Creator',
        price: '29 $',
        period: 'par mois',
        recommended: true,
        features: ['30 vidéos générées / mois', 'Résolution Full HD 1080p', 'Sans filigrane', 'Toutes les voix off premium en français', 'Export rapide']
      },
      {
        name: 'Agency',
        price: '79 $',
        period: 'par mois',
        features: ['100 vidéos / mois', 'Gestion multi-comptes', 'Styles de sous-titres personnalisés', 'Support prioritaire 24/7']
      }
    ],
    // Semantic relationships
    relatedTools: ['heygen', 'runway-gen3', 'elevenlabs'],
    relatedTutorials: ['comment-creer-une-video-avec-ia-revid-heygen'],
    relatedPrompts: ['prompt-script-video-court-tiktok-reels'],
    relatedComparisons: ['revid-ai-vs-heygen-quelle-ia-video-choisir'],
    relatedDeals: ['revid-ai-reduction-20-pourcent'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    faq: [
      {
        question: 'Revid AI est-il efficace pour générer des vidéos en langue française ?',
        answer: 'Oui, Revid AI prend en charge nativement le français pour la génération de scripts, la sélection de voix off réalistes et la synchronisation des sous-titres animés avec ponctuation et accents respectés.'
      },
      {
        question: 'Quelle est la différence principale entre Revid AI et HeyGen ?',
        answer: 'Revid AI est axé sur les vidéos de type B-roll dynamique (text-to-video avec plans d\'illustration, voix off et sous-titres animés pour TikTok/Shorts), tandis que HeyGen est spécialisé dans les avatars humains parlants face caméra.'
      }
    ],
    // Backward compatibility aliases
    tagline: 'Générateur de vidéos courtes par IA pour TikTok, Reels et Shorts',
    tags: ['Vidéo courte', 'TikTok', 'Reels', 'Sous-titres', 'Text-to-Video'],
    priceStartingAt: '29 $/mois (Essai gratuit)'
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    slug: 'heygen',
    logo: 'HG',
    logoBg: '#e0e7ff',
    accentColor: '#4338ca',
    shortDescription: 'Plateforme de création vidéo d\'entreprise avec avatars photoréalistes et clonage vocal.',
    description: 'HeyGen est une référence mondiale pour la production de vidéos professionnelles incarnées par des avatars synthétiques. Il permet de transformer des présentations d\'entreprise, des modules e-learning et des vidéos marketing sans caméra, ni studio, ni comédien. Son système de traduction vidéo synchronise automatiquement les mouvements labiaux avec la langue cible.',
    category: 'Vidéo & Animation',
    subcategories: ['Avatars IA', 'Doublage vidéo', 'Formation & E-learning', 'Vidéo B2B'],
    pricing: 'À partir de 29 $ / mois (Essai gratuit)',
    pricingType: 'Freemium',
    freePlan: true,
    features: [
      'Plus de 100 avatars IA diversifiés avec expressions faciales réalistes',
      'Création d\'avatars personnalisés (Instant Avatar) à partir d\'une courte vidéo selfie',
      'Traduction et synchronisation labiale (Lip-sync) dans plus de 40 langues',
      'Intégration d\'écrans partagés, diapositives et visuels d\'arrière-plan',
      'API développeur pour l\'automatisation de vidéos personnalisées à grande échelle'
    ],
    useCases: [
      'Vidéos de formation interne et onboarding de collaborateurs',
      'Localisation et doublage de vidéos YouTube et tutoriels dans plusieurs langues',
      'Messages vidéo personnalisés pour la prospection commerciale B2B',
      'Présentations de produits et vidéos de démonstration SaaS'
    ],
    pros: [
      'Synchronisation labiale bluffante sur le doublage de vidéos existantes',
      'Qualité visuelle des avatars de premier ordre',
      'Large bibliothèque de modèles prêts à l\'emploi pour entreprises',
      'Économies substantielles sur les coûts de tournage et de comédiens'
    ],
    limitations: [
      'Le rendu peut parfois manquer de spontanéité pour des formats très décontractés',
      'Tarification par crédits qui peut s\'avérer élevée pour des volumes importants',
      'Temps de calcul variable en période de forte affluence sur la plateforme'
    ],
    alternatives: [
      {
        slug: 'revid-ai',
        name: 'Revid AI',
        shortDescription: 'Générateur de vidéos courtes dynamiques pour TikTok, Reels et Shorts.'
      },
      {
        slug: 'runway-gen3',
        name: 'Runway Gen-3',
        shortDescription: 'Moteur text-to-video cinématique pour effets spéciaux et scènes artistiques.'
      }
    ],
    websiteUrl: 'https://heygen.com',
    affiliateUrl: 'https://heygen.com/?ref=prismeia',
    affiliateEnabled: true,
    lastUpdated: '16 septembre 2024',
    releaseYear: 2022,
    originCountry: 'États-Unis',
    frenchSupport: true,
    verifiedBadge: true,
    featured: true,
    pricingPlans: [
      {
        name: 'Free',
        price: '0 $',
        period: '1 crédit gratuit',
        features: ['1 crédit vidéo', 'Avatars de base', 'Résolution 720p', 'Filigrane']
      },
      {
        name: 'Creator',
        price: '29 $',
        period: 'par mois',
        recommended: true,
        features: ['15 crédits / mois', 'Accès aux avatars premium', 'Sous-titres automatiques', 'Sans filigrane', 'Résolution 1080p']
      },
      {
        name: 'Business',
        price: '89 $',
        period: 'par mois',
        features: ['30 crédits / mois', 'Résolution 4K', 'Avatar personnalisé rapide', 'Accès API', 'Support prioritaire']
      }
    ],
    // Semantic relationships
    relatedTools: ['revid-ai', 'elevenlabs', 'runway-gen3'],
    relatedTutorials: ['comment-creer-une-video-avec-ia-revid-heygen'],
    relatedPrompts: ['prompt-script-video-court-tiktok-reels'],
    relatedComparisons: ['revid-ai-vs-heygen-quelle-ia-video-choisir'],
    relatedDeals: ['revid-ai-reduction-20-pourcent'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    faq: [
      {
        question: 'Comment fonctionne la traduction vidéo avec lip-sync sur HeyGen ?',
        answer: 'Vous téléchargez une vidéo parlée dans une langue (par exemple en français ou en anglais). HeyGen transcrit le texte, le traduit, clone la voix d\'origine dans la langue souhaitée et réanime la bouche du locuteur pour qu\'elle corresponde parfaitement aux nouveaux phonèmes.'
      }
    ],
    tagline: 'Avatars IA parlants et traduction vidéo avec synchronisation labiale',
    tags: ['Avatars IA', 'Doublage', 'Lip-sync', 'E-learning', 'Vidéo B2B'],
    priceStartingAt: '29 $/mois (Essai gratuit)'
  },
  {
    id: 'mistral-le-chat',
    name: 'Mistral Le Chat',
    slug: 'mistral-le-chat',
    logo: 'ML',
    logoBg: '#fef3c7',
    accentColor: '#d97706',
    shortDescription: 'L\'assistant conversationnel souverain propulsé par les modèles français Mistral Large 2.',
    description: 'Développé par le fleuron français Mistral AI, Le Chat propose une interface fluide, rapide et nativement optimisée pour le français. Il intègre la recherche web en temps réel, l\'analyse de documents volumineux et la génération de code avec un respect strict de la confidentialité européenne.',
    category: 'Chatbots & Assistants',
    subcategories: ['Grands Modèles de Langage', 'IA Souveraine', 'Programmation', 'Recherche web'],
    pricing: 'Gratuit / 19 € par mois pour Pro',
    pricingType: 'Freemium',
    freePlan: true,
    features: [
      'Maîtrise native des finesses de la langue française et du droit européen',
      'Recherche d\'informations web en temps réel avec sources vérifiables',
      'Fenêtre de contexte jusqu\'à 128 000 tokens',
      'Mode développeur avec exécution de code Canvas et rendu de graphiques',
      'Hébergement des données 100% conforme au RGPD au sein de l\'Union Européenne'
    ],
    useCases: [
      'Recherche d\'informations et synthèse de documents confidentiels',
      'Rédaction de rapports d\'affaires et courriers institutionnels',
      'Assistance à la programmation Python, TypeScript et SQL',
      'Veille réglementaire et analyse juridique pour entreprises européennes'
    ],
    pros: [
      'Excellente compréhension des nuances de style et du vocabulaire français',
      'Temps de réponse remarquablement rapide et régulier',
      'Générosité de la formule d\'accès gratuit sans bridage excessif',
      'Poids ouverts (open weights) garantissant la transparence'
    ],
    limitations: [
      'Génération d\'images encore limitée face aux outils spécialisés',
      'Écosystème d\'intégrations tierces en cours d\'expansion'
    ],
    alternatives: [
      {
        slug: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        shortDescription: 'Le modèle d\'Anthropic réputé pour sa finesse d\'écriture et le codage.'
      },
      {
        slug: 'perplexity-ai',
        name: 'Perplexity AI',
        shortDescription: 'Moteur de recherche conversationnel fondé sur des sources académiques et web.'
      }
    ],
    websiteUrl: 'https://chat.mistral.ai',
    affiliateUrl: 'https://chat.mistral.ai',
    affiliateEnabled: false,
    lastUpdated: '19 septembre 2024',
    releaseYear: 2024,
    originCountry: 'France',
    frenchSupport: true,
    verifiedBadge: true,
    featured: true,
    pricingPlans: [
      {
        name: 'Standard',
        price: '0 €',
        period: 'Toujours gratuit',
        features: ['Accès à Mistral Large 2', 'Recherche web', 'Fenêtre de contexte 32k tokens', 'Historique illimité']
      },
      {
        name: 'Pro',
        price: '19 €',
        period: 'par mois',
        recommended: true,
        features: ['Priorité absolue aux heures de pointe', 'Recherche web poussée', 'Fenêtre de contexte 128k', 'Support prioritaire', 'Accès anticipé']
      }
    ],
    // Semantic relationships
    relatedTools: ['claude-3-5-sonnet', 'perplexity-ai', 'cursor-editor'],
    relatedTutorials: ['creer-un-moteur-rag-souverain-avec-mistral'],
    relatedPrompts: ['prompt-synthese-analytique-documents-complexes'],
    relatedComparisons: ['mistral-large-2-vs-claude-3-5-sonnet'],
    relatedDeals: ['mistral-ai-credits-api-developpeurs'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    faq: [
      {
        question: 'Mistral Le Chat est-il conforme au RGPD pour les entreprises françaises ?',
        answer: 'Oui. Contrairement à d\'autres acteurs internationaux, Mistral AI héberge ses infrastructures dans l\'Union Européenne et propose des garanties strictes de non-réutilisation des données des utilisateurs professionnels pour l\'entraînement.'
      }
    ],
    tagline: 'L\'assistant conversationnel souverain propulsé par Mistral Large 2',
    tags: ['Français natif', 'Souveraineté', 'Code', 'Open Weights', 'RGPD'],
    priceStartingAt: 'Gratuit / 19 € par mois'
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    slug: 'claude-3-5-sonnet',
    logo: 'CL',
    logoBg: '#ffedd5',
    accentColor: '#c2410c',
    shortDescription: 'L\'excellence rédactionnelle et logique par Anthropic avec l\'espace interactif Artifacts.',
    description: 'Claude 3.5 Sonnet se distingue par une prose particulièrement naturelle et nuancée en français. Son environnement Artifacts permet de visualiser en direct du code web, des diagrammes vectoriels et des documents interactifs côte à côte avec la discussion.',
    category: 'Texte & Rédaction',
    subcategories: ['Grands Modèles de Langage', 'Programmation', 'Analyse de données', 'Rédaction longue'],
    pricing: 'Gratuit / 20 $ par mois pour Pro',
    pricingType: 'Freemium',
    freePlan: true,
    features: [
      'Espace dynamique Artifacts pour tester du code et prévisualiser des applications en direct',
      'Style rédactionnel fluide et académique en langue française',
      'Compréhension visuelle poussée de diagrammes et captures d\'écran',
      'Fenêtre de contexte de 200 000 tokens'
    ],
    useCases: [
      'Développement web et refactorisation de code front-end/back-end',
      'Rédaction d\'articles de synthèse, thèses et essais littéraires',
      'Analyse de documents financiers et bilans comptables',
      'Création de maquettes interactives en HTML/Tailwind/React'
    ],
    pros: [
      'Le meilleur modèle généraliste actuel pour la programmation et la relecture',
      'Moins de biais et d\'hallucinations constatés lors des bancs d\'essai',
      'Qualité du français soutenu remarquable'
    ],
    limitations: [
      'Quotas de messages stricts sur la formule gratuite aux heures de pointe',
      'Pas de navigation web connectée en temps réel native'
    ],
    alternatives: [
      {
        slug: 'mistral-le-chat',
        name: 'Mistral Le Chat',
        shortDescription: 'L\'alternative française souveraine avec recherche web intégrée.'
      },
      {
        slug: 'cursor-editor',
        name: 'Cursor',
        shortDescription: 'L\'éditeur de code qui intègre Claude 3.5 Sonnet directement dans votre flux IDE.'
      }
    ],
    websiteUrl: 'https://claude.ai',
    affiliateUrl: 'https://claude.ai',
    affiliateEnabled: false,
    lastUpdated: '17 septembre 2024',
    releaseYear: 2024,
    originCountry: 'États-Unis',
    frenchSupport: true,
    verifiedBadge: true,
    featured: true,
    pricingPlans: [
      {
        name: 'Free',
        price: '0 $',
        period: 'Utilisation standard',
        features: ['Accès à Claude 3.5 Sonnet', 'Artifacts', 'Analyse d\'images']
      },
      {
        name: 'Pro',
        price: '20 $',
        period: 'par mois',
        recommended: true,
        features: ['5x plus d\'utilisation', 'Accès prioritaire en période d\'affluence', 'Accès anticipé aux nouveaux modèles']
      }
    ],
    relatedTools: ['mistral-le-chat', 'cursor-editor', 'perplexity-ai'],
    relatedTutorials: ['creer-un-moteur-rag-souverain-avec-mistral'],
    relatedPrompts: ['prompt-audit-semantique-page-web', 'prompt-synthese-analytique-documents-complexes'],
    relatedComparisons: ['mistral-large-2-vs-claude-3-5-sonnet'],
    relatedDeals: ['cursor-pro-reduction-etudiants'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024', 'droit-auteur-ia-generative-tribunaux-francais'],
    faq: [
      {
        question: 'Pourquoi Claude 3.5 Sonnet est-il particulièrement réputé pour le code ?',
        answer: 'Sur les benchmarks standardisés (HumanEval, SWE-bench) ainsi qu\'en conditions réelles, Claude 3.5 Sonnet démontre une compréhension supérieure de l\'architecture logicielle globale et résout des bogues complexes sans créer de régressions inattendues.'
      }
    ],
    tagline: 'L\'excellence rédactionnelle et logique par Anthropic avec Artifacts',
    tags: ['Rédaction', 'Artifacts', 'Programmation', 'Code'],
    priceStartingAt: 'Gratuit / 20 $/mois'
  },
  {
    id: 'cursor-editor',
    name: 'Cursor',
    slug: 'cursor-editor',
    logo: 'CU',
    logoBg: '#ede9fe',
    accentColor: '#7c3aed',
    shortDescription: 'L\'environnement de développement augmenté par l\'IA qui transforme la façon de programmer.',
    description: 'Cursor est un fork de VS Code optimisé dès sa conception pour l\'intelligence artificielle. En intégrant nativement Claude 3.5 Sonnet et GPT-4o, il permet d\'éditer des bases de code entières en langage naturel, d\'anticiper vos frappes avec une précision bluffante et de corriger les erreurs de terminal en un raccourci clavier.',
    category: 'Productivité',
    subcategories: ['Programmation', 'Développement logiciel', 'IDE', 'Productivité tech'],
    pricing: 'Gratuit / 20 $ par mois pour Pro',
    pricingType: 'Freemium',
    freePlan: true,
    features: [
      'Indexation sémantique complète de votre codebase local',
      'Édition multi-fichiers simultanée avec la fonction Composer',
      'Auto-complétion intelligente sur plusieurs lignes prédisant votre prochain geste',
      'Compatibilité totale avec toutes les extensions de l\'écosystème VS Code'
    ],
    useCases: [
      'Développement accéléré d\'applications web full-stack',
      'Refactorisation de code legacy et documentation automatisée',
      'Génération de tests unitaires et intégration continue',
      'Apprentissage rapide de nouveaux frameworks et langages'
    ],
    pros: [
      'Transition immédiate depuis VS Code sans réapprentissage des raccourcis',
      'La fonctionnalité Composer surpasse les copilotes traditionnels',
      'Liberté de choisir entre Claude 3.5 Sonnet et GPT-4o selon la tâche'
    ],
    limitations: [
      'Nécessite une connexion internet stable pour les requêtes de modèles distants',
      'Consommation rapide du quota mensuel en utilisation intensive'
    ],
    alternatives: [
      {
        slug: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        shortDescription: 'L\'assistant généraliste utilisable via son interface web.'
      }
    ],
    websiteUrl: 'https://cursor.com',
    affiliateUrl: 'https://cursor.com',
    affiliateEnabled: false,
    lastUpdated: '15 septembre 2024',
    releaseYear: 2023,
    originCountry: 'États-Unis',
    frenchSupport: true,
    verifiedBadge: true,
    featured: true,
    pricingPlans: [
      {
        name: 'Hobby',
        price: '0 $',
        period: 'Gratuit à vie',
        features: ['2 000 complétions gratuites', '50 requêtes rapides premium', 'Support VS Code']
      },
      {
        name: 'Pro',
        price: '20 $',
        period: 'par mois',
        recommended: true,
        features: ['Complétions illimitées', '500 requêtes rapides premium / mois', 'Accès illimité en mode normal', 'Composer multi-fichiers']
      }
    ],
    relatedTools: ['claude-3-5-sonnet', 'mistral-le-chat'],
    relatedTutorials: ['creer-un-moteur-rag-souverain-avec-mistral'],
    relatedPrompts: ['prompt-audit-semantique-page-web'],
    relatedComparisons: ['mistral-large-2-vs-claude-3-5-sonnet'],
    relatedDeals: ['cursor-pro-reduction-etudiants'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    faq: [
      {
        question: 'Puis-je réutiliser mes thèmes et extensions VS Code dans Cursor ?',
        answer: 'Oui, à 100%. Lors du premier démarrage, Cursor propose d\'importer en un clic toutes vos extensions, thèmes, réglages et raccourcis clavier installés sur VS Code.'
      }
    ],
    tagline: 'L\'environnement de développement augmenté par l\'IA',
    tags: ['Code', 'IDE', 'Développeur', 'VS Code', 'Claude 3.5'],
    priceStartingAt: 'Gratuit / 20 $/mois'
  },
  {
    id: 'midjourney-v6',
    name: 'Midjourney v6',
    slug: 'midjourney-v6',
    logo: 'MJ',
    logoBg: '#f1f5f9',
    accentColor: '#334155',
    shortDescription: 'Le générateur d\'images de référence pour la direction artistique et le rendu cinématique.',
    description: 'Midjourney v6 demeure la référence esthétique pour la génération visuelle. Capable de retranscrire des textures hyper-réalistes, des éclairages naturels et du texte lisible, il s\'adresse aux directeurs artistiques, designers et concepteurs visuels en quête d\'un rendu cinématique inégalé.',
    category: 'Image & Design',
    subcategories: ['Génération d\'images', 'Direction artistique', 'Photographie virtuelle', 'Illustrations'],
    pricing: 'À partir de 10 $ / mois',
    pricingType: 'Payant',
    freePlan: false,
    features: [
      'Précision photographique hors pair sur les matières, la peau et la lumière',
      'Gestion améliorée du texte typographique dans les visuels générés',
      'Contrôle de cadrage (Zoom, Pan, Inpainting) et variation de styles',
      'Interface web dédiée désormais accessible sans obligation de passer par Discord'
    ],
    useCases: [
      'Campagnes de communication visuelle et affiches de marque',
      'Moodboards créatifs pour le cinéma, le jeu vidéo et la mode',
      'Illustrations de couverture pour magazines et livres',
      'Shooting photo de produits et décors architecturaux'
    ],
    pros: [
      'Sensibilité esthétique supérieure à tous les concurrents du marché',
      'Richesse de la communauté et volume inépuisable de prompts partagés',
      'Résolution et niveau de détails spectaculaires'
    ],
    limitations: [
      'Aucun forfait gratuit permanent disponible',
      'Respect strict de prompts techniques parfois moins littéral que Flux.1'
    ],
    alternatives: [
      {
        slug: 'flux-1-schnell',
        name: 'Flux.1',
        shortDescription: 'Le modèle open-weights d\'une fidélité textuelle et anatomique impressionnante.'
      }
    ],
    websiteUrl: 'https://midjourney.com',
    affiliateUrl: 'https://midjourney.com',
    affiliateEnabled: false,
    lastUpdated: '12 septembre 2024',
    releaseYear: 2022,
    originCountry: 'États-Unis',
    frenchSupport: true,
    verifiedBadge: true,
    featured: true,
    pricingPlans: [
      {
        name: 'Basic',
        price: '10 $',
        period: 'par mois',
        features: ['3,3 h de temps GPU rapide (environ 200 générations)', 'Droits commerciaux généraux', 'Accès à la galerie']
      },
      {
        name: 'Standard',
        price: '30 $',
        period: 'par mois',
        recommended: true,
        features: ['15 h de temps GPU rapide', 'Générations lentes illimitées (Relax mode)', 'Droits commerciaux']
      }
    ],
    relatedTools: ['flux-1-schnell', 'runway-gen3'],
    relatedTutorials: ['creer-des-visuels-photorealistes-avec-midjourney-et-flux'],
    relatedPrompts: ['prompt-shooting-photo-produit-minimaliste'],
    relatedComparisons: ['midjourney-v6-vs-flux-1-schnell'],
    relatedDeals: [],
    relatedArticles: ['droit-auteur-ia-generative-tribunaux-francais'],
    faq: [
      {
        question: 'Faut-il obligatoirement utiliser Discord pour utiliser Midjourney v6 ?',
        answer: 'Non. Midjourney propose désormais son interface web native sur midjourney.com, permettant de générer et d\'organiser ses créations visuelles directement dans son navigateur sans passer par Discord.'
      }
    ],
    tagline: 'Le générateur d\'images de référence pour la direction artistique',
    tags: ['Image', 'Photographie', 'Direction artistique', 'Midjourney'],
    priceStartingAt: '10 $/mois'
  },
  {
    id: 'flux-1-schnell',
    name: 'Flux.1',
    slug: 'flux-1-schnell',
    logo: 'FX',
    logoBg: '#ecfdf5',
    accentColor: '#059669',
    shortDescription: 'Le modèle de génération d\'images open-weights qui rivalise avec les solutions propriétaires fermées.',
    description: 'Créé par Black Forest Labs (l\'équipe d\'ingénieurs à l\'origine de Stable Diffusion), Flux.1 redéfinit les standards de l\'IA visuelle ouverte. Sa compréhension anatomique (notamment les mains et poses complexes) et sa capacité à insérer du texte lisible en font le rival direct de Midjourney.',
    category: 'Image & Design',
    subcategories: ['Open Weights', 'Génération d\'images', 'Texte dans l\'image', 'Haute résolution'],
    pricing: 'Gratuit en local (Open Source) / Payant via API cloud',
    pricingType: 'Open Source',
    freePlan: true,
    features: [
      'Architecture hybride 12 milliards de paramètres',
      'Rendu parfait du texte typographique dans l\'image générée',
      'Précision anatomique supérieure (mains, doigts, proportions)',
      'Décliné en trois versions : Schnell (rapide), Dev (non-commercial) et Pro (API entreprise)'
    ],
    useCases: [
      'Génération d\'affiches avec titres et slogans directement intégrés',
      'Intégration dans des pipelines de production de jeux et 3D',
      'Déploiement local sur serveurs sécurisés pour confidentialité totale',
      'Création d\'illustrations personnalisées sans dépendance cloud'
    ],
    pros: [
      'Modèle ouvert exécutable sur son propre matériel sans abonnement',
      'Fidélité au prompt supérieure sur les descriptions détaillées',
      'Excellente gestion du texte en français'
    ],
    limitations: [
      'Exige une carte graphique puissante (16 Go+ VRAM) pour tourner en local',
      'Style par défaut plus réaliste et moins immédiatement "artistique" que Midjourney'
    ],
    alternatives: [
      {
        slug: 'midjourney-v6',
        name: 'Midjourney v6',
        shortDescription: 'L\'outil créatif propriétaire leader pour la direction artistique.'
      }
    ],
    websiteUrl: 'https://blackforestlabs.ai',
    affiliateUrl: 'https://blackforestlabs.ai',
    affiliateEnabled: false,
    lastUpdated: '14 septembre 2024',
    releaseYear: 2024,
    originCountry: 'Allemagne',
    frenchSupport: true,
    verifiedBadge: true,
    featured: true,
    pricingPlans: [
      {
        name: 'Schnell (Local)',
        price: '0 €',
        period: 'Licence Apache 2.0',
        features: ['Utilisation commerciale autorisée', 'Exécution locale', 'Code ouvert']
      },
      {
        name: 'Pro API',
        price: '0,05 $',
        period: 'par image',
        recommended: true,
        features: ['Qualité maximale', 'Vitesse cloud', 'Intégration API instantanée']
      }
    ],
    relatedTools: ['midjourney-v6', 'runway-gen3'],
    relatedTutorials: ['creer-des-visuels-photorealistes-avec-midjourney-et-flux'],
    relatedPrompts: ['prompt-shooting-photo-produit-minimaliste'],
    relatedComparisons: ['midjourney-v6-vs-flux-1-schnell'],
    relatedDeals: [],
    relatedArticles: ['droit-auteur-ia-generative-tribunaux-francais'],
    faq: [
      {
        question: 'Puis-je utiliser Flux.1 gratuitement ?',
        answer: 'Oui, la version Flux.1 Schnell est distribuée sous licence libre Apache 2.0. Vous pouvez la télécharger et l\'exécuter gratuitement sur votre propre ordinateur (avec un outil comme ComfyUI) si vous possédez une carte graphique avec au moins 12 à 16 Go de VRAM.'
      }
    ],
    tagline: 'Le modèle d\'images open-weights qui rivalise avec Midjourney',
    tags: ['Open Source', 'Images', 'Black Forest', 'Flux', 'Texte'],
    priceStartingAt: 'Gratuit (Open Source)'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    logo: '11',
    logoBg: '#f8fafc',
    accentColor: '#0f172a',
    shortDescription: 'Le leader mondial du clonage de voix réaliste et de la synthèse vocale multilingue.',
    description: 'ElevenLabs produit les voix synthétiques les plus naturelles du marché. Capable de reproduire les intonations, respirations, rires et émotions humaines, il permet de sonoriser des vidéos, créer des livres audio et doubler des contenus dans 29 langues tout en préservant le timbre vocal d\'origine.',
    category: 'Audio & Voix',
    subcategories: ['Clonage vocal', 'Synthèse vocale', 'Doublage IA', 'Sound Design'],
    pricing: 'Gratuit / 5 $ par mois pour Starter',
    pricingType: 'Freemium',
    freePlan: true,
    features: [
      'Clonage vocal instantané à partir de 60 secondes d\'enregistrement audio',
      'Modèle multilingue v2 prenant en charge le français avec accents régionaux',
      'Outil de doublage automatique préservant les bruits de fond originaux',
      'Générateur d\'effets sonores text-to-sound-effects'
    ],
    useCases: [
      'Voix off de vidéos YouTube, TikTok et cours en ligne',
      'Doublage international de vidéos d\'entreprise sans réenregistrement',
      'Création de livres audio immersifs et podcasts narratifs',
      'Assistants vocaux interactifs et bornes d\'accueil'
    ],
    pros: [
      'Réalisme troublant des respirations et hésitations naturelles',
      'Excellente fidélité de l\'accent et du rythme de la langue française',
      'API performante et simple à intégrer'
    ],
    limitations: [
      'Crédits consommés rapidement sur les textes longs',
      'Exige une vigilance accrue sur le consentement des voix clonées'
    ],
    alternatives: [
      {
        slug: 'heygen',
        name: 'HeyGen',
        shortDescription: 'Pour synchroniser la voix avec un avatar visuel animé.'
      }
    ],
    websiteUrl: 'https://elevenlabs.io',
    affiliateUrl: 'https://elevenlabs.io/?ref=prismeia',
    affiliateEnabled: true,
    lastUpdated: '16 septembre 2024',
    releaseYear: 2022,
    originCountry: 'États-Unis',
    frenchSupport: true,
    verifiedBadge: true,
    featured: true,
    pricingPlans: [
      {
        name: 'Free',
        price: '0 $',
        period: 'par mois',
        features: ['10 000 caractères / mois', '3 voix personnalisées', 'Attribution requise']
      },
      {
        name: 'Starter',
        price: '5 $',
        period: 'par mois (1er mois à 1$)',
        recommended: true,
        features: ['30 000 caractères / mois', 'Clonage vocal instantané', 'Licence commerciale']
      }
    ],
    relatedTools: ['heygen', 'revid-ai'],
    relatedTutorials: ['comment-creer-une-video-avec-ia-revid-heygen'],
    relatedPrompts: ['prompt-script-video-court-tiktok-reels'],
    relatedComparisons: ['revid-ai-vs-heygen-quelle-ia-video-choisir'],
    relatedDeals: ['elevenlabs-premier-mois-a-un-dollar'],
    relatedArticles: ['droit-auteur-ia-generative-tribunaux-francais'],
    faq: [
      {
        question: 'Comment cloner sa propre voix sur ElevenLabs ?',
        answer: 'Il suffit d\'enregistrer 1 à 5 minutes de votre voix dans un environnement calme en lisant un texte avec votre intonation naturelle. Le système analyse les fréquences harmoniques de votre timbre et crée un profil vocal réutilisable pour lire n\'importe quel texte.'
      }
    ],
    tagline: 'Le leader mondial du clonage de voix et de la synthèse vocale',
    tags: ['Audio', 'Voix', 'Clonage', 'Doublage', 'Podcast'],
    priceStartingAt: 'Gratuit / 5 $/mois'
  },
  {
    id: 'perplexity-ai',
    name: 'Perplexity AI',
    slug: 'perplexity-ai',
    logo: 'PX',
    logoBg: '#f0fdfa',
    accentColor: '#0d9488',
    shortDescription: 'Le moteur de recherche conversationnel qui remplace la recherche traditionnelle par des réponses sourcées.',
    description: 'Perplexity AI réinvente la recherche sur internet en combinant la puissance des grands modèles d\'IA avec l\'indexation web en temps réel. Chaque affirmation est assortie de notes de bas de page renvoyant directement aux sources d\'origine (médias, études scientifiques, sites officiels).',
    category: 'Chatbots & Assistants',
    subcategories: ['Moteur de recherche', 'Veille', 'Synthèse d\'informations', 'Recherche académique'],
    pricing: 'Gratuit / 20 $ par mois pour Pro',
    pricingType: 'Freemium',
    freePlan: true,
    features: [
      'Réponses structurées avec citations numérotées des sources web',
      'Mode Pro Search effectuant des recherches en plusieurs étapes itératives',
      'Filtre de recherche ciblée (Web, Académique, YouTube, Reddit, Actualités)',
      'Espaces thématiques (Collections) pour organiser ses projets de veille'
    ],
    useCases: [
      'Veille concurrentielle et technologique quotidienne',
      'Vérification rapide d\'informations et fact-checking',
      'Synthèse de documentation juridique et scientifique',
      'Recherche d\'achats et comparaison de produits'
    ],
    pros: [
      'Transparence totale grâce aux sources cliquables',
      'Gain de temps radical par rapport à la consultation de dizaines d\'onglets',
      'Possibilité de basculer entre Claude 3.5 Sonnet et GPT-4o dans la version Pro'
    ],
    limitations: [
      'Les résumés peuvent parfois simplifier à l\'excès des débats complexes',
      'Moins adapté à la rédaction créative pure qu\'un chatbot standard'
    ],
    alternatives: [
      {
        slug: 'mistral-le-chat',
        name: 'Mistral Le Chat',
        shortDescription: 'L\'assistant français avec recherche web intégrée.'
      }
    ],
    websiteUrl: 'https://perplexity.ai',
    affiliateUrl: 'https://perplexity.ai',
    affiliateEnabled: false,
    lastUpdated: '13 septembre 2024',
    releaseYear: 2022,
    originCountry: 'États-Unis',
    frenchSupport: true,
    verifiedBadge: true,
    featured: false,
    pricingPlans: [
      {
        name: 'Gratuit',
        price: '0 $',
        period: 'Toujours gratuit',
        features: ['Recherches standard illimitées', '5 recherches Pro par jour', 'Citations des sources']
      },
      {
        name: 'Pro',
        price: '20 $',
        period: 'par mois',
        recommended: true,
        features: ['300+ recherches Pro par jour', 'Choix du modèle (Claude 3.5, GPT-4o)', 'Analyse de documents illimitée', 'Crédits API inclus']
      }
    ],
    relatedTools: ['mistral-le-chat', 'claude-3-5-sonnet'],
    relatedTutorials: ['creer-un-moteur-rag-souverain-avec-mistral'],
    relatedPrompts: ['prompt-synthese-analytique-documents-complexes'],
    relatedComparisons: ['mistral-large-2-vs-claude-3-5-sonnet'],
    relatedDeals: [],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    faq: [
      {
        question: 'Comment Perplexity garantit-il la véracité de ses réponses ?',
        answer: 'En indexant le web en direct et en associant chaque phrase rédigée à une note de bas de page cliquable. L\'utilisateur peut survoler ou cliquer sur chaque lien pour vérifier par lui-même la fiabilité du média ou de la source citée.'
      }
    ],
    tagline: 'Le moteur de recherche conversationnel fondé sur des sources vérifiées',
    tags: ['Recherche', 'Sources', 'Veille', 'Citations'],
    priceStartingAt: 'Gratuit / 20 $/mois'
  },
  {
    id: 'runway-gen3',
    name: 'Runway Gen-3',
    slug: 'runway-gen3',
    logo: 'RW',
    logoBg: '#fef2f2',
    accentColor: '#b91c1c',
    shortDescription: 'Le générateur vidéo cinématique text-to-video et image-to-video de référence.',
    description: 'Runway Gen-3 Alpha permet de générer des clips vidéo de qualité cinématographique à partir d\'une simple consigne textuelle ou d\'une image fixe. Avec un contrôle précis sur les mouvements de caméra (pan, tilt, zoom) et une physique des mouvements fluide, il est plébiscité par les studios de production et agences publicitaires.',
    category: 'Vidéo & Animation',
    subcategories: ['Text-to-Video', 'Image-to-Video', 'Effets spéciaux', 'Cinéma'],
    pricing: 'À partir de 12 $ / mois',
    pricingType: 'Freemium',
    freePlan: true,
    features: [
      'Génération vidéo haute fidélité jusqu\'à 10 secondes par séquence',
      'Contrôle précis de la caméra (Camera Control) et de la vitesse de mouvement',
      'Mode Motion Brush pour animer des zones précises d\'une image fixe',
      'Interpolation et extension de plans vidéo existants'
    ],
    useCases: [
      'Création de plans de coupe (B-roll) cinématiques pour spots publicitaires',
      'Animation de concepts artistiques et décors pour le cinéma',
      'Clips musicaux et visuels scéniques immersifs',
      'Effets visuels et transitions dynamiques pour créateurs YouTube'
    ],
    pros: [
      'Rendu de mouvements et éclairages cinématiques saisissant',
      'Contrôle poussé sur la dynamique de la caméra',
      'Plateforme web complète avec suite d\'outils de retouche vidéo'
    ],
    limitations: [
      'Consommation rapide de crédits lors des générations itératives',
      'Durée de clip limitée à 10 secondes par requête'
    ],
    alternatives: [
      {
        slug: 'revid-ai',
        name: 'Revid AI',
        shortDescription: 'Pour la création automatisée de vidéos courtes pour réseaux sociaux.'
      },
      {
        slug: 'heygen',
        name: 'HeyGen',
        shortDescription: 'Pour la création de vidéos avec présentateurs et avatars parlants.'
      }
    ],
    websiteUrl: 'https://runwayml.com',
    affiliateUrl: 'https://runwayml.com',
    affiliateEnabled: false,
    lastUpdated: '11 septembre 2024',
    releaseYear: 2023,
    originCountry: 'États-Unis',
    frenchSupport: true,
    verifiedBadge: true,
    featured: false,
    pricingPlans: [
      {
        name: 'Standard',
        price: '12 $',
        period: 'par mois',
        recommended: true,
        features: ['625 crédits mensuels', 'Résolution 1080p', 'Suppression du filigrane']
      },
      {
        name: 'Pro',
        price: '28 $',
        period: 'par mois',
        features: ['2 250 crédits mensuels', 'Générations prioritaires', 'Exports ProRes']
      }
    ],
    relatedTools: ['revid-ai', 'heygen', 'midjourney-v6'],
    relatedTutorials: ['comment-creer-une-video-avec-ia-revid-heygen'],
    relatedPrompts: ['prompt-script-video-court-tiktok-reels'],
    relatedComparisons: ['revid-ai-vs-heygen-quelle-ia-video-choisir'],
    relatedDeals: [],
    relatedArticles: ['droit-auteur-ia-generative-tribunaux-francais'],
    faq: [
      {
        question: 'Quelle est la durée maximale d\'une vidéo générée sur Runway Gen-3 ?',
        answer: 'Une génération individuelle dure entre 5 et 10 secondes. Cependant, Runway propose une fonction d\'extension permettant d\'enchaîner plusieurs générations successives pour construire des séquences plus longues tout en conservant la cohérence visuelle.'
      }
    ],
    tagline: 'Le générateur vidéo cinématique text-to-video de pointe',
    tags: ['Vidéo', 'Text-to-Video', 'Cinéma', 'Animation'],
    priceStartingAt: '12 $/mois'
  }
];

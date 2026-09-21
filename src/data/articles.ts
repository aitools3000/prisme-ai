import { ArticleItem } from '../types';

export const ARTICLES: ArticleItem[] = [
  {
    id: 'souverainete-ia-europe-bataille-modeles-2024',
    title: 'Souveraineté numérique : Comment la France et l\'Europe défient les géants américains de l\'IA',
    slug: 'souverainete-ia-europe-bataille-modeles-2024',
    excerpt: 'Enquête exclusive : Face aux investissements colossaux de Microsoft, Google et OpenAI, Mistral AI, Black Forest Labs et l\'écosystème open-weights européen démontrent qu\'une autre voie est possible.',
    category: 'Analyses & Décryptages',
    tags: ['Souveraineté', 'Mistral AI', 'Europe', 'RGPD', 'Open Source'],
    publishedDate: '17 septembre 2024',
    modifiedDate: '19 septembre 2024',
    author: {
      name: 'Dr. Éléonore Vasseur',
      role: 'Rédactrice en chef & Chercheuse associée',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    content: [
      {
        heading: '1. Le mythe de l\'inévitable monopole de la Silicon Valley',
        paragraphs: [
          'Pendant des décennies, le récit technologique dominant a imposé l\'idée que seules les méga-corporations de la côte ouest américaine disposaient de la force de frappe financière pour définir le futur de l\'informatique. L\'émergence fulgurante de Mistral AI en France et de Black Forest Labs en Allemagne a fait voler en éclats ce déterminisme.',
          'En publiant des modèles plus compacts, plus efficients et souvent distribués sous licences ouvertes ou poids accessibles, les pionniers européens ont prouvé qu\'une ingénierie algorithmique raffinée pouvait rivaliser avec la simple force brute des clusters GPU à plusieurs milliards de dollars.'
        ],
        callout: '« L\'Europe ne doit plus être un simple continent d\'utilisateurs passifs payant des rentes à des monopoles fermés. La souveraineté commence par la capacité à auditer et héberger soi-même les poids de ses modèles. »'
      },
      {
        heading: '2. L\'AI Act européen : frein réglementaire ou rempart stratégique ?',
        paragraphs: [
          'Longtemps décriée par certains observateurs comme un carcan bureaucratique étouffant l\'innovation, la réglementation européenne sur l\'IA (AI Act) commence à révéler ses vertus structurelles. En établissant des règles claires de transparence, de traçabilité des données d\'entraînement et d\'évaluation des risques systémiques, elle force les éditeurs à concevoir des architectures fiables.',
          'Pour les directeurs des systèmes d\'information (DSI) d\'entreprises françaises et d\'institutions publiques, la question n\'est plus seulement technique : elle est juridique et patrimoniale. Confier l\'intégralité de son savoir-faire d\'entreprise à des serveurs sous juridiction étrangère soumise au Cloud Act constitue désormais un risque inacceptable lors des audits de gouvernance.'
        ]
      },
      {
        heading: '3. La montée en puissance du modèle open-weights',
        paragraphs: [
          'La distinction entre modèles fermés (API "boîte noire") et modèles à poids ouverts (open weights) est devenue la véritable ligne de fracture idéologique de notre décennie. Des outils comme Mistral NeMo ou Flux.1 permettent aux organisations de rapatrier l\'intelligence artificielle au plus près de leurs serveurs sécurisés, garantissant une étanchéité absolue des secrets de fabrication.'
        ]
      }
    ],
    // Semantic relationships
    relatedTools: ['mistral-le-chat', 'claude-3-5-sonnet', 'cursor-editor', 'flux-1-schnell'],
    relatedTutorials: ['creer-un-moteur-rag-souverain-avec-mistral'],
    relatedPrompts: ['prompt-synthese-analytique-documents-complexes'],
    relatedComparisons: ['mistral-large-2-vs-claude-3-5-sonnet'],
    relatedDeals: ['mistral-ai-credits-api-developpeurs'],
    faq: [
      {
        question: 'Qu\'est-ce qui différencie un modèle souverain d\'un modèle cloud américain ?',
        answer: 'Un modèle souverain garantit que l\'entraînement, l\'hébergement et l\'exploitation des données se déroulent sous juridiction européenne, éliminant tout risque de saisie ou de surveillance extraterritoriale permise par les lois américaines comme le Cloud Act.'
      }
    ],
    // Backward compatibility aliases
    subtitle: 'Enquête exclusive : Face aux investissements colossaux des géants américains, l\'écosystème européen démontre qu\'une alternative ouverte et rigoureuse est possible.',
    summary: 'La souveraineté numérique européenne ne relève plus du vœu pieux. De Paris à Berlin, les ingénieurs construisent des modèles compacts et efficients capables de rivaliser avec les modèles propriétaires de la Silicon Valley.',
    readTime: '11 min de lecture',
    publishedAt: '17 septembre 2024'
  },
  {
    id: 'droit-auteur-ia-generative-tribunaux-francais',
    title: 'Droit d\'auteur et IA générative : Ce que décident réellement les tribunaux et la jurisprudence',
    slug: 'droit-auteur-ia-generative-tribunaux-francais',
    excerpt: 'Analyse juridique : Qui possède les droits d\'une image ou d\'un texte généré par Midjourney ou Claude ? Le point complet sur le droit d\'auteur français en 2024.',
    category: 'Droit & Régulation',
    tags: ['Droit d\'auteur', 'Jurisprudence', 'France', 'Propriété Intellectuelle', 'Création'],
    publishedDate: '12 septembre 2024',
    modifiedDate: '15 septembre 2024',
    author: {
      name: 'Me Antoine de Saint-Germain',
      role: 'Avocat au Barreau de Paris, Droit du Numérique',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    content: [
      {
        heading: '1. Le principe cardinal : L\'exigence d\'une empreinte de la personnalité humaine',
        paragraphs: [
          'En droit français et européen, la protection par le droit d\'auteur découle de l\'article L.111-1 du Code de la Propriété Intellectuelle. La jurisprudence de la Cour de Justice de l\'Union Européenne (arrêt Infopaq) est formelle : une œuvre n\'est protégeable que si elle reflète la personnalité de son auteur par des choix libres et créatifs.',
          'Une simple consigne textuelle (prompt) courte comme "un chat assis sur un fauteuil rouge" ne confère aucun droit d\'auteur sur l\'image générée par Midjourney. La machine effectue la totalité des choix compositionnels, chromatiques et graphiques sans intervention humaine directe.'
        ],
        callout: '« Aucun tribunal français ne reconnaîtra la qualité d\'auteur à un algorithme. Seul l\'humain qui dirige, retouche, assemble et prend des choix créatifs déterminants peut prétendre à une protection. »'
      },
      {
        heading: '2. Quand l\'œuvre devient-elle protégeable ?',
        paragraphs: [
          'La protection juridique s\'applique dès lors que l\'utilisateur démontre un processus itératif poussé : combinaison de plusieurs modèles, retouches manuelles sous Photoshop, assemblage vectoriel, composition musicale hybride et post-traitement.',
          'Il est donc vivement recommandé aux créateurs et agences de conserver l\'historique des versions intermédiaires et le fichier de travail démontrant l\'apport créatif humain en cas de litige pour contrefaçon.'
        ]
      }
    ],
    relatedTools: ['midjourney-v6', 'flux-1-schnell', 'claude-3-5-sonnet'],
    relatedTutorials: ['creer-des-visuels-photorealistes-avec-midjourney-et-flux'],
    relatedPrompts: ['prompt-shooting-photo-produit-minimaliste'],
    relatedComparisons: ['midjourney-v6-vs-flux-1-schnell'],
    relatedDeals: [],
    faq: [
      {
        question: 'Puis-je commercialiser légalement des images créées avec Midjourney ?',
        answer: 'Oui, si vous disposez d\'un abonnement payant Midjourney actif au moment de la génération. Les conditions générales de Midjourney vous concèdent alors les droits d\'exploitation commerciale, sous réserve de ne pas violer de marques déposées ou d\'éléments protégés existants.'
      }
    ],
    subtitle: 'Analyse juridique : Qui possède les droits d\'une image ou d\'un texte généré par l\'IA ? Le point complet sur la jurisprudence française et européenne.',
    summary: 'Le droit français demeure protecteur des créateurs : sans empreinte personnelle humaine mesurable, une création brute d\'IA tombe dans le domaine public. Découvrez comment sécuriser vos créations hybrides.',
    readTime: '9 min de lecture',
    publishedAt: '12 septembre 2024'
  }
];

import { PromptItem } from '../types';

export const PROMPTS: PromptItem[] = [
  {
    id: 'prompt-script-video-court-tiktok-reels',
    title: 'Prompt pour générer un script vidéo captivant (Shorts, TikTok, Reels)',
    slug: 'prompt-script-video-court-tiktok-reels',
    promptText: `Tu es un scénariste d'élite spécialisé dans les vidéos courtes à forte rétention (YouTube Shorts, Instagram Reels, TikTok).

Rédige un script de 60 secondes sur le sujet suivant : {SUJET}
Audience ciblée : {PUBLIC_CIBLE}
Tonalité : {TONALITE}
Objectif : {OBJECTIF_CONVERSION}

Consignes strictes d'écriture :
1. Les 3 premières secondes (Accroche / Hook) : Interdiction absolue de dire "Bonjour", "Aujourd'hui nous allons parler de..." ou de te présenter. Démarre directement par une rupture de schéma, une question provocante ou un chiffre marquant.
2. Corps du script (45 secondes) : 3 étapes concrètes, denses, sans temps mort. Chaque phrase doit apporter une information neuve. Indique entre crochets [VISUEL] ce qui doit apparaître à l'écran (b-roll, texte à l'écran, capture).
3. Clôture (10 secondes) : Un appel à l'action précis (CTA) et une question ouverte incitant aux commentaires.

Formate le résultat sous la forme d'un tableau à deux colonnes :
| Timing (Secondes) | Texte prononcé (Voix off) | Indications Visuelles & Écran |`,
    category: 'Vidéo & Animation',
    compatibleTools: ['Revid AI', 'HeyGen', 'Mistral Le Chat', 'Claude 3.5 Sonnet'],
    useCase: 'Création de scripts percutants prêts à être injectés dans un outil comme Revid AI ou HeyGen pour générer automatiquement la vidéo.',
    instructions: 'Remplacez les variables entre crochets par votre thématique et votre cible. Copiez ensuite la colonne "Texte prononcé" dans Revid AI pour générer la voix off et le montage.',
    example: 'Exemple pour le sujet "Comment doubler sa productivité avec l\'IA sans coder" destiné aux solopreneurs.',
    variables: [
      { key: 'SUJET', label: 'Sujet de la vidéo', placeholder: 'ex: 3 erreurs fatales en prospection B2B', defaultValue: '3 outils d\'IA méconnus qui remplacent 5 heures de travail manuel' },
      { key: 'PUBLIC_CIBLE', label: 'Audience cible', placeholder: 'ex: Créateurs de contenu indépendants', defaultValue: 'Entrepreneurs et indépendants francophones' },
      { key: 'TONALITE', label: 'Tonalité souhaitée', placeholder: 'ex: Dynamique, percutant, direct', defaultValue: 'Direct, énergique, sans langue de bois' },
      { key: 'OBJECTIF_CONVERSION', label: 'Appel à l\'action final', placeholder: 'ex: Télécharger le guide en bio', defaultValue: 'S\'abonner pour recevoir les pépites de la semaine' }
    ],
    tags: ['Vidéo courte', 'Script', 'TikTok', 'Reels', 'Shorts', 'Social Media'],
    copyCount: 1840,
    author: 'Thomas Laurent',
    bestPractices: [
      'Lisez le texte à haute voix avec un chronomètre : visez entre 120 et 140 mots pour 60 secondes.',
      'Variez le rythme : alternez phrases très courtes (3-5 mots) et phrases explicatives.',
      'Injectez directement le résultat dans Revid AI pour la sélection automatique de B-roll.'
    ],
    // Semantic relationships
    relatedTools: ['revid-ai', 'heygen', 'elevenlabs', 'claude-3-5-sonnet'],
    relatedTutorials: ['comment-creer-une-video-avec-ia-revid-heygen'],
    relatedPrompts: ['prompt-audit-semantique-page-web', 'prompt-synthese-analytique-documents-complexes'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    // Backward compatibility aliases
    description: 'Structurez un script vertical captivant pour TikTok, Reels et Shorts avec accroche psychologique et timing précis.',
    recommendedModels: ['Claude 3.5 Sonnet', 'Mistral Large 2', 'GPT-4o']
  },
  {
    id: 'prompt-audit-semantique-page-web',
    title: 'Prompt d\'audit sémantique et d\'optimisation SEO de page web',
    slug: 'prompt-audit-semantique-page-web',
    promptText: `Tu es un consultant SEO technique et sémantique senior, expert des directives Helpful Content de Google et des moteurs de recherche conversationnels.

Analyse le texte de la page web suivante :
Contenu de la page : {CONTENU_PAGE}
Requête cible principale : {REQUETE_CIBLE}
Intention de recherche : {INTENTION_RECHERCHE}

Réalise un audit exhaustif comprenant :
1. Analyse de l'intention de recherche : La page répond-elle immédiatement à l'intention sans diluer l'information ?
2. Entités nommées et champ lexical : Quelles sont les 10 entités sémantiques indispensables manquantes par rapport aux meilleures pages positionnées ?
3. Score de concision et élimination du bavardage : Identifie 3 paragraphes creux à supprimer ou reformuler.
4. Proposition d'optimisation : Rédige une balise Title percutante (< 60 caractères), une Meta Description (< 155 caractères) et une structure H1/H2 remaniée optimisée pour le SEO et le GEO (Generative Engine Optimization).`,
    category: 'SEO & Contenu',
    compatibleTools: ['Claude 3.5 Sonnet', 'Mistral Le Chat', 'Perplexity AI'],
    useCase: 'Identifier les faiblesses sémantiques d\'une page web pour améliorer son classement dans Google et les résumés d\'IA.',
    instructions: 'Collez le texte brut de votre page web et précisez votre mot-clé stratégique. Ce prompt est particulièrement efficace avec Claude 3.5 Sonnet ou Mistral Large 2.',
    example: 'Audit d\'une page de destination présentant un logiciel de facturation pour freelances.',
    variables: [
      { key: 'REQUETE_CIBLE', label: 'Mot-clé ou requête cible', placeholder: 'ex: meilleur logiciel de facturation freelance', defaultValue: 'comparatif outils ia video' },
      { key: 'INTENTION_RECHERCHE', label: 'Type d\'intention', placeholder: 'ex: Informationnelle comparative', defaultValue: 'Commerciale / Évaluation avant achat' },
      { key: 'CONTENU_PAGE', label: 'Texte actuel de la page', placeholder: 'Collez ici le texte brut de votre page...', defaultValue: 'Découvrez notre guide complet des meilleurs outils d\'intelligence artificielle pour la vidéo en 2024. Nous analysons les fonctionnalités, les prix et les alternatives.' }
    ],
    tags: ['SEO', 'Audit', 'Sémantique', 'Google SGE', 'GEO'],
    copyCount: 2410,
    author: 'Julien Bonnet',
    bestPractices: [
      'Fournissez le texte intégral de la page plutôt qu\'un simple extrait pour un diagnostic précis.',
      'Appliquez en priorité l\'optimisation des balises H2 et l\'enrichissement en entités nommées.'
    ],
    relatedTools: ['claude-3-5-sonnet', 'mistral-le-chat', 'perplexity-ai'],
    relatedTutorials: ['creer-un-moteur-rag-souverain-avec-mistral'],
    relatedPrompts: ['prompt-script-video-court-tiktok-reels', 'prompt-synthese-analytique-documents-complexes'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    description: 'Diagnostiquez la couverture sémantique d\'une URL pour dépasser vos concurrents sur Google et les moteurs IA.',
    recommendedModels: ['Claude 3.5 Sonnet', 'Mistral Large 2']
  },
  {
    id: 'prompt-synthese-analytique-documents-complexes',
    title: 'Prompt de synthèse analytique et d\'extraction de décisions de documents',
    slug: 'prompt-synthese-analytique-documents-complexes',
    promptText: `Tu es un directeur de cabinet et analyste stratégique de haut niveau.

Voici le document à analyser :
{DOCUMENT_SOURCE}

Objectif de la synthèse : {OBJECTIF_SYNTHESE}
Format souhaité : Note de synthèse exécutive pour le comité de direction.

Consignes impératives :
1. Résumé exécutif en 5 lignes maximum : Quelle est la thèse centrale et l'impact direct sur notre activité ?
2. Décisions clés et arbitrages actés : Liste à puces des choix concrets (qui, quoi, quand).
3. Risques et points de vigilance identifiés : Tableau des risques avec niveau de criticité (Faible, Moyen, Élevé) et mesure d'atténuation recommandée.
4. Chiffres clés et dates butoirs : Extraction de toutes les métriques financières et échéances calendaires.
5. Zéro remplissage : Ne paraphrase pas le texte. Sois synthétique, chirurgical et direct.`,
    category: 'Texte & Rédaction',
    compatibleTools: ['Claude 3.5 Sonnet', 'Mistral Le Chat', 'Perplexity AI'],
    useCase: 'Extraire en quelques secondes la moelle d\'un rapport financier de 50 pages, d\'un contrat ou d\'un compte-rendu de conseil.',
    instructions: 'Collez le texte de votre rapport ou importez-le en pièce jointe dans Mistral Le Chat ou Claude 3.5 Sonnet.',
    example: 'Synthèse d\'un rapport trimestriel sur les dépenses d\'infrastructure cloud d\'une entreprise.',
    variables: [
      { key: 'DOCUMENT_SOURCE', label: 'Texte du document ou extrait', placeholder: 'Collez le texte du document...', defaultValue: 'Rapport annuel sur l\'impact de l\'IA générative dans les entreprises françaises...' },
      { key: 'OBJECTIF_SYNTHESE', label: 'Objectif de la note', placeholder: 'ex: Préparer le comité stratégique de jeudi', defaultValue: 'Identifier les opportunités d\'investissement prioritaires et les risques de conformité' }
    ],
    tags: ['Synthèse', 'Executive', 'Productivité', 'Décision'],
    copyCount: 3120,
    author: 'Alexandre Renard',
    bestPractices: [
      'Activez la température la plus basse possible (0.0 ou 0.1) pour garantir une fidélité absolue aux faits du document.',
      'Si le document dépasse 100 pages, procédez par parties ou utilisez un pipeline RAG.'
    ],
    relatedTools: ['mistral-le-chat', 'claude-3-5-sonnet', 'perplexity-ai'],
    relatedTutorials: ['creer-un-moteur-rag-souverain-avec-mistral'],
    relatedPrompts: ['prompt-audit-semantique-page-web'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    description: 'Transformez un document dense de 40 pages en une note de décision limpide pour comités de direction.',
    recommendedModels: ['Claude 3.5 Sonnet', 'Mistral Large 2']
  },
  {
    id: 'prompt-shooting-photo-produit-minimaliste',
    title: 'Prompt de shooting photo produit studio minimaliste',
    slug: 'prompt-shooting-photo-produit-minimaliste',
    promptText: `A commercial studio product photograph of a luxury {TYPE_PRODUIT}, placed on a smooth matte beige travertine podium. Soft directional morning sunlight creating clean geometric shadows, minimal organic floral branch in the background with soft blur. High-end Scandinavian cosmetics aesthetic, muted neutral palette, captured on Hasselblad H6D-100c, 100mm macro lens, f/5.6, crisp focus on packaging typography, editorial advertising quality --ar 4:5 --style raw --v 6.0`,
    category: 'Image & Design',
    compatibleTools: ['Midjourney v6', 'Flux.1', 'Runway Gen-3'],
    useCase: 'Générer des visuels e-commerce et des publicités produit ultra-élégants sans frais de studio photo.',
    instructions: 'Remplacez {TYPE_PRODUIT} par votre article (ex: flacon de parfum en verre ambré, écouteurs sans fil en aluminium brossé).',
    example: 'Génération de visuels pour une marque de soins bio.',
    variables: [
      { key: 'TYPE_PRODUIT', label: 'Type de produit et matières', placeholder: 'ex: amber glass serum bottle with white dropper', defaultValue: 'amber glass skincare serum bottle with minimalist white label' }
    ],
    tags: ['Photo produit', 'E-commerce', 'Midjourney', 'Flux', 'Studio'],
    copyCount: 1590,
    author: 'Camille Mercier',
    bestPractices: [
      'Précisez les matières (verre dépoli, aluminium anodisé, céramique mate) pour un rendu tactile réaliste.',
      'Utilisez le ratio 4:5 pour les posts Instagram et fiches produits e-commerce.'
    ],
    relatedTools: ['midjourney-v6', 'flux-1-schnell', 'runway-gen3'],
    relatedTutorials: ['creer-des-visuels-photorealistes-avec-midjourney-et-flux'],
    relatedPrompts: ['prompt-script-video-court-tiktok-reels'],
    relatedArticles: ['droit-auteur-ia-generative-tribunaux-francais'],
    description: 'Créez des photographies de produits cosmétiques ou technologiques de standard magazine haut de gamme.',
    recommendedModels: ['Midjourney v6', 'Flux.1 Pro']
  }
];

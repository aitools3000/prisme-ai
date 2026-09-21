import { DealItem } from '../types';

export const DEALS: DealItem[] = [
  {
    id: 'revid-ai-reduction-20-pourcent',
    title: 'Revid AI : 20% de réduction sur l\'abonnement annuel Creator',
    slug: 'revid-ai-reduction-20-pourcent',
    tool: {
      slug: 'revid-ai',
      name: 'Revid AI'
    },
    offer: '20% de remise immédiate sur l\'engagement annuel',
    discount: '-20%',
    couponCode: 'PRISME20',
    affiliateUrl: 'https://revid.ai/?ref=prismeia&coupon=PRISME20',
    affiliateEnabled: true,
    expirationDate: '31 décembre 2024',
    status: 'Vérifié',
    eligibility: 'Valable pour les nouveaux comptes et les utilisateurs passant d\'un forfait gratuit à un forfait payant annuel.',
    terms: [
      'Remise applicable sur la première année de souscription',
      'Non cumulable avec d\'autres codes promotionnels en cours',
      'Testé et vérifié par l\'équipe de Prisme IA le 18 septembre 2024'
    ],
    lastVerified: '18 septembre 2024',
    description: 'Bénéficiez de 20% de réduction immédiate sur le forfait annuel Revid AI Creator en renseignant le code promotionnel exclusif PRISME20 lors de votre commande.',
    howToClaim: [
      'Créez un compte gratuit sur le site officiel de Revid AI.',
      'Rendez-vous dans la rubrique "Billing" ou cliquez sur "Upgrade to Creator".',
      'Sélectionnez la facturation annuelle (Annual Billing).',
      'Entrez le code PRISME20 dans le champ "Promo Code" et appliquez la réduction.'
    ],
    // Semantic relationships
    relatedTutorials: ['comment-creer-une-video-avec-ia-revid-heygen'],
    relatedComparisons: ['revid-ai-vs-heygen-quelle-ia-video-choisir'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    // Backward compatibility aliases
    toolName: 'Revid AI',
    toolSlug: 'revid-ai',
    type: 'Réduction',
    promoCode: 'PRISME20',
    expiryDate: '31 décembre 2024',
    verified: true,
    dealUrl: 'https://revid.ai/?ref=prismeia',
    featured: true
  },
  {
    id: 'cursor-pro-reduction-etudiants',
    title: 'Cursor Pro : Forfait Pro 100% offert pour étudiants et universitaires',
    slug: 'cursor-pro-reduction-etudiants',
    tool: {
      slug: 'cursor-editor',
      name: 'Cursor'
    },
    offer: 'Abonnement Pro gratuit pour les étudiants et enseignants',
    discount: '100% Offert',
    affiliateUrl: 'https://cursor.com/education',
    affiliateEnabled: false,
    expirationDate: 'Offre permanente 2024',
    status: 'Vérifié',
    eligibility: 'Étudiants et professeurs d\'écoles d\'ingénieurs, universités et bootcamps possédant une adresse email académique (.edu, .univ, .fr).',
    terms: [
      'Renouvellement annuel sous réserve de confirmation du statut étudiant',
      'Accès complet aux modèles Claude 3.5 Sonnet et GPT-4o dans Composer',
      'Vérifié par la rédaction de Prisme IA le 15 septembre 2024'
    ],
    lastVerified: '15 septembre 2024',
    description: 'L\'éditeur Cursor offre l\'intégralité des fonctionnalités Pro aux étudiants et enseignants pour favoriser l\'apprentissage de la programmation moderne avec l\'IA.',
    howToClaim: [
      'Téléchargez et installez Cursor sur votre ordinateur.',
      'Créez votre compte avec votre adresse email étudiante institutionnelle.',
      'Rendez-vous sur cursor.com/education pour valider votre éligibilité en un clic.'
    ],
    relatedTutorials: ['creer-un-moteur-rag-souverain-avec-mistral'],
    relatedComparisons: ['mistral-large-2-vs-claude-3-5-sonnet'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    toolName: 'Cursor',
    toolSlug: 'cursor-editor',
    type: 'Offre Étudiant',
    expiryDate: 'Offre permanente',
    verified: true,
    dealUrl: 'https://cursor.com/education',
    featured: true
  },
  {
    id: 'elevenlabs-premier-mois-a-un-dollar',
    title: 'ElevenLabs Starter : Premier mois à 1 $ au lieu de 5 $',
    slug: 'elevenlabs-premier-mois-a-un-dollar',
    tool: {
      slug: 'elevenlabs',
      name: 'ElevenLabs'
    },
    offer: 'Premier mois d\'abonnement Starter à 1 $',
    discount: '-80%',
    affiliateUrl: 'https://elevenlabs.io/?ref=prismeia',
    affiliateEnabled: true,
    expirationDate: '31 octobre 2024',
    status: 'Vérifié',
    eligibility: 'Valable pour toute nouvelle souscription au forfait Starter.',
    terms: [
      '30 000 caractères de génération et clonage de voix inclus',
      'Résiliation possible à tout moment avant le renouvellement à 5 $/mois',
      'Testé et vérifié par l\'équipe le 16 septembre 2024'
    ],
    lastVerified: '16 septembre 2024',
    description: 'Découvrez la puissance du clonage vocal et de la synthèse multilingue d\'ElevenLabs pour seulement 1 $ le premier mois.',
    howToClaim: [
      'Inscrivez-vous sur ElevenLabs via le lien dédié.',
      'Sélectionnez le forfait Starter.',
      'La remise de 80% s\'applique automatiquement lors de la validation du panier.'
    ],
    relatedTutorials: ['comment-creer-une-video-avec-ia-revid-heygen'],
    relatedComparisons: ['revid-ai-vs-heygen-quelle-ia-video-choisir'],
    relatedArticles: ['droit-auteur-ia-generative-tribunaux-francais'],
    toolName: 'ElevenLabs',
    toolSlug: 'elevenlabs',
    type: 'Réduction',
    expiryDate: '31 octobre 2024',
    verified: true,
    dealUrl: 'https://elevenlabs.io/?ref=prismeia',
    featured: false
  },
  {
    id: 'mistral-ai-credits-api-developpeurs',
    title: 'Mistral AI : 10 € de crédits d\'API offerts à l\'inscription console',
    slug: 'mistral-ai-credits-api-developpeurs',
    tool: {
      slug: 'mistral-le-chat',
      name: 'Mistral AI'
    },
    offer: '10 € de crédits offerts pour tester l\'API européenne',
    discount: 'Crédits Gratuits',
    affiliateUrl: 'https://console.mistral.ai',
    affiliateEnabled: false,
    expirationDate: 'Offre permanente 2024',
    status: 'Vérifié',
    eligibility: 'Tout nouveau compte développeur créé sur la console officielle Mistral AI.',
    terms: [
      'Crédits utilisables sur tous les modèles : Mistral Large 2, Mistral NeMo, Codestral et Embeddings',
      'Sans engagement ni prélèvement automatique sans accord préalable',
      'Vérifié le 19 septembre 2024'
    ],
    lastVerified: '19 septembre 2024',
    description: 'Testez les modèles de pointe de Mistral AI sur vos propres données sans débourser un centime grâce aux 10 € de crédits de bienvenue accordés aux développeurs.',
    howToClaim: [
      'Créez un compte sur console.mistral.ai.',
      'Validez votre numéro de téléphone professionnel.',
      'Vos crédits sont immédiatement disponibles pour générer votre première clé API.'
    ],
    relatedTutorials: ['creer-un-moteur-rag-souverain-avec-mistral'],
    relatedComparisons: ['mistral-large-2-vs-claude-3-5-sonnet'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    toolName: 'Mistral AI',
    toolSlug: 'mistral-le-chat',
    type: 'Crédits offerts',
    expiryDate: 'Offre permanente',
    verified: true,
    dealUrl: 'https://console.mistral.ai',
    featured: true
  }
];

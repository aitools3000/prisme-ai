export type PricingType = 'Gratuit' | 'Freemium' | 'Payant' | 'Essai gratuit' | 'Open Source';

export type DifficultyLevel = 'Débutant' | 'Intermédiaire' | 'Avancé';

export type DealStatus = 'Actif' | 'Vérifié' | 'Expiré' | 'Non vérifié';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolAlternative {
  slug: string;
  name: string;
  shortDescription: string;
  tagline?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  logo: string;
  logoBg?: string;
  accentColor?: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategories: string[];
  pricing: string;
  pricingType: PricingType;
  freePlan: boolean;
  features: string[];
  useCases: string[];
  pros: string[];
  limitations: string[];
  alternatives: ToolAlternative[];
  websiteUrl: string;
  affiliateUrl?: string;
  affiliateEnabled: boolean;
  affiliateDisclosure?: string;
  offerTitle?: string;
  discount?: string;
  couponCode?: string;
  lastUpdated: string;
  releaseYear?: number;
  originCountry?: string;
  frenchSupport?: boolean;
  verifiedBadge?: boolean;
  featured?: boolean;
  pricingPlans?: {
    name: string;
    price: string;
    period: string;
    features: string[];
    recommended?: boolean;
  }[];
  // Semantic relationships
  relatedTools: string[];
  relatedTutorials: string[];
  relatedPrompts: string[];
  relatedComparisons: string[];
  relatedDeals: string[];
  relatedArticles: string[];
  faq: FAQItem[];
  // Backward compatibility aliases
  tagline?: string;
  tags?: string[];
  priceStartingAt?: string;
  cons?: string[];
  rating?: number;
  reviewCount?: number;
}

export interface TutorialStep {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

export interface TutorialItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  overview?: string;
  category: string;
  difficulty: DifficultyLevel;
  readingTime: string;
  lastUpdated: string;
  publishedAt?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  prerequisites?: string[];
  steps: TutorialStep[];
  takeaways: string[];
  // Semantic relationships
  relatedTools: string[];
  relatedPrompts: string[];
  relatedComparisons: string[];
  relatedArticles: string[];
  faq: FAQItem[];
  // Backward compatibility alias
  readTime?: string;
  toolsUsed?: string[];
}

export interface PromptVariable {
  key: string;
  label: string;
  placeholder: string;
  defaultValue: string;
}

export interface PromptItem {
  id: string;
  title: string;
  slug: string;
  promptText: string;
  category: string;
  compatibleTools: string[];
  useCase: string;
  instructions: string;
  example: string;
  // Semantic relationships
  relatedTools: string[];
  relatedTutorials: string[];
  relatedPrompts: string[];
  relatedArticles: string[];
  variables?: PromptVariable[];
  tags?: string[];
  copyCount?: number;
  author?: string;
  bestPractices?: string[];
  // Backward compatibility alias
  description?: string;
  recommendedModels?: string[];
  faq?: FAQItem[];
}

export interface ComparisonCriterion {
  criterion: string;
  evaluationA: string;
  evaluationB: string;
  scoreExplanation?: string;
  // Backward compatibility aliases
  winner?: string;
  explanation?: string;
  scoreA?: number;
  scoreB?: number;
}

export interface VerdictByUseCase {
  useCase: string;
  recommendedTool: string;
  justification: string;
  reasoning?: string;
}

export interface ComparisonItem {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  date: string;
  category: string;
  readingTime?: string;
  lastUpdated?: string;
  introduction: string;
  toolA: {
    slug: string;
    name: string;
    shortDescription?: string;
    tagline?: string;
    pricing?: string;
    pricingSummary?: string;
    overallScore?: number;
    verdict?: string;
  };
  toolB: {
    slug: string;
    name: string;
    shortDescription?: string;
    tagline?: string;
    pricing?: string;
    pricingSummary?: string;
    overallScore?: number;
    verdict?: string;
  };
  comparisonCriteria: ComparisonCriterion[];
  pricingComparison: {
    aspect: string;
    toolA: string;
    toolB: string;
  }[];
  featureComparison: {
    feature: string;
    toolA: boolean | string;
    toolB: boolean | string;
  }[];
  useCases: string[];
  strengths: {
    toolA: string[];
    toolB: string[];
  };
  limitations: {
    toolA: string[];
    toolB: string[];
  };
  toolAStrengths?: string[];
  toolAWeaknesses?: string[];
  toolBStrengths?: string[];
  toolBWeaknesses?: string[];
  whenToChooseToolA?: string;
  whenToChooseToolB?: string;
  verdictByUseCase: VerdictByUseCase[];
  alternatives: string[];
  // Semantic relationships
  relatedTutorials: string[];
  relatedDeals: string[];
  faq: FAQItem[];
  // Backward compatibility aliases
  summary?: string;
  criteria?: ComparisonCriterion[];
  editorialVerdict?: string;
  recommendationA?: string;
  recommendationB?: string;
  readTime?: string;
}

export interface DealItem {
  id: string;
  title: string;
  slug: string;
  tool: {
    slug: string;
    name: string;
  };
  offer: string;
  offerTitle?: string;
  discount: string;
  couponCode?: string;
  affiliateUrl: string;
  affiliateEnabled?: boolean;
  affiliateDisclosure?: string;
  expirationDate: string;
  status: DealStatus;
  offerStatus?: DealStatus;
  eligibility: string;
  terms: string[];
  lastVerified: string;
  description: string;
  howToClaim?: string[];
  category?: string;
  verificationStatus?: 'verified' | 'unverified';
  validUntil?: string;
  faq?: FAQItem[];
  // Semantic relationships
  relatedTutorials: string[];
  relatedComparisons: string[];
  relatedArticles: string[];
  // Backward compatibility aliases
  toolName?: string;
  toolSlug?: string;
  type?: 'Réduction' | 'Crédits offerts' | 'Plan Gratuit' | 'Offre Étudiant';
  promoCode?: string;
  expiryDate?: string;
  verified?: boolean;
  dealUrl?: string;
  featured?: boolean;
}

export interface ArticleContentSection {
  heading: string;
  paragraphs: string[];
  callout?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ArticleContentSection[];
  category: string;
  tags: string[];
  publishedDate: string;
  modifiedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  faq: FAQItem[];
  // Semantic relationships
  relatedTools: string[];
  relatedTutorials: string[];
  relatedPrompts: string[];
  relatedComparisons: string[];
  relatedDeals: string[];
  // Backward compatibility aliases
  subtitle?: string;
  summary?: string;
  readTime?: string;
  readingTime?: string;
  publishedAt?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  icon: string;
  toolCount: number;
  description: string;
  longDescription: string;
  keyUseCases: string[];
  metaTitle: string;
  metaDescription: string;
  faq?: FAQItem[];
}

import { ToolItem, ArticleItem, TutorialItem, FAQItem } from '../types';

export const BASE_URL = 'https://prisme-ia.fr';

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

/**
 * Builds Schema.org WebSite JSON-LD
 */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prisme IA',
    url: BASE_URL,
    description: 'Le portail et observatoire francophone de référence de l\'intelligence artificielle.',
    inLanguage: 'fr-FR',
    publisher: {
      '@type': 'Organization',
      name: 'Prisme IA',
      url: BASE_URL,
      logo: `${BASE_URL}/assets/logo.png`
    }
  };
}

/**
 * Builds Schema.org Organization JSON-LD
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prisme IA',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/logo.png`,
    description: 'Média et répertoire indépendant spécialisé dans l\'intelligence artificielle en langue française.',
    sameAs: [
      'https://twitter.com/prisme_ia',
      'https://linkedin.com/company/prisme-ia'
    ]
  };
}

/**
 * Builds Schema.org BreadcrumbList JSON-LD
 */
export function buildBreadcrumbSchema(items: BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}

/**
 * Builds Schema.org SoftwareApplication JSON-LD for an AI Tool
 * Note: Uses only real pricing models; no fake reviews or invented ratings.
 */
export function buildSoftwareApplicationSchema(tool: ToolItem) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description || tool.shortDescription,
    applicationCategory: tool.category,
    operatingSystem: 'All Web Browsers, Cloud',
    url: `${BASE_URL}/outils/${tool.slug}`
  };

  if (tool.freePlan) {
    schema.offers = {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Version gratuite ou essai disponible'
    };
  } else if (tool.pricingPlans && tool.pricingPlans.length > 0) {
    const firstPlan = tool.pricingPlans[0];
    const numericPrice = firstPlan.price.replace(/[^0-9.]/g, '');
    if (numericPrice) {
      schema.offers = {
        '@type': 'Offer',
        price: numericPrice,
        priceCurrency: firstPlan.price.includes('$') ? 'USD' : 'EUR',
        description: `${firstPlan.name} (${firstPlan.period})`
      };
    }
  }

  return schema;
}

/**
 * Builds Schema.org Article / TechArticle JSON-LD
 */
export function buildArticleSchema(
  item: {
    title: string;
    slug: string;
    excerpt?: string;
    description?: string;
    publishedDate?: string;
    publishedAt?: string;
    datePublished?: string;
    modifiedDate?: string;
    lastUpdated?: string;
    dateModified?: string;
    author?: { name: string; avatar?: string } | string;
    authorName?: string;
    category?: string;
  },
  section: 'blog' | 'tutos' | 'comparatifs' = 'blog'
) {
  const authorName = item.authorName || (typeof item.author === 'string' ? item.author : item.author?.name);
  const canonicalUrl = item.slug.startsWith('http')
    ? item.slug
    : item.slug.includes('/')
    ? `${BASE_URL}/${item.slug}`
    : `${BASE_URL}/${section}/${item.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': section === 'tutos' ? 'TechArticle' : 'Article',
    headline: item.title,
    description: item.excerpt || item.description,
    url: canonicalUrl,
    inLanguage: 'fr-FR',
    datePublished: item.datePublished || item.publishedDate || item.publishedAt || '2024-09-01',
    dateModified: item.dateModified || item.modifiedDate || item.lastUpdated || item.publishedDate || '2024-09-20',
    articleSection: item.category,
    author: authorName ? {
      '@type': 'Person',
      name: authorName
    } : {
      '@type': 'Organization',
      name: 'Rédaction Prisme IA'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Prisme IA',
      url: BASE_URL
    }
  };
}

/**
 * Builds Schema.org FAQPage JSON-LD
 * Only executed when FAQ items actually exist on the page.
 */
export function buildFAQSchema(faq: FAQItem[]) {
  if (!faq || faq.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

/**
 * Builds Schema.org ItemList JSON-LD for category hubs and directory lists
 */
export function buildItemListSchema(
  arg1: string | { name: string; url: string; description?: string }[],
  arg2?: string | { name: string; url: string; description?: string }[]
) {
  const title = typeof arg1 === 'string' ? arg1 : (typeof arg2 === 'string' ? arg2 : 'Sélection');
  const items = Array.isArray(arg1) ? arg1 : (Array.isArray(arg2) ? arg2 : []);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}

import { TOOLS } from '../data/tools';
import { TUTORIALS } from '../data/tutorials';
import { PROMPTS } from '../data/prompts';
import { COMPARISONS } from '../data/comparisons';
import { DEALS } from '../data/deals';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { 
  ToolItem, TutorialItem, PromptItem, ComparisonItem, 
  DealItem, ArticleItem, CategoryInfo 
} from '../types';

/**
 * Normalizes text for fuzzy semantic matching
 */
function normalize(str: string): string {
  return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

/**
 * Finds Category Info by slug or name
 */
export function getCategoryInfo(categorySlugOrName: string): CategoryInfo | undefined {
  const norm = normalize(categorySlugOrName);
  return CATEGORIES.find(c => 
    normalize(c.slug) === norm || 
    normalize(c.name) === norm ||
    normalize(c.name).includes(norm) ||
    norm.includes(normalize(c.slug))
  );
}

/**
 * Finds a Tool by slug
 */
export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find(t => t.slug === slug);
}

/**
 * Retrieves related tools for any entity (Tool, Tutorial, Prompt, Comparison, Deal, Article)
 */
export function getRelatedTools(
  entity: { id?: string; slug?: string; category?: string; relatedTools?: string[]; compatibleTools?: string[]; name?: string; tool?: { slug: string }; toolA?: { slug: string }; toolB?: { slug: string } },
  limit: number = 3
): ToolItem[] {
  const result: ToolItem[] = [];
  const addedSlugs = new Set<string>();

  // Do not include self if entity is a tool
  if (entity.slug) {
    addedSlugs.add(entity.slug);
  }

  // 1. Explicit relations
  const explicitSlugs = [
    ...(entity.relatedTools || []),
    ...(entity.compatibleTools ? entity.compatibleTools.map(t => {
      const match = TOOLS.find(tool => normalize(tool.name) === normalize(t));
      return match ? match.slug : '';
    }).filter(Boolean) : []),
    entity.tool?.slug,
    entity.toolA?.slug,
    entity.toolB?.slug
  ].filter(Boolean) as string[];

  for (const slug of explicitSlugs) {
    if (result.length >= limit) break;
    if (!addedSlugs.has(slug)) {
      const tool = TOOLS.find(t => t.slug === slug);
      if (tool) {
        result.push(tool);
        addedSlugs.add(slug);
      }
    }
  }

  // 2. Semantic category and tag matches if below limit
  if (result.length < limit && entity.category) {
    const normCat = normalize(entity.category);
    for (const tool of TOOLS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(tool.slug)) {
        if (normalize(tool.category).includes(normCat) || normCat.includes(normalize(tool.category))) {
          result.push(tool);
          addedSlugs.add(tool.slug);
        }
      }
    }
  }

  // 3. Fallback to featured tools
  if (result.length < limit) {
    for (const tool of TOOLS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(tool.slug)) {
        result.push(tool);
        addedSlugs.add(tool.slug);
      }
    }
  }

  return result.slice(0, limit);
}

/**
 * Retrieves related tutorials for any entity
 */
export function getRelatedTutorials(
  entity: { id?: string; slug?: string; category?: string; name?: string; relatedTutorials?: string[] },
  limit: number = 2
): TutorialItem[] {
  const result: TutorialItem[] = [];
  const addedSlugs = new Set<string>();

  if (entity.slug) {
    addedSlugs.add(entity.slug);
  }

  // 1. Explicit relations
  if (entity.relatedTutorials) {
    for (const slug of entity.relatedTutorials) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(slug)) {
        const tut = TUTORIALS.find(t => t.slug === slug);
        if (tut) {
          result.push(tut);
          addedSlugs.add(slug);
        }
      }
    }
  }

  // 2. Mentions in toolsUsed or text
  const entityName = entity.name ? normalize(entity.name) : '';
  if (result.length < limit && entityName) {
    for (const tut of TUTORIALS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(tut.slug)) {
        const mentionsTool = (tut.toolsUsed || []).some(tu => normalize(tu).includes(entityName)) ||
          normalize(tut.title).includes(entityName);
        if (mentionsTool) {
          result.push(tut);
          addedSlugs.add(tut.slug);
        }
      }
    }
  }

  // 3. Category match
  if (result.length < limit && entity.category) {
    const normCat = normalize(entity.category);
    for (const tut of TUTORIALS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(tut.slug)) {
        if (normalize(tut.category).includes(normCat) || normCat.includes(normalize(tut.category))) {
          result.push(tut);
          addedSlugs.add(tut.slug);
        }
      }
    }
  }

  // 4. Fallback general tutorials
  if (result.length < limit) {
    for (const tut of TUTORIALS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(tut.slug)) {
        result.push(tut);
        addedSlugs.add(tut.slug);
      }
    }
  }

  return result.slice(0, limit);
}

/**
 * Retrieves related prompts for any entity
 */
export function getRelatedPrompts(
  entity: { id?: string; slug?: string; category?: string; name?: string; relatedPrompts?: string[] },
  limit: number = 2
): PromptItem[] {
  const result: PromptItem[] = [];
  const addedSlugs = new Set<string>();

  if (entity.slug) {
    addedSlugs.add(entity.slug);
  }

  // 1. Explicit relations
  if (entity.relatedPrompts) {
    for (const slug of entity.relatedPrompts) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(slug)) {
        const p = PROMPTS.find(item => item.slug === slug);
        if (p) {
          result.push(p);
          addedSlugs.add(slug);
        }
      }
    }
  }

  // 2. Compatible tools match
  const entityName = entity.name ? normalize(entity.name) : '';
  if (result.length < limit && entityName) {
    for (const p of PROMPTS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(p.slug)) {
        const matchTool = (p.compatibleTools || []).some(ct => normalize(ct).includes(entityName));
        if (matchTool) {
          result.push(p);
          addedSlugs.add(p.slug);
        }
      }
    }
  }

  // 3. Category match
  if (result.length < limit && entity.category) {
    const normCat = normalize(entity.category);
    for (const p of PROMPTS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(p.slug)) {
        if (normalize(p.category).includes(normCat) || normCat.includes(normalize(p.category))) {
          result.push(p);
          addedSlugs.add(p.slug);
        }
      }
    }
  }

  return result.slice(0, limit);
}

/**
 * Retrieves related comparisons for any entity
 */
export function getRelatedComparisons(
  entity: { id?: string; slug?: string; category?: string; name?: string; relatedComparisons?: string[] },
  limit: number = 2
): ComparisonItem[] {
  const result: ComparisonItem[] = [];
  const addedSlugs = new Set<string>();

  if (entity.slug) {
    addedSlugs.add(entity.slug);
  }

  // 1. Explicit relations
  if (entity.relatedComparisons) {
    for (const slug of entity.relatedComparisons) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(slug)) {
        const comp = COMPARISONS.find(c => c.slug === slug);
        if (comp) {
          result.push(comp);
          addedSlugs.add(slug);
        }
      }
    }
  }

  // 2. Tool mentions in toolA or toolB
  const entitySlug = entity.slug || '';
  if (result.length < limit && entitySlug) {
    for (const comp of COMPARISONS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(comp.slug)) {
        if (comp.toolA.slug === entitySlug || comp.toolB.slug === entitySlug) {
          result.push(comp);
          addedSlugs.add(comp.slug);
        }
      }
    }
  }

  // 3. Category match
  if (result.length < limit && entity.category) {
    const normCat = normalize(entity.category);
    for (const comp of COMPARISONS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(comp.slug)) {
        if (normalize(comp.category).includes(normCat) || normCat.includes(normalize(comp.category))) {
          result.push(comp);
          addedSlugs.add(comp.slug);
        }
      }
    }
  }

  return result.slice(0, limit);
}

/**
 * Retrieves related deals for any entity
 */
export function getRelatedDeals(
  entity: { id?: string; slug?: string; category?: string; relatedDeals?: string[] },
  limit: number = 2
): DealItem[] {
  const result: DealItem[] = [];
  const addedSlugs = new Set<string>();

  // 1. Explicit relations
  if (entity.relatedDeals) {
    for (const slug of entity.relatedDeals) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(slug)) {
        const deal = DEALS.find(d => d.slug === slug);
        if (deal) {
          result.push(deal);
          addedSlugs.add(slug);
        }
      }
    }
  }

  // 2. Match by tool slug
  const entitySlug = entity.slug || '';
  if (result.length < limit && entitySlug) {
    for (const deal of DEALS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(deal.slug)) {
        if (deal.tool?.slug === entitySlug || deal.toolSlug === entitySlug) {
          result.push(deal);
          addedSlugs.add(deal.slug);
        }
      }
    }
  }

  // 3. Fallback active deals
  if (result.length < limit) {
    for (const deal of DEALS) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(deal.slug)) {
        result.push(deal);
        addedSlugs.add(deal.slug);
      }
    }
  }

  return result.slice(0, limit);
}

/**
 * Retrieves related articles for any entity
 */
export function getRelatedArticles(
  entity: { id?: string; slug?: string; category?: string; relatedArticles?: string[] },
  limit: number = 2
): ArticleItem[] {
  const result: ArticleItem[] = [];
  const addedSlugs = new Set<string>();

  if (entity.slug) {
    addedSlugs.add(entity.slug);
  }

  // 1. Explicit relations
  if (entity.relatedArticles) {
    for (const slug of entity.relatedArticles) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(slug)) {
        const art = ARTICLES.find(a => a.slug === slug);
        if (art) {
          result.push(art);
          addedSlugs.add(slug);
        }
      }
    }
  }

  // 2. Fallback
  if (result.length < limit) {
    for (const art of ARTICLES) {
      if (result.length >= limit) break;
      if (!addedSlugs.has(art.slug)) {
        result.push(art);
        addedSlugs.add(art.slug);
      }
    }
  }

  return result.slice(0, limit);
}

/**
 * Gets aggregated hub data for a category landing page
 */
export function getCategoryHubData(categorySlug: string) {
  const category = getCategoryInfo(categorySlug);
  if (!category) return null;

  const normCatName = normalize(category.name);
  const normCatSlug = normalize(category.slug);

  const tools = TOOLS.filter(t => {
    const c = normalize(t.category);
    return c.includes(normCatSlug) || normCatName.includes(c) || c.includes(normCatName.split(' ')[0]);
  });

  const featuredTools = tools.filter(t => t.featured);
  const regularTools = tools.filter(t => !t.featured);

  const tutorials = TUTORIALS.filter(tut => {
    const c = normalize(tut.category);
    return c.includes(normCatSlug) || normCatName.includes(c) || c.includes(normCatName.split(' ')[0]);
  });

  const prompts = PROMPTS.filter(p => {
    const c = normalize(p.category);
    return c.includes(normCatSlug) || normCatName.includes(c) || c.includes(normCatName.split(' ')[0]);
  });

  const comparisons = COMPARISONS.filter(comp => {
    const c = normalize(comp.category);
    return c.includes(normCatSlug) || normCatName.includes(c) || c.includes(normCatName.split(' ')[0]);
  });

  const deals = DEALS.filter(d => {
    const tool = TOOLS.find(t => t.slug === d.tool?.slug || t.slug === d.toolSlug);
    if (!tool) return false;
    const c = normalize(tool.category);
    return c.includes(normCatSlug) || normCatName.includes(c) || c.includes(normCatName.split(' ')[0]);
  });

  const articles = ARTICLES.filter(a => {
    return a.relatedTools.some(toolSlug => tools.some(t => t.slug === toolSlug));
  });

  return {
    category,
    tools,
    featuredTools: featuredTools.length > 0 ? featuredTools : tools.slice(0, 2),
    regularTools,
    tutorials,
    prompts,
    comparisons,
    deals,
    articles: articles.length > 0 ? articles : ARTICLES.slice(0, 2)
  };
}

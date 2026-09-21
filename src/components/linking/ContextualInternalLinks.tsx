import React from 'react';
import { 
  getRelatedTools, 
  getRelatedTutorials, 
  getRelatedPrompts, 
  getRelatedComparisons, 
  getRelatedDeals, 
  getRelatedArticles,
  getCategoryInfo
} from '../../services/relationshipEngine';
import { RelatedTools } from './RelatedTools';
import { RelatedTutorials } from './RelatedTutorials';
import { RelatedPrompts } from './RelatedPrompts';
import { RelatedComparisons } from './RelatedComparisons';
import { RelatedDeals } from './RelatedDeals';
import { RelatedArticles } from './RelatedArticles';
import { CategoryLinks } from './CategoryLinks';
import { AppLink } from '../common/AppLink';
import { Compass, ExternalLink } from 'lucide-react';

interface ContextualInternalLinksProps {
  entity: {
    id?: string;
    slug?: string;
    name?: string;
    title?: string;
    category?: string;
    relatedTools?: string[];
    compatibleTools?: string[];
    relatedTutorials?: string[];
    relatedPrompts?: string[];
    relatedComparisons?: string[];
    relatedDeals?: string[];
    relatedArticles?: string[];
    tool?: { slug: string; name?: string };
    toolA?: { slug: string; name?: string };
    toolB?: { slug: string; name?: string };
  };
  excludeTypes?: ('tools' | 'tutorials' | 'prompts' | 'comparisons' | 'deals' | 'articles')[];
  className?: string;
}

export const ContextualInternalLinks: React.FC<ContextualInternalLinksProps> = ({
  entity,
  excludeTypes = [],
  className = ''
}) => {
  const categoryInfo = entity.category ? getCategoryInfo(entity.category) : undefined;
  
  const relatedTools = !excludeTypes.includes('tools') 
    ? getRelatedTools(entity, 3) 
    : [];

  const relatedTutorials = !excludeTypes.includes('tutorials') 
    ? getRelatedTutorials(entity, 2) 
    : [];

  const relatedComparisons = !excludeTypes.includes('comparisons') 
    ? getRelatedComparisons(entity, 2) 
    : [];

  const relatedPrompts = !excludeTypes.includes('prompts') 
    ? getRelatedPrompts(entity, 2) 
    : [];

  const relatedDeals = !excludeTypes.includes('deals') 
    ? getRelatedDeals(entity, 2) 
    : [];

  const relatedArticles = !excludeTypes.includes('articles') 
    ? getRelatedArticles(entity, 2) 
    : [];

  const hasAnyRelations = 
    relatedTools.length > 0 || 
    relatedTutorials.length > 0 || 
    relatedPrompts.length > 0 || 
    relatedComparisons.length > 0 || 
    relatedDeals.length > 0 ||
    relatedArticles.length > 0;

  if (!hasAnyRelations) return null;

  return (
    <section className={`border-t border-stone-200 pt-10 mt-12 ${className}`}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            Écosystème & Ressources Connexes
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Poursuivre votre exploration
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Contenus, bancs d'essai et guides pratiques liés à cette thématique.
          </p>
        </div>

        {categoryInfo && (
          <AppLink
            to={`/outils/categorie/${categoryInfo.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-stone-50 border border-stone-300 text-xs font-medium text-stone-800 transition-colors shadow-2xs self-start sm:self-auto"
          >
            <span>Hub thématique {categoryInfo.name}</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </AppLink>
        )}
      </div>

      {/* Render each related section if available */}
      {relatedTools.length > 0 && (
        <RelatedTools tools={relatedTools} />
      )}

      {relatedTutorials.length > 0 && (
        <RelatedTutorials tutorials={relatedTutorials} />
      )}

      {relatedComparisons.length > 0 && (
        <RelatedComparisons comparisons={relatedComparisons} />
      )}

      {relatedPrompts.length > 0 && (
        <RelatedPrompts prompts={relatedPrompts} />
      )}

      {relatedDeals.length > 0 && (
        <RelatedDeals deals={relatedDeals} />
      )}

      {relatedArticles.length > 0 && (
        <RelatedArticles articles={relatedArticles} />
      )}

      <div className="mt-8">
        <CategoryLinks currentCategorySlug={categoryInfo?.slug} />
      </div>
    </section>
  );
};

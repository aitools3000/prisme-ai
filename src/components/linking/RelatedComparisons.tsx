import React from 'react';
import { Scale, ArrowRight } from 'lucide-react';
import { ComparisonItem } from '../../types';
import { AppLink } from '../common/AppLink';

interface RelatedComparisonsProps {
  comparisons: ComparisonItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const RelatedComparisons: React.FC<RelatedComparisonsProps> = ({
  comparisons,
  title = 'Comparatifs & Face-à-face objectifs',
  subtitle = 'Analysez les compromis selon vos cas d\'usage plutôt que des scores arbitraires.',
  className = ''
}) => {
  if (!comparisons || comparisons.length === 0) return null;

  return (
    <div className={`my-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-stone-700" />
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <AppLink 
          to="/comparatifs" 
          className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1 hover:underline"
        >
          Tous les comparatifs <ArrowRight className="w-3 h-3" />
        </AppLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisons.map((comp) => (
          <AppLink
            key={comp.id || comp.slug}
            to={`/comparatifs/${comp.slug}`}
            className="group block p-4 bg-white rounded-lg border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all"
          >
            <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2.5">
              <span className="px-2 py-0.5 rounded bg-stone-100 font-medium text-stone-700">
                {comp.category}
              </span>
              <span>{comp.readingTime || comp.readTime || '8 min'}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-xs text-stone-900 bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                {comp.toolA.name}
              </span>
              <span className="text-xs font-serif font-bold text-stone-400 italic">vs</span>
              <span className="font-semibold text-xs text-stone-900 bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                {comp.toolB.name}
              </span>
            </div>

            <h4 className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-950 leading-snug mb-2">
              {comp.title}
            </h4>

            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
              {comp.subtitle || comp.introduction}
            </p>

            <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-500">
                {comp.verdictByUseCase ? `${comp.verdictByUseCase.length} cas d'usage analysés` : 'Critères détaillés'}
              </span>
              <span className="font-medium text-stone-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                Lire le comparatif <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </AppLink>
        ))}
      </div>
    </div>
  );
};

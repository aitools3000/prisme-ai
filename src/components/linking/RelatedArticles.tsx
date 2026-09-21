import React from 'react';
import { Newspaper, ArrowRight, Calendar } from 'lucide-react';
import { ArticleItem } from '../../types';
import { AppLink } from '../common/AppLink';

interface RelatedArticlesProps {
  articles: ArticleItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
  title = 'Analyses & Décryptages de la rédaction',
  subtitle = 'Comprendre les enjeux de fond, la régulation et l\'impact industriel de l\'IA.',
  className = ''
}) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className={`my-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-stone-700" />
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <AppLink 
          to="/blog" 
          className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1 hover:underline"
        >
          Tous les articles <ArrowRight className="w-3 h-3" />
        </AppLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((art) => (
          <AppLink
            key={art.id || art.slug}
            to={`/blog/${art.slug}`}
            className="group block p-4 bg-white rounded-lg border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all"
          >
            <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
              <span className="px-2 py-0.5 rounded bg-stone-100 font-medium text-stone-700">
                {art.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-stone-400" />
                {art.publishedDate || art.publishedAt}
              </span>
            </div>

            <h4 className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-950 leading-snug mb-2">
              {art.title}
            </h4>

            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
              {art.excerpt || art.summary}
            </p>

            <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-500">
                Par {art.author?.name || 'La rédaction'}
              </span>
              <span className="font-medium text-stone-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                Lire l'analyse <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </AppLink>
        ))}
      </div>
    </div>
  );
};

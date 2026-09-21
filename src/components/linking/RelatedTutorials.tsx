import React from 'react';
import { BookOpen, ArrowRight, Clock, BarChart } from 'lucide-react';
import { TutorialItem } from '../../types';
import { AppLink } from '../common/AppLink';

interface RelatedTutorialsProps {
  tutorials: TutorialItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const RelatedTutorials: React.FC<RelatedTutorialsProps> = ({
  tutorials,
  title = 'Tutoriels & Guides pratiques recommandés',
  subtitle = 'Passez de la théorie à l\'exécution grâce à nos pas-à-pas documentés.',
  className = ''
}) => {
  if (!tutorials || tutorials.length === 0) return null;

  return (
    <div className={`my-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-stone-700" />
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <AppLink 
          to="/tutos" 
          className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1 hover:underline"
        >
          Tous les tutoriels <ArrowRight className="w-3 h-3" />
        </AppLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutorials.map((tut) => (
          <AppLink
            key={tut.id || tut.slug}
            to={`/tutos/${tut.slug}`}
            className="group block p-4 bg-white rounded-lg border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all"
          >
            <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-2">
              <span className="px-2 py-0.5 rounded bg-stone-100 font-medium text-stone-700">
                {tut.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                {tut.readingTime || tut.readTime || '8 min'}
              </span>
              <span className="flex items-center gap-1">
                <BarChart className="w-3 h-3 text-stone-400" />
                {tut.difficulty || 'Débutant'}
              </span>
            </div>

            <h4 className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-950 leading-snug mb-2">
              {tut.title}
            </h4>

            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
              {tut.excerpt || tut.overview}
            </p>

            <div className="flex items-center justify-between pt-2.5 border-t border-stone-100 text-xs">
              <div className="flex items-center gap-2">
                {tut.toolsUsed && tut.toolsUsed.length > 0 && (
                  <span className="text-[11px] text-stone-500 truncate max-w-[200px]">
                    Outils : {tut.toolsUsed.slice(0, 2).join(', ')}
                  </span>
                )}
              </div>
              <span className="font-medium text-stone-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                Lire le guide <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </AppLink>
        ))}
      </div>
    </div>
  );
};

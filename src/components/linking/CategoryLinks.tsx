import React from 'react';
import { Layers } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { AppLink } from '../common/AppLink';

interface CategoryLinksProps {
  currentCategorySlug?: string;
  className?: string;
}

export const CategoryLinks: React.FC<CategoryLinksProps> = ({
  currentCategorySlug,
  className = ''
}) => {
  return (
    <div className={`p-4 bg-stone-50 rounded-lg border border-stone-200 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-stone-600" />
          Explorer par thématique
        </h4>
        <AppLink 
          to="/outils" 
          className="text-[11px] text-stone-600 hover:text-stone-950 hover:underline"
        >
          Tous les répertoires
        </AppLink>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategorySlug === cat.slug;
          return (
            <AppLink
              key={cat.id}
              to={`/outils/categorie/${cat.slug}`}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] ${isActive ? 'text-stone-300' : 'text-stone-400'}`}>
                ({cat.toolCount})
              </span>
            </AppLink>
          );
        })}
      </div>
    </div>
  );
};

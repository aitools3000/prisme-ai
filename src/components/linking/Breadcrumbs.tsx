import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { AppLink } from '../common/AppLink';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Fil d'Ariane" className={`flex items-center text-xs text-stone-500 overflow-x-auto py-2 whitespace-nowrap ${className}`}>
      <AppLink 
        to="/" 
        className="flex items-center gap-1 hover:text-stone-900 transition-colors text-stone-500"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Accueil</span>
      </AppLink>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 mx-1.5 text-stone-400 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-medium text-stone-900 truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : (
              <AppLink 
                to={item.href} 
                className="hover:text-stone-900 transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </AppLink>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

import React from 'react';
import { ArrowRight, ChevronRight, Home } from 'lucide-react';

interface SectionHeaderProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  eyebrow,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
  align = 'left'
}) => {
  return (
    <div id={id} className={`mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 ${align === 'center' ? 'text-center items-center' : ''}`}>
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-800 mb-1.5 block">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionText && (
        <div className="shrink-0 pt-1 md:pt-0">
          <button
            onClick={onActionClick}
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 hover:text-blue-950 transition-colors group cursor-pointer"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; onNavigate: (path: string) => void }> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 px-1 mb-6 text-xs text-stone-500 overflow-x-auto">
      <ol className="flex items-center gap-1.5 whitespace-nowrap">
        <li>
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </button>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            {item.href ? (
              <button
                onClick={() => onNavigate(item.href!)}
                className="hover:text-stone-900 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ) : (
              <span className="font-semibold text-stone-900 truncate max-w-[280px]" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const FAQAccordion: React.FC<{ items: { question: string; answer: string }[] }> = ({ items }) => {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  return (
    <div className="divide-y divide-stone-200 border-y border-stone-200">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="py-4">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full text-left flex justify-between items-center gap-4 text-base font-semibold text-stone-900 hover:text-blue-900 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className="text-xl font-light text-stone-400 shrink-0 ml-2">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="mt-2.5 text-sm text-stone-600 leading-relaxed max-w-3xl pr-6 animate-fadeIn">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight } from 'lucide-react';
import { PromptItem } from '../../types';
import { AppLink } from '../common/AppLink';

interface RelatedPromptsProps {
  prompts: PromptItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const RelatedPrompts: React.FC<RelatedPromptsProps> = ({
  prompts,
  title = 'Prompts & Modèles d\'instructions compatibles',
  subtitle = 'Structures de prompts testées et optimisées pour exploiter ces outils à plein potentiel.',
  className = ''
}) => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  if (!prompts || prompts.length === 0) return null;

  const handleCopy = (e: React.MouseEvent, prompt: PromptItem) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedSlug(prompt.slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className={`my-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-stone-700" />
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <AppLink 
          to="/prompts" 
          className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1 hover:underline"
        >
          Tous les prompts <ArrowRight className="w-3 h-3" />
        </AppLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((prompt) => (
          <div
            key={prompt.id || prompt.slug}
            className="p-4 bg-stone-50 rounded-lg border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200">
                  {prompt.category}
                </span>
                <button
                  onClick={(e) => handleCopy(e, prompt)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copier le prompt brut"
                >
                  {copiedSlug === prompt.slug ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-stone-500" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>

              <AppLink to={`/prompts/${prompt.slug}`} className="block group">
                <h4 className="text-sm font-semibold text-stone-900 group-hover:text-stone-950 mb-1.5 leading-snug">
                  {prompt.title}
                </h4>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                  {prompt.useCase || prompt.description}
                </p>
              </AppLink>
            </div>

            <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs mt-2">
              <span className="text-[11px] text-stone-500 truncate max-w-[200px]">
                {prompt.compatibleTools && prompt.compatibleTools.length > 0
                  ? `Compatible : ${prompt.compatibleTools.slice(0, 2).join(', ')}`
                  : 'Modèles LLM'}
              </span>
              <AppLink 
                to={`/prompts/${prompt.slug}`}
                className="text-[11px] font-medium text-stone-900 hover:underline flex items-center gap-1"
              >
                Tester les variables <ArrowRight className="w-3 h-3" />
              </AppLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowRight, Wrench, CheckCircle2 } from 'lucide-react';
import { ToolItem } from '../../types';
import { AppLink } from '../common/AppLink';

interface RelatedToolsProps {
  tools: ToolItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({
  tools,
  title = 'Outils IA associés',
  subtitle = 'Découvrez les technologies d\'intelligence artificielle connectées à ce contenu.',
  className = ''
}) => {
  if (!tools || tools.length === 0) return null;

  return (
    <div className={`my-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-stone-700" />
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <AppLink 
          to="/outils" 
          className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1 hover:underline"
        >
          Tous les outils <ArrowRight className="w-3 h-3" />
        </AppLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <AppLink
            key={tool.id || tool.slug}
            to={`/outils/${tool.slug}`}
            className="group block p-4 bg-white rounded-lg border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all"
          >
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-9 h-9 rounded flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                  style={{ backgroundColor: tool.logoBg || '#f5f5f4', color: tool.accentColor || '#1c1917' }}
                >
                  {tool.logo || tool.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-stone-950 flex items-center gap-1.5">
                    {tool.name}
                    {tool.verifiedBadge && (
                      <span title="Vérifié par la rédaction">
                        <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                      </span>
                    )}
                  </h4>
                  <span className="text-[11px] text-stone-500">{tool.category}</span>
                </div>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                {tool.pricingType || (tool.freePlan ? 'Freemium' : 'Payant')}
              </span>
            </div>

            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
              {tool.shortDescription || tool.description}
            </p>

            <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium text-[11px]">
                {tool.pricing || tool.priceStartingAt || 'Voir tarification'}
              </span>
              <span className="font-medium text-stone-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                Fiche détaillée <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </AppLink>
        ))}
      </div>
    </div>
  );
};

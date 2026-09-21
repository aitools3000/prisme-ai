import React from 'react';
import { ToolItem } from '../../types';
import { AffiliateButton } from './AffiliateButton';
import { AppLink } from '../common/AppLink';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { resolveAffiliateDestination } from './affiliateUtils';

export interface ContextualAffiliateCalloutProps {
  tool: ToolItem;
  contextNote?: string;
  className?: string;
}

export const ContextualAffiliateCallout: React.FC<ContextualAffiliateCalloutProps> = ({
  tool,
  contextNote,
  className = ''
}) => {
  const destination = resolveAffiliateDestination({
    affiliateUrl: tool.affiliateUrl,
    websiteUrl: tool.websiteUrl,
    affiliateEnabled: tool.affiliateEnabled
  });

  return (
    <aside
      aria-label={`Ressource complémentaire : ${tool.name}`}
      className={`my-8 p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200/90 shadow-2xs space-y-4 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm text-stone-800 border border-stone-200 shrink-0"
            style={{ backgroundColor: tool.logoBg || '#f5f5f4' }}
          >
            {tool.logo || tool.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">
                Outil mentionné
              </span>
              {tool.verifiedBadge && (
                <span className="inline-flex items-center gap-1 text-[10px] text-stone-600 font-medium">
                  <ShieldCheck className="w-3 h-3 text-stone-500" aria-hidden="true" />
                  Testé par la rédaction
                </span>
              )}
            </div>
            <h4 className="text-base font-serif font-bold text-stone-900">
              {tool.name}
            </h4>
          </div>
        </div>

        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-stone-200/70 text-stone-700">
          {tool.pricingType}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
        {contextNote || tool.shortDescription}
      </p>

      <div className="pt-2 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <AppLink
          to={`/outils/${tool.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 hover:text-stone-950 underline group"
        >
          <span>Lire notre banc d'essai complet de {tool.name}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </AppLink>

        <AffiliateButton
          affiliateUrl={tool.affiliateUrl}
          websiteUrl={tool.websiteUrl}
          affiliateEnabled={tool.affiliateEnabled}
          label="Tester l'outil"
          size="sm"
          variant="primary"
          showDisclosureHint={false}
        />
      </div>

      {destination.isSponsored && (
        <span className="text-[10px] text-stone-400 block pt-1">
          * Lien partenaire vers l'éditeur. Prisme IA est susceptible de percevoir une commission sans aucun surcoût pour vous.
        </span>
      )}
    </aside>
  );
};


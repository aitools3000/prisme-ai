import React from 'react';
import { Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { DealItem } from '../../types';
import { AppLink } from '../common/AppLink';

interface RelatedDealsProps {
  deals: DealItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const RelatedDeals: React.FC<RelatedDealsProps> = ({
  deals,
  title = 'Bons Plans & Réductions vérifiées',
  subtitle = 'Offres testées manuellement par la rédaction avec conditions et dates de validité.',
  className = ''
}) => {
  if (!deals || deals.length === 0) return null;

  return (
    <div className={`my-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-stone-700" />
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <AppLink 
          to="/bons-plans" 
          className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1 hover:underline"
        >
          Tous les bons plans <ArrowRight className="w-3 h-3" />
        </AppLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deals.map((deal) => (
          <div
            key={deal.id || deal.slug}
            className="p-4 bg-white rounded-lg border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-semibold text-xs text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                  {deal.tool?.name || deal.toolName}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {deal.discount}
                </span>
              </div>

              <AppLink to={`/bons-plans/${deal.slug}`} className="block group">
                <h4 className="text-sm font-semibold text-stone-900 group-hover:text-stone-950 leading-snug mb-1.5">
                  {deal.title}
                </h4>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                  {deal.description || deal.offer}
                </p>
              </AppLink>
            </div>

            <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs mt-2">
              <div className="flex items-center gap-1 text-[11px] text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Vérifié le {deal.lastVerified || 'récemment'}</span>
              </div>

              {deal.couponCode || deal.promoCode ? (
                <span className="font-mono text-[11px] bg-stone-100 px-2 py-0.5 rounded border border-dashed border-stone-300 font-semibold text-stone-800">
                  {deal.couponCode || deal.promoCode}
                </span>
              ) : (
                <AppLink 
                  to={`/bons-plans/${deal.slug}`}
                  className="text-[11px] font-medium text-stone-900 hover:underline flex items-center gap-1"
                >
                  Détails de l'offre <ArrowRight className="w-3 h-3" />
                </AppLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

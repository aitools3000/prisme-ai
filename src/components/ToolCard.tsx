import React from 'react';
import { Star, ShieldCheck, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ToolItem } from '../types';
import { Badge, PriceIndicator } from './Badge';

interface ToolCardProps {
  tool: ToolItem;
  onSelect: (slug: string) => void;
  layout?: 'standard' | 'compact' | 'horizontal';
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, layout = 'standard' }) => {
  if (layout === 'horizontal') {
    return (
      <div 
        onClick={() => onSelect(tool.slug)}
        className="group relative bg-white border border-stone-200/90 rounded-lg p-5 transition-all duration-200 hover:border-stone-400/80 hover:shadow-sm cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3.5">
          <div 
            className="w-12 h-12 rounded-md flex items-center justify-center font-bold text-lg text-stone-800 shrink-0 border border-stone-200/60 transition-transform group-hover:scale-[1.02]"
            style={{ backgroundColor: tool.logoBg }}
          >
            {tool.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-stone-900 group-hover:text-blue-900 transition-colors">
                {tool.name}
              </h3>
              {tool.frenchSupport && (
                <Badge variant="french" size="sm">FR</Badge>
              )}
              {tool.verifiedBadge && (
                <span title="Testé & Vérifié par Prisme IA" className="text-blue-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            <p className="text-xs text-stone-600 line-clamp-1 mt-1 max-w-xl">
              {tool.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <PriceIndicator type={tool.pricingType} />
          <div className="flex items-center gap-1 text-xs font-semibold text-stone-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{(tool.rating ?? 4.8).toFixed(1)}</span>
          </div>
          <span className="w-7 h-7 rounded border border-stone-200 flex items-center justify-center text-stone-400 group-hover:text-blue-900 group-hover:border-blue-300 transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(tool.slug)}
      className="group relative bg-white border border-stone-200/90 rounded-lg p-5 flex flex-col justify-between h-full transition-all duration-200 hover:border-stone-400 hover:shadow-sm cursor-pointer"
    >
      <div>
        {/* Top bar with logo and status */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-md flex items-center justify-center font-bold text-base text-stone-800 border border-stone-200/60 shrink-0 transition-transform group-hover:scale-[1.03]"
              style={{ backgroundColor: tool.logoBg }}
            >
              {tool.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-stone-900 text-base group-hover:text-blue-900 transition-colors">
                  {tool.name}
                </h3>
                {tool.verifiedBadge && (
                  <span title="Testé & Vérifié par la rédaction" className="text-blue-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-500 font-medium">
                {tool.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-stone-800 bg-stone-50 px-2 py-0.5 rounded border border-stone-200/70 shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
            <span>{(tool.rating ?? 4.8).toFixed(1)}</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
          {tool.tagline || tool.shortDescription}
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.frenchSupport && (
            <Badge variant="french" size="sm">🇫🇷 Support Français</Badge>
          )}
          {(tool.tags || tool.subcategories || []).slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-[11px] font-medium text-stone-600 bg-stone-100/80 px-2 py-0.5 rounded border border-stone-200/60">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer info & CTA */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto text-xs">
        <PriceIndicator type={tool.pricingType} startingAt={tool.priceStartingAt} />

        <div className="flex items-center gap-1 font-semibold text-blue-900 group-hover:underline">
          <span>Consulter l'avis</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};

export const FeaturedToolCard: React.FC<{ tool: ToolItem; onSelect: (slug: string) => void }> = ({ tool, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(tool.slug)}
      className="relative bg-white border border-stone-300 rounded-xl p-6 sm:p-8 transition-all duration-200 hover:border-blue-900 hover:shadow-md cursor-pointer group"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              ★ Coup de cœur de la rédaction
            </span>
            <Badge variant="french" size="md">🇫🇷 Conçu en France</Badge>
            <PriceIndicator type={tool.pricingType} />
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center font-bold text-xl text-stone-900 border border-stone-300 shrink-0"
              style={{ backgroundColor: tool.logoBg }}
            >
              {tool.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-blue-900 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">
                {tool.category} • Version 2024
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-4">
            {tool.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
            {tool.features.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-800 font-bold shrink-0">✓</span>
                <span className="line-clamp-1">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-start lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-8 gap-4">
          <div className="text-left lg:text-right">
            <div className="flex items-center lg:justify-end gap-1.5 text-lg font-bold text-stone-900">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              <span>{(tool.rating ?? 4.8).toFixed(2)} / 5</span>
            </div>
            <span className="text-xs text-stone-500 block">
              Basé sur {tool.reviewCount ?? 120} avis certifiés
            </span>
          </div>

          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-stone-900 text-white font-medium text-sm hover:bg-blue-900 transition-colors cursor-pointer"
          >
            <span>Lire l'analyse complète</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Copy, Check, Sparkles, ArrowRight, Clock, ShieldCheck, Tag, ExternalLink, AlertTriangle, AlertCircle } from 'lucide-react';
import { PromptItem, ComparisonItem, DealItem, ArticleItem } from '../types';
import { Badge } from './Badge';
import { isDealExpired, copyToClipboard } from './affiliation/affiliateUtils';

export const PromptCard: React.FC<{ prompt: PromptItem; onSelect: (slug: string) => void }> = ({
  prompt,
  onSelect
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(prompt.slug)}
      className="group bg-white border border-stone-200/90 rounded-lg p-5 flex flex-col justify-between h-full transition-all duration-200 hover:border-stone-400 hover:shadow-sm cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-semibold text-blue-900">{prompt.category}</span>
          <span className="text-[11px] font-mono text-stone-500">
            {prompt.copyCount} utilisations
          </span>
        </div>

        <h3 className="font-bold text-stone-900 text-base group-hover:text-blue-900 transition-colors mb-2 line-clamp-2">
          {prompt.title}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-2 mb-3 leading-relaxed">
          {prompt.description}
        </p>

        {/* Prompt snippet preview */}
        <div className="bg-stone-50 border border-stone-200 rounded p-3 text-xs font-mono-code text-stone-700 mb-3 relative overflow-hidden max-h-24">
          <p className="line-clamp-3 text-[11px] text-stone-800">
            {prompt.promptText}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none" />
        </div>

        {/* Recommended models */}
        {((prompt.recommendedModels && prompt.recommendedModels.length > 0) || (prompt.compatibleTools && prompt.compatibleTools.length > 0)) && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-400">
              Modèles :
            </span>
            {(prompt.recommendedModels || prompt.compatibleTools || []).map((model, idx) => (
              <span key={idx} className="text-[11px] font-mono bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200/70">
                {model}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
        <span className="text-xs text-stone-500 font-medium">
          {(prompt.variables || []).length} {(prompt.variables || []).length > 1 ? 'variables personnalisables' : 'variable personnalisable'}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            type="button"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors cursor-pointer"
            title="Copier le prompt brut"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ComparisonCard: React.FC<{ comparison: ComparisonItem; onSelect: (slug: string) => void }> = ({
  comparison,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(comparison.slug)}
      className="group bg-white border border-stone-200/90 rounded-lg p-6 transition-all duration-200 hover:border-stone-400 hover:shadow-sm cursor-pointer flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
          <span className="font-semibold text-blue-900">{comparison.category}</span>
          <span className="text-[11px]">{comparison.readTime}</span>
        </div>

        <h3 className="text-lg font-bold tracking-tight text-stone-900 group-hover:text-blue-900 transition-colors mb-2">
          {comparison.title}
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-5">
          {comparison.subtitle}
        </p>

        {/* Head-to-Head Visual Blocks */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200/80 mb-4">
          <div className="text-center p-2 rounded bg-white border border-stone-200/60">
            <span className="text-xs font-semibold text-stone-900 block truncate">
              {comparison.toolA.name}
            </span>
            <div className="text-base font-bold text-blue-950 mt-0.5">
              {comparison.toolA.overallScore} <span className="text-[10px] text-stone-400 font-normal">/10</span>
            </div>
            <span className="text-[11px] text-stone-500 font-mono block truncate mt-1">
              {comparison.toolA.pricingSummary}
            </span>
          </div>

          <div className="text-center p-2 rounded bg-white border border-stone-200/60">
            <span className="text-xs font-semibold text-stone-900 block truncate">
              {comparison.toolB.name}
            </span>
            <div className="text-base font-bold text-blue-950 mt-0.5">
              {comparison.toolB.overallScore} <span className="text-[10px] text-stone-400 font-normal">/10</span>
            </div>
            <span className="text-[11px] text-stone-500 font-mono block truncate mt-1">
              {comparison.toolB.pricingSummary}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="text-xs text-stone-600 space-y-1 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-stone-800">Cas d'usage :</span>
            <span className="text-stone-700 font-medium truncate">
              {comparison.verdictByUseCase?.[0]?.useCase || (comparison.criteria && comparison.criteria[0]?.winner ? `Vainqueur : ${comparison.criteria[0]?.winner}` : 'Analyse détaillée')}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs mt-auto">
        <span className="text-stone-500">Mise à jour {comparison.date}</span>
        <span className="font-semibold text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          Voir le match complet <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

export const DealCard: React.FC<{ deal: DealItem; onSelect: (slug: string) => void }> = ({
  deal,
  onSelect
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const isExpired = isDealExpired(deal.status, deal.expiryDate || deal.validUntil);
  const isVerified = !isExpired && (deal.verified || deal.status === 'Vérifié');

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (deal.promoCode && !isExpired) {
      try {
        await copyToClipboard(deal.promoCode);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } catch {
        // Fallback handled gracefully
      }
    }
  };

  return (
    <div
      onClick={() => onSelect(deal.slug)}
      className={`group bg-white border rounded-lg p-5 transition-all duration-200 hover:border-stone-400 hover:shadow-sm cursor-pointer flex flex-col justify-between h-full ${
        isExpired ? 'border-stone-300 opacity-75' : 'border-stone-200/90'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded border font-mono ${
              isExpired
                ? 'bg-stone-100 text-stone-500 border-stone-200 line-through'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              {deal.discount}
            </span>
            <span className="text-xs font-medium text-stone-500">{deal.type}</span>
          </div>

          {isExpired ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              <AlertTriangle className="w-3 h-3 text-rose-600" aria-hidden="true" /> Expiré
            </span>
          ) : isVerified ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" aria-hidden="true" /> Vérifié
            </span>
          ) : null}
        </div>

        <h3 className="font-bold text-stone-900 text-base group-hover:text-blue-900 transition-colors mb-1.5">
          {deal.title}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
          {deal.description}
        </p>

        {deal.promoCode && !isExpired && (
          <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded border border-dashed border-stone-300 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-stone-700 font-mono font-bold">
              <Tag className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
              <span>{deal.promoCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              type="button"
              className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
              aria-label={copiedCode ? 'Code copié' : 'Copier le code'}
            >
              {copiedCode ? 'Copié !' : 'Copier'}
            </button>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs mt-auto">
        <span className="text-stone-500 flex items-center gap-1">
          <Clock className="w-3 h-3 text-stone-400" aria-hidden="true" />
          {isExpired ? `Échu : ${deal.expiryDate || 'récemment'}` : `Fin : ${deal.expiryDate || 'non précisée'}`}
        </span>

        <span className="font-semibold text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          {isExpired ? "Consulter l'archive" : "Voir l'offre"} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
};

export const ArticleCard: React.FC<{ article: ArticleItem; onSelect: (slug: string) => void }> = ({
  article,
  onSelect
}) => {
  return (
    <article
      onClick={() => onSelect(article.slug)}
      className="group bg-white border border-stone-200/90 rounded-lg p-6 flex flex-col justify-between h-full transition-all duration-200 hover:border-stone-400 hover:shadow-sm cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
          <span className="font-semibold text-blue-900 uppercase tracking-wider text-[11px]">
            {article.category}
          </span>
          <span>{article.readTime}</span>
        </div>

        <h3 className="font-bold text-lg text-stone-900 group-hover:text-blue-900 transition-colors leading-snug mb-2 font-serif-editorial">
          {article.title}
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-5">
          {article.subtitle}
        </p>
      </div>

      <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs mt-auto">
        <div className="flex items-center gap-2.5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full object-cover border border-stone-200"
          />
          <div>
            <span className="font-semibold text-stone-900 block leading-none">
              {article.author.name}
            </span>
            <span className="text-[11px] text-stone-400">
              {article.publishedAt}
            </span>
          </div>
        </div>

        <span className="font-semibold text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          Lire l'analyse <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};

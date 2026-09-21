import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, AlertCircle, Clock, ExternalLink, AlertTriangle } from 'lucide-react';
import { DealItem, DealStatus } from '../../types';
import { isDealExpired, resolveAffiliateDestination, copyToClipboard } from './affiliateUtils';

export interface CouponCodeBoxProps {
  deal?: DealItem;
  couponCode?: string;
  discount?: string;
  offerTitle?: string;
  status?: DealStatus;
  lastVerified?: string;
  expirationDate?: string;
  affiliateUrl?: string;
  websiteUrl?: string;
  affiliateEnabled?: boolean;
  terms?: string[];
  eligibility?: string;
  className?: string;
}

export const CouponCodeBox: React.FC<CouponCodeBoxProps> = ({
  deal,
  couponCode: propCouponCode,
  discount: propDiscount,
  offerTitle: propOfferTitle,
  status: propStatus,
  lastVerified: propLastVerified,
  expirationDate: propExpirationDate,
  affiliateUrl: propAffiliateUrl,
  websiteUrl: propWebsiteUrl,
  affiliateEnabled: propAffiliateEnabled,
  terms: propTerms,
  eligibility: propEligibility,
  className = ''
}) => {
  const couponCode = propCouponCode ?? deal?.couponCode ?? deal?.promoCode;
  const discount = propDiscount ?? deal?.discount;
  const offerTitle = propOfferTitle ?? deal?.title ?? deal?.offer;
  const rawStatus: DealStatus | undefined = propStatus ?? deal?.status;
  const lastVerified = propLastVerified ?? deal?.lastVerified;
  const expirationDate = propExpirationDate ?? deal?.expirationDate ?? deal?.expiryDate ?? deal?.validUntil;
  const affiliateUrl = propAffiliateUrl ?? deal?.affiliateUrl ?? deal?.dealUrl;
  const websiteUrl = propWebsiteUrl ?? (deal?.tool as { websiteUrl?: string })?.websiteUrl;
  const affiliateEnabled = propAffiliateEnabled ?? deal?.affiliateEnabled ?? false;
  const terms = propTerms ?? deal?.terms ?? [];
  const eligibility = propEligibility ?? deal?.eligibility;

  // Prudent expiration check based on status and exploitable expiration date
  const isExpired = isDealExpired(rawStatus, expirationDate);

  // Verification status: only verified if explicitly backed by data and NOT expired
  const isVerified = !isExpired && (rawStatus === 'Vérifié' || Boolean(deal?.verified));
  const isUnverified = !isExpired && (rawStatus === 'Non vérifié' || (!isVerified && Boolean(deal && !deal.verified)));

  // Resolve external destination safely
  const destination = resolveAffiliateDestination({
    affiliateUrl,
    websiteUrl,
    affiliateEnabled
  });

  // Async copy state management
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopy = async () => {
    if (!couponCode || isExpired) return;

    try {
      await copyToClipboard(couponCode);
      setCopyState('copied');
      setErrorMessage(null);
      setTimeout(() => {
        setCopyState('idle');
      }, 2500);
    } catch {
      setCopyState('error');
      setErrorMessage('Impossible de copier automatiquement le code. Vous pouvez le sélectionner manuellement.');
      setTimeout(() => {
        setCopyState('idle');
        setErrorMessage(null);
      }, 4000);
    }
  };

  return (
    <div className={`rounded-xl border transition-all ${
      isExpired 
        ? 'bg-stone-50 border-stone-300 opacity-80' 
        : 'bg-white border-stone-200 shadow-2xs'
    } p-5 sm:p-6 space-y-4 ${className}`}>
      {/* Header status bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {discount && (
            <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded border ${
              isExpired 
                ? 'bg-stone-200 text-stone-600 border-stone-300 line-through' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              {discount}
            </span>
          )}

          {isExpired && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
              Offre expirée
            </span>
          )}

          {!isExpired && isVerified && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              Offre vérifiée
            </span>
          )}

          {!isExpired && isUnverified && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
              Vérification en cours
            </span>
          )}
        </div>

        {lastVerified && (
          <span className="text-[11px] text-stone-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-400" aria-hidden="true" />
            Dernière vérification le {lastVerified}
          </span>
        )}
      </div>

      {/* Offer Title if specified */}
      {offerTitle && (
        <h3 className={`font-serif font-bold text-base sm:text-lg ${isExpired ? 'text-stone-600' : 'text-stone-900'}`}>
          {offerTitle}
        </h3>
      )}

      {/* Coupon copy row */}
      {couponCode && !isExpired && (
        <div className="p-3.5 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block">
              {isVerified ? 'Code promo vérifié à renseigner au panier :' : 'Code promotionnel à renseigner au panier :'}
            </span>
            <span className="text-base font-mono font-extrabold text-stone-900 select-all tracking-wider">
              {couponCode}
            </span>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <button
              type="button"
              onClick={handleCopy}
              disabled={copyState === 'copied'}
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                copyState === 'copied'
                  ? 'bg-emerald-700 text-white cursor-default'
                  : copyState === 'error'
                  ? 'bg-rose-700 text-white hover:bg-rose-800'
                  : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
              }`}
              aria-live="polite"
              aria-label={
                copyState === 'copied'
                  ? 'Code promo copié dans le presse-papier'
                  : copyState === 'error'
                  ? 'Erreur lors de la copie du code promo'
                  : 'Copier le code promo'
              }
            >
              {copyState === 'copied' ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copié dans le presse-papier !</span>
                </>
              ) : copyState === 'error' ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Erreur de copie</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copier le code</span>
                </>
              )}
            </button>
            {errorMessage && (
              <p role="alert" className="text-[11px] text-rose-600 mt-1 max-w-xs text-left sm:text-right">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      )}

      {/* If expired note */}
      {isExpired && (
        <div className="p-3 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Cette promotion a expiré{expirationDate ? ` le ${expirationDate}` : ''}. Nous la conservons à titre d'archive comparative mais ce code n'est plus garanti applicable.
          </span>
        </div>
      )}

      {/* Eligibility & Expiration */}
      <div className="space-y-2 text-xs text-stone-600 pt-1">
        {eligibility && (
          <p>
            <strong className="text-stone-800">Éligibilité :</strong> {eligibility}
          </p>
        )}
        {expirationDate && !isExpired && (
          <p className="flex items-center gap-1 text-stone-500">
            <Clock className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
            <span>Échéance annoncée : <strong>{expirationDate}</strong></span>
          </p>
        )}
      </div>

      {/* Terms & Conditions list when available */}
      {terms && terms.length > 0 && (
        <div className="pt-2 border-t border-stone-100 text-xs text-stone-600 space-y-1">
          <span className="font-semibold text-stone-700 block text-[11px] uppercase tracking-wider">
            Conditions d'application :
          </span>
          <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-stone-500">
            {terms.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action CTA according to real destination and status */}
      {!isExpired && (
        <div className="pt-2">
          {destination.isAvailable && destination.url ? (
            <>
              <a
                href={destination.url}
                target="_blank"
                rel={destination.rel}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                aria-label={
                  destination.destinationType === 'affiliate'
                    ? "Profiter de l'offre partenaire (ouvre le site officiel de l'éditeur dans un nouvel onglet)"
                    : "Accéder au site officiel de l'éditeur (ouvre dans un nouvel onglet)"
                }
              >
                <span>
                  {destination.destinationType === 'affiliate'
                    ? "Profiter de l'offre partenaire"
                    : "Accéder au site officiel de l'éditeur"}
                </span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <span className="text-[10px] text-stone-400 block text-center mt-1.5">
                {destination.destinationType === 'affiliate'
                  ? "Lien partenaire rémunéré vers l'éditeur • Sans surcoût pour vous"
                  : "Lien direct vers le site officiel de l'éditeur"}
              </span>
            </>
          ) : (
            <button
              type="button"
              disabled
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-100 text-stone-400 text-xs font-semibold rounded-lg border border-stone-200 cursor-not-allowed"
              title="Lien vers l'offre actuellement indisponible"
            >
              <span>Lien vers l'offre actuellement indisponible</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};


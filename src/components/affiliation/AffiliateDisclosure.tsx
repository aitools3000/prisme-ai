import React, { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export interface AffiliateDisclosureProps {
  variant?: 'banner' | 'card' | 'inline' | 'compact';
  className?: string;
}

/**
 * Editorial Affiliate Disclosure
 * Provides transparent, clear compliance text adhering to French consumer law and ethical guidelines.
 * Avoids unsubstantiated absolute claims and keeps presentation clear and non-intrusive.
 */
export const AffiliateDisclosure: React.FC<AffiliateDisclosureProps> = ({
  variant = 'card',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'inline') {
    return (
      <div className={`text-[11px] text-stone-500 leading-relaxed flex items-start gap-1.5 ${className}`}>
        <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <strong>Transparence :</strong> Certains liens vers les éditeurs sont des liens affiliés. Cela soutient notre rédaction sans aucun surcoût pour vous ni conditionnement de nos avis.
        </span>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <aside
        aria-label="Note de transparence éditoriale"
        className={`bg-stone-100/80 border-y border-stone-200 py-2.5 px-4 text-xs text-stone-600 flex items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
          <ShieldCheck className="w-4 h-4 text-stone-500 shrink-0" aria-hidden="true" />
          <span>
            <strong>Transparence éditoriale :</strong> Les liens signalés comme partenaires peuvent donner lieu à une rémunération, sans aucun frais supplémentaire pour vous.
          </span>
        </div>
      </aside>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1 ${className}`}>
        <div className="flex items-center gap-1.5 font-medium text-stone-800">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-600" aria-hidden="true" />
          <span>Démarche éditoriale</span>
        </div>
        <p className="text-[11px] text-stone-500 leading-normal">
          Nos synthèses sont établies selon nos grilles de lecture. Les commissions d'affiliation perçues via certains liens partenaires ne dictent pas nos observations.
        </p>
      </div>
    );
  }

  // Default 'card' variant
  return (
    <div className={`p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-stone-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-stone-700" aria-hidden="true" />
          Transparence & Déontologie éditoriale
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
        >
          {isOpen ? 'Masquer les détails' : 'En savoir plus'}
        </button>
      </div>
      <p className="text-xs text-stone-600 leading-relaxed font-normal">
        Pour maintenir un accès libre sans publicité intrusive, certains liens vers les solutions d'IA sont des liens partenaires. Si vous souscrivez via ces liens, nous pouvons percevoir une commission, sans aucun surcoût sur votre tarif.
      </p>
      {isOpen && (
        <div className="pt-2 border-t border-stone-200 text-xs text-stone-600 space-y-1.5 mt-2 animate-fadeIn">
          <p>
            <strong>Nos principes de fonctionnement :</strong>
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[11px] text-stone-500">
            <li>L'analyse des fonctionnalités et limites relevées reste sous la responsabilité éditoriale de la rédaction.</li>
            <li>Les promotions et codes de réduction font l'objet d'un suivi avec indication de la date de vérification constatée.</li>
            <li>Les outils open source et formules gratuites sont documentés au même titre que les offres payantes.</li>
          </ul>
        </div>
      )}
    </div>
  );
};


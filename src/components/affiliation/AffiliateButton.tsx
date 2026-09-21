import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { resolveAffiliateDestination } from './affiliateUtils';

export interface AffiliateButtonProps {
  /** Explicit affiliate URL (used only when affiliateEnabled is true) */
  affiliateUrl?: string;
  /** Direct neutral official website URL */
  websiteUrl?: string;
  /** Legacy single URL fallback for backwards compatibility */
  url?: string;
  /** Whether affiliate tracking is authorized for this entity */
  affiliateEnabled?: boolean;
  /** Button label */
  label?: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
  /** Whether to show small disclosure text under the button */
  showDisclosureHint?: boolean;
  /** Whether to display arrow icon */
  showIcon?: boolean;
}

/**
 * Reusable, transparent Affiliate & External Action Button
 * Enforces correct rel="sponsored noopener noreferrer" when affiliateEnabled is true AND affiliateUrl is valid,
 * or rel="noopener noreferrer" for standard links.
 * Never redirects to an affiliate URL when affiliateEnabled is false.
 * Never generates broken links if URL is missing or protocol is unsafe.
 */
export const AffiliateButton: React.FC<AffiliateButtonProps> = ({
  affiliateUrl,
  websiteUrl,
  url,
  affiliateEnabled = false,
  label,
  variant = 'primary',
  size = 'md',
  className = '',
  showDisclosureHint = false,
  showIcon = true
}) => {
  const destination = resolveAffiliateDestination({
    affiliateUrl,
    websiteUrl,
    legacyUrl: url,
    affiliateEnabled
  });

  const effectiveLabel = label || destination.defaultLabel;

  // Base styling per variant
  const variantStyles = {
    primary: 'bg-stone-900 text-white hover:bg-stone-800 border border-stone-900 shadow-2xs',
    secondary: 'bg-stone-100 text-stone-900 hover:bg-stone-200 border border-stone-200',
    outline: 'bg-white text-stone-800 hover:bg-stone-50 border border-stone-300 hover:border-stone-400',
    ghost: 'bg-transparent text-stone-700 hover:bg-stone-100 border border-transparent'
  }[variant];

  // Sizing
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2.5 gap-2',
    lg: 'text-sm sm:text-base px-6 py-3 gap-2.5 font-semibold'
  }[size];

  if (!destination.isAvailable || !destination.url) {
    return (
      <button
        type="button"
        disabled
        className={`inline-flex items-center justify-center rounded-lg opacity-60 cursor-not-allowed bg-stone-100 text-stone-400 border border-stone-200 ${sizeStyles} ${className}`}
        title="Lien actuellement indisponible"
      >
        <span>Lien indisponible</span>
      </button>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <a
        href={destination.url}
        target="_blank"
        rel={destination.rel}
        className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 outline-hidden cursor-pointer ${variantStyles} ${sizeStyles} ${className}`}
        aria-label={`${effectiveLabel} (ouvre dans un nouvel onglet)`}
      >
        <span>{effectiveLabel}</span>
        {showIcon && (
          <ArrowUpRight className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} aria-hidden="true" />
        )}
      </a>

      {showDisclosureHint && destination.isSponsored && (
        <span className="text-[10px] text-stone-500 flex items-center gap-1 font-normal">
          <ShieldCheck className="w-3 h-3 text-stone-400" aria-hidden="true" />
          Lien partenaire rémunéré (sans surcoût pour vous)
        </span>
      )}
    </div>
  );
};


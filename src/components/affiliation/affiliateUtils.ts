import { DealStatus } from '../../types';

export interface ResolveDestinationOptions {
  affiliateUrl?: string | null;
  websiteUrl?: string | null;
  /** Legacy single URL fallback for backwards compatibility */
  legacyUrl?: string | null;
  affiliateEnabled?: boolean;
}

export interface ResolvedDestination {
  /** The sanitized, safe HTTP/HTTPS URL or null if absent/invalid */
  url: string | null;
  /** Strictly true only if affiliateEnabled is true AND affiliateUrl is valid */
  isSponsored: boolean;
  /** True if a valid HTTP/HTTPS destination is reachable */
  isAvailable: boolean;
  /** Security and SEO rel tag */
  rel: 'sponsored noopener noreferrer' | 'noopener noreferrer';
  /** Recommended fallback label */
  defaultLabel: string;
  /** Destination classification */
  destinationType: 'affiliate' | 'official' | 'none';
}

/**
 * Validates that an input URL is a non-empty string using only HTTP or HTTPS protocol.
 * Rejects javascript:, data:, file:, anchor (#), and malformed strings.
 */
export function isValidHttpUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#' || trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('file:')) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.hostname.length > 0;
  } catch {
    return false;
  }
}

/**
 * Returns a sanitized HTTP/HTTPS URL string, or null if invalid.
 */
export function sanitizeHttpUrl(url?: string | null): string | null {
  if (!isValidHttpUrl(url)) return null;
  return url!.trim();
}

/**
 * Resolves the destination URL strictly enforcing ethical affiliate boundaries:
 * 1. When affiliateEnabled is false: NEVER returns an affiliate URL. Returns the official websiteUrl if valid, or null.
 * 2. When affiliateEnabled is true: Returns affiliateUrl if valid (rel="sponsored noopener noreferrer").
 *    If affiliateUrl is missing or invalid, falls back to neutral websiteUrl (rel="noopener noreferrer").
 * 3. Never returns broken or unsafe protocols.
 */
export function resolveAffiliateDestination(options: ResolveDestinationOptions): ResolvedDestination {
  const { affiliateUrl, websiteUrl, legacyUrl, affiliateEnabled = false } = options;

  const validWebsite = sanitizeHttpUrl(websiteUrl);

  if (affiliateEnabled) {
    // Affiliate is enabled: try affiliate candidate
    const candidateAffiliate = sanitizeHttpUrl(affiliateUrl || legacyUrl);

    if (candidateAffiliate) {
      return {
        url: candidateAffiliate,
        isSponsored: true,
        isAvailable: true,
        rel: 'sponsored noopener noreferrer',
        defaultLabel: "Accéder à l'offre partenaire",
        destinationType: 'affiliate'
      };
    }

    // Fallback to neutral official site if affiliate URL is missing or invalid
    if (validWebsite) {
      return {
        url: validWebsite,
        isSponsored: false,
        isAvailable: true,
        rel: 'noopener noreferrer',
        defaultLabel: "Accéder au site officiel",
        destinationType: 'official'
      };
    }

    return {
      url: null,
      isSponsored: false,
      isAvailable: false,
      rel: 'noopener noreferrer',
      defaultLabel: "Lien indisponible",
      destinationType: 'none'
    };
  }

  // Affiliate is disabled: STRICT RULE -> NEVER redirect to an affiliate URL
  // Only use official websiteUrl
  if (validWebsite) {
    return {
      url: validWebsite,
      isSponsored: false,
      isAvailable: true,
      rel: 'noopener noreferrer',
      defaultLabel: "Accéder au site officiel",
      destinationType: 'official'
    };
  }

  // If legacyUrl was passed and no explicit affiliateUrl was defined, check if legacyUrl is valid
  // ONLY if legacyUrl is not known to be an affiliate URL
  if (!affiliateUrl && legacyUrl && sanitizeHttpUrl(legacyUrl)) {
    const safeLegacy = sanitizeHttpUrl(legacyUrl);
    if (safeLegacy) {
      return {
        url: safeLegacy,
        isSponsored: false,
        isAvailable: true,
        rel: 'noopener noreferrer',
        defaultLabel: "Accéder au site officiel",
        destinationType: 'official'
      };
    }
  }

  return {
    url: null,
    isSponsored: false,
    isAvailable: false,
    rel: 'noopener noreferrer',
    defaultLabel: "Lien indisponible",
    destinationType: 'none'
  };
}

const FRENCH_MONTHS: Record<string, number> = {
  janvier: 0,
  février: 1,
  fevrier: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  aout: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11,
  decembre: 11
};

/**
 * Attempts to parse an expiration date string prudently.
 * Returns a valid Date object set to the end of that day, or null if the date is absent, permanent, or unparseable.
 */
export function parseExpirationDate(dateStr?: string | null): Date | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const trimmed = dateStr.trim().toLowerCase();
  if (!trimmed) return null;

  // Words that indicate non-expiring permanent offers
  if (
    trimmed.includes('permanent') ||
    trimmed.includes('illimité') ||
    trimmed.includes('illimite') ||
    trimmed.includes('en cours') ||
    trimmed.includes('toujours')
  ) {
    return null;
  }

  // 1. Check French textual format: e.g. "31 décembre 2024" or "15 septembre 2024"
  const frenchMatch = trimmed.match(/^(\d{1,2})\s+([a-zA-ZÀ-ÿ]+)\s+(\d{4})$/);
  if (frenchMatch) {
    const day = parseInt(frenchMatch[1], 10);
    const monthName = frenchMatch[2].toLowerCase();
    const year = parseInt(frenchMatch[3], 10);

    if (monthName in FRENCH_MONTHS && day >= 1 && day <= 31 && year >= 2000 && year <= 2100) {
      const month = FRENCH_MONTHS[monthName];
      const parsed = new Date(year, month, day, 23, 59, 59, 999);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
  }

  // 2. Check ISO format YYYY-MM-DD
  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    const parsed = new Date(year, month, day, 23, 59, 59, 999);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  // 3. Check European format DD/MM/YYYY or DD.MM.YYYY
  const euroMatch = trimmed.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (euroMatch) {
    const day = parseInt(euroMatch[1], 10);
    const month = parseInt(euroMatch[2], 10) - 1;
    const year = parseInt(euroMatch[3], 10);
    const parsed = new Date(year, month, day, 23, 59, 59, 999);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  // 4. Standard Date.parse attempt as fallback
  const timestamp = Date.parse(trimmed);
  if (!isNaN(timestamp)) {
    return new Date(timestamp);
  }

  return null;
}

/**
 * Determines whether a deal is expired based on explicit status or exploitable expiration date.
 * Never invents validity if date is absent or unparseable.
 */
export function isDealExpired(status?: DealStatus | string, expirationDate?: string | null): boolean {
  if (status === 'Expiré') {
    return true;
  }

  if (expirationDate) {
    const parsed = parseExpirationDate(expirationDate);
    if (parsed !== null) {
      return parsed.getTime() < Date.now();
    }
  }

  return false;
}

/**
 * Asynchronously copies text to clipboard with fallback.
 * Returns true on success, throws Error on failure.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) {
    throw new Error('Aucun code à copier.');
  }

  // Modern navigator.clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    await navigator.clipboard.writeText(text);
    return true;
  }

  // Fallback for environments where clipboard API is unavailable
  if (typeof document !== 'undefined') {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) return true;
    } catch {
      document.body.removeChild(textArea);
      throw new Error('Échec de la commande de copie.');
    }
  }

  throw new Error('API presse-papier indisponible.');
}

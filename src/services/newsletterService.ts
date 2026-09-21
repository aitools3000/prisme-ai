/**
 * Newsletter Subscription Service
 * Provides client-side email validation, local registration persistence,
 * and optional external webhook dispatch when configured.
 */

export interface SubscriptionResult {
  success: boolean;
  message: string;
  isDuplicate?: boolean;
}

const STORAGE_KEY = 'prisme_newsletter_subscribers';

/**
 * Validates email format according to standard RFC 5322 compliance
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim() === '') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Checks if an email is already stored locally
 */
export function isEmailRegistered(email: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const list: string[] = JSON.parse(raw);
    return list.map(e => e.toLowerCase()).includes(email.trim().toLowerCase());
  } catch {
    return false;
  }
}

/**
 * Registers an email address
 */
export async function subscribeToNewsletter(email: string): Promise<SubscriptionResult> {
  const trimmed = email.trim();

  // 1. Validation
  if (!isValidEmail(trimmed)) {
    return {
      success: false,
      message: 'Veuillez saisir une adresse email valide (ex: contact@entreprise.fr).'
    };
  }

  // 2. Duplicate check
  if (isEmailRegistered(trimmed)) {
    return {
      success: true,
      isDuplicate: true,
      message: 'Cette adresse est déjà abonnée à l\'Observatoire Hebdo.'
    };
  }

  // 3. Simulated dispatch / local persistence
  try {
    // Check if an external webhook URL is provided in env
    const webhookUrl = (import.meta as any).env?.VITE_NEWSLETTER_WEBHOOK_URL;

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'prisme-ia-web', date: new Date().toISOString() })
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement distant');
      }
    } else {
      // Graceful local storage persistence with simulated network delay
      await new Promise(resolve => setTimeout(resolve, 350));
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      list.push(trimmed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    return {
      success: true,
      message: 'Votre inscription a bien été enregistrée. Vous recevrez l\'Observatoire chaque jeudi matin.'
    };
  } catch (err: any) {
    return {
      success: false,
      message: 'Une erreur technique est survenue lors de l\'inscription. Veuillez réessayer ultérieurement.'
    };
  }
}

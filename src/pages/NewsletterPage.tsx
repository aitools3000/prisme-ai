import React, { useState } from 'react';
import { Breadcrumbs } from '../components/SectionHeader';
import { Mail, Check, ShieldCheck, Sparkles, BookOpen, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { subscribeToNewsletter } from '../services/newsletterService';

export const NewsletterPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Veuillez saisir votre adresse email.');
      return;
    }

    setIsSubmitting(true);
    const res = await subscribeToNewsletter(email);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage(res.message);
    } else {
      setErrorMessage(res.message);
    }
  };

  const pastIssues = [
    {
      number: '42',
      date: '19 septembre 2024',
      title: 'Mistral Large 2 en entreprise, Flux.1 vs Midjourney, et le guide complet du RAG souverain',
      topic: 'Modèles & RAG'
    },
    {
      number: '41',
      date: '12 septembre 2024',
      title: 'Claude 3.5 Sonnet domine le code : notre benchmark de 40 projets web réels',
      topic: 'Benchmark Code'
    },
    {
      number: '40',
      date: '05 septembre 2024',
      title: 'L\'AI Act européen entre en vigueur : impacts immédiats sur les PME françaises',
      topic: 'Régulation & Droit'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SEOHead
        title="L'Observatoire Hebdo — Newsletter Veille IA Indépendante | Prisme IA"
        description="Recevez chaque jeudi à 8h00 la sélection des meilleurs outils d'IA vérifiés, un prompt testé et un décryptage stratégique indépendant."
        canonicalPath="/newsletter"
      />

      <Breadcrumbs items={[{ label: 'Newsletter' }]} onNavigate={onNavigate} />

      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>La lettre hebdomadaire de Prisme IA</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
          L'Observatoire Hebdo
        </h1>

        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Chaque jeudi matin à 8h00, recevez 5 minutes de veille à haute valeur ajoutée. 3 outils vérifiés, 1 décryptage sans concessions, 1 prompt opérationnel et aucun publireportage masqué.
        </p>
      </div>

      {/* Subscription Card */}
      <div className="bg-white border border-stone-300 rounded-2xl p-6 sm:p-10 shadow-xs max-w-2xl mx-auto">
        {successMessage ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950">
              Inscription confirmée avec succès !
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
              {successMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="newsletter-email" className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Votre adresse email professionnelle
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="prenom.nom@entreprise.fr"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 text-sm focus:outline-hidden focus:border-stone-900 bg-stone-50 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-lg bg-stone-900 hover:bg-blue-900 text-white font-semibold text-sm transition-colors shrink-0 cursor-pointer shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Inscription...' : "S'abonner gratuitement"}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garanti sans spam ni revente d'adresse • Désabonnement instantané en 1 clic • Conforme RGPD</span>
            </div>
          </form>
        )}
      </div>

      {/* What you get */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <span className="text-lg">🎯</span>
          <h3 className="font-bold text-stone-900 text-sm">3 Outils décortiqués</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Nous testons 20+ outils par semaine pour n'en retenir que les 3 qui valent réellement votre temps.
          </p>
        </div>

        <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <span className="text-lg">💡</span>
          <h3 className="font-bold text-stone-900 text-sm">1 Prompt de haut niveau</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Une formule éprouvée prête à l'emploi avec ses variables pour automatiser une tâche récurrente.
          </p>
        </div>

        <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <span className="text-lg">🔍</span>
          <h3 className="font-bold text-stone-900 text-sm">Analyse sans complaisance</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Décryptage critique des annonces de la Silicon Valley et de l'écosystème français.
          </p>
        </div>
      </div>

      {/* Past issues preview */}
      <section className="space-y-4 pt-6">
        <h2 className="text-xl font-bold tracking-tight text-stone-900">
          Consulter les dernières éditions parues
        </h2>

        <div className="space-y-3">
          {pastIssues.map(issue => (
            <div key={issue.number} className="bg-white border border-stone-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span className="font-mono font-bold text-stone-900">Édition #{issue.number}</span>
                  <span>•</span>
                  <span>{issue.date}</span>
                </div>
                <h4 className="font-semibold text-sm text-stone-900">
                  {issue.title}
                </h4>
              </div>
              <span className="text-xs text-stone-500 font-medium px-2.5 py-1 rounded bg-stone-100 border border-stone-200 shrink-0">
                {issue.topic}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

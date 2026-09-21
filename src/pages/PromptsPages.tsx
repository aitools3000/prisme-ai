import React, { useState, useMemo } from 'react';
import { PROMPTS } from '../data/mockData';
import { PromptCard } from '../components/EditorialCards';
import { Breadcrumbs } from '../components/linking/Breadcrumbs';
import { ContextualInternalLinks } from '../components/linking/ContextualInternalLinks';
import { Copy, Check, Sparkles, Sliders, ArrowRight, Lightbulb, HelpCircle } from 'lucide-react';
import { PromptItem } from '../types';
import { AppLink } from '../components/common/AppLink';
import { getCategoryInfo } from '../services/relationshipEngine';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema, buildFAQSchema } from '../services/seoEngine';

export const PromptsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = ['all', 'Texte & Rédaction', 'Vidéo & Animation', 'SEO & Contenu', 'Image & Design', 'Productivité'];

  const filtered = PROMPTS.filter(p => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Bibliothèque de Prompts IA Professionnels | Prisme IA"
        description="Instructions et prompts avancés testés pour Claude, GPT-4, Mistral et Midjourney. Personnalisez vos variables et copiez directement."
        canonicalPath="/prompts"
      />

      <Breadcrumbs items={[{ label: 'Prompts' }]} />

      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
          Bibliothèque de prompts professionnels
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
          Des instructions calibrées pour Claude, Mistral, GPT-4, Revid et Midjourney. Fini les réponses génériques : nos prompts sont testés en conditions réelles de production.
        </p>
      </div>

      {/* Categories filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors whitespace-nowrap ${
              selectedCat === cat
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {cat === 'all' ? 'Toutes les catégories' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(prompt => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onSelect={(slug) => onNavigate(`/prompts/${slug}`)}
          />
        ))}
      </div>
    </div>
  );
};

export const PromptDetailPage: React.FC<{ slug: string; onNavigate: (path: string) => void }> = ({
  slug,
  onNavigate
}) => {
  const prompt = PROMPTS.find(p => p.slug === slug) || PROMPTS[0];
  const categoryInfo = getCategoryInfo(prompt.category);

  // Variables state for live interactive substitution
  const [variablesState, setVariablesState] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    (prompt.variables || []).forEach(v => {
      initial[v.key] = v.defaultValue;
    });
    return initial;
  });

  const [copied, setCopied] = useState(false);

  // Compute live compiled text
  const compiledPromptText = useMemo(() => {
    let text = prompt.promptText;
    (prompt.variables || []).forEach(v => {
      const val = variablesState[v.key] || `{${v.key}}`;
      text = text.replaceAll(`{${v.key}}`, val);
    });
    return text;
  }, [prompt, variablesState]);

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const breadcrumbs = [
    { label: 'Prompts', href: '/prompts' },
    { label: categoryInfo ? categoryInfo.name : prompt.category, href: categoryInfo ? `/outils/categorie/${categoryInfo.slug}` : `/outils` },
    { label: prompt.title }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || `/prompts/${prompt.slug}` }))),
    ...(prompt.faq && prompt.faq.length > 0 ? [buildFAQSchema(prompt.faq)] : [])
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title={`${prompt.title} — Prompt IA Professionnel | Prisme IA`}
        description={prompt.instructions || (prompt.compatibleTools && prompt.compatibleTools.length > 0 ? `Prompt calibré pour ${prompt.compatibleTools.join(', ')} : instructions professionnelles et variables éditables.` : 'Prompt professionnel avec variables dynamiques.')}
        canonicalPath={`/prompts/${prompt.slug}`}
        structuredData={structuredData}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-3 text-xs flex-wrap">
          {categoryInfo ? (
            <AppLink
              to={`/outils/categorie/${categoryInfo.slug}`}
              className="font-semibold text-stone-800 hover:text-stone-950 uppercase tracking-wider underline"
            >
              {prompt.category}
            </AppLink>
          ) : (
            <span className="font-semibold text-stone-800 uppercase tracking-wider">
              {prompt.category}
            </span>
          )}
          <span>•</span>
          <span className="text-stone-500">{prompt.copyCount || 1500} utilisations</span>
          <span>•</span>
          <span className="text-stone-500">Auteur : {prompt.author}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
          {prompt.title}
        </h1>

        <p className="text-base text-stone-600 leading-relaxed font-normal">
          {prompt.description}
        </p>

        {/* Recommended models */}
        <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
          <span className="font-medium text-stone-500">Outils & Modèles compatibles :</span>
          {(prompt.compatibleTools || prompt.recommendedModels || []).map((model, i) => (
            <span key={i} className="font-mono bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200">
              {model}
            </span>
          ))}
        </div>
      </header>

      {/* Interactive Variable Customizer */}
      {prompt.variables && prompt.variables.length > 0 && (
        <section className="bg-white border border-stone-300 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-stone-800" />
              <h2 className="font-bold text-stone-900 text-sm">
                Personnaliser les variables du prompt
              </h2>
            </div>
            <span className="text-xs text-stone-500">
              {prompt.variables.length} champ(s) modifiable(s)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {prompt.variables.map(v => (
              <div key={v.key} className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <span className="font-mono text-stone-900">[{v.key}]</span>
                  <span>{v.label}</span>
                </label>
                <textarea
                  rows={2}
                  value={variablesState[v.key] || ''}
                  onChange={(e) => setVariablesState({ ...variablesState, [v.key]: e.target.value })}
                  placeholder={v.placeholder}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:border-stone-900"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Live Result & Copy */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
            Prompt prêt à copier
          </h2>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copié dans le presse-papiers !</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copier le prompt personnalisé</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-stone-900 text-stone-100 rounded-xl p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap selection:bg-stone-700">
          {compiledPromptText}
        </div>
      </section>

      {/* Best Practices */}
      {prompt.bestPractices && prompt.bestPractices.length > 0 && (
        <section className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-2">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            Recommandations d'exécution
          </h3>
          <ul className="space-y-1.5 text-xs text-stone-600">
            {prompt.bestPractices.map((bp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-bold text-stone-400 shrink-0">•</span>
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ if available */}
      {prompt.faq && prompt.faq.length > 0 && (
        <section className="bg-white border border-stone-200 rounded-xl p-6">
          <h3 className="font-serif font-bold text-stone-900 text-lg mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-stone-700" />
            Questions fréquentes sur ce prompt
          </h3>
          <div className="divide-y divide-stone-200">
            {prompt.faq.map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <h4 className="text-sm font-bold text-stone-900 mb-1">{item.question}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contextual Internal Linking Engine */}
      <ContextualInternalLinks entity={prompt} />
    </div>
  );
};

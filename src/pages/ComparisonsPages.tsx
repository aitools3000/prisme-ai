import React from 'react';
import { COMPARISONS } from '../data/mockData';
import { ComparisonCard } from '../components/EditorialCards';
import { Breadcrumbs } from '../components/linking/Breadcrumbs';
import { ContextualInternalLinks } from '../components/linking/ContextualInternalLinks';
import { Scale, Check, X, ArrowRight, HelpCircle, ShieldCheck, Zap } from 'lucide-react';
import { ComparisonItem } from '../types';
import { AppLink } from '../components/common/AppLink';
import { getCategoryInfo, getToolBySlug } from '../services/relationshipEngine';
import { SEOHead } from '../components/seo/SEOHead';
import { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '../services/seoEngine';
import { AffiliateButton, AffiliateDisclosure } from '../components/affiliation';

export const ComparisonsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Comparatifs d'Outils IA : Bancs d'Essai Impartiaux | Prisme IA"
        description="Analyses face-à-face objectives d'outils d'intelligence artificielle : critères techniques, performances, tarifs et recommandations par cas d'usage."
        canonicalPath="/comparatifs"
      />

      <Breadcrumbs items={[{ label: 'Comparatifs' }]} />

      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
          Comparatifs & Bancs d'essai objectifs
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
          Analyses face-à-face structurées par cas d'usage réels et compromis techniques. Nous refusons les notes globales arbitraires pour vous aider à choisir l'outil adapté à votre besoin précis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {COMPARISONS.map(comp => (
          <ComparisonCard
            key={comp.id}
            comparison={comp}
            onSelect={(slug) => onNavigate(`/comparatifs/${slug}`)}
          />
        ))}
      </div>
    </div>
  );
};

export const ComparisonDetailPage: React.FC<{ slug: string; onNavigate: (path: string) => void }> = ({
  slug,
  onNavigate
}) => {
  const comp = COMPARISONS.find(c => c.slug === slug) || COMPARISONS[0];
  const categoryInfo = getCategoryInfo(comp.category);
  const toolAEntity = getToolBySlug(comp.toolA.slug);
  const toolBEntity = getToolBySlug(comp.toolB.slug);

  const breadcrumbs = [
    { label: 'Comparatifs', href: '/comparatifs' },
    { label: categoryInfo ? categoryInfo.name : comp.category, href: categoryInfo ? `/outils/categorie/${categoryInfo.slug}` : `/outils` },
    { label: comp.title }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || `/comparatifs/${comp.slug}` }))),
    buildArticleSchema({
      title: comp.title,
      description: comp.subtitle || comp.introduction || `Comparatif détaillé entre ${comp.toolA.name} et ${comp.toolB.name}.`,
      authorName: 'Rédaction Prisme IA',
      datePublished: '2024-09-01',
      dateModified: '2024-09-18',
      slug: `comparatifs/${comp.slug}`
    }),
    ...(comp.faq && comp.faq.length > 0 ? [buildFAQSchema(comp.faq)] : [])
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title={`${comp.toolA.name} vs ${comp.toolB.name} : Le Comparatif Impartial | Prisme IA`}
        description={comp.subtitle || `Comparatif face-à-face : forces, faiblesses, tarification et verdict par cas d'usage entre ${comp.toolA.name} et ${comp.toolB.name}.`}
        canonicalPath={`/comparatifs/${comp.slug}`}
        structuredData={structuredData}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-stone-500">
          {categoryInfo ? (
            <AppLink
              to={`/outils/categorie/${categoryInfo.slug}`}
              className="font-semibold text-stone-800 hover:text-stone-950 uppercase tracking-wider underline"
            >
              {comp.category}
            </AppLink>
          ) : (
            <span className="font-semibold text-stone-800 uppercase tracking-wider">
              {comp.category}
            </span>
          )}
          <span>•</span>
          <span>{comp.readingTime || comp.readTime || '8 min de lecture'}</span>
          <span>•</span>
          <span>Mis à jour le {comp.lastUpdated || comp.date || 'septembre 2024'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
          {comp.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
          {comp.subtitle || comp.introduction}
        </p>
      </header>

      {/* Face-to-Face Tool Presentation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Tool A */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 relative flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-1">
              Option A
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">{comp.toolA.name}</h2>
            <p className="text-xs text-stone-600 mb-4 leading-relaxed">{comp.toolA.tagline}</p>
            
            <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-800 mb-4 border border-stone-200">
              <strong className="block text-stone-900 mb-0.5">Modèle tarifaire :</strong>
              <span>{comp.toolA.pricingSummary}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100">
            <AppLink
              to={`/outils/${comp.toolA.slug}`}
              className="w-full text-center py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors block"
            >
              Fiche & avis de {comp.toolA.name} →
            </AppLink>
            {toolAEntity && (
              <AffiliateButton
                affiliateUrl={toolAEntity.affiliateUrl}
                websiteUrl={toolAEntity.websiteUrl}
                affiliateEnabled={toolAEntity.affiliateEnabled}
                label={`Découvrir ${comp.toolA.name}`}
                size="sm"
                variant="outline"
                className="w-full"
              />
            )}
          </div>
        </div>

        {/* Tool B */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 relative flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-1">
              Option B
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">{comp.toolB.name}</h2>
            <p className="text-xs text-stone-600 mb-4 leading-relaxed">{comp.toolB.tagline}</p>
            
            <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-800 mb-4 border border-stone-200">
              <strong className="block text-stone-900 mb-0.5">Modèle tarifaire :</strong>
              <span>{comp.toolB.pricingSummary}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100">
            <AppLink
              to={`/outils/${comp.toolB.slug}`}
              className="w-full text-center py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors block"
            >
              Fiche & avis de {comp.toolB.name} →
            </AppLink>
            {toolBEntity && (
              <AffiliateButton
                affiliateUrl={toolBEntity.affiliateUrl}
                websiteUrl={toolBEntity.websiteUrl}
                affiliateEnabled={toolBEntity.affiliateEnabled}
                label={`Découvrir ${comp.toolB.name}`}
                size="sm"
                variant="outline"
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>

      <AffiliateDisclosure variant="inline" />

      {/* Summary Intro */}
      <section className="bg-stone-50 border border-stone-200 rounded-xl p-6">
        <h3 className="font-serif font-bold text-stone-900 text-base mb-2">Méthodologie & Contexte d'évaluation</h3>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
          {comp.summary || comp.introduction}
        </p>
      </section>

      {/* Strengths & Weaknesses Matrix */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Forces et limites constatées
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tool A Pros & Cons */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="font-bold text-stone-900 text-base border-b border-stone-100 pb-2">
              Bilan pour {comp.toolA.name}
            </h3>
            <div>
              <span className="text-xs font-semibold text-emerald-800 block mb-2">Points forts :</span>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {(comp.toolAStrengths || []).map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-800 block mb-2">Points de vigilance :</span>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {(comp.toolAWeaknesses || []).map((weak, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tool B Pros & Cons */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="font-bold text-stone-900 text-base border-b border-stone-100 pb-2">
              Bilan pour {comp.toolB.name}
            </h3>
            <div>
              <span className="text-xs font-semibold text-emerald-800 block mb-2">Points forts :</span>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {(comp.toolBStrengths || []).map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-800 block mb-2">Points de vigilance :</span>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {(comp.toolBWeaknesses || []).map((weak, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use-Case Based Recommendation Grid (NO arbitrary overall winner) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Recommandations par cas d'usage
          </h2>
        </div>
        <p className="text-xs text-stone-500">
          Chaque projet a des contraintes uniques : voici le choix recommandé selon votre scénario.
        </p>

        <div className="space-y-3">
          {(comp.verdictByUseCase || []).map((uc, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-stone-100">
                <h3 className="font-bold text-stone-900 text-sm">{uc.useCase}</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-stone-100 text-stone-900 border border-stone-200 self-start sm:self-auto">
                  Choix préconisé : {uc.recommendedTool}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {uc.reasoning}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* When to choose which tool */}
      <section className="bg-stone-900 text-white rounded-xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-stone-300" />
          Synthèse décisionnelle
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-lg bg-stone-800/90 border border-stone-700">
            <strong className="text-white font-bold block text-sm mb-2">Quand choisir {comp.toolA.name} ?</strong>
            <p className="text-stone-300 leading-relaxed">
              {comp.whenToChooseToolA || comp.recommendationA}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-stone-800/90 border border-stone-700">
            <strong className="text-white font-bold block text-sm mb-2">Quand choisir {comp.toolB.name} ?</strong>
            <p className="text-stone-300 leading-relaxed">
              {comp.whenToChooseToolB || comp.recommendationB}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {comp.faq && comp.faq.length > 0 && (
        <section className="bg-white border border-stone-200 rounded-xl p-6">
          <h3 className="font-serif font-bold text-stone-900 text-lg mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-stone-700" />
            Questions fréquentes sur ce comparatif
          </h3>
          <div className="divide-y divide-stone-200">
            {comp.faq.map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <h4 className="text-sm font-bold text-stone-900 mb-1">{item.question}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contextual Internal Linking Engine */}
      <ContextualInternalLinks entity={comp} />
    </div>
  );
};

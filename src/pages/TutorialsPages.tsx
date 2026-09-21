import React, { useState } from 'react';
import { TUTORIALS } from '../data/mockData';
import { TutorialCard } from '../components/CategoryAndTutorialCards';
import { Breadcrumbs } from '../components/linking/Breadcrumbs';
import { ContextualInternalLinks } from '../components/linking/ContextualInternalLinks';
import { Badge } from '../components/Badge';
import { Clock, BookOpen, User, CheckCircle2, Copy, Check, ArrowRight, HelpCircle } from 'lucide-react';
import { TutorialItem } from '../types';
import { AppLink } from '../components/common/AppLink';
import { getCategoryInfo, getToolBySlug } from '../services/relationshipEngine';
import { SEOHead } from '../components/seo/SEOHead';
import { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '../services/seoEngine';
import { ContextualAffiliateCallout } from '../components/affiliation';

export const TutorialsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filtered = TUTORIALS.filter(t => {
    if (selectedDifficulty !== 'all' && t.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Tutoriels & Guides Pratiques IA Pas à Pas | Prisme IA"
        description="Guides complets, cas d'usage réels et tutoriels concrets pour maîtriser les meilleurs outils d'intelligence artificielle sans jargon marketing."
        canonicalPath="/tutos"
      />

      <Breadcrumbs items={[{ label: 'Tutos' }]} />

      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
          Guides pratiques & Tutoriels pas à pas
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
          Des tutoriels concrets et méthodiques rédigés par des ingénieurs et créateurs francophones pour appliquer l'IA à vos projets sans perdre de temps.
        </p>
      </div>

      {/* Difficulty Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {['all', 'Débutant', 'Intermédiaire', 'Avancé'].map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
              selectedDifficulty === diff
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {diff === 'all' ? 'Tous les niveaux' : diff}
          </button>
        ))}
      </div>

      {/* Tutos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(tuto => (
          <TutorialCard
            key={tuto.id}
            tutorial={tuto}
            onSelect={(slug) => onNavigate(`/tutos/${slug}`)}
          />
        ))}
      </div>
    </div>
  );
};

export const TutorialDetailPage: React.FC<{ slug: string; onNavigate: (path: string) => void }> = ({
  slug,
  onNavigate
}) => {
  const tuto = TUTORIALS.find(t => t.slug === slug) || TUTORIALS[0];
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const categoryInfo = getCategoryInfo(tuto.category);
  const primaryTool = getToolBySlug(tuto.toolsUsed?.[0] || tuto.relatedTools?.[0] || '');

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const breadcrumbs = [
    { label: 'Tutos', href: '/tutos' },
    { label: categoryInfo ? categoryInfo.name : tuto.category, href: categoryInfo ? `/outils/categorie/${categoryInfo.slug}` : `/outils` },
    { label: tuto.title }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || `/tutos/${tuto.slug}` }))),
    buildArticleSchema({
      title: tuto.title,
      description: tuto.excerpt || tuto.overview,
      authorName: tuto.author?.name || 'Rédaction Prisme IA',
      datePublished: tuto.publishedAt || '2024-09-01',
      dateModified: tuto.lastUpdated || '2024-09-15',
      slug: `tutos/${tuto.slug}`
    }),
    ...(tuto.faq && tuto.faq.length > 0 ? [buildFAQSchema(tuto.faq)] : [])
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title={`${tuto.title} — Guide Pratique | Prisme IA`}
        description={tuto.excerpt || `Guide pas-à-pas : découvrez comment ${tuto.title.toLowerCase()} avec les meilleures pratiques vérifiées.`}
        canonicalPath={`/tutos/${tuto.slug}`}
        structuredData={structuredData}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap text-xs">
          {categoryInfo ? (
            <AppLink
              to={`/outils/categorie/${categoryInfo.slug}`}
              className="font-semibold text-stone-800 hover:text-stone-950 uppercase tracking-wider underline"
            >
              {tuto.category}
            </AppLink>
          ) : (
            <span className="font-semibold text-stone-800 uppercase tracking-wider">
              {tuto.category}
            </span>
          )}
          <span>•</span>
          <span className="text-stone-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {tuto.readingTime || tuto.readTime || '8 min'}
          </span>
          <span>•</span>
          <Badge variant="neutral">{tuto.difficulty}</Badge>
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
          {tuto.title}
        </h1>

        <p className="text-base text-stone-600 leading-relaxed font-normal">
          {tuto.excerpt}
        </p>

        {/* Author box */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <img
              src={tuto.author.avatar}
              alt={tuto.author.name}
              className="w-10 h-10 rounded-full object-cover border border-stone-200"
            />
            <div>
              <span className="font-bold text-stone-900 block text-sm">{tuto.author.name}</span>
              <span className="text-stone-500">{tuto.author.role}</span>
            </div>
          </div>
          <span className="text-stone-400">Mis à jour le {tuto.lastUpdated || tuto.publishedAt}</span>
        </div>
      </header>

      {/* Contextual Affiliate Callout if primary tool has deal/affiliate */}
      {primaryTool && (primaryTool.affiliateEnabled || primaryTool.relatedDeals?.length) && (
        <ContextualAffiliateCallout
          tool={primaryTool}
          contextNote={`Ce guide pratique est réalisé en conditions réelles avec ${primaryTool.name}.`}
        />
      )}

      {/* Prerequisites */}
      {tuto.prerequisites && tuto.prerequisites.length > 0 && (
        <section className="bg-stone-50 border border-stone-200 rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
            Prérequis recommandés
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
            {tuto.prerequisites.map((req, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-stone-900 font-bold shrink-0">✓</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tutorial Overview */}
      <section className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
        <p>{tuto.overview}</p>
      </section>

      {/* Steps */}
      <section className="space-y-8">
        <h2 className="text-xl font-serif font-bold tracking-tight text-stone-900">
          Étapes de mise en pratique
        </h2>

        {tuto.steps.map((step, idx) => (
          <div key={idx} className="bg-white border border-stone-200/90 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-stone-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                {step.stepNumber}
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                {step.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed pl-11">
              {step.description}
            </p>

            {step.tip && (
              <div className="ml-11 p-3.5 bg-stone-100 border-l-3 border-stone-800 rounded-r-md text-xs sm:text-sm text-stone-900">
                <strong>Conseil d'expert :</strong> {step.tip}
              </div>
            )}

            {step.codeSnippet && (
              <div className="ml-11 relative bg-stone-900 text-stone-100 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-stone-800 text-stone-400 text-[11px]">
                  <span>{step.codeLanguage || 'code'}</span>
                  <button
                    onClick={() => handleCopyCode(step.codeSnippet!, idx)}
                    className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap">{step.codeSnippet}</pre>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Takeaways */}
      <section className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-6">
        <h3 className="font-bold text-emerald-950 text-base mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          Ce qu'il faut retenir de ce guide
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
          {tuto.takeaways.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="font-bold text-emerald-700 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ if available */}
      {tuto.faq && tuto.faq.length > 0 && (
        <section className="bg-white border border-stone-200 rounded-xl p-6">
          <h3 className="font-serif font-bold text-stone-900 text-lg mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-stone-700" />
            Questions fréquentes sur ce tutoriel
          </h3>
          <div className="divide-y divide-stone-200">
            {tuto.faq.map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <h4 className="text-sm font-bold text-stone-900 mb-1">{item.question}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contextual Internal Linking Engine */}
      <ContextualInternalLinks entity={tuto} />
    </div>
  );
};

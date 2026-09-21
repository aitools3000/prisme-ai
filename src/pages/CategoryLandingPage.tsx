import React from 'react';
import { Breadcrumbs } from '../components/linking/Breadcrumbs';
import { getCategoryHubData } from '../services/relationshipEngine';
import { AppLink } from '../components/common/AppLink';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema, buildItemListSchema, buildFAQSchema } from '../services/seoEngine';
import { 
  Wrench, BookOpen, Terminal, Scale, Tag, 
  HelpCircle, ArrowRight, CheckCircle2, ChevronRight,
  ExternalLink, Sparkles, Zap, Layers, Star
} from 'lucide-react';

interface CategoryLandingPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const CategoryLandingPage: React.FC<CategoryLandingPageProps> = ({ slug, onNavigate }) => {
  const hubData = getCategoryHubData(slug);

  if (!hubData || !hubData.category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-3">Catégorie non trouvée</h1>
        <p className="text-stone-600 text-sm mb-6">
          La thématique demandée n'existe pas ou a été fusionnée.
        </p>
        <button
          onClick={() => onNavigate('/outils')}
          className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Retour au répertoire des outils
        </button>
      </div>
    );
  }

  const { 
    category, tools, featuredTools, regularTools, 
    tutorials, prompts, comparisons, deals, articles 
  } = hubData;

  const breadcrumbs = [
    { label: 'Outils IA', href: '/outils' },
    { label: 'Catégories', href: '/outils' },
    { label: category.name }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || `/outils/categorie/${category.slug}` }))),
    buildItemListSchema(
      tools.slice(0, 10).map(t => ({ name: t.name, url: `/outils/${t.slug}`, description: t.shortDescription })),
      `Meilleurs outils IA pour ${category.name}`
    ),
    ...(category.faq && category.faq.length > 0 ? [buildFAQSchema(category.faq)] : [])
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <SEOHead
        title={`${category.name} : Meilleurs Outils IA, Guides & Comparatifs | Prisme IA`}
        description={category.description || `Retrouvez les meilleurs outils d'IA pour ${category.name.toLowerCase()}, nos bancs d'essai comparatifs et tutoriels pas-à-pas.`}
        canonicalPath={`/outils/categorie/${category.slug}`}
        structuredData={structuredData}
      />

      {/* Category Hero / Header */}
      <section className="bg-white border-b border-stone-200 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-stone-200">
              <Layers className="w-3.5 h-3.5 text-stone-600" />
              <span>Hub Thématique Officiel</span>
              <span className="text-stone-400">•</span>
              <span>{category.toolCount} solutions répertoriées</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight mb-4">
              {category.name}
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal mb-6">
              {category.description}
            </p>

            {category.longDescription && (
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-sm text-stone-600 leading-relaxed">
                {category.longDescription}
              </div>
            )}
          </div>

          {/* Quick anchor links */}
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-stone-100 mt-8 text-xs font-medium text-stone-600">
            <span className="text-stone-400">Accès direct :</span>
            <a href="#outils-vedettes" className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 transition-colors">
              Outils phares ({featuredTools.length})
            </a>
            {tutorials.length > 0 && (
              <a href="#tutoriels" className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 transition-colors">
                Tutos ({tutorials.length})
              </a>
            )}
            {prompts.length > 0 && (
              <a href="#prompts" className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 transition-colors">
                Prompts ({prompts.length})
              </a>
            )}
            {comparisons.length > 0 && (
              <a href="#comparatifs" className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 transition-colors">
                Comparatifs ({comparisons.length})
              </a>
            )}
            {category.faq && (
              <a href="#faq" className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 transition-colors">
                FAQ ({category.faq.length})
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Hub Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Key Use Cases Section */}
        {category.keyUseCases && category.keyUseCases.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-2xs">
            <div className="max-w-2xl mb-6">
              <h2 className="text-xl font-serif font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                Cas d'usage concrets en entreprise
              </h2>
              <p className="text-xs text-stone-500">
                Pourquoi et comment déployer ces outils dans vos opérations quotidiennes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.keyUseCases.map((useCase, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs text-stone-700 font-medium leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{useCase}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Tools Section */}
        <section id="outils-vedettes">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold uppercase tracking-wider mb-1">
                <Star className="w-3.5 h-3.5 text-amber-600" />
                Recommandations
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Outils phares pour {category.name.toLowerCase()}
              </h2>
            </div>
            <AppLink
              to={`/outils?cat=${encodeURIComponent(category.name)}`}
              className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 hover:underline"
            >
              Tous les outils ({tools.length}) <ArrowRight className="w-3.5 h-3.5" />
            </AppLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featuredTools.length > 0 ? featuredTools : tools).map((tool) => (
              <div
                key={tool.id || tool.slug}
                className="bg-white rounded-xl border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all flex flex-col justify-between p-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-xs"
                        style={{ backgroundColor: tool.logoBg || '#f5f5f4', color: tool.accentColor || '#1c1917' }}
                      >
                        {tool.logo || tool.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                          {tool.name}
                          {tool.verifiedBadge && (
                            <span title="Évaluation vérifiée">
                              <CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0" />
                            </span>
                          )}
                        </h3>
                        <span className="text-[11px] text-stone-500">{tool.category}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      {tool.pricingType || (tool.freePlan ? 'Freemium' : 'Payant')}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                    {tool.shortDescription || tool.description}
                  </p>

                  {tool.features && tool.features.length > 0 && (
                    <div className="space-y-1.5 mb-4 text-[11px] text-stone-700 bg-stone-50 p-2.5 rounded border border-stone-100">
                      {tool.features.slice(0, 2).map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-stone-500">
                    {tool.pricing || tool.priceStartingAt}
                  </span>
                  <div className="flex items-center gap-2">
                    <AppLink
                      to={`/outils/${tool.slug}`}
                      className="px-3 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors"
                    >
                      Fiche complète
                    </AppLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Tutorials Hub */}
        {tutorials.length > 0 && (
          <section id="tutoriels" className="pt-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-stone-700" />
                  Tutoriels et pas-à-pas documentés
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Des guides d'implémentation rédigés par des praticiens et experts du domaine.
                </p>
              </div>
              <AppLink
                to="/tutos"
                className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 hover:underline"
              >
                Tous les tutos <ArrowRight className="w-3.5 h-3.5" />
              </AppLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tut) => (
                <AppLink
                  key={tut.id || tut.slug}
                  to={`/tutos/${tut.slug}`}
                  className="group bg-white p-5 rounded-xl border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                        {tut.difficulty || 'Débutant'}
                      </span>
                      <span>{tut.readingTime || tut.readTime || '8 min'}</span>
                      <span>Mis à jour le {tut.lastUpdated || tut.publishedAt}</span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-stone-950 leading-snug mb-2">
                      {tut.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {tut.excerpt || tut.overview}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-500">
                      Par {tut.author?.name || 'La rédaction'}
                    </span>
                    <span className="font-semibold text-stone-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-xs">
                      Consulter le guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </AppLink>
              ))}
            </div>
          </section>
        )}

        {/* Video Comparisons Hub */}
        {comparisons.length > 0 && (
          <section id="comparatifs" className="pt-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-stone-700" />
                  Comparatifs & Face-à-face objectifs
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Évaluation sans filtre par cas d'usage, compromis et ratios tarifaires.
                </p>
              </div>
              <AppLink
                to="/comparatifs"
                className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 hover:underline"
              >
                Tous les comparatifs <ArrowRight className="w-3.5 h-3.5" />
              </AppLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparisons.map((comp) => (
                <AppLink
                  key={comp.id || comp.slug}
                  to={`/comparatifs/${comp.slug}`}
                  className="group bg-white p-5 rounded-xl border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-stone-100 text-stone-800 border border-stone-200">
                        {comp.toolA.name}
                      </span>
                      <span className="text-xs font-serif font-bold text-stone-400 italic">vs</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-stone-100 text-stone-800 border border-stone-200">
                        {comp.toolB.name}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-stone-950 leading-snug mb-2">
                      {comp.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {comp.subtitle || comp.introduction}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-500">
                      {comp.verdictByUseCase ? `${comp.verdictByUseCase.length} cas d'usage évalués` : 'Analyse complète'}
                    </span>
                    <span className="font-semibold text-stone-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-xs">
                      Lire le comparatif <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </AppLink>
              ))}
            </div>
          </section>
        )}

        {/* Video Prompts Hub */}
        {prompts.length > 0 && (
          <section id="prompts" className="pt-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-stone-700" />
                  Prompts & Modèles d'instructions recommandés
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Structures de prompts prêtes à l'emploi avec variables dynamiques.
                </p>
              </div>
              <AppLink
                to="/prompts"
                className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 hover:underline"
              >
                Tous les prompts <ArrowRight className="w-3.5 h-3.5" />
              </AppLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prompts.map((p) => (
                <div
                  key={p.id || p.slug}
                  className="bg-white p-5 rounded-xl border border-stone-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                        {p.category}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {p.copyCount || 1200}+ copies
                      </span>
                    </div>

                    <AppLink to={`/prompts/${p.slug}`} className="block group">
                      <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-950 mb-2 leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                        {p.useCase || p.description}
                      </p>
                    </AppLink>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-500 truncate max-w-[200px]">
                      Compatible : {(p.compatibleTools || []).slice(0, 2).join(', ')}
                    </span>
                    <AppLink
                      to={`/prompts/${p.slug}`}
                      className="font-semibold text-stone-900 hover:underline flex items-center gap-1 text-xs"
                    >
                      Voir le modèle <ArrowRight className="w-3.5 h-3.5" />
                    </AppLink>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video Deals Hub */}
        {deals.length > 0 && (
          <section id="bons-plans" className="pt-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-stone-700" />
                  Bons plans et réductions vérifiées pour {category.name.toLowerCase()}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Codes promo et forfaits d'essai testés manuellement par la rédaction.
                </p>
              </div>
              <AppLink
                to="/bons-plans"
                className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 hover:underline"
              >
                Tous les bons plans <ArrowRight className="w-3.5 h-3.5" />
              </AppLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deals.map((deal) => (
                <div
                  key={deal.id || deal.slug}
                  className="bg-white p-5 rounded-xl border border-stone-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                        {deal.tool?.name || deal.toolName}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {deal.discount}
                      </span>
                    </div>

                    <AppLink to={`/bons-plans/${deal.slug}`} className="block group">
                      <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-950 mb-2 leading-snug">
                        {deal.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                        {deal.description || deal.offer}
                      </p>
                    </AppLink>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-emerald-700 font-medium">
                      Vérifié le {deal.lastVerified}
                    </span>
                    <AppLink
                      to={`/bons-plans/${deal.slug}`}
                      className="font-semibold text-stone-900 hover:underline flex items-center gap-1 text-xs"
                    >
                      Détails de l'offre <ArrowRight className="w-3.5 h-3.5" />
                    </AppLink>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {category.faq && category.faq.length > 0 && (
          <section id="faq" className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200">
            <div className="max-w-2xl mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                Foire Aux Questions
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Questions fréquentes sur {category.name.toLowerCase()}
              </h2>
            </div>

            <div className="divide-y divide-stone-200">
              {category.faq.map((item, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

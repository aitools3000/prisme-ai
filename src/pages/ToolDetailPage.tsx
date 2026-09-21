import React from 'react';
import { 
  ShieldCheck, ExternalLink, ArrowRight, Check, X, 
  Sparkles, Layers, Globe, Calendar, Award, AlertCircle,
  Wrench, CheckCircle2, HelpCircle, Tag
} from 'lucide-react';
import { TOOLS, DEALS } from '../data/mockData';
import { Breadcrumbs } from '../components/linking/Breadcrumbs';
import { ContextualInternalLinks } from '../components/linking/ContextualInternalLinks';
import { AppLink } from '../components/common/AppLink';
import { getCategoryInfo } from '../services/relationshipEngine';
import { AffiliateButton, AffiliateDisclosure, CouponCodeBox } from '../components/affiliation';
import { SEOHead } from '../components/seo/SEOHead';
import { buildSoftwareApplicationSchema, buildBreadcrumbSchema, buildFAQSchema } from '../services/seoEngine';

interface ToolDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ slug, onNavigate }) => {
  const tool = TOOLS.find(t => t.slug === slug) || TOOLS[0];
  const categoryInfo = getCategoryInfo(tool.category);

  // Associated deal check
  const associatedDeal = DEALS.find(d => 
    d.tool?.slug === tool.slug || 
    (tool.relatedDeals || []).includes(d.slug) ||
    d.slug.includes(tool.slug)
  );

  const breadcrumbs = [
    { label: 'Outils IA', href: '/outils' },
    { label: categoryInfo ? categoryInfo.name : tool.category, href: categoryInfo ? `/outils/categorie/${categoryInfo.slug}` : `/outils?cat=${encodeURIComponent(tool.category)}` },
    { label: tool.name }
  ];

  const structuredData = [
    buildSoftwareApplicationSchema(tool),
    buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || `/outils/${tool.slug}` }))),
    ...(tool.faq && tool.faq.length > 0 ? [buildFAQSchema(tool.faq)] : [])
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SEOHead
        title={`${tool.name} : Avis, Tarifs & Alternatives Vérifiées`}
        description={tool.shortDescription || `${tool.name} analysé par la rédaction de Prisme IA. Découvrez ses fonctionnalités, tarifs vérifiés et alternatives.`}
        canonicalPath={`/outils/${tool.slug}`}
        structuredData={structuredData}
      />

      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* 2. Tool Header */}
      <header className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-10 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center font-bold text-2xl text-stone-900 border border-stone-200 shrink-0 shadow-2xs"
              style={{ backgroundColor: tool.logoBg || '#f5f5f4', color: tool.accentColor || '#1c1917' }}
            >
              {tool.logo || tool.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
                  {tool.name}
                </h1>
                {tool.verifiedBadge && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-800 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-700" /> Évaluation vérifiée
                  </span>
                )}
                {tool.frenchSupport && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 bg-stone-50 px-2.5 py-0.5 rounded border border-stone-200">
                    🇫🇷 Support Français
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-stone-600 font-medium max-w-2xl leading-relaxed">
                {tool.shortDescription || tool.tagline}
              </p>

              <div className="flex items-center gap-4 text-xs text-stone-500 pt-1 flex-wrap">
                {categoryInfo && (
                  <AppLink
                    to={`/outils/categorie/${categoryInfo.slug}`}
                    className="inline-flex items-center gap-1 font-medium text-stone-800 hover:text-stone-950 underline"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{categoryInfo.name}</span>
                  </AppLink>
                )}
                {tool.originCountry && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-stone-400" />
                    Origine : {tool.originCountry}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  Mis à jour le {tool.lastUpdated || 'septembre 2024'}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-3 shrink-0">
            <AffiliateButton
              affiliateUrl={tool.affiliateUrl}
              websiteUrl={tool.websiteUrl}
              affiliateEnabled={tool.affiliateEnabled}
              label={associatedDeal ? `Voir l'offre ${tool.name}` : `Accéder à ${tool.name}`}
              size="lg"
              variant="primary"
              showDisclosureHint={tool.affiliateEnabled}
            />
            <div className="text-center text-xs text-stone-500">
              {tool.freePlan ? (
                <span className="text-emerald-700 font-medium">Formule gratuite disponible</span>
              ) : (
                <span>{tool.pricing || tool.priceStartingAt}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Main Column (2 cols): Editorial analysis, features, pros & limitations, pricing */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Editorial Description */}
          <section className="bg-white border border-stone-200/90 rounded-xl p-6 sm:p-8 space-y-4 shadow-2xs">
            <h2 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              Analyse éditoriale de la rédaction
            </h2>
            <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
              <p>{tool.description}</p>
            </div>

            {tool.subcategories && tool.subcategories.length > 0 && (
              <div className="pt-4 border-t border-stone-100">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                  Champs d'application couverts :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tool.subcategories.map((sub, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded bg-stone-100 text-stone-700 font-medium">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Key Features */}
          {tool.features && tool.features.length > 0 && (
            <section className="bg-white border border-stone-200/90 rounded-xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-xl font-serif font-bold text-stone-900 mb-4 border-b border-stone-100 pb-3">
                Fonctionnalités clés
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {tool.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 border border-stone-100 text-xs sm:text-sm text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <section className="bg-white border border-stone-200/90 rounded-xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-xl font-serif font-bold text-stone-900 mb-4 border-b border-stone-100 pb-3">
                Pour qui et quels cas d'usage ?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {tool.useCases.map((uc, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 border border-stone-100 text-xs sm:text-sm text-stone-800">
                    <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pros & Limitations */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="bg-white border border-stone-200/90 rounded-xl p-6 shadow-2xs">
              <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Points forts constatés
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {(tool.pros || []).map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations */}
            <div className="bg-white border border-stone-200/90 rounded-xl p-6 shadow-2xs">
              <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Limites et points de vigilance
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {(tool.limitations || []).map((lim, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Pricing Plans */}
          {tool.pricingPlans && tool.pricingPlans.length > 0 && (
            <section className="bg-white border border-stone-200/90 rounded-xl p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-stone-900">
                    Grille tarifaire détaillée
                  </h2>
                  <p className="text-xs text-stone-500">
                    Tarifs constatés et relevés en direct lors de notre audit.
                  </p>
                </div>
                {tool.freePlan && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 shrink-0">
                    <Check className="w-3.5 h-3.5" /> Formule gratuite disponible
                  </span>
                )}
              </div>

              {/* Verified Deal callout if exists */}
              {associatedDeal && (
                <div className="mb-6">
                  <CouponCodeBox
                    deal={associatedDeal}
                    affiliateUrl={associatedDeal.affiliateUrl || associatedDeal.dealUrl}
                    websiteUrl={tool.websiteUrl}
                    affiliateEnabled={associatedDeal.affiliateEnabled ?? false}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tool.pricingPlans.map((plan, i) => (
                  <div 
                    key={i} 
                    className={`rounded-xl p-5 border flex flex-col justify-between ${
                      plan.recommended 
                        ? 'border-stone-900 bg-stone-50/70 relative ring-1 ring-stone-900' 
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div>
                      {plan.recommended && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-900 bg-stone-200 px-2 py-0.5 rounded mb-2 inline-block">
                          Recommandé
                        </span>
                      )}
                      <h3 className="font-bold text-base text-stone-900">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 my-2">
                        <span className="text-2xl font-extrabold text-stone-900 font-mono">{plan.price}</span>
                        <span className="text-xs text-stone-500">{plan.period}</span>
                      </div>
                      <ul className="space-y-2 text-xs text-stone-600 mt-4 border-t border-stone-100 pt-3">
                        {plan.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-100">
                      <AffiliateButton
                        affiliateUrl={tool.affiliateUrl}
                        websiteUrl={tool.websiteUrl}
                        affiliateEnabled={tool.affiliateEnabled}
                        label={`Choisir ${plan.name}`}
                        size="sm"
                        variant={plan.recommended ? 'primary' : 'outline'}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <AffiliateDisclosure variant="inline" />
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {tool.faq && tool.faq.length > 0 && (
            <section className="bg-white border border-stone-200/90 rounded-xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-xl font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-stone-700" />
                Questions fréquentes sur {tool.name}
              </h2>
              <div className="divide-y divide-stone-200">
                {tool.faq.map((item, i) => (
                  <div key={i} className="py-4 first:pt-0 last:pb-0">
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-1.5">
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

        {/* Sidebar (1 col): Alternatives, Category Hub and Context */}
        <div className="space-y-8">
          
          {/* Alternatives */}
          {tool.alternatives && tool.alternatives.length > 0 && (
            <div className="bg-white border border-stone-200/90 rounded-xl p-5 shadow-2xs">
              <h3 className="text-xs font-bold tracking-tight text-stone-900 mb-1 uppercase tracking-wider">
                Alternatives vérifiées
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                D'autres solutions comparables pour la catégorie {tool.category} :
              </p>
              <div className="space-y-3">
                {tool.alternatives.map((alt) => (
                  <AppLink
                    key={alt.slug}
                    to={`/outils/${alt.slug}`}
                    className="w-full text-left p-3 rounded-lg border border-stone-200/80 hover:border-stone-400 hover:bg-stone-50 transition-colors group block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900 text-sm group-hover:text-stone-950">
                        {alt.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                      {alt.shortDescription || alt.tagline}
                    </p>
                  </AppLink>
                ))}
              </div>
            </div>
          )}

          {/* Category Quick Hub link */}
          {categoryInfo && (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-xs text-stone-600 space-y-3">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <Layers className="w-4 h-4 text-stone-800" />
                <span>Hub {categoryInfo.name}</span>
              </div>
              <p className="leading-relaxed">
                Retrouvez l'ensemble des tutoriels, prompts, bancs d'essai et bons plans dédiés à {categoryInfo.name.toLowerCase()}.
              </p>
              <AppLink
                to={`/outils/categorie/${categoryInfo.slug}`}
                className="inline-flex items-center gap-1.5 font-semibold text-stone-900 hover:underline pt-1"
              >
                Explorer le hub thématique <ArrowRight className="w-3 h-3" />
              </AppLink>
            </div>
          )}

          {/* Transparency & Affiliate Disclosure */}
          <AffiliateDisclosure variant="card" />
        </div>
      </div>

      {/* 4. Rich Semantic Contextual Internal Linking Engine */}
      <ContextualInternalLinks entity={tool} />
    </div>
  );
};

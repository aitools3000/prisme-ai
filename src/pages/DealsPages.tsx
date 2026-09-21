import React, { useState } from 'react';
import { DEALS } from '../data/mockData';
import { DealCard } from '../components/EditorialCards';
import { Breadcrumbs } from '../components/linking/Breadcrumbs';
import { ContextualInternalLinks } from '../components/linking/ContextualInternalLinks';
import { ShieldCheck, Tag, Copy, Check, ExternalLink, Clock, AlertTriangle, HelpCircle } from 'lucide-react';
import { DealItem } from '../types';
import { AppLink } from '../components/common/AppLink';
import { getCategoryInfo, getToolBySlug } from '../services/relationshipEngine';
import { AffiliateButton, AffiliateDisclosure, CouponCodeBox, isDealExpired } from '../components/affiliation';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema, buildFAQSchema } from '../services/seoEngine';

export const DealsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Bons Plans & Codes Promo IA Vérifiés | Prisme IA"
        description="Bons plans, remises et codes promotionnels répertoriés pour les outils d'intelligence artificielle avec suivi des dates de validité."
        canonicalPath="/bons-plans"
      />

      <Breadcrumbs items={[{ label: 'Bons Plans' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
            Bons plans & Réductions IA vérifiées
          </h1>
          <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
            Accédez à des remises testées manuellement par notre équipe, avec date de dernière vérification et conditions exactes d'application. 0 code périmé conservé pour générer du trafic.
          </p>
        </div>
      </div>

      <AffiliateDisclosure variant="banner" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEALS.map(deal => (
          <DealCard
            key={deal.id}
            deal={deal}
            onSelect={(slug) => onNavigate(`/bons-plans/${slug}`)}
          />
        ))}
      </div>
    </div>
  );
};

export const DealDetailPage: React.FC<{ slug: string; onNavigate: (path: string) => void }> = ({
  slug,
  onNavigate
}) => {
  const deal = DEALS.find(d => d.slug === slug) || DEALS[0];
  const associatedTool = getToolBySlug(deal.tool?.slug || deal.toolSlug || '');
  const isVerified = deal.verified || deal.status === 'Vérifié';
  const dealCategory = deal.category || associatedTool?.category || 'Outils IA';
  const categoryInfo = getCategoryInfo(dealCategory);

  const breadcrumbs = [
    { label: 'Bons Plans', href: '/bons-plans' },
    ...(categoryInfo
      ? [{ label: categoryInfo.name, href: `/outils/categorie/${categoryInfo.slug}` }]
      : [{ label: dealCategory, href: '/outils' }]),
    { label: deal.title }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || `/bons-plans/${deal.slug}` }))),
    ...(deal.faq && deal.faq.length > 0 ? [buildFAQSchema(deal.faq)] : [])
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title={`${deal.title} — Réduction & Code Promo | Prisme IA`}
        description={deal.description || `Profitez de ${deal.discount} sur ${deal.tool?.name || 'cet outil IA'}. Offre vérifiée manuellement avec instructions d'activation.`}
        canonicalPath={`/bons-plans/${deal.slug}`}
        structuredData={structuredData}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Coupon Box Component */}
      <CouponCodeBox
        deal={deal}
        affiliateUrl={deal.affiliateUrl || deal.dealUrl}
        websiteUrl={associatedTool?.websiteUrl}
        affiliateEnabled={deal.affiliateEnabled ?? true}
      />

      {/* How to claim */}
      {deal.howToClaim && deal.howToClaim.length > 0 && (
        <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-lg font-serif font-bold text-stone-900">
            Comment profiter de cette réduction ?
          </h2>
          <ol className="space-y-3 text-xs sm:text-sm text-stone-700 list-decimal pl-5">
            {deal.howToClaim.map((step, i) => (
              <li key={i} className="leading-relaxed pl-1">{step}</li>
            ))}
          </ol>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-stone-100">
            <span className="text-xs text-stone-500">
              {isDealExpired(deal.status, deal.expirationDate || deal.validUntil)
                ? 'Offre archivée (promotion expirée)'
                : isVerified
                ? `Offre vérifiée • Dernière confirmation le ${deal.lastVerified || 'récemment'}`
                : 'Offre en cours de vérification'}
            </span>
            <AffiliateButton
              affiliateUrl={deal.affiliateUrl || deal.dealUrl}
              websiteUrl={associatedTool?.websiteUrl}
              affiliateEnabled={deal.affiliateEnabled ?? true}
              label="Activer l'offre sur le site officiel"
              size="md"
              variant="primary"
            />
          </div>
        </section>
      )}

      {/* Terms & Conditions */}
      {deal.terms && deal.terms.length > 0 && (
        <section className="bg-stone-50 border border-stone-200 rounded-xl p-6 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-stone-500" />
            Conditions d'éligibilité et mentions légales
          </h2>
          <ul className="space-y-1.5 text-xs text-stone-600">
            {deal.terms.map((term, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-stone-400 font-bold">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Affiliate Transparency Disclosure */}
      <AffiliateDisclosure variant="card" />

      {/* FAQ if available */}
      {deal.faq && deal.faq.length > 0 && (
        <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs">
          <h3 className="font-serif font-bold text-stone-900 text-lg mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-stone-700" />
            Questions fréquentes sur ce bon plan
          </h3>
          <div className="divide-y divide-stone-200">
            {deal.faq.map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <h4 className="text-sm font-bold text-stone-900 mb-1">{item.question}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contextual Internal Linking Engine */}
      <ContextualInternalLinks entity={deal} />
    </div>
  );
};

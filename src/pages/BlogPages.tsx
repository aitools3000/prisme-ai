import React from 'react';
import { ARTICLES } from '../data/mockData';
import { ArticleCard } from '../components/EditorialCards';
import { Breadcrumbs } from '../components/linking/Breadcrumbs';
import { ContextualInternalLinks } from '../components/linking/ContextualInternalLinks';
import { Clock, User, ArrowRight, Bookmark, Share2, HelpCircle } from 'lucide-react';
import { ArticleItem } from '../types';
import { AppLink } from '../components/common/AppLink';
import { getCategoryInfo } from '../services/relationshipEngine';
import { SEOHead } from '../components/seo/SEOHead';
import { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '../services/seoEngine';

export const BlogPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Magazine & Analyses Indépendantes de l'IA | Prisme IA"
        description="Enquêtes approfondies, décryptages géopolitiques, aspects réglementaires et tribunes d'experts sur l'intelligence artificielle en France et en Europe."
        canonicalPath="/blog"
      />

      <Breadcrumbs items={[{ label: 'Blog & Magazine' }]} />

      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
          Le Magazine éditorial de l'IA
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
          Enquêtes, tribunes, décryptages géopolitiques et analyses juridiques sur l'intelligence artificielle en France et en Europe.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {ARTICLES.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            onSelect={(slug) => onNavigate(`/blog/${slug}`)}
          />
        ))}
      </div>
    </div>
  );
};

export const ArticleDetailPage: React.FC<{ slug: string; onNavigate: (path: string) => void }> = ({
  slug,
  onNavigate
}) => {
  const article = ARTICLES.find(a => a.slug === slug) || ARTICLES[0];
  const categoryInfo = getCategoryInfo(article.category);

  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: categoryInfo ? categoryInfo.name : article.category, href: categoryInfo ? `/outils/categorie/${categoryInfo.slug}` : `/outils` },
    { label: article.title }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || `/blog/${article.slug}` }))),
    buildArticleSchema({
      title: article.title,
      description: article.subtitle || article.summary || article.excerpt,
      authorName: article.author?.name || 'Rédaction Prisme IA',
      datePublished: article.publishedDate || article.publishedAt || '2024-09-01',
      dateModified: '2024-09-18',
      slug: `blog/${article.slug}`
    }),
    ...(article.faq && article.faq.length > 0 ? [buildFAQSchema(article.faq)] : [])
  ].filter(Boolean);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title={`${article.title} — Enquête & Analyse | Prisme IA`}
        description={article.subtitle || article.summary || article.excerpt}
        canonicalPath={`/blog/${article.slug}`}
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
              {article.category}
            </AppLink>
          ) : (
            <span className="font-semibold text-stone-800 uppercase tracking-wider">
              {article.category}
            </span>
          )}
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readingTime || article.readTime || '7 min de lecture'}
          </span>
          <span>•</span>
          <span>Publié le {article.publishedDate || article.publishedAt}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 font-serif leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-serif italic">
          {article.subtitle}
        </p>

        {/* Author row */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border border-stone-200"
            />
            <div>
              <span className="font-bold text-stone-900 text-sm block">{article.author.name}</span>
              <span className="text-xs text-stone-500">{article.author.role}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Intro Summary Callout */}
      <div className="bg-stone-100/70 border-l-4 border-stone-900 p-5 rounded-r-lg text-stone-800 text-sm sm:text-base leading-relaxed font-serif">
        {article.summary || article.excerpt}
      </div>

      {/* Body Content */}
      <div className="space-y-8 text-stone-800 text-base sm:text-lg leading-relaxed font-serif">
        {(article.content || []).map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif tracking-tight pt-2">
              {section.heading}
            </h2>

            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {p}
              </p>
            ))}

            {section.callout && (
              <blockquote className="my-6 pl-4 border-l-2 border-stone-900 italic text-stone-900 text-base sm:text-lg bg-stone-100/60 py-3 pr-4 rounded-r">
                {section.callout}
              </blockquote>
            )}
          </div>
        ))}
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-6 border-t border-stone-200 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Mots-clés :</span>
          {article.tags.map((tag, i) => (
            <span key={i} className="text-xs font-medium text-stone-700 bg-stone-100 px-2.5 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* FAQ if available */}
      {article.faq && article.faq.length > 0 && (
        <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs">
          <h3 className="font-serif font-bold text-stone-900 text-lg mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-stone-700" />
            Questions fréquentes sur cette analyse
          </h3>
          <div className="divide-y divide-stone-200">
            {article.faq.map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <h4 className="text-sm font-bold text-stone-900 mb-1">{item.question}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contextual Internal Linking Engine */}
      <ContextualInternalLinks entity={article} />
    </article>
  );
};

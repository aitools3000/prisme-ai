import React from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, 
  TrendingUp, Award, Zap, Compass, Star, ExternalLink 
} from 'lucide-react';
import { CATEGORIES, TOOLS, TUTORIALS, PROMPTS, COMPARISONS, DEALS, ARTICLES } from '../data/mockData';
import { HeroSearchBar, NewsletterBox } from '../components/SearchAndNewsletter';
import { ToolCard, FeaturedToolCard } from '../components/ToolCard';
import { CategoryCard, TutorialCard } from '../components/CategoryAndTutorialCards';
import { PromptCard, ComparisonCard, DealCard, ArticleCard } from '../components/EditorialCards';
import { SectionHeader } from '../components/SectionHeader';
import { SEOHead } from '../components/seo/SEOHead';
import { buildWebSiteSchema, buildOrganizationSchema } from '../services/seoEngine';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const featuredTool = TOOLS.find(t => t.slug === 'mistral-le-chat') || TOOLS[0];
  const popularTools = TOOLS.filter(t => t.slug !== featuredTool.slug).slice(0, 4);
  const extraTool = TOOLS.find(t => t.slug === 'cursor-editor') || TOOLS[3];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SEOHead
        title="Prisme IA — Répertoire, Comparatifs & Guide Indépendant de l'Intelligence Artificielle"
        description="Le répertoire et média francophone de référence pour découvrir, comparer et maîtriser les technologies d'IA. Sélections rigoureuses, tutoriels et comparatifs impartiaux."
        canonicalPath="/"
        structuredData={[buildWebSiteSchema(), buildOrganizationSchema()]}
      />

      {/* 1. Hero Section */}
      <section className="pt-10 sm:pt-16 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Editorial Sub-Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200/90 text-stone-700 text-xs font-semibold mb-6 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Édition de Septembre 2024 • 450+ outils analysés sans complaisance</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.12]">
          L'intelligence artificielle, <br className="hidden sm:inline" />
          <span className="text-stone-800 underline decoration-blue-800/40 decoration-4 underline-offset-6">
            enfin simple à explorer.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Le répertoire et média francophone de référence pour découvrir, comparer et maîtriser les technologies d'IA. Sélections rigoureuses, tutoriels concrets et zéro jargon marketing.
        </p>

        {/* Prominent Search Bar */}
        <div className="mt-8 sm:mt-10">
          <HeroSearchBar 
            onOpenSearchModal={onOpenSearch} 
            onDirectSearch={(q) => onNavigate(`/outils?q=${encodeURIComponent(q)}`)}
          />
        </div>

        {/* Key Trust Signals Bar */}
        <div className="mt-10 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">100% Indépendant</span>
              <span className="text-[11px] text-stone-500">Aucun classement sponsorisé</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Award className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">Tests en conditions réelles</span>
              <span className="text-[11px] text-stone-500">Protocoles de benchmarks stricts</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-base font-bold shrink-0 mt-0.5">🇫🇷</span>
            <div>
              <span className="text-xs font-bold text-stone-900 block">Focus Francophone & RGPD</span>
              <span className="text-[11px] text-stone-500">Souveraineté des données</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Zap className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">Veille Continue</span>
              <span className="text-[11px] text-stone-500">Mis à jour chaque semaine</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Navigation */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Taxonomie"
          title="Explorer par catégorie"
          description="Naviguez selon vos cas d'usage métiers : génération de texte, retouche d'image, automatisation ou audio."
          actionText="Voir tout l'annuaire"
          onActionClick={() => onNavigate('/outils')}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onSelect={(slug) => onNavigate(`/outils?cat=${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 3. Editorial Section: "Les outils IA du moment" */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Sélection de la Rédaction"
          title="Les outils IA du moment"
          description="Les solutions technologiques les plus abouties, testées et validées par nos experts ce mois-ci."
          actionText="Tous les outils répertoriés"
          onActionClick={() => onNavigate('/outils')}
        />

        {/* Featured Card (Asymmetric Grid) */}
        <div className="space-y-6">
          <FeaturedToolCard
            tool={featuredTool}
            onSelect={(slug) => onNavigate(`/outils/${slug}`)}
          />

          {/* Regular Tool Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelect={(slug) => onNavigate(`/outils/${slug}`)}
              />
            ))}
          </div>

          {/* Horizontal Card for Visual Rhythm */}
          <ToolCard
            tool={extraTool}
            layout="horizontal"
            onSelect={(slug) => onNavigate(`/outils/${slug}`)}
          />
        </div>
      </section>

      {/* 4. Editorial Section: "Comparatifs exclusifs" */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-stone-100/70 border border-stone-200/90 rounded-2xl p-6 sm:p-10">
          <SectionHeader
            eyebrow="Benchmarks & Face-à-face"
            title="Comparatifs approfondis"
            description="Des affrontements méthodiques critère par critère pour choisir le modèle ou l'outil adapté à votre budget et à vos exigences."
            actionText="Voir tous les comparatifs"
            onActionClick={() => onNavigate('/comparatifs')}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {COMPARISONS.map(comp => (
              <ComparisonCard
                key={comp.id}
                comparison={comp}
                onSelect={(slug) => onNavigate(`/comparatifs/${slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Editorial Section: "Guides pratiques" (Tutos) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Pédagogie & Pratique"
          title="Guides & Tutoriels pas à pas"
          description="Des procédures claires, sans prérequis démesurés, pour intégrer l'IA dans vos flux de travail quotidiens."
          actionText="Explorer tous les tutos"
          onActionClick={() => onNavigate('/tutos')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TUTORIALS.map(tuto => (
            <TutorialCard
              key={tuto.id}
              tutorial={tuto}
              onSelect={(slug) => onNavigate(`/tutos/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 6. Editorial Section: "Prompts populaires" */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Formules Testées"
          title="Prompts prêts à l'emploi"
          description="Formulés pour éliminer le style générique des modèles. Copiez-les en 1 clic ou adaptez leurs variables."
          actionText="Voir la bibliothèque de prompts"
          onActionClick={() => onNavigate('/prompts')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROMPTS.map(prompt => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onSelect={(slug) => onNavigate(`/prompts/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 7. Editorial Section: "Les bons plans IA" */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Opportunités Vérifiées"
          title="Bons plans & Réductions"
          description="Remises annuelles, offres étudiantes et crédits d'essais gratuits vérifiés sans arnaque ni fausse remise."
          actionText="Tous les bons plans"
          onActionClick={() => onNavigate('/bons-plans')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEALS.map(deal => (
            <DealCard
              key={deal.id}
              deal={deal}
              onSelect={(slug) => onNavigate(`/bons-plans/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 8. Editorial Section: "À lire cette semaine" (Magazine Blog) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Analyses & Décryptages"
          title="À lire cette semaine"
          description="Les grandes enquêtes de la rédaction sur l'économie, le droit, l'éthique et l'avenir de l'intelligence artificielle en Europe."
          actionText="Consulter les articles"
          onActionClick={() => onNavigate('/blog')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ARTICLES.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={(slug) => onNavigate(`/blog/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 9. Newsletter Box */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <NewsletterBox id="homepage-newsletter" />
      </section>
    </div>
  );
};

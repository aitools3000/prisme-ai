import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, ShieldCheck } from 'lucide-react';
import { TOOLS, CATEGORIES } from '../data/mockData';
import { ToolCard } from '../components/ToolCard';
import { Breadcrumbs } from '../components/SectionHeader';
import { PricingType } from '../types';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema, buildItemListSchema } from '../services/seoEngine';

interface ToolDirectoryPageProps {
  onNavigate: (path: string) => void;
  initialCategory?: string;
  initialQuery?: string;
}

export const ToolDirectoryPage: React.FC<ToolDirectoryPageProps> = ({
  onNavigate,
  initialCategory,
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
  const [onlyFrench, setOnlyFrench] = useState(false);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesTagline = (tool.tagline || tool.shortDescription || '').toLowerCase().includes(q);
        const matchesCategory = tool.category.toLowerCase().includes(q);
        const matchesTags = (tool.tags || tool.subcategories || []).some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const catObj = CATEGORIES.find(c => c.slug === selectedCategory);
        if (catObj && !tool.category.toLowerCase().includes(catObj.name.toLowerCase().split(' ')[0])) {
          // Check matching
          if (!tool.category.toLowerCase().includes(selectedCategory)) {
            return false;
          }
        }
      }

      // Pricing filter
      if (selectedPricing !== 'all') {
        if (tool.pricingType !== selectedPricing) {
          return false;
        }
      }

      // French support
      if (onlyFrench && !tool.frenchSupport) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.rating ?? 4.8) - (a.rating ?? 4.8);
      if (sortBy === 'reviews') return (b.reviewCount ?? 100) - (a.reviewCount ?? 100);
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedCategory, selectedPricing, sortBy, onlyFrench]);

  const pricingOptions: { label: string; value: string }[] = [
    { label: 'Tous les tarifs', value: 'all' },
    { label: 'Gratuit', value: 'Gratuit' },
    { label: 'Freemium', value: 'Freemium' },
    { label: 'Payant', value: 'Payant' },
    { label: 'Open Source', value: 'Open Source' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHead
        title="Répertoire des Meilleurs Outils IA Francophones | Prisme IA"
        description="Explorez et filtrez plus de 450 solutions d'intelligence artificielle testées sans complaisance par la rédaction. Tarifs, alternatives et avis vérifiés."
        canonicalPath="/outils"
        structuredData={[
          buildBreadcrumbSchema([{ name: 'Outils IA', url: '/outils' }]),
          buildItemListSchema(
            TOOLS.slice(0, 15).map(t => ({ name: t.name, url: `/outils/${t.slug}`, description: t.shortDescription })),
            'Sélection des Meilleurs Outils IA'
          )
        ]}
      />

      <Breadcrumbs items={[{ label: 'Outils IA' }]} onNavigate={onNavigate} />

      {/* Directory Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
          Répertoire des meilleurs outils d'intelligence artificielle
        </h1>
        <p className="mt-2.5 text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          {TOOLS.length} solutions technologiques analysées, benchmarkées et vérifiées pour les professionnels francophones. Zéro fiche automatisée sans vérification humaine.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-xl p-4 sm:p-5 mb-8 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, usage, mot-clé (ex: Mistral, code, voix)..."
              className="w-full pl-10 pr-8 py-2 text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Pricing Select */}
          <div className="w-full md:w-48">
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="w-full py-2 px-3 text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-800 cursor-pointer"
            >
              {pricingOptions.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div className="w-full md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-800 cursor-pointer"
            >
              <option value="rating">Trier par note d'expert</option>
              <option value="reviews">Trier par popularité</option>
              <option value="name">Ordre alphabétique (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Categories Pills & Quick Toggles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Toutes les catégories
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* French Support Checkbox */}
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer shrink-0 select-none">
            <input
              type="checkbox"
              checked={onlyFrench}
              onChange={(e) => setOnlyFrench(e.target.checked)}
              className="rounded border-stone-300 text-blue-900 focus:ring-0 cursor-pointer"
            />
            <span>🇫🇷 Support français natif uniquement</span>
          </label>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
        <span>
          Affichage de <strong className="text-stone-900 font-semibold">{filteredTools.length}</strong> outils vérifiés
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedPricing !== 'all' || onlyFrench) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedPricing('all');
              setOnlyFrench(false);
            }}
            className="text-blue-900 hover:underline font-semibold cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onSelect={(slug) => onNavigate(`/outils/${slug}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-lg mx-auto">
          <p className="text-stone-900 font-semibold text-base mb-1">
            Aucun outil ne correspond à vos critères
          </p>
          <p className="text-xs text-stone-500 mb-4">
            Essayez d'élargir votre recherche ou de désactiver certains filtres.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedPricing('all');
              setOnlyFrench(false);
            }}
            className="px-4 py-2 bg-stone-900 text-white rounded-md text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Réinitialiser tous les filtres
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, ArrowRight, X, Layers, FileText, Bookmark, SlidersHorizontal, Check } from 'lucide-react';
import { TOOLS, TUTORIALS, PROMPTS, COMPARISONS } from '../data/mockData';
import { ToolItem, TutorialItem, PromptItem, ComparisonItem } from '../types';
import { subscribeToNewsletter } from '../services/newsletterService';

interface SearchBarProps {
  onSearchSubmit?: (query: string) => void;
  onSelectResult?: (type: string, slug: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const HeroSearchBar: React.FC<{ onOpenSearchModal: () => void; onDirectSearch?: (q: string) => void }> = ({
  onOpenSearchModal,
  onDirectSearch
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (onDirectSearch) {
        onDirectSearch(inputValue.trim());
      } else {
        onOpenSearchModal();
      }
    } else {
      onOpenSearchModal();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center bg-white rounded-xl border border-stone-300 shadow-sm transition-all duration-200 group-focus-within:border-stone-900 group-focus-within:shadow-md group-hover:border-stone-400">
          <div className="pl-4 pr-2 text-stone-400 group-focus-within:text-stone-900 transition-colors">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Que cherchez-vous ? Un outil, un prompt, un tutoriel..."
            className="w-full py-4 pr-28 text-sm sm:text-base text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-hidden"
          />

          <div className="absolute right-2.5 flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded border border-stone-200">
              <span>⌘</span>K
            </kbd>

            <button
              type="submit"
              className="inline-flex items-center justify-center p-2 sm:px-4 sm:py-2 rounded-lg bg-stone-900 hover:bg-blue-900 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">Explorer</span>
              <ArrowRight className="w-4 h-4 sm:ml-1" />
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Quick Searches */}
      <div className="mt-3.5 flex items-center justify-center flex-wrap gap-2 text-xs text-stone-600">
        <span className="text-stone-400">Suggestions :</span>
        {[
          { label: 'Mistral Le Chat', path: '/outils/mistral-le-chat' },
          { label: 'Claude 3.5', path: '/outils/claude-3-5-sonnet' },
          { label: 'Guide RAG', path: '/tutos/creer-un-moteur-rag-souverain-avec-mistral' },
          { label: 'Prompt SEO', path: '/prompts/prompt-audit-semantique-page-web' },
          { label: 'Cursor', path: '/outils/cursor-editor' },
          { label: 'Midjourney v6', path: '/outils/midjourney-v6' }
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => onDirectSearch ? onDirectSearch(item.label) : onOpenSearchModal()}
            type="button"
            className="bg-white/80 hover:bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md border border-stone-200/90 text-xs transition-colors cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const SearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (path: string) => void;
  initialQuery?: string;
}> = ({ isOpen, onClose, onSelectResult, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'outils' | 'tutos' | 'prompts' | 'comparatifs'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered from outside
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search Results Filtering
  const matchedTools = TOOLS.filter(t => 
    !normalizedQuery || 
    t.name.toLowerCase().includes(normalizedQuery) ||
    (t.tagline || t.shortDescription || '').toLowerCase().includes(normalizedQuery) ||
    t.category.toLowerCase().includes(normalizedQuery) ||
    (t.tags || t.subcategories || []).some(tag => tag.toLowerCase().includes(normalizedQuery))
  );

  const matchedTutos = TUTORIALS.filter(t =>
    !normalizedQuery ||
    t.title.toLowerCase().includes(normalizedQuery) ||
    t.excerpt.toLowerCase().includes(normalizedQuery) ||
    t.category.toLowerCase().includes(normalizedQuery)
  );

  const matchedPrompts = PROMPTS.filter(p =>
    !normalizedQuery ||
    p.title.toLowerCase().includes(normalizedQuery) ||
    (p.description || p.instructions || p.useCase || '').toLowerCase().includes(normalizedQuery) ||
    p.category.toLowerCase().includes(normalizedQuery)
  );

  const matchedComparisons = COMPARISONS.filter(c =>
    !normalizedQuery ||
    c.title.toLowerCase().includes(normalizedQuery) ||
    (c.subtitle || c.introduction || '').toLowerCase().includes(normalizedQuery) ||
    c.toolA.name.toLowerCase().includes(normalizedQuery) ||
    c.toolB.name.toLowerCase().includes(normalizedQuery)
  );

  const handleSelect = (path: string) => {
    onSelectResult(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/40 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher parmi 450+ outils, guides, prompts et comparatifs..."
            className="w-full text-base text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-medium text-stone-500 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded cursor-pointer transition-colors"
          >
            Échap
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
              activeFilter === 'all' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Tout ({matchedTools.length + matchedTutos.length + matchedPrompts.length + matchedComparisons.length})
          </button>
          <button
            onClick={() => setActiveFilter('outils')}
            className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
              activeFilter === 'outils' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Outils ({matchedTools.length})
          </button>
          <button
            onClick={() => setActiveFilter('tutos')}
            className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
              activeFilter === 'tutos' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Tutos ({matchedTutos.length})
          </button>
          <button
            onClick={() => setActiveFilter('prompts')}
            className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
              activeFilter === 'prompts' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Prompts ({matchedPrompts.length})
          </button>
          <button
            onClick={() => setActiveFilter('comparatifs')}
            className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
              activeFilter === 'comparatifs' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Comparatifs ({matchedComparisons.length})
          </button>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto divide-y divide-stone-100 p-2 text-sm">
          {/* Tools */}
          {(activeFilter === 'all' || activeFilter === 'outils') && matchedTools.length > 0 && (
            <div className="py-2">
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                Outils IA
              </span>
              {matchedTools.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleSelect(`/outils/${t.slug}`)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-stone-100 flex items-center justify-between gap-3 group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded flex items-center justify-center font-bold text-xs text-stone-800 shrink-0 border border-stone-200/80"
                      style={{ backgroundColor: t.logoBg }}
                    >
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900 group-hover:text-blue-900">
                          {t.name}
                        </span>
                        <span className="text-[11px] text-stone-500 font-medium">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-1">
                        {t.tagline}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded shrink-0">
                    {t.pricingType}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Tutos */}
          {(activeFilter === 'all' || activeFilter === 'tutos') && matchedTutos.length > 0 && (
            <div className="py-2">
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                Tutoriels & Guides
              </span>
              {matchedTutos.map(tut => (
                <button
                  key={tut.id}
                  onClick={() => handleSelect(`/tutos/${tut.slug}`)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-stone-100 flex items-center justify-between gap-3 group transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-semibold text-stone-900 group-hover:text-blue-900 block">
                      {tut.title}
                    </span>
                    <span className="text-xs text-stone-500 line-clamp-1">
                      {tut.excerpt}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 shrink-0">
                    {tut.readTime}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Prompts */}
          {(activeFilter === 'all' || activeFilter === 'prompts') && matchedPrompts.length > 0 && (
            <div className="py-2">
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                Prompts prêts à l'emploi
              </span>
              {matchedPrompts.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(`/prompts/${p.slug}`)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-stone-100 flex items-center justify-between gap-3 group transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-semibold text-stone-900 group-hover:text-blue-900 block">
                      {p.title}
                    </span>
                    <span className="text-xs text-stone-500 line-clamp-1">
                      {p.description}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-stone-400 shrink-0">
                    {p.recommendedModels?.[0] || p.compatibleTools?.[0] || ''}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Comparisons */}
          {(activeFilter === 'all' || activeFilter === 'comparatifs') && matchedComparisons.length > 0 && (
            <div className="py-2">
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                Comparatifs de modèles
              </span>
              {matchedComparisons.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(`/comparatifs/${c.slug}`)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-stone-100 flex items-center justify-between gap-3 group transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-semibold text-stone-900 group-hover:text-blue-900 block">
                      {c.title}
                    </span>
                    <span className="text-xs text-stone-500 line-clamp-1">
                      {c.subtitle}
                    </span>
                  </div>
                  <span className="text-xs text-blue-900 font-semibold shrink-0">
                    Face-à-face
                  </span>
                </button>
              ))}
            </div>
          )}

          {matchedTools.length === 0 && matchedTutos.length === 0 && matchedPrompts.length === 0 && matchedComparisons.length === 0 && (
            <div className="p-8 text-center text-stone-500">
              <p className="text-sm">Aucun résultat trouvé pour « {query} ».</p>
              <p className="text-xs text-stone-400 mt-1">Essayez avec un autre mot-clé (ex: Mistral, prompt, code, image...)</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
          <span>Prisme IA — Répertoire & Observatoire</span>
          <div className="flex items-center gap-3">
            <span>Navigation instantanée</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewsletterBox: React.FC<{ id?: string }> = ({ id }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Veuillez renseigner votre adresse email.');
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

  return (
    <div id={id} className="relative bg-stone-900 text-white rounded-xl p-8 sm:p-10 overflow-hidden border border-stone-800">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3 bg-blue-950/60 px-2.5 py-1 rounded border border-blue-800/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span>L'Observatoire Hebdo</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 font-serif-editorial">
          La veille stratégique IA que lisent les décideurs et créateurs francophones.
        </h2>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
          Chaque jeudi matin à 8h00 : 3 outils vérifiés et passés au crible, 1 décryptage stratégique indépendant, 1 cas d'usage décortiqué et strictement aucun contenu sponsorisé masqué.
        </p>

        {successMessage ? (
          <div className="p-4 bg-emerald-950/60 border border-emerald-700/60 rounded-lg text-emerald-200 text-sm flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Inscription confirmée !</span>
              <span className="text-xs text-emerald-300/90">{successMessage}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="votre.email@professionnel.fr"
                className="px-4 py-3 text-sm text-white placeholder:text-stone-500 bg-stone-800/90 rounded-lg border border-stone-700 focus:outline-hidden focus:border-white w-full disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-3 rounded-lg bg-white text-stone-900 font-semibold text-sm hover:bg-stone-100 transition-colors shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Inscription...' : "S'inscrire"}
              </button>
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 px-3 py-1.5 rounded">
                {errorMessage}
              </p>
            )}
          </form>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400">
          <span>Édition hebdomadaire le jeudi à 8h</span>
          <span>•</span>
          <span>Désinscription en 1 clic</span>
          <span>•</span>
          <span>Conforme RGPD</span>
        </div>
      </div>
    </div>
  );
};

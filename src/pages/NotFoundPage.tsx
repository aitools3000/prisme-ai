import React from 'react';
import { AppLink } from '../components/common/AppLink';
import { SEOHead } from '../components/seo/SEOHead';
import { ArrowLeft, Compass, Search, Wrench, BookOpen, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const NotFoundPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-8">
      <SEOHead
        title="Page introuvable (404) | Prisme IA"
        description="La page que vous recherchez n'existe pas ou a été déplacée. Explorez nos sélections d'outils d'IA, tutoriels et comparatifs."
        canonicalPath="/404"
      />

      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 bg-stone-100 px-3 py-1 rounded">
          Erreur 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-stone-900">
          Cette page semble introuvable
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto font-normal">
          Le lien que vous avez suivi est peut-être erroné, ou le contenu a été réorganisé dans une catégorie plus pertinente.
        </p>
      </div>

      {/* Suggested routes */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <AppLink
          to="/outils"
          className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-900 transition-colors group"
        >
          <Wrench className="w-5 h-5 text-stone-700 mb-2 group-hover:text-stone-950" />
          <h3 className="text-xs sm:text-sm font-semibold text-stone-900">Répertoire d'outils</h3>
          <p className="text-xs text-stone-500 mt-1">Fiches détaillées, avis et tests vérifiés.</p>
        </AppLink>

        <AppLink
          to="/tutos"
          className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-900 transition-colors group"
        >
          <BookOpen className="w-5 h-5 text-stone-700 mb-2 group-hover:text-stone-950" />
          <h3 className="text-xs sm:text-sm font-semibold text-stone-900">Tutoriels pratiques</h3>
          <p className="text-xs text-stone-500 mt-1">Guides pas-à-pas et implémentations concrètes.</p>
        </AppLink>

        <AppLink
          to="/comparatifs"
          className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-900 transition-colors group"
        >
          <Layers className="w-5 h-5 text-stone-700 mb-2 group-hover:text-stone-950" />
          <h3 className="text-xs sm:text-sm font-semibold text-stone-900">Comparatifs neutres</h3>
          <p className="text-xs text-stone-500 mt-1">Face-à-face objectifs selon vos cas d'usage.</p>
        </AppLink>
      </div>

      <div className="pt-6 border-t border-stone-200 flex items-center justify-center gap-4">
        <AppLink
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </AppLink>
      </div>
    </div>
  );
};

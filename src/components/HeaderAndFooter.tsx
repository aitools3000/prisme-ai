import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, Sparkles, Mail, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Outils IA', path: '/outils' },
    { label: 'Tutos', path: '/tutos' },
    { label: 'Prompts', path: '/prompts' },
    { label: 'Comparatifs', path: '/comparatifs' },
    { label: 'Bons Plans', path: '/bons-plans' },
    { label: 'Blog', path: '/blog' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      id="main-site-header"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled 
          ? 'bg-stone-50/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs' 
          : 'bg-stone-50/80 backdrop-blur-sm border-b border-stone-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleLinkClick('/')}
            type="button"
            className="group flex items-center gap-2.5 text-left cursor-pointer focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded bg-stone-900 text-white flex items-center justify-center font-black text-sm tracking-widest shadow-xs transition-transform group-hover:scale-[1.03]">
              P
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-blue-900 transition-colors">
                PRISME
              </span>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded font-mono">
                IA
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  type="button"
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    active
                      ? 'text-stone-950 bg-stone-200/60 font-semibold'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/80'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            type="button"
            aria-label="Recherche rapide"
            className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-stone-500 bg-white hover:bg-stone-100/80 border border-stone-200 rounded-md transition-colors shadow-2xs cursor-pointer group"
          >
            <Search className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 transition-colors" />
            <span className="hidden sm:inline font-medium">Rechercher...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] font-semibold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
              ⌘K
            </kbd>
          </button>

          {/* Newsletter CTA Button */}
          <button
            onClick={() => handleLinkClick('/newsletter')}
            type="button"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              isActive('/newsletter')
                ? 'bg-blue-900 text-white'
                : 'bg-stone-900 hover:bg-blue-900 text-white shadow-2xs'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Newsletter</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="lg:hidden p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* Mobile Search field shortcut */}
          <div className="pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              type="button"
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm bg-white border border-stone-200 rounded-lg text-stone-500 shadow-2xs"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-stone-400" />
                <span>Rechercher un outil, un guide, un prompt...</span>
              </span>
              <kbd className="font-mono text-xs bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                ⌘K
              </kbd>
            </button>
          </div>

          <nav className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  type="button"
                  className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-white border border-stone-200/80 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('/newsletter')}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-900 text-white font-semibold text-sm cursor-pointer shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>S'abonner à l'Observatoire Hebdo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <footer id="main-site-footer" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800 text-sm">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-white text-stone-950 flex items-center justify-center font-black text-sm tracking-widest">
                P
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                PRISME IA
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              L'observatoire et répertoire francophone indépendant de l'intelligence artificielle. Analyses rigoureuses, comparatifs impartiaux, tutoriels pas à pas et sélections vérifiées.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Indépendance éditoriale garantie • 0 complaisance commerciale</span>
            </div>
          </div>

          {/* Directory Column */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Explorer
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('/outils')} className="hover:text-white transition-colors cursor-pointer">
                  Annuaire des outils IA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tutos')} className="hover:text-white transition-colors cursor-pointer">
                  Guides & Tutoriels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/prompts')} className="hover:text-white transition-colors cursor-pointer">
                  Bibliothèque de Prompts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/comparatifs')} className="hover:text-white transition-colors cursor-pointer">
                  Comparatifs de Modèles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/bons-plans')} className="hover:text-white transition-colors cursor-pointer">
                  Bons plans & Réductions
                </button>
              </li>
            </ul>
          </div>

          {/* Topics Column */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Catégories phares
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('/outils?cat=texte')} className="hover:text-white transition-colors cursor-pointer">
                  Modèles de langage & Rédaction
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/outils?cat=image')} className="hover:text-white transition-colors cursor-pointer">
                  Génération d'images & Design
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/outils?cat=productivite')} className="hover:text-white transition-colors cursor-pointer">
                  Productivité & Synthèse
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/outils?cat=automatisation')} className="hover:text-white transition-colors cursor-pointer">
                  Workflows & Automatisation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/outils?cat=audio')} className="hover:text-white transition-colors cursor-pointer">
                  Synthèse vocale & Audio
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial & About */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              À propos
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('/blog')} className="hover:text-white transition-colors cursor-pointer">
                  Le Magazine éditorial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/newsletter')} className="hover:text-white transition-colors cursor-pointer">
                  L'Observatoire Hebdo
                </button>
              </li>
              <li>
                <span className="text-stone-500">Charte de test & déontologie</span>
              </li>
              <li>
                <span className="text-stone-500">Proposer un outil (Vérification)</span>
              </li>
              <li>
                <span className="text-stone-500">Mentions légales & RGPD</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Prisme IA. Tous droits réservés. Édition francophone indépendante.</p>
          <div className="flex items-center gap-6">
            <span>Hébergé en France & Union Européenne</span>
            <span>•</span>
            <span>Respect du secret des affaires</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

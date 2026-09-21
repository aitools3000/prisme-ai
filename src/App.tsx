import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components/HeaderAndFooter';
import { SearchModal } from './components/SearchAndNewsletter';
import { HomePage } from './pages/HomePage';
import { ToolDirectoryPage } from './pages/ToolDirectoryPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { CategoryLandingPage } from './pages/CategoryLandingPage';
import { TutorialsPage, TutorialDetailPage } from './pages/TutorialsPages';
import { PromptsPage, PromptDetailPage } from './pages/PromptsPages';
import { ComparisonsPage, ComparisonDetailPage } from './pages/ComparisonsPages';
import { DealsPage, DealDetailPage } from './pages/DealsPages';
import { BlogPage, ArticleDetailPage } from './pages/BlogPages';
import { NewsletterPage } from './pages/NewsletterPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top upon route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  // Routing logic
  const renderRoute = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenSearch={() => setSearchModalOpen(true)}
        />
      );
    }

    // 2. Outils & Catégories
    if (currentPath.startsWith('/outils/categorie/')) {
      const slug = currentPath.replace('/outils/categorie/', '').split('?')[0];
      return <CategoryLandingPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/categories/')) {
      const slug = currentPath.replace('/categories/', '').split('?')[0];
      return <CategoryLandingPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/outils' || currentPath.startsWith('/outils?')) {
      const urlParams = new URLSearchParams(currentPath.split('?')[1] || '');
      const cat = urlParams.get('cat') || undefined;
      const q = urlParams.get('q') || undefined;
      return (
        <ToolDirectoryPage
          onNavigate={navigate}
          initialCategory={cat}
          initialQuery={q}
        />
      );
    }

    if (currentPath.startsWith('/outils/')) {
      const slug = currentPath.replace('/outils/', '').split('?')[0];
      return <ToolDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 3. Tutos
    if (currentPath === '/tutos' || currentPath.startsWith('/tutos?')) {
      return <TutorialsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/tutos/')) {
      const slug = currentPath.replace('/tutos/', '').split('?')[0];
      return <TutorialDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 4. Prompts
    if (currentPath === '/prompts' || currentPath.startsWith('/prompts?')) {
      return <PromptsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/prompts/')) {
      const slug = currentPath.replace('/prompts/', '').split('?')[0];
      return <PromptDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 5. Comparatifs
    if (currentPath === '/comparatifs' || currentPath.startsWith('/comparatifs?')) {
      return <ComparisonsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/comparatifs/')) {
      const slug = currentPath.replace('/comparatifs/', '').split('?')[0];
      return <ComparisonDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 6. Bons Plans
    if (currentPath === '/bons-plans' || currentPath.startsWith('/bons-plans?')) {
      return <DealsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/bons-plans/')) {
      const slug = currentPath.replace('/bons-plans/', '').split('?')[0];
      return <DealDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 7. Blog
    if (currentPath === '/blog' || currentPath.startsWith('/blog?')) {
      return <BlogPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').split('?')[0];
      return <ArticleDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 8. Newsletter
    if (currentPath === '/newsletter' || currentPath.startsWith('/newsletter?')) {
      return <NewsletterPage onNavigate={navigate} />;
    }

    // Fallback 404
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-stone-900">Page introuvable</h1>
        <p className="text-stone-600 text-sm">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 font-sans selection:bg-blue-900 selection:text-white">
      {/* Universal Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={navigate} />

      {/* Universal Search Modal (Cmd+K) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={(path) => navigate(path)}
      />
    </div>
  );
}

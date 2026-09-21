import React from 'react';
import { 
  FileText, Image, Video, Mic, Zap, MessageSquare, 
  TrendingUp, Search, Workflow, Presentation, ArrowRight
} from 'lucide-react';
import { CategoryInfo, TutorialItem } from '../types';
import { Badge } from './Badge';

interface CategoryCardProps {
  category: CategoryInfo;
  onSelect: (slug: string) => void;
  active?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-5 h-5 text-stone-700" />,
  Image: <Image className="w-5 h-5 text-stone-700" />,
  Video: <Video className="w-5 h-5 text-stone-700" />,
  Mic: <Mic className="w-5 h-5 text-stone-700" />,
  Zap: <Zap className="w-5 h-5 text-stone-700" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-stone-700" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-stone-700" />,
  Search: <Search className="w-5 h-5 text-stone-700" />,
  Workflow: <Workflow className="w-5 h-5 text-stone-700" />,
  Presentation: <Presentation className="w-5 h-5 text-stone-700" />
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect, active }) => {
  return (
    <button
      onClick={() => onSelect(category.slug)}
      type="button"
      className={`group w-full text-left p-4 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
        active 
          ? 'bg-blue-50/80 border-blue-900 text-blue-950 shadow-xs' 
          : 'bg-white border-stone-200/90 text-stone-900 hover:border-stone-400 hover:shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="w-9 h-9 rounded bg-stone-100/90 border border-stone-200/80 flex items-center justify-center shrink-0 group-hover:bg-stone-200/70 transition-colors">
          {ICON_MAP[category.icon] || <FileText className="w-5 h-5 text-stone-700" />}
        </div>
        <span className="text-xs font-mono font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
          {category.toolCount} outils
        </span>
      </div>

      <div>
        <h4 className="font-semibold text-sm tracking-tight text-stone-900 group-hover:text-blue-950 transition-colors">
          {category.name}
        </h4>
        <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-snug">
          {category.description}
        </p>
      </div>
    </button>
  );
};

export const TutorialCard: React.FC<{ tutorial: TutorialItem; onSelect: (slug: string) => void }> = ({
  tutorial,
  onSelect
}) => {
  return (
    <article
      onClick={() => onSelect(tutorial.slug)}
      className="group bg-white border border-stone-200/90 rounded-lg p-5 flex flex-col justify-between h-full transition-all duration-200 hover:border-stone-400 hover:shadow-sm cursor-pointer"
    >
      <div>
        {/* Metadata row */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-3 gap-2 flex-wrap">
          <span className="font-semibold text-blue-900">{tutorial.category}</span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-500">{tutorial.readTime}</span>
            <Badge 
              variant={tutorial.difficulty === 'Débutant' ? 'success' : tutorial.difficulty === 'Intermédiaire' ? 'neutral' : 'warning'}
              size="sm"
            >
              {tutorial.difficulty}
            </Badge>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-stone-900 leading-snug group-hover:text-blue-900 transition-colors mb-2">
          {tutorial.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
          {tutorial.excerpt}
        </p>

        {/* Tools used */}
        {((tutorial.toolsUsed && tutorial.toolsUsed.length > 0) || (tutorial.relatedTools && tutorial.relatedTools.length > 0)) && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(tutorial.toolsUsed || tutorial.relatedTools || []).map((tool, idx) => (
              <span key={idx} className="text-[11px] font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200/60">
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Author & Footer */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs mt-auto">
        <div className="flex items-center gap-2">
          <img 
            src={tutorial.author.avatar} 
            alt={tutorial.author.name}
            className="w-6 h-6 rounded-full object-cover border border-stone-200"
          />
          <span className="text-stone-700 font-medium">{tutorial.author.name}</span>
        </div>

        <span className="font-semibold text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          Lire le guide <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};

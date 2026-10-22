import React from 'react';
import { useApp } from '../../context/AppContext';
import { ToolItem } from '../../types';
import { 
  Heart, 
  ArrowRight, 
  Image, 
  QrCode, 
  FileText, 
  Youtube, 
  Calculator, 
  Code, 
  ShieldCheck, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Image,
  QrCode,
  FileText,
  Youtube,
  Calculator,
  Code,
  ShieldCheck,
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { lang, t, navigateTo, isFavorite, toggleFavorite, showToast } = useApp();
  const favorited = isFavorite(tool.id);

  const IconComponent = ICON_MAP[tool.iconName] || Sparkles;

  const handleCardClick = () => {
    if (tool.isExternal && tool.externalUrl) {
      window.open(tool.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigateTo(tool.route);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"
    >
      <div>
        {/* Top Header: Icon & Favorite Toggle */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:bg-indigo-500/20">
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {tool.badge[lang]}
              </span>
            )}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                toggleFavorite(tool.id);
                showToast(favorited ? t.toolPage.favoriteRemove : t.toolPage.favoriteAdd);
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                favorited
                  ? 'text-rose-500 bg-rose-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title={favorited ? t.toolPage.favoriteRemove : t.toolPage.favoriteAdd}
              aria-label={favorited ? t.toolPage.favoriteRemove : t.toolPage.favoriteAdd}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
          {tool.name[lang]}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {tool.shortDesc[lang]}
        </p>
      </div>

      {/* Bottom Footer: Category & Action */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="capitalize text-slate-400 font-medium bg-slate-800/60 px-2.5 py-1 rounded-md">
          {tool.category}
        </span>

        <span className="font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
          <span>{t.popularTools.openTool}</span>
          {tool.isExternal ? (
            <ExternalLink className="w-3.5 h-3.5" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          )}
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/common/ToolCard';
import { Heart, Trash2, ArrowRight, Sparkles } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { t, favorites, clearFavorites, navigateTo, showToast } = useApp();

  const favoriteTools = TOOLS.filter(tool => favorites.includes(tool.id));

  const handleClear = () => {
    if (window.confirm(t.favoritesPage.confirmClear)) {
      clearFavorites();
      showToast('Barcha sevimlilar tozalandi');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20 mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            <span>{t.favoritesPage.title}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {t.favoritesPage.title}
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            {t.favoritesPage.subtitle}
          </p>
        </div>

        {favoriteTools.length > 0 && (
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 border border-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.favoritesPage.clearAll}</span>
          </button>
        )}
      </div>

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 rounded-3xl bg-slate-900/40 border border-slate-800">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">{t.favoritesPage.emptyTitle}</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            {t.favoritesPage.emptyDesc}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('tools')}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-lg shadow-indigo-600/30 inline-flex items-center gap-2"
            >
              <span>{t.favoritesPage.browseTools}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

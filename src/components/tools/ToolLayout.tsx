import React from 'react';
import { useApp } from '../../context/AppContext';
import { ToolItem } from '../../types';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  ShieldCheck, 
  HelpCircle, 
  Check 
} from 'lucide-react';

interface ToolLayoutProps {
  tool: ToolItem;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, children }) => {
  const { lang, t, navigateTo, isFavorite, toggleFavorite, showToast } = useApp();
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);

  const favorited = isFavorite(tool.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast(t.toolPage.copied);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigateTo('tools')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-100 dark:hover:text-white transition-colors cursor-pointer group"
          aria-label={t.toolPage.backToTools}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{t.toolPage.backToTools}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp(prev => !prev)}
            className={`p-2 rounded-lg text-sm border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showHelp
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900/60 dark:bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-slate-600'
            }`}
            title={t.toolPage.instructions}
            aria-label={t.toolPage.instructions}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium">{t.toolPage.instructions}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg text-sm bg-slate-900/60 dark:bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-600 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Havolani ulashish"
            aria-label="Share tool link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              toggleFavorite(tool.id);
              showToast(favorited ? t.toolPage.favoriteRemove : t.toolPage.favoriteAdd);
            }}
            className={`p-2 rounded-lg text-sm border transition-colors flex items-center gap-1.5 cursor-pointer ${
              favorited
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                : 'bg-slate-900/60 dark:bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-slate-600'
            }`}
            title={favorited ? t.toolPage.favoriteRemove : t.toolPage.favoriteAdd}
            aria-label={favorited ? t.toolPage.favoriteRemove : t.toolPage.favoriteAdd}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 capitalize">
            {tool.category}
          </span>
          {tool.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {tool.badge[lang]}
            </span>
          )}
          <div className="flex items-center gap-1 text-xs text-emerald-400 ml-auto bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Client-Side Privacy</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {tool.name[lang]}
        </h1>
        <p className="mt-2 text-base text-slate-300 max-w-3xl leading-relaxed">
          {tool.shortDesc[lang]}
        </p>
      </div>

      {/* Expandable Instructions */}
      {showHelp && (
        <div className="mb-8 p-5 rounded-xl bg-indigo-950/20 border border-indigo-800/40 text-slate-200 dark:text-slate-200 animate-fade-in">
          <div className="flex items-center gap-2 font-semibold text-indigo-300 mb-3">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h3>{t.toolPage.instructions}</h3>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300 dark:text-slate-300">
            {tool.instructions[lang].map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="font-normal">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Main Tool Content Card */}
      <div className="bg-slate-900/70 dark:bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl shadow-black/20">
        {children}
      </div>

      {/* Privacy Guarantee Note */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>{t.toolPage.privacyNotice}</span>
      </div>
    </div>
  );
};

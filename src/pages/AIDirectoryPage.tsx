import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AI_SERVICES } from '../data/tools';
import { AIServiceCard } from '../components/common/AIServiceCard';
import { Search, Sparkles, ShieldCheck, X, Bot } from 'lucide-react';

export const AIDirectoryPage: React.FC = () => {
  const { lang, t } = useApp();

  const [search, setSearch] = useState<string>('');
  const [pricingFilter, setPricingFilter] = useState<'all' | 'Free' | 'Freemium' | 'Paid'>('all');

  const filteredServices = useMemo(() => {
    return AI_SERVICES.filter(service => {
      // Pricing filter
      if (pricingFilter !== 'all' && service.pricing !== pricingFilter) {
        return false;
      }

      // Search query
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const nameMatch = service.name.toLowerCase().includes(query);
        const taglineMatch = service.tagline[lang].toLowerCase().includes(query);
        const descMatch = service.description[lang].toLowerCase().includes(query);
        const tagMatch = service.tags.some(tag => tag.toLowerCase().includes(query));

        if (!nameMatch && !taglineMatch && !descMatch && !tagMatch) {
          return false;
        }
      }

      return true;
    });
  }, [search, pricingFilter, lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>{t.aiDirectoryPage.title}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {t.aiDirectoryPage.title}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {t.aiDirectoryPage.subtitle}
        </p>
      </div>

      {/* Verified Notice Banner */}
      <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-800/40 text-xs text-violet-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t.aiDirectoryPage.verifiedNote}</span>
        </div>
        <span className="font-mono text-emerald-400 font-bold hidden sm:inline">
          {AI_SERVICES.length} ta xizmat
        </span>
      </div>

      {/* Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="AI xizmatlarini qidiring... (ChatGPT, Claude, v0)"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Pricing Filter Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'Free', 'Freemium', 'Paid'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPricingFilter(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                pricingFilter === p
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              {p === 'all'
                ? t.aiDirectoryPage.allPricing
                : p === 'Free'
                ? t.aiDirectoryPage.free
                : p === 'Freemium'
                ? t.aiDirectoryPage.freemium
                : t.aiDirectoryPage.paid}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <AIServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3 rounded-2xl bg-slate-900/40 border border-slate-800">
          <Bot className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">Hech qanday AI xizmat topilmadi</h3>
          <p className="text-xs text-slate-400">Qidiruv yoki tarif filtrini tozalab ko‘ring.</p>
          <button
            onClick={() => {
              setSearch('');
              setPricingFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Filtrlarni tozalash
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOOLS, AI_SERVICES } from '../data/tools';
import { ToolCard } from '../components/common/ToolCard';
import { AIServiceCard } from '../components/common/AIServiceCard';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Compass, 
  Star,
  Image as ImageIcon,
  FileText,
  Video,
  Wrench,
  Code2,
  Bot
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { lang, t, navigateTo, searchQuery, setSearchQuery } = useApp();
  const [heroSearch, setHeroSearch] = useState('');

  const popularTools = TOOLS.filter(item => item.isPopular);
  const featuredAiServices = AI_SERVICES.slice(0, 6);

  const categories = [
    {
      id: 'image',
      icon: ImageIcon,
      name: t.categories.image,
      desc: t.categories.imageDesc,
      count: TOOLS.filter(tool => tool.category === 'image').length,
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-400 border-blue-500/20',
    },
    {
      id: 'text',
      icon: FileText,
      name: t.categories.text,
      desc: t.categories.textDesc,
      count: TOOLS.filter(tool => tool.category === 'text').length,
      color: 'from-amber-500/10 to-orange-500/10 text-amber-400 border-amber-500/20',
    },
    {
      id: 'creator',
      icon: Video,
      name: t.categories.creator,
      desc: t.categories.creatorDesc,
      count: TOOLS.filter(tool => tool.category === 'creator').length,
      color: 'from-rose-500/10 to-pink-500/10 text-rose-400 border-rose-500/20',
    },
    {
      id: 'productivity',
      icon: Wrench,
      name: t.categories.productivity,
      desc: t.categories.productivityDesc,
      count: TOOLS.filter(tool => tool.category === 'productivity').length,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'developer',
      icon: Code2,
      name: t.categories.developer,
      desc: t.categories.developerDesc,
      count: TOOLS.filter(tool => tool.category === 'developer').length,
      color: 'from-purple-500/10 to-indigo-500/10 text-purple-400 border-purple-500/20',
    },
    {
      id: 'ai-directory',
      icon: Bot,
      name: t.categories.aiDirectory,
      desc: t.categories.aiDirectoryDesc,
      count: AI_SERVICES.length,
      color: 'from-violet-500/10 to-fuchsia-500/10 text-violet-400 border-violet-500/20',
    },
  ];

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch);
      navigateTo('tools');
    }
  };

  return (
    <div className="space-y-20 lg:space-y-28">
      {/* SECTION A: HERO */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-12 text-center overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/20 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>{' '}
            {t.hero.titleMain}
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 dark:text-slate-300 leading-relaxed font-normal">
            {t.hero.subtitle}
          </p>

          {/* Prominent Search Bar */}
          <form
            onSubmit={handleHeroSearchSubmit}
            className="max-w-xl mx-auto relative flex items-center pt-2"
          >
            <div className="relative w-full">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={heroSearch}
                onChange={e => setHeroSearch(e.target.value)}
                placeholder={t.nav.searchPlaceholder}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-12 pr-28 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xl transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors shadow-md shadow-indigo-600/30 cursor-pointer"
              >
                {t.nav.quickSearch}
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => navigateTo('tools')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2 cursor-pointer"
            >
              <span>{t.hero.ctaAllTools}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('ai-directory')}
              className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>{t.hero.ctaAiDirectory}</span>
            </button>
          </div>

          {/* Micro Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-2xl mx-auto border-t border-slate-800/60 text-slate-400 text-xs">
            <div>
              <div className="text-lg font-bold text-white font-mono">{TOOLS.length}+</div>
              <div>{t.hero.statTools}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-violet-400 font-mono">{AI_SERVICES.length}+</div>
              <div>{t.hero.statAi}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-400 font-mono">{t.hero.statSpeed}</div>
              <div>Client-Side Speed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-indigo-400 font-mono">100%</div>
              <div>{t.hero.statFree}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: POPULAR TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Star className="w-4 h-4" />
              <span>Ommabop Asboblar / Popular Tools</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.popularTools.title}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {t.popularTools.subtitle}
            </p>
          </div>

          <button
            onClick={() => navigateTo('tools')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
          >
            <span>{t.popularTools.exploreAll}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* SECTION C: BROWSE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.categories.title}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {t.categories.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'ai-directory') {
                    navigateTo('ai-directory');
                  } else {
                    navigateTo(`tools?category=${cat.id}`);
                  }
                }}
                className={`p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer group flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 bg-gradient-to-tr ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                      {cat.count} {cat.id === 'ai-directory' ? 'xizmat' : 'asbob'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-end text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span className="flex items-center gap-1">
                    <span>Ko‘rish</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION D: HOW TOOLORA WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.howItWorks.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/40 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4 text-base">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {t.howItWorks.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.howItWorks.step1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/40 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mb-4 text-base">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {t.howItWorks.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.howItWorks.step2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/40 relative">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold flex items-center justify-center mb-4 text-base">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {t.howItWorks.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.howItWorks.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: FEATURED AI SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>AI Katalogi / Curated AI Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.featuredAi.title}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {t.featuredAi.subtitle}
            </p>
          </div>

          <button
            onClick={() => navigateTo('ai-directory')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
          >
            <span>{t.featuredAi.exploreDirectory}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAiServices.map(service => (
            <AIServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
};

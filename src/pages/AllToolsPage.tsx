import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/common/ToolCard';
import { Category } from '../types';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  X, 
  Frown, 
  Sparkles,
  Layers
} from 'lucide-react';

export const AllToolsPage: React.FC = () => {
  const { lang, t, searchQuery, setSearchQuery } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'name-asc' | 'name-desc'>('popular');

  // Check URL query parameters on mount or hash change
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('category=')) {
      const match = hash.match(/category=([a-z-]+)/);
      if (match && match[1]) {
        setSelectedCategory(match[1] as Category);
      }
    }
  }, []);

  const categoriesList: { id: Category; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'image', label: t.categories.image },
    { id: 'text', label: t.categories.text },
    { id: 'creator', label: t.categories.creator },
    { id: 'productivity', label: t.categories.productivity },
    { id: 'developer', label: t.categories.developer },
  ];

  // Filtering & Sorting
  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      // Category match
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch =
          tool.name.uz.toLowerCase().includes(query) ||
          tool.name.en.toLowerCase().includes(query);
        const descMatch =
          tool.shortDesc.uz.toLowerCase().includes(query) ||
          tool.shortDesc.en.toLowerCase().includes(query);
        const tagMatch = tool.tags.some(tag => tag.toLowerCase().includes(query));

        if (!nameMatch && !descMatch && !tagMatch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
      if (sortBy === 'name-asc') {
        return a.name[lang].localeCompare(b.name[lang]);
      }
      if (sortBy === 'name-desc') {
        return b.name[lang].localeCompare(a.name[lang]);
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy, lang]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {t.directory.allToolsTitle}
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">
          {t.directory.allToolsSubtitle}
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.directory.sortBy}</span>
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="popular">{t.directory.sortPopular}</option>
              <option value="name-asc">{t.directory.sortNameAsc}</option>
              <option value="name-desc">{t.directory.sortNameDesc}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-indigo-400" />
            <span>Kategoriya:</span>
          </span>
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          <strong className="text-white font-bold">{filteredTools.length}</strong> {t.directory.searchCount}
        </span>
        {(selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
          >
            {t.directory.resetFilters}
          </button>
        )}
      </div>

      {/* Tools Cards Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400">
            <Frown className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">{t.directory.noResultsTitle}</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            {t.directory.noResultsDesc}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
            >
              {t.directory.resetFilters}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

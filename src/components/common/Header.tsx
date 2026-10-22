import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wrench, 
  Search, 
  Heart, 
  Sparkles, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Globe, 
  Grid, 
  Home, 
  Info,
  Check
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    lang, 
    setLang, 
    t, 
    theme, 
    toggleTheme, 
    currentRoute, 
    navigateTo, 
    favorites,
    searchQuery,
    setSearchQuery,
    setIsAboutOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentRoute]);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'tools', label: t.nav.allTools, icon: Wrench },
    { id: 'ai-directory', label: t.nav.aiDirectory, icon: Sparkles },
    { id: 'categories', label: t.nav.categories, icon: Grid },
    { 
      id: 'favorites', 
      label: t.nav.favorites, 
      icon: Heart, 
      badge: favorites.length > 0 ? favorites.length : undefined 
    },
  ];

  const handleNavClick = (routeId: string) => {
    navigateTo(routeId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo Brand */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Toolora
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 hidden sm:inline">
                Digital Utilities
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  if (currentRoute !== 'tools' && e.target.value.trim().length > 0) {
                    navigateTo('tools');
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && currentRoute !== 'tools') {
                    navigateTo('tools');
                  }
                }}
                placeholder={t.nav.searchPlaceholder}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id || (item.id === 'home' && currentRoute === '');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white bg-slate-800/90 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => setIsAboutOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.nav.about}</span>
            </button>
          </nav>

          {/* Right Action Tools: Language, Theme, Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(prev => !prev)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label={t.nav.language}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span className="uppercase">{lang}</span>
              </button>

              {langMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1 z-50 animate-fade-in"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      setLang('uz');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between cursor-pointer ${
                      lang === 'uz' ? 'text-indigo-400 bg-indigo-500/10 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>O‘zbekcha</span>
                    {lang === 'uz' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setLang('en');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between cursor-pointer ${
                      lang === 'en' ? 'text-indigo-400 bg-indigo-500/10 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>English</span>
                    {lang === 'en' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title={t.nav.themeToggle}
              aria-label={t.nav.themeToggle}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.menu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 pt-4 pb-6 space-y-4 animate-fade-in">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                if (currentRoute !== 'tools') navigateTo('tools');
              }}
              placeholder={t.nav.searchPlaceholder}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id || (item.id === 'home' && currentRoute === '');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                    isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => {
                setIsAboutOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-900 transition-colors text-left cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>{t.nav.about}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

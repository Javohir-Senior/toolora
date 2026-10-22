import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme } from '../types';
import { translations } from '../i18n/translations';

interface AppContextType {
  // Language
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.uz;

  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Route
  currentRoute: string;
  navigateTo: (route: string) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;

  // Recents
  recents: string[];
  addRecent: (id: string) => void;

  // Global Modals
  isAboutOpen: boolean;
  setIsAboutOpen: (val: boolean) => void;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (val: boolean) => void;
  isTermsOpen: boolean;
  setIsTermsOpen: (val: boolean) => void;
  isFeedbackOpen: boolean;
  setIsFeedbackOpen: (val: boolean) => void;

  // Global search input
  searchQuery: string;
  setSearchQuery: (val: string) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language: Default to Uzbek
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('toolora_lang');
      if (saved === 'en' || saved === 'uz') return saved;
    } catch {
      // Fallback
    }
    return 'uz';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('toolora_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  // Theme: Default to Dark
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('toolora_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('toolora_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Routing via window.location.hash
  const getRouteFromHash = (): string => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    window.location.hash = cleanRoute;
    setCurrentRoute(cleanRoute || 'home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('toolora_favorites');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['image-compressor', 'qr-generator']; // Useful defaults
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('toolora_favorites', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const clearFavorites = () => {
    setFavorites([]);
    try {
      localStorage.removeItem('toolora_favorites');
    } catch {
      // ignore
    }
  };

  // Recents
  const [recents, setRecents] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('toolora_recents');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const addRecent = (id: string) => {
    setRecents(prev => {
      const next = [id, ...prev.filter(item => item !== id)].slice(0, 8);
      try {
        localStorage.setItem('toolora_recents', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Modals
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const t = translations[lang] || translations.uz;

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        theme,
        toggleTheme,
        currentRoute,
        navigateTo,
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        recents,
        addRecent,
        isAboutOpen,
        setIsAboutOpen,
        isPrivacyOpen,
        setIsPrivacyOpen,
        isTermsOpen,
        setIsTermsOpen,
        isFeedbackOpen,
        setIsFeedbackOpen,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

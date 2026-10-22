import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { AllToolsPage } from './pages/AllToolsPage';
import { AIDirectoryPage } from './pages/AIDirectoryPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';

// Tools
import { ImageCompressor } from './components/tools/ImageCompressor';
import { QrCodeGenerator } from './components/tools/QrCodeGenerator';
import { TextFormatter } from './components/tools/TextFormatter';
import { YouTubeGenerator } from './components/tools/YouTubeGenerator';
import { WordCounter } from './components/tools/WordCounter';
import { JsonFormatter } from './components/tools/JsonFormatter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';

// Modals
import { AboutModal } from './components/modals/AboutModal';
import { PrivacyModal } from './components/modals/PrivacyModal';
import { TermsModal } from './components/modals/TermsModal';
import { FeedbackModal } from './components/modals/FeedbackModal';

const AppContent: React.FC = () => {
  const { currentRoute, toastMessage } = useApp();

  // Route dispatcher
  const renderCurrentView = () => {
    // Normalise route string (strip leading slash and query params for matching)
    const baseRoute = currentRoute.split('?')[0].replace(/^\//, '');

    switch (baseRoute) {
      case '':
      case 'home':
        return <HomePage />;
      case 'tools':
        return <AllToolsPage />;
      case 'ai-directory':
        return <AIDirectoryPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'favorites':
        return <FavoritesPage />;

      // Individual Tools
      case 'tool/image-compressor':
        return <ImageCompressor />;
      case 'tool/qr-generator':
        return <QrCodeGenerator />;
      case 'tool/text-formatter':
        return <TextFormatter />;
      case 'tool/youtube-generator':
        return <YouTubeGenerator />;
      case 'tool/word-counter':
        return <WordCounter />;
      case 'tool/json-formatter':
        return <JsonFormatter />;
      case 'tool/password-generator':
        return <PasswordGenerator />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header />
      <main className="flex-1 w-full">{renderCurrentView()}</main>
      <Footer />

      {/* Global Modals */}
      <AboutModal />
      <PrivacyModal />
      <TermsModal />
      <FeedbackModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium shadow-2xl shadow-black/50 flex items-center gap-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wrench, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    t, 
    navigateTo, 
    setIsAboutOpen, 
    setIsPrivacyOpen, 
    setIsTermsOpen, 
    setIsFeedbackOpen 
  } = useApp();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">Toolora</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.aboutText}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium bg-emerald-950/30 border border-emerald-800/40 px-3 py-1.5 rounded-xl w-fit">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{t.footer.clientSideGuarantee}</span>
            </div>
          </div>

          {/* Col 2: Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.toolsCol}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('tool/image-compressor')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Rasm Siqish (Image Compressor)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tool/qr-generator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  QR Kod Yaratuvchi (QR Generator)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tool/text-formatter')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Matn Formatlagich (Text Formatter)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tool/youtube-generator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  YouTube Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tool/word-counter')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  So‘z Hisoblagich (Word Counter)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.resourcesCol}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('tools')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.allTools}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('ai-directory')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.aiDirectoryLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('favorites')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.favoritesLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.aboutLink}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Feedback */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.legalCol}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.privacyLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.termsLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsFeedbackOpen(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{t.footer.contactLink}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{t.footer.copyright}</div>
          <div className="flex items-center gap-1">
            <span>Built with precision for creators in Uzbekistan & Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

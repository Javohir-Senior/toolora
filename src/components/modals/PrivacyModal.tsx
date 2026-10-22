import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Lock, HardDrive, ExternalLink } from 'lucide-react';

export const PrivacyModal: React.FC = () => {
  const { isPrivacyOpen, setIsPrivacyOpen, t } = useApp();

  if (!isPrivacyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <button
          onClick={() => setIsPrivacyOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label={t.privacyModal.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h2 id="privacy-modal-title" className="text-xl font-bold text-white">
            {t.privacyModal.title}
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-6">{t.privacyModal.lastUpdated}</p>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <div className="flex items-center gap-2 font-semibold text-emerald-300 mb-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              <h4>{t.privacyModal.section1Title}</h4>
            </div>
            <p className="leading-relaxed text-slate-300">
              {t.privacyModal.section1Text}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <div className="flex items-center gap-2 font-semibold text-indigo-300 mb-1.5">
              <HardDrive className="w-4 h-4 text-indigo-400" />
              <h4>{t.privacyModal.section2Title}</h4>
            </div>
            <p className="leading-relaxed text-slate-300">
              {t.privacyModal.section2Text}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <div className="flex items-center gap-2 font-semibold text-slate-200 mb-1.5">
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <h4>{t.privacyModal.section3Title}</h4>
            </div>
            <p className="leading-relaxed text-slate-300">
              {t.privacyModal.section3Text}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setIsPrivacyOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
          >
            {t.privacyModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};

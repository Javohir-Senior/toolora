import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Zap, Compass, Sparkles } from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen, t } = useApp();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
      >
        <button
          onClick={() => setIsAboutOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label={t.aboutModal.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-base">
            T
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Toolora</span>
        </div>

        <h2 id="about-modal-title" className="text-lg font-bold text-indigo-400 mb-4">
          {t.aboutModal.tagline}
        </h2>

        <div className="space-y-5 text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <div className="flex items-center gap-2 font-semibold text-white mb-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <h4>{t.aboutModal.missionTitle}</h4>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              {t.aboutModal.missionText}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h4>{t.aboutModal.localTitle}</h4>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              {t.aboutModal.localText}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <div className="flex items-center gap-2 font-semibold text-violet-400 mb-2">
              <Zap className="w-4 h-4 text-violet-400" />
              <h4>{t.aboutModal.roadmapTitle}</h4>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              {t.aboutModal.roadmapText}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setIsAboutOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer border border-slate-700"
          >
            {t.aboutModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};

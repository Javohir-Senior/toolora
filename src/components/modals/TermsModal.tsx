import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileText, CheckCircle } from 'lucide-react';

export const TermsModal: React.FC = () => {
  const { isTermsOpen, setIsTermsOpen, t } = useApp();

  if (!isTermsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
      >
        <button
          onClick={() => setIsTermsOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label={t.termsModal.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-6 h-6 text-indigo-400" />
          <h2 id="terms-modal-title" className="text-xl font-bold text-white">
            {t.termsModal.title}
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <h4 className="font-semibold text-white mb-1.5">{t.termsModal.section1Title}</h4>
            <p className="leading-relaxed text-slate-300">
              {t.termsModal.section1Text}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <h4 className="font-semibold text-white mb-1.5">{t.termsModal.section2Title}</h4>
            <p className="leading-relaxed text-slate-300">
              {t.termsModal.section2Text}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setIsTermsOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
          >
            {t.termsModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};

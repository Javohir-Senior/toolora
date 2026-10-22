import React from 'react';
import { useApp } from '../../context/AppContext';
import { AIServiceItem } from '../../types';
import { ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface AIServiceCardProps {
  service: AIServiceItem;
}

export const AIServiceCard: React.FC<AIServiceCardProps> = ({ service }) => {
  const { lang, t } = useApp();

  return (
    <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/80 border border-slate-800/80 hover:border-violet-500/50 hover:bg-slate-800/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-violet-500/5">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
            {service.category}
          </span>

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              service.pricing === 'Free'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : service.pricing === 'Freemium'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}
          >
            {service.pricing}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-base sm:text-lg font-bold text-slate-100">
            {service.name}
          </h3>
          <span title="Tekshirilgan rasmiy xizmat / Verified Official Service">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          </span>
        </div>

        <p className="text-xs font-medium text-violet-300/90 mb-2">
          {service.tagline[lang]}
        </p>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {service.description[lang]}
        </p>
      </div>

      {/* Footer Link */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-violet-400" />
          <span>{t.featuredAi.externalBadge}</span>
        </span>

        <a
          href={service.verifiedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer group"
        >
          <span>{t.featuredAi.visitOfficial}</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};

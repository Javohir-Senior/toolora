import React from 'react';
import { useApp } from '../context/AppContext';
import { TOOLS, AI_SERVICES } from '../data/tools';
import { 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Wrench, 
  Code2, 
  Bot, 
  ArrowRight,
  Layers
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { t, navigateTo } = useApp();

  const categories = [
    {
      id: 'image',
      icon: ImageIcon,
      name: t.categories.image,
      desc: t.categories.imageDesc,
      tools: TOOLS.filter(tool => tool.category === 'image'),
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-400 border-blue-500/20',
    },
    {
      id: 'text',
      icon: FileText,
      name: t.categories.text,
      desc: t.categories.textDesc,
      tools: TOOLS.filter(tool => tool.category === 'text'),
      color: 'from-amber-500/10 to-orange-500/10 text-amber-400 border-amber-500/20',
    },
    {
      id: 'creator',
      icon: Video,
      name: t.categories.creator,
      desc: t.categories.creatorDesc,
      tools: TOOLS.filter(tool => tool.category === 'creator'),
      color: 'from-rose-500/10 to-pink-500/10 text-rose-400 border-rose-500/20',
    },
    {
      id: 'productivity',
      icon: Wrench,
      name: t.categories.productivity,
      desc: t.categories.productivityDesc,
      tools: TOOLS.filter(tool => tool.category === 'productivity'),
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'developer',
      icon: Code2,
      name: t.categories.developer,
      desc: t.categories.developerDesc,
      tools: TOOLS.filter(tool => tool.category === 'developer'),
      color: 'from-purple-500/10 to-indigo-500/10 text-purple-400 border-purple-500/20',
    },
    {
      id: 'ai-directory',
      icon: Bot,
      name: t.categories.aiDirectory,
      desc: t.categories.aiDirectoryDesc,
      aiCount: AI_SERVICES.length,
      color: 'from-violet-500/10 to-fuchsia-500/10 text-violet-400 border-violet-500/20',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>{t.categories.title}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {t.categories.title}
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">
          {t.categories.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:scale-[1.02] cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 bg-gradient-to-tr ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full">
                    {cat.id === 'ai-directory' ? `${cat.aiCount} xizmat` : `${cat.tools?.length} asbob`}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                <span className="flex items-center gap-1">
                  <span>Kategoriyani ochish</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

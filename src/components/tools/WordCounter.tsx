import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS } from '../../data/tools';
import { ToolLayout } from './ToolLayout';
import { calculateTextStats } from '../../utils/wordCountUtils';
import { 
  Copy, 
  Trash2, 
  Check, 
  FileText, 
  Clock, 
  Mic, 
  BarChart3, 
  BookOpen,
  Sparkles
} from 'lucide-react';

export const WordCounter: React.FC = () => {
  const { lang, t, showToast } = useApp();
  const tool = TOOLS.find(item => item.id === 'word-counter')!;

  const sampleUzbek = `Sun'iy intellekt va raqamli texnologiyalar bugungi kunda har bir sohada inqilobiy o'zgarishlar yasamoqda. Dasturchilar, dizaynerlar va kontent mualliflari o'z ish jarayonlarini tezlashtirish uchun zamonaviy brauzer vositalaridan faol foydalanmoqdalar. Toolora platformasi ana shunday qulay va xavfsiz raqamli asboblarni bir joyga to'playdi. Barcha hisob-kitoblar foydalanuvchining o'z qurilmasida amalga oshiriladi va maxfiylik to'liq ta'minlanadi.`;

  const sampleEnglish = `Artificial intelligence and modern digital tools are transforming productivity across the globe. Writers, developers, and content creators are leveraging fast in-browser utilities to streamline their creative workflows. Toolora brings together essential tools with client-side privacy, zero server latency, and a curated directory of the best AI services available.`;

  const [text, setText] = useState<string>(lang === 'uz' ? sampleUzbek : sampleEnglish);
  const [copied, setCopied] = useState<boolean>(false);

  const stats = calculateTextStats(text);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast(t.toolPage.copied);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
    showToast(t.toolPage.clear);
  };

  const handleSample = () => {
    setText(lang === 'uz' ? sampleUzbek : sampleEnglish);
    showToast('Namuna matn yuklandi');
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="text-2xl font-black text-white font-mono">{stats.words}</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">{t.wordCounter.words}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="text-2xl font-black text-indigo-400 font-mono">{stats.charsWithSpaces}</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">{t.wordCounter.charsWithSpaces}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="text-2xl font-black text-indigo-300 font-mono">{stats.charsNoSpaces}</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">{t.wordCounter.charsNoSpaces}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="text-2xl font-black text-emerald-400 font-mono">{stats.sentences}</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">{t.wordCounter.sentences}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="text-2xl font-black text-emerald-300 font-mono">{stats.paragraphs}</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">{t.wordCounter.paragraphs}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="text-2xl font-black text-amber-400 font-mono">{stats.avgWordLength}</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">{t.wordCounter.avgLength}</div>
          </div>
        </div>

        {/* Reading & Speaking Times Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-indigo-200 font-medium">{t.wordCounter.readingTime}</div>
                <div className="text-xs text-slate-400">{t.wordCounter.readingTimeNote}</div>
              </div>
            </div>
            <div className="text-lg font-bold text-indigo-300 font-mono">
              ~{stats.readingTimeMinutes} daq / min
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-700/40 border border-slate-600/40 flex items-center justify-center text-slate-300">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-200 font-medium">{t.wordCounter.speakingTime}</div>
                <div className="text-xs text-slate-400">{t.wordCounter.speakingTimeNote}</div>
              </div>
            </div>
            <div className="text-lg font-bold text-slate-300 font-mono">
              ~{stats.speakingTimeMinutes} daq / min
            </div>
          </div>
        </div>

        {/* Text Input Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t.wordCounter.inputPlaceholder}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSample}
                className="px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t.toolPage.sample}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!text}
                className="px-3 py-1 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.toolPage.copied : t.toolPage.copy}</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={!text}
                className="px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 disabled:opacity-40 text-slate-400 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.toolPage.clear}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={10}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t.wordCounter.inputPlaceholder}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-y font-sans"
          />
        </div>

        {/* Top Keywords Density Table */}
        <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>{t.wordCounter.densityTitle}</span>
          </div>

          {stats.topWords.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {stats.topWords.map(({ word, count }, idx) => {
                const percentage = stats.words > 0 ? Math.round((count / stats.words) * 100) : 0;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-slate-200 truncate pr-2 capitalize">{word}</span>
                    <span className="font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {count} <span className="text-[10px] text-slate-500">({percentage}%)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-3 italic">
              {t.wordCounter.noFrequentWords}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

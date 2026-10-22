import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS } from '../../data/tools';
import { ToolLayout } from './ToolLayout';
import {
  removeExtraSpaces,
  trimLines,
  removeDuplicateLines,
  removeEmptyLines,
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  slugify,
  reverseText,
  sortLinesAlphabetically,
} from '../../utils/textUtils';
import { 
  Copy, 
  Trash2, 
  Check, 
  Sparkles, 
  AlignLeft, 
  Type, 
  ArrowUpDown,
  FileCode2
} from 'lucide-react';

export const TextFormatter: React.FC = () => {
  const { t, showToast } = useApp();
  const tool = TOOLS.find(item => item.id === 'text-formatter')!;

  const [text, setText] = useState<string>(
    '  Toolora   platformasi —   bu foydali vositalar to\'plami.\n\nBir xil qator\nBir xil qator\nBu yerda ortiqcha    bo\'shliqlar     mavjud.'
  );
  const [copied, setCopied] = useState(false);

  // Stats
  const wordsCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charsCount = text.length;
  const linesCount = text ? text.split('\n').length : 0;

  const handleAction = (transformFn: (str: string) => string, actionName: string) => {
    const updated = transformFn(text);
    setText(updated);
    showToast(`${actionName} bajarildi`);
  };

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

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Top Action Bar & Live Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>
              <strong className="text-white font-bold">{wordsCount}</strong> {t.textFormatter.statsWords}
            </span>
            <span>•</span>
            <span>
              <strong className="text-white font-bold">{charsCount}</strong> {t.textFormatter.statsChars}
            </span>
            <span>•</span>
            <span>
              <strong className="text-white font-bold">{linesCount}</strong> {t.textFormatter.statsLines}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.toolPage.copied : t.toolPage.copy}</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 disabled:opacity-40 text-slate-400 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700/80"
              title={t.toolPage.clear}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.toolPage.clear}</span>
            </button>
          </div>
        </div>

        {/* Text Input Area */}
        <div>
          <textarea
            rows={8}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t.textFormatter.inputPlaceholder}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 font-mono focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-y"
          />
        </div>

        {/* Formatting Operation Button Grid */}
        <div className="space-y-4 pt-2">
          {/* Cleaning Operations */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Tozalash va Tartiblash / Whitespace & Lines</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAction(removeExtraSpaces, t.textFormatter.actionTrimSpaces)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {t.textFormatter.actionTrimSpaces}
              </button>

              <button
                type="button"
                onClick={() => handleAction(trimLines, t.textFormatter.actionTrimLines)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {t.textFormatter.actionTrimLines}
              </button>

              <button
                type="button"
                onClick={() => handleAction(removeEmptyLines, t.textFormatter.actionRemoveEmpty)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {t.textFormatter.actionRemoveEmpty}
              </button>

              <button
                type="button"
                onClick={() => handleAction(removeDuplicateLines, t.textFormatter.actionRemoveDuplicates)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {t.textFormatter.actionRemoveDuplicates}
              </button>

              <button
                type="button"
                onClick={() => handleAction(str => sortLinesAlphabetically(str, true), t.textFormatter.actionSortAZ)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer flex items-center gap-1"
              >
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
                <span>{t.textFormatter.actionSortAZ}</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(str => sortLinesAlphabetically(str, false), t.textFormatter.actionSortZA)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer flex items-center gap-1"
              >
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
                <span>{t.textFormatter.actionSortZA}</span>
              </button>
            </div>
          </div>

          {/* Letter Case & Transforms */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-indigo-400" />
              <span>Harflar Registri / Letter Case Conversions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAction(toUpperCase, t.textFormatter.actionUppercase)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {t.textFormatter.actionUppercase}
              </button>

              <button
                type="button"
                onClick={() => handleAction(toLowerCase, t.textFormatter.actionLowercase)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {t.textFormatter.actionLowercase}
              </button>

              <button
                type="button"
                onClick={() => handleAction(toTitleCase, t.textFormatter.actionTitleCase)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {t.textFormatter.actionTitleCase}
              </button>

              <button
                type="button"
                onClick={() => handleAction(toSentenceCase, t.textFormatter.actionSentenceCase)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {t.textFormatter.actionSentenceCase}
              </button>

              <button
                type="button"
                onClick={() => handleAction(slugify, t.textFormatter.actionSlugify)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer flex items-center gap-1 font-mono"
              >
                <FileCode2 className="w-3 h-3 text-slate-400" />
                <span>{t.textFormatter.actionSlugify}</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(reverseText, t.textFormatter.actionReverse)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {t.textFormatter.actionReverse}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS } from '../../data/tools';
import { ToolLayout } from './ToolLayout';
import { 
  Copy, 
  Trash2, 
  Check, 
  Code2, 
  AlertTriangle, 
  CheckCircle2,
  Minimize2,
  Sparkles
} from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const { t, showToast } = useApp();
  const tool = TOOLS.find(item => item.id === 'json-formatter')!;

  const sampleJson = JSON.stringify(
    {
      platform: 'Toolora',
      version: '1.0.0',
      bilingual: ['uz', 'en'],
      features: ['image-compressor', 'qr-generator', 'text-formatter', 'youtube-generator', 'word-counter'],
      clientSide: true,
      activeUsers: 'unlimited'
    },
    null,
    2
  );

  const [inputJson, setInputJson] = useState<string>(sampleJson);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (spaces: number | 'minify') => {
    setError(null);
    if (!inputJson.trim()) return;

    try {
      const parsed = JSON.parse(inputJson);
      if (spaces === 'minify') {
        setInputJson(JSON.stringify(parsed));
        showToast('JSON ixchamlashtirildi (minified)');
      } else {
        setInputJson(JSON.stringify(parsed, null, spaces));
        showToast(`JSON ${spaces} bo‘shliq bilan formatlandi`);
      }
    } catch (err: any) {
      setError(err.message || 'Noto‘g‘ri JSON formati');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    showToast(t.toolPage.copied);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => formatJson(2)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.jsonFormatter.beautify2}</span>
            </button>

            <button
              type="button"
              onClick={() => formatJson(4)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{t.jsonFormatter.beautify4}</span>
            </button>

            <button
              type="button"
              onClick={() => formatJson('minify')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>{t.jsonFormatter.minify}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!inputJson}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.toolPage.copied : t.toolPage.copy}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setInputJson('');
                setError(null);
                showToast(t.toolPage.clear);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 border border-slate-700 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.toolPage.clear}</span>
            </button>
          </div>
        </div>

        {/* Validation Status Indicator */}
        {error ? (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <div className="font-mono">
              <strong>{t.jsonFormatter.invalidJson}:</strong> {error}
            </div>
          </div>
        ) : inputJson.trim() ? (
          <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.jsonFormatter.validJson}</span>
          </div>
        ) : null}

        {/* JSON Editor Textarea */}
        <textarea
          rows={14}
          value={inputJson}
          onChange={e => {
            setInputJson(e.target.value);
            setError(null);
          }}
          placeholder={t.jsonFormatter.inputPlaceholder}
          className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-emerald-400 font-mono focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
          spellCheck={false}
        />
      </div>
    </ToolLayout>
  );
};

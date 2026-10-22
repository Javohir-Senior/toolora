import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS } from '../../data/tools';
import { ToolLayout } from './ToolLayout';
import { 
  Copy, 
  RefreshCw, 
  Check, 
  ShieldCheck, 
  ShieldAlert, 
  KeyRound,
  Sliders
} from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const { t, showToast } = useApp();
  const tool = TOOLS.find(item => item.id === 'password-generator')!;

  const [length, setLength] = useState<number>(18);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    let uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      uppercaseChars = uppercaseChars.replace(/[IO]/g, '');
      lowercaseChars = lowercaseChars.replace(/[lo]/g, '');
      numberChars = numberChars.replace(/[01]/g, '');
    }

    let charPool = '';
    if (includeUpper) charPool += uppercaseChars;
    if (includeLower) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (!charPool) {
      charPool = lowercaseChars; // fallback so it never crashes
    }

    // Cryptographically secure random values
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charPool[array[i] % charPool.length];
    }

    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    showToast(t.toolPage.copied);
    setTimeout(() => setCopied(false), 2000);
  };

  // Evaluate password strength
  const getStrength = (): { label: string; color: string; percent: number } => {
    let score = 0;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (includeUpper && includeLower) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score <= 2) {
      return { label: t.passwordGenerator.strengthWeak, color: 'bg-rose-500 text-rose-400', percent: 30 };
    } else if (score <= 3) {
      return { label: t.passwordGenerator.strengthMedium, color: 'bg-amber-500 text-amber-400', percent: 65 };
    }
    return { label: t.passwordGenerator.strengthStrong, color: 'bg-emerald-500 text-emerald-400', percent: 100 };
  };

  const strength = getStrength();

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Generated Password Box */}
        <div className="relative p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-lg sm:text-2xl font-bold tracking-wider text-indigo-300 break-all select-all text-center sm:text-left w-full">
            {password}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={generatePassword}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title={t.passwordGenerator.generateNew}
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.toolPage.copied : t.toolPage.copy}</span>
            </button>
          </div>
        </div>

        {/* Strength Bar */}
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Parol mustahkamligi / Strength:</span>
            </span>
            <span className={`font-bold ${strength.color.split(' ')[1]}`}>
              {strength.label}
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strength.color.split(' ')[0]}`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>

        {/* Customization Controls */}
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-5">
          {/* Length Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
              <label htmlFor="pwd-length">{t.passwordGenerator.length}:</label>
              <span className="text-indigo-400 font-mono text-base font-bold">{length}</span>
            </div>
            <input
              id="pwd-length"
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Character Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={e => setIncludeUpper(e.target.checked)}
                className="rounded accent-indigo-500 cursor-pointer"
              />
              <span>{t.passwordGenerator.includeUpper}</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={e => setIncludeLower(e.target.checked)}
                className="rounded accent-indigo-500 cursor-pointer"
              />
              <span>{t.passwordGenerator.includeLower}</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={e => setIncludeNumbers(e.target.checked)}
                className="rounded accent-indigo-500 cursor-pointer"
              />
              <span>{t.passwordGenerator.includeNumbers}</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={e => setIncludeSymbols(e.target.checked)}
                className="rounded accent-indigo-500 cursor-pointer"
              />
              <span>{t.passwordGenerator.includeSymbols}</span>
            </label>

            <label className="sm:col-span-2 flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={e => setExcludeAmbiguous(e.target.checked)}
                className="rounded accent-indigo-500 cursor-pointer"
              />
              <span>{t.passwordGenerator.excludeAmbiguous}</span>
            </label>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

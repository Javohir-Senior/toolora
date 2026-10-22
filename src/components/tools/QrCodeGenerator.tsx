import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useApp } from '../../context/AppContext';
import { TOOLS } from '../../data/tools';
import { ToolLayout } from './ToolLayout';
import { 
  Download, 
  Copy, 
  Check, 
  Globe, 
  FileText, 
  Wifi, 
  Palette, 
  SlidersHorizontal,
  AlertCircle
} from 'lucide-react';

export const QrCodeGenerator: React.FC = () => {
  const { t, showToast } = useApp();
  const tool = TOOLS.find(item => item.id === 'qr-generator')!;

  // Mode: 'url' | 'text' | 'wifi'
  const [mode, setMode] = useState<'url' | 'text' | 'wifi'>('url');
  const [textInput, setTextInput] = useState<string>('https://toolora.dev');
  
  // WiFi fields
  const [wifiSsid, setWifiSsid] = useState<string>('');
  const [wifiPassword, setWifiPassword] = useState<string>('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // QR Customizations
  const [size, setSize] = useState<number>(300);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [fgColor, setFgColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [margin, setMargin] = useState<number>(2);

  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Compute actual payload based on mode
  const getPayload = (): string => {
    if (mode === 'wifi') {
      if (!wifiSsid.trim()) return '';
      return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
    }
    return textInput.trim();
  };

  useEffect(() => {
    const payload = getPayload();
    if (!payload) {
      setError(t.qrGenerator.errorEmpty);
      return;
    }

    setError(null);
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        payload,
        {
          width: size,
          margin: margin,
          errorCorrectionLevel: errorCorrectionLevel,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        },
        err => {
          if (err) {
            setError(err.message || 'QR Kod yaratib bo‘lmadi');
          }
        }
      );
    }
  }, [mode, textInput, wifiSsid, wifiPassword, wifiEncryption, size, errorCorrectionLevel, fgColor, bgColor, margin]);

  const handleDownload = () => {
    if (!canvasRef.current || !getPayload()) return;
    const link = document.createElement('a');
    link.download = `toolora-qrcode-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    showToast(t.toolPage.copied);
  };

  const handleCopy = async () => {
    if (!canvasRef.current || !getPayload()) return;
    try {
      canvasRef.current.toBlob(async blob => {
        if (!blob) return;
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setCopied(true);
        showToast(t.toolPage.copied);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      // Fallback: copy payload text
      navigator.clipboard.writeText(getPayload());
      setCopied(true);
      showToast(t.toolPage.copied);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Settings & Input Area */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mode Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              QR Kod turi / QR Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMode('url');
                  if (!textInput || textInput.startsWith('WIFI:')) setTextInput('https://toolora.dev');
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  mode === 'url'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>{t.qrGenerator.presetUrl}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('text');
                  if (textInput.startsWith('http') || textInput.startsWith('WIFI:')) setTextInput('Salom, Toolora!');
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  mode === 'text'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{t.qrGenerator.presetText}</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('wifi')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  mode === 'wifi'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <Wifi className="w-4 h-4" />
                <span>{t.qrGenerator.presetWifi}</span>
              </button>
            </div>
          </div>

          {/* Input Fields */}
          {mode === 'wifi' ? (
            <div className="space-y-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  WiFi Nomi (SSID) *
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={e => setWifiSsid(e.target.value)}
                  placeholder="MyHome_WiFi"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  WiFi Paroli
                </label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={e => setWifiPassword(e.target.value)}
                  placeholder="Parolni kiriting..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Shifrlash turi
                </label>
                <select
                  value={wifiEncryption}
                  onChange={e => setWifiEncryption(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="WPA">WPA / WPA2 (Eng keng tarqalgan)</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Parolsiz / Ochiq tarmoq</option>
                </select>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.qrGenerator.inputLabel}
              </label>
              <textarea
                rows={3}
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                placeholder={t.qrGenerator.inputPlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none font-sans"
              />
            </div>
          )}

          {/* QR Options Accordion / Controls */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 pb-2 border-b border-slate-700/60">
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              <span>Qo‘shimcha parametrlar / QR Specifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Size */}
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  {t.qrGenerator.sizeLabel}: <span className="font-mono text-indigo-400">{size}px</span>
                </label>
                <select
                  value={size}
                  onChange={e => setSize(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value={200}>200 × 200 px (Kichik)</option>
                  <option value={300}>300 × 300 px (O‘rtacha)</option>
                  <option value={400}>400 × 400 px (Katta)</option>
                  <option value={512}>512 × 512 px (HD Chop etish uchun)</option>
                </select>
              </div>

              {/* Error correction */}
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  {t.qrGenerator.correctionLabel}
                </label>
                <select
                  value={errorCorrectionLevel}
                  onChange={e => setErrorCorrectionLevel(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="L">L - Past (7% tiklanadi)</option>
                  <option value="M">M - O‘rtacha (15% tiklanadi)</option>
                  <option value="Q">Q - Yaxshi (25% tiklanadi)</option>
                  <option value="H">H - Yuqori (30% tiklanadi)</option>
                </select>
              </div>

              {/* Foreground color */}
              <div>
                <label className="block text-xs text-slate-300 mb-1 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.qrGenerator.fgColorLabel}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={e => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={e => setFgColor(e.target.value)}
                    className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-200 uppercase"
                  />
                </div>
              </div>

              {/* Background color */}
              <div>
                <label className="block text-xs text-slate-300 mb-1 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.qrGenerator.bgColorLabel}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={e => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={e => setBgColor(e.target.value)}
                    className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-200 uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            {t.qrGenerator.previewTitle}
          </div>

          {/* QR Canvas Box */}
          <div
            className="p-4 rounded-2xl shadow-xl flex items-center justify-center transition-all"
            style={{ backgroundColor: bgColor }}
          >
            <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg" />
          </div>

          {error ? (
            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.qrGenerator.downloadPng}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.toolPage.copied : t.qrGenerator.copyImage}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

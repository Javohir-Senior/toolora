import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS } from '../../data/tools';
import { ToolLayout } from './ToolLayout';
import { compressImage, formatBytes, CompressedImageResult } from '../../utils/imageUtils';
import { 
  UploadCloud, 
  Download, 
  RefreshCw, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  Sliders,
  Maximize2
} from 'lucide-react';

export const ImageCompressor: React.FC = () => {
  const { t, showToast } = useApp();
  const tool = TOOLS.find(item => item.id === 'image-compressor')!;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);

  const [quality, setQuality] = useState<number>(0.8);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [applyResize, setApplyResize] = useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<CompressedImageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Clean up object URLs on unmount or change
  useEffect(() => {
    return () => {
      if (originalPreview) {
        URL.revokeObjectURL(originalPreview);
      }
      if (result?.objectUrl) {
        URL.revokeObjectURL(result.objectUrl);
      }
    };
  }, [originalPreview, result]);

  const handleFileSelect = (file: File) => {
    setErrorMessage(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setErrorMessage(t.imageCompressor.errorInvalidType);
      return;
    }

    // Limit to 25MB
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage(t.imageCompressor.errorTooLarge);
      return;
    }

    // Revoke old previews
    if (originalPreview) URL.revokeObjectURL(originalPreview);
    if (result?.objectUrl) URL.revokeObjectURL(result.objectUrl);
    setResult(null);

    const prevUrl = URL.createObjectURL(file);
    setOriginalPreview(prevUrl);
    setSelectedFile(file);

    // Read natural dimensions
    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      // Trigger initial compression
      runCompression(file, quality, outputFormat, applyResize ? maxWidth : undefined);
    };
    img.src = prevUrl;
  };

  const runCompression = async (
    file: File,
    q: number,
    fmt: 'image/jpeg' | 'image/webp' | 'image/png',
    maxW?: number
  ) => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await compressImage(file, q, maxW, undefined, fmt);
      setResult(prev => {
        if (prev?.objectUrl) URL.revokeObjectURL(prev.objectUrl);
        return res;
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Xatolik yuz berdi / An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (selectedFile) {
      runCompression(selectedFile, newQuality, outputFormat, applyResize ? maxWidth : undefined);
    }
  };

  const handleFormatChange = (newFormat: 'image/jpeg' | 'image/webp' | 'image/png') => {
    setOutputFormat(newFormat);
    if (selectedFile) {
      runCompression(selectedFile, quality, newFormat, applyResize ? maxWidth : undefined);
    }
  };

  const handleResizeToggle = (enabled: boolean) => {
    setApplyResize(enabled);
    if (selectedFile) {
      runCompression(selectedFile, quality, outputFormat, enabled ? maxWidth : undefined);
    }
  };

  const handleMaxWidthChange = (val: number) => {
    setMaxWidth(val);
    if (selectedFile && applyResize) {
      runCompression(selectedFile, quality, outputFormat, val);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.objectUrl;
    const ext = outputFormat === 'image/webp' ? 'webp' : outputFormat === 'image/png' ? 'png' : 'jpg';
    const baseName = selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image';
    a.download = `${baseName}-compressed.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(t.toolPage.copied);
  };

  const resetAll = () => {
    if (originalPreview) URL.revokeObjectURL(originalPreview);
    if (result?.objectUrl) URL.revokeObjectURL(result.objectUrl);
    setSelectedFile(null);
    setOriginalPreview(null);
    setOriginalDimensions(null);
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <ToolLayout tool={tool}>
      {/* Upload Zone if no file */}
      {!selectedFile ? (
        <div
          ref={dropZoneRef}
          onDragOver={e => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-14 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01]'
              : 'border-slate-700/80 hover:border-indigo-500/60 bg-slate-900/40 hover:bg-slate-800/40'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
          <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {t.imageCompressor.dragDropText}
          </h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            {t.imageCompressor.supportsText}
          </p>

          <button
            type="button"
            className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            Faylni tanlash / Browse file
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Controls Panel */}
          <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
              <div className="flex items-center gap-2 font-medium text-slate-200 text-sm">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Siqish parametrlari / Compression Settings</span>
              </div>
              <button
                onClick={resetAll}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.imageCompressor.chooseAnother}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quality Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2">
                  <label htmlFor="quality-slider">{t.imageCompressor.qualityLabel}</label>
                  <span className="text-indigo-400 font-mono font-bold">
                    {Math.round(quality * 100)}%
                  </span>
                </div>
                <input
                  id="quality-slider"
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={quality}
                  onChange={e => handleQualityChange(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {t.imageCompressor.qualityHelp}
                </p>
              </div>

              {/* Format selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  {t.imageCompressor.formatLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['image/jpeg', 'image/webp', 'image/png'] as const).map(fmt => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => handleFormatChange(fmt)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        outputFormat === fmt
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                          : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {fmt === 'image/jpeg' ? 'JPEG' : fmt === 'image/webp' ? 'WebP' : 'PNG'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Width Resize Option */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={applyResize}
                      onChange={e => handleResizeToggle(e.target.checked)}
                      className="rounded accent-indigo-500 cursor-pointer"
                    />
                    <span>{t.imageCompressor.resizeLabel}</span>
                  </label>
                  {applyResize && (
                    <span className="text-indigo-400 font-mono text-xs font-bold">
                      {maxWidth}px
                    </span>
                  )}
                </div>
                {applyResize ? (
                  <select
                    value={maxWidth}
                    onChange={e => handleMaxWidthChange(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value={1920}>1920 px (Full HD)</option>
                    <option value={1280}>1280 px (HD / Web)</option>
                    <option value={800}>800 px (Blog / Card)</option>
                    <option value={400}>400 px (Thumbnail)</option>
                  </select>
                ) : (
                  <div className="text-xs text-slate-500 py-2 italic">
                    {t.imageCompressor.noResize}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400">
                  <span>{t.imageCompressor.original}</span>
                  <span className="font-mono text-slate-300">
                    {selectedFile && formatBytes(selectedFile.size)}
                  </span>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800/80">
                  {originalPreview && (
                    <img
                      src={originalPreview}
                      alt="Original"
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>
              </div>
              {originalDimensions && (
                <div className="mt-3 text-xs text-slate-500 flex justify-between">
                  <span>{t.imageCompressor.dimensions}:</span>
                  <span className="font-mono text-slate-400">
                    {originalDimensions.width} × {originalDimensions.height} px
                  </span>
                </div>
              )}
            </div>

            {/* Compressed Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-semibold">
                  <span className="text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.imageCompressor.compressed}</span>
                  </span>
                  {result && (
                    <span className="font-mono text-emerald-400 font-bold">
                      {formatBytes(result.compressedSize)}
                    </span>
                  )}
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800/80">
                  {isProcessing ? (
                    <div className="flex flex-col items-center gap-2 text-indigo-400">
                      <RefreshCw className="w-8 h-8 animate-spin" />
                      <span className="text-xs">Optimallashtirilmoqda...</span>
                    </div>
                  ) : result ? (
                    <img
                      src={result.objectUrl}
                      alt="Compressed result"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : null}
                </div>
              </div>

              {result && (
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">
                    {result.width} × {result.height} px
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    -{result.percentageSaved}% {t.imageCompressor.saved}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Download Action */}
          {result && (
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-indigo-950/30 border border-emerald-800/40">
              <div className="text-xs sm:text-sm text-slate-300">
                <span className="font-semibold text-white">
                  {formatBytes(selectedFile?.size || 0)}
                </span>
                {' '}<ArrowRight className="inline w-3.5 h-3.5 mx-1 text-slate-500" />{' '}
                <span className="font-semibold text-emerald-400">
                  {formatBytes(result.compressedSize)}
                </span>
                <span className="text-emerald-400 font-bold ml-2">
                  (-{result.percentageSaved}%)
                </span>
              </div>

              <button
                onClick={handleDownload}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.imageCompressor.downloadButton}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="mt-4 p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </ToolLayout>
  );
};

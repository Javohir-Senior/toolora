import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS } from '../../data/tools';
import { ToolLayout } from './ToolLayout';
import { generateYouTubeContent, YouTubeGeneratorInput } from '../../utils/youtubeTemplates';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Hash, 
  FileText, 
  Info,
  Clock,
  ListOrdered
} from 'lucide-react';

export const YouTubeGenerator: React.FC = () => {
  const { lang, t, showToast } = useApp();
  const tool = TOOLS.find(item => item.id === 'youtube-generator')!;

  const [topic, setTopic] = useState<string>('Dasturlashni noldan o‘rganish');
  const [videoType, setVideoType] = useState<YouTubeGeneratorInput['videoType']>('tutorial');
  const [audience, setAudience] = useState<YouTubeGeneratorInput['audience']>('beginners');
  const [tone, setTone] = useState<YouTubeGeneratorInput['tone']>('educational');
  const [outputLang, setOutputLang] = useState<'uz' | 'en'>(lang);

  const [activeTab, setActiveTab] = useState<'titles' | 'description' | 'hashtags'>('titles');

  // Generated state
  const [generatedData, setGeneratedData] = useState(() =>
    generateYouTubeContent({
      topic: 'Dasturlashni noldan o‘rganish',
      videoType: 'tutorial',
      audience: 'beginners',
      tone: 'educational',
      language: lang,
    })
  );

  const [editableDesc, setEditableDesc] = useState<string>(generatedData.description);
  const [copiedTitleIndex, setCopiedTitleIndex] = useState<number | null>(null);
  const [copiedDesc, setCopiedDesc] = useState<boolean>(false);
  const [copiedTags, setCopiedTags] = useState<boolean>(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const res = generateYouTubeContent({
      topic,
      videoType,
      audience,
      tone,
      language: outputLang,
    });

    setGeneratedData(res);
    setEditableDesc(res.description);
    showToast('Sarlavha va tavsiflar yangilandi!');
  };

  const handleCopyTitle = (title: string, index: number) => {
    navigator.clipboard.writeText(title);
    setCopiedTitleIndex(index);
    showToast(t.toolPage.copied);
    setTimeout(() => setCopiedTitleIndex(null), 2000);
  };

  const handleCopyDesc = () => {
    navigator.clipboard.writeText(editableDesc);
    setCopiedDesc(true);
    showToast(t.toolPage.copied);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  const handleCopyHashtags = () => {
    navigator.clipboard.writeText(generatedData.hashtags.join(' '));
    setCopiedTags(true);
    showToast(t.toolPage.copied);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Generative AI Disclaimer Notice */}
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs text-indigo-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t.youtubeGenerator.disclaimer}</p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleGenerate} className="space-y-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              {t.youtubeGenerator.topicLabel} *
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder={t.youtubeGenerator.topicPlaceholder}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Video Type */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.youtubeGenerator.typeLabel}
              </label>
              <select
                value={videoType}
                onChange={e => setVideoType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="tutorial">{t.youtubeGenerator.typeTutorial}</option>
                <option value="review">{t.youtubeGenerator.typeReview}</option>
                <option value="listicle">{t.youtubeGenerator.typeListicle}</option>
                <option value="vlog">{t.youtubeGenerator.typeVlog}</option>
                <option value="deepdive">{t.youtubeGenerator.typeDeepdive}</option>
                <option value="shorts">{t.youtubeGenerator.typeShorts}</option>
              </select>
            </div>

            {/* Audience */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.youtubeGenerator.audienceLabel}
              </label>
              <select
                value={audience}
                onChange={e => setAudience(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="beginners">{t.youtubeGenerator.audBeginner}</option>
                <option value="intermediate">{t.youtubeGenerator.audIntermediate}</option>
                <option value="experts">{t.youtubeGenerator.audExpert}</option>
                <option value="general">{t.youtubeGenerator.audGeneral}</option>
              </select>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.youtubeGenerator.toneLabel}
              </label>
              <select
                value={tone}
                onChange={e => setTone(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="educational">{t.youtubeGenerator.toneEducational}</option>
                <option value="engaging">{t.youtubeGenerator.toneEngaging}</option>
                <option value="curiosity">{t.youtubeGenerator.toneCuriosity}</option>
                <option value="casual">{t.youtubeGenerator.toneCasual}</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.youtubeGenerator.outputLangLabel}
              </label>
              <select
                value={outputLang}
                onChange={e => setOutputLang(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="uz">O‘zbekcha</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.youtubeGenerator.generateBtn}</span>
            </button>
          </div>
        </form>

        {/* Results Tabs */}
        <div>
          <div className="flex border-b border-slate-800 gap-2 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab('titles')}
              className={`py-2 px-4 text-xs font-medium rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'titles'
                  ? 'border-b-2 border-indigo-500 text-indigo-400 bg-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>{t.youtubeGenerator.tabTitles} ({generatedData.titles.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`py-2 px-4 text-xs font-medium rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'description'
                  ? 'border-b-2 border-indigo-500 text-indigo-400 bg-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.youtubeGenerator.tabDescription}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hashtags')}
              className={`py-2 px-4 text-xs font-medium rounded-t-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'hashtags'
                  ? 'border-b-2 border-indigo-500 text-indigo-400 bg-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hash className="w-3.5 h-3.5" />
              <span>{t.youtubeGenerator.tabHashtags}</span>
            </button>
          </div>

          {/* Titles Tab Content */}
          {activeTab === 'titles' && (
            <div className="space-y-3 animate-fade-in">
              {generatedData.titles.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-all"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                      {item.style}
                    </span>
                    <h4 className="text-sm font-medium text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyTitle(item.title, idx)}
                    className="self-end sm:self-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700 shrink-0"
                  >
                    {copiedTitleIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedTitleIndex === idx ? t.toolPage.copied : t.youtubeGenerator.copyTitle}</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Description Tab Content */}
          {activeTab === 'description' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Vaqt belgilari va tuzilmaviy tavsifni tahrirlashingiz mumkin:</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyDesc}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  {copiedDesc ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDesc ? t.toolPage.copied : t.youtubeGenerator.copyDesc}</span>
                </button>
              </div>

              <textarea
                rows={14}
                value={editableDesc}
                onChange={e => setEditableDesc(e.target.value)}
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 font-mono focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
              />
            </div>
          )}

          {/* Hashtags Tab Content */}
          {activeTab === 'hashtags' && (
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 animate-fade-in">
              <div className="flex flex-wrap gap-2">
                {generatedData.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-indigo-950/50 border border-indigo-800/60 text-indigo-300 text-xs font-mono font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleCopyHashtags}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  {copiedTags ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTags ? t.toolPage.copied : t.youtubeGenerator.copyHashtags}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

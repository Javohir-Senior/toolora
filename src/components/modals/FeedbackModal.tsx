import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, CheckCircle2, MessageSquarePlus } from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const { isFeedbackOpen, setIsFeedbackOpen, t, showToast } = useApp();

  const [type, setType] = useState<'idea' | 'bug' | 'general'>('idea');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isFeedbackOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Save to localStorage for transparency
    const newFeedback = {
      id: Date.now().toString(),
      type,
      name: name.trim() || 'Anonymous',
      email: email.trim() || 'None',
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('toolora_feedback') || '[]');
      localStorage.setItem('toolora_feedback', JSON.stringify([...existing, newFeedback]));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    showToast(t.feedbackModal.successTitle);
  };

  const handleClose = () => {
    setIsFeedbackOpen(false);
    setIsSubmitted(false);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label={t.feedbackModal.close}
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">{t.feedbackModal.successTitle}</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              {t.feedbackModal.successDesc}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors cursor-pointer shadow-md shadow-indigo-600/30"
              >
                {t.feedbackModal.close}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquarePlus className="w-6 h-6 text-indigo-400" />
              <h2 id="feedback-modal-title" className="text-xl font-bold text-white">
                {t.feedbackModal.title}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mb-6">{t.feedbackModal.subtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {t.feedbackModal.typeLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setType('idea')}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
                      type === 'idea'
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {t.feedbackModal.typeIdea}
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('bug')}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
                      type === 'bug'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {t.feedbackModal.typeBug}
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('general')}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
                      type === 'general'
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {t.feedbackModal.typeGeneral}
                  </button>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.feedbackModal.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ali Valiyev"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.feedbackModal.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t.feedbackModal.messageLabel} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t.feedbackModal.messagePlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {t.feedbackModal.close}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors flex items-center gap-2 shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.feedbackModal.submit}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Step } from '../types';
import { Edit3, Share2, Compass, Check } from 'lucide-react';

interface HeaderProps {
  currentStep: Step;
  onNavigate: (step: Step) => void;
  onOpenEditor: () => void;
  siteTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigate,
  onOpenEditor,
  siteTitle,
}) => {
  const steps: { key: Step; label: string; number: number }[] = [
    { key: 'welcome', label: 'WELCOME', number: 1 },
    { key: 'intro', label: 'PERSONAL INFO', number: 2 },
    { key: 'style', label: 'MY STYLE', number: 3 },
    { key: 'categories', label: 'CATEGORIES', number: 4 },
  ];

  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: siteTitle,
          text: 'HEN · PERSONAL PROFILE',
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 font-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Logo - Monochrome Minimalist */}
        <div 
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-white text-xs font-mono font-light tracking-tighter">
            H
          </div>
          <div className="flex flex-col">
            <span className="font-normal text-neutral-900 text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1 group-hover:text-neutral-600 transition-colors">
              {siteTitle}
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block"></span>
            </span>
            <span className="text-[10px] text-neutral-400 font-mono tracking-tight font-light">3L ARCHIVE / ENTP</span>
          </div>
        </div>

        {/* Desktop Step Nav - Pure Monochrome */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs font-mono font-light">
          {steps.map((s) => {
            const isActive = currentStep === s.key || (currentStep === 'detail' && s.key === 'categories');
            return (
              <button
                key={s.key}
                onClick={() => onNavigate(s.key)}
                className={`px-3 py-1 rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-2xs font-normal'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/70'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  0{s.number}
                </span>
                <span className="tracking-wider">{s.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls - Black/White/Gray */}
        <div className="flex items-center gap-2 font-mono font-light">
          <button
            onClick={onOpenEditor}
            title="自定义页面文案"
            className="flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-neutral-700" />
            <span className="hidden sm:inline">EDIT</span>
          </button>

          <button
            onClick={handleShare}
            title={copied ? "已复制链接" : "分享主页"}
            className="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200 cursor-pointer flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] text-emerald-600 font-mono hidden sm:inline">COPIED</span>
              </>
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Step Bar */}
      <div className="md:hidden border-t border-neutral-100 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono font-light bg-neutral-50">
        <span className="text-neutral-400 flex items-center gap-1">
          <Compass className="w-3 h-3 text-neutral-700" />
          STEP:
        </span>
        <div className="flex items-center gap-1">
          {steps.map((s, idx) => {
            const isActive = currentStep === s.key || (currentStep === 'detail' && s.key === 'categories');
            return (
              <React.Fragment key={s.key}>
                <button
                  onClick={() => onNavigate(s.key)}
                  className={`px-2 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-neutral-900 text-white font-normal'
                      : 'text-neutral-500 bg-neutral-200/80 font-light'
                  }`}
                >
                  {s.label}
                </button>
                {idx < steps.length - 1 && <span className="text-neutral-300">/</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Step } from '../types';
import { Edit3, Share2, Compass, Check, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentStep: Step;
  onNavigate: (step: Step) => void;
  onOpenEditor: () => void;
  siteTitle: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigate,
  onOpenEditor,
  siteTitle,
  isDarkMode,
  onToggleTheme,
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/90 dark:border-neutral-800 font-light transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Logo - Monochrome Minimalist */}
        <div 
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 text-xs font-mono font-light tracking-tighter transition-colors">
            H
          </div>
          <div className="flex flex-col">
            <span className="font-normal text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {siteTitle}
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white inline-block"></span>
            </span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono tracking-tight font-light">3L ARCHIVE / ENTP</span>
          </div>
        </div>

        {/* Desktop Step Nav - Pure Monochrome */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700/80 text-xs font-mono font-light transition-colors">
          {steps.map((s) => {
            const isActive = currentStep === s.key || (currentStep === 'detail' && s.key === 'categories');
            return (
              <button
                key={s.key}
                onClick={() => onNavigate(s.key)}
                className={`px-3 py-1 rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-2xs font-normal'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'}`}>
                  0{s.number}
                </span>
                <span className="tracking-wider">{s.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls - Black/White/Gray */}
        <div className="flex items-center gap-2 font-mono font-light">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={isDarkMode ? "切换至浅色模式 (Light)" : "切换至深色模式 (Dark)"}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline text-[11px]">LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-neutral-700" />
                <span className="hidden sm:inline text-[11px]">DARK</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenEditor}
            title="自定义页面文案"
            className="flex items-center gap-1 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
            <span className="hidden sm:inline">EDIT</span>
          </button>

          <button
            onClick={handleShare}
            title={copied ? "已复制链接" : "分享主页"}
            className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 cursor-pointer flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono hidden sm:inline">COPIED</span>
              </>
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Step Bar */}
      <div className="md:hidden border-t border-neutral-100 dark:border-neutral-800/80 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono font-light bg-neutral-50 dark:bg-neutral-900 transition-colors">
        <span className="text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
          <Compass className="w-3 h-3 text-neutral-700 dark:text-neutral-300" />
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
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-normal'
                      : 'text-neutral-500 dark:text-neutral-400 bg-neutral-200/80 dark:bg-neutral-800 font-light'
                  }`}
                >
                  {s.label}
                </button>
                {idx < steps.length - 1 && <span className="text-neutral-300 dark:text-neutral-700">/</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
};

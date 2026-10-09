import React from 'react';
import { ProfileData } from '../types';
import { ArrowRight, MapPin } from 'lucide-react';
import crowsBannerImage from '../assets/images/user_two_crows_banner_1791450884732.jpg';
import lilyAvatarImage from '../assets/images/white_lily_avatar_1791441945185.jpg';

interface WelcomeViewProps {
  data: ProfileData;
  onStart: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ 
  data, 
  onStart
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10 animate-fade-in font-light">
      {/* Editorial Minimalist Card Container - Black / White / Gray */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden transition-colors duration-200">
        
        {/* Banner with fixed picture (Two crows on branch in mist - IMG_3166) */}
        <div className="h-44 sm:h-56 relative overflow-hidden flex items-end p-5 bg-neutral-900 group">
          <img
            src={crowsBannerImage}
            alt="Two crows perched in mist"
            className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle misty gradient overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-neutral-950/40 via-transparent to-neutral-950/60 pointer-events-none"></div>
          
          {/* Top banner controls: Page status and fixed label */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="text-[10px] font-mono tracking-widest text-white/90 uppercase drop-shadow-xs">
              PAGE 01 · WELCOME
            </span>
            <div className="flex items-center gap-2">
              <div className="bg-neutral-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded text-[10px] font-mono text-neutral-300 border border-neutral-700/60">
                STATUS: ONLINE
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Header Bar */}
        <div className="px-5 sm:px-8 pb-7 pt-0 relative">
          
          {/* Avatar floating above banner - Circular with user's lily flower picture */}
          <div className="flex justify-between items-end -mt-12 sm:-mt-14 mb-4">
            <div className="relative">
              <img
                src={lilyAvatarImage}
                alt="White lily avatar"
                className="w-24 h-24 sm:w-26 sm:h-26 rounded-full border-4 border-white dark:border-neutral-900 object-cover bg-neutral-950 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700 transition-colors"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Name - 犬系痕 (间距缩小一倍 mb-2.5) */}
          <div className="mb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-normal text-neutral-950 dark:text-white tracking-wide font-sans transition-colors">
                {data.nickname}
              </h1>
              <span className="text-[9px] font-mono font-normal px-2 py-0.5 rounded bg-neutral-900 dark:bg-white text-neutral-200 dark:text-neutral-950 uppercase tracking-widest transition-colors">
                VERIFIED
              </span>
            </div>
          </div>

          {/* 1. 19 LeH 金牛ENTP（去边框，字号和“您抬爱”一样为text-[11px]） */}
          <div className="text-left mb-1">
            <p className="text-[11px] font-light text-neutral-500 dark:text-neutral-400 tracking-widest font-mono transition-colors">
              19 LeH 金牛ENTP。
            </p>
          </div>

          {/* 2. 小姐，这是我的名片（字号和“您抬爱”一样为text-[11px]） */}
          <div className="mb-5 text-left">
            <p className="text-[11px] font-light text-neutral-400 dark:text-neutral-500 tracking-widest font-mono transition-colors">
              小姐，这是我的名片。
            </p>
          </div>

          {/* Style Keywords Preview - Thin Monochrome Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {data.styleTags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-light px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 标签下方添加一句“别用风格框住我吧，您该亲自来见我”，字号和您抬爱一样text-[11px] */}
          <div className="text-left mb-8">
            <p className="text-[11px] font-light text-neutral-400 dark:text-neutral-500 tracking-widest font-mono transition-colors">
              别用风格框住我吧，您该亲自来见我
            </p>
          </div>

          {/* 最下方的常驻墓土改成ip属地：雾山影。旁边还有一行小字是“小姐，想见我的话别走错地方啊” */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 text-xs text-left">
              <span className="font-normal text-neutral-800 dark:text-neutral-200 flex items-center gap-1 tracking-wide transition-colors">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
                IP属地：雾山影
              </span>
              <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
              <span className="text-[11px] font-light text-neutral-400 dark:text-neutral-500 tracking-wide transition-colors">
                小姐，想见我的话别走错地方啊
              </span>
            </div>

            <button
              onClick={onStart}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-light text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <span className="font-mono tracking-widest text-xs">START / 开始了解</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      <p className="text-center text-[10px] font-mono font-light text-neutral-400 dark:text-neutral-500 mt-4 tracking-widest uppercase transition-colors">
        STEP 01 OF 04 · PROCEED TO PERSONAL INFORMATION
      </p>
    </div>
  );
};

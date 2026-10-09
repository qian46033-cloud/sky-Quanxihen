import React from 'react';
import { ProfileData } from '../types';
import { 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Compass, 
  Shirt, 
  MessageCircle, 
  Repeat2, 
  Heart, 
  Share2
} from 'lucide-react';
import liliesImage from '../assets/images/lilies_black_background_1791443257214.jpg';
import lilyAvatarImage from '../assets/images/white_lily_avatar_1791441945185.jpg';

interface IntroViewProps {
  data: ProfileData;
  onNext: () => void;
  onPrev: () => void;
  onImageClick?: (url: string, caption: string) => void;
}

export const IntroView: React.FC<IntroViewProps> = ({
  data,
  onNext,
  onPrev,
}) => {

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 animate-fade-in space-y-5 font-light">
      
      {/* Top Navigation Control bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 text-xs font-mono font-light text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK / 返回欢迎页</span>
        </button>

        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 font-light">
          STEP 02 / 04 · PERSONAL INFO
        </span>
      </div>

      {/* Main Card: PERSONAL INFORMATION */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xs overflow-hidden transition-colors duration-200">
        
        {/* Page Title in English - Thinner Typography */}
        <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between transition-colors">
          <div>
            <span className="text-[10px] font-mono font-light tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
              PAGE 02
            </span>
            <h1 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-white tracking-wider uppercase font-sans transition-colors">
              PERSONAL INFORMATION
            </h1>
          </div>
          <span className="text-[10px] font-mono font-light px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors">
            PROFILE
          </span>
        </div>

        {/* Post header: Author row */}
        <div className="p-5 sm:px-6 pb-2 flex items-start justify-between gap-3.5">
          <div className="flex items-start gap-3.5">
            <img
              src={lilyAvatarImage}
              alt={data.nickname}
              className="w-12 h-12 rounded-full object-cover bg-neutral-950 border border-neutral-200 dark:border-neutral-700 shrink-0 transition-colors"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-normal text-neutral-900 dark:text-white text-base transition-colors">{data.nickname}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white transition-colors"></span>
              </div>
              {/* status: available 字体更小 (text-[9px]) */}
              <p className="text-[9px] font-mono font-light text-neutral-400 dark:text-neutral-500 mt-0.5 tracking-wider transition-colors">
                STATUS: AVAILABLE
              </p>
            </div>
          </div>
        </div>

        {/* 1. Sky Dossier 先放置：Server (ios), Outfits, Hours */}
        <div className="p-5 sm:px-6 pt-2 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-light text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2.5">
            <span>GAME DOSSIER / 档案</span>
          </div>

          {/* Server (ios) */}
          <div className="text-xs font-mono font-light">
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-between transition-colors">
              <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" /> SERVER
              </span>
              <span className="font-light text-neutral-800 dark:text-neutral-200 lowercase font-mono">ios</span>
            </div>
          </div>

          {/* Outfits (无边框、字体变细、居中) and Online hours (字体变细、居中、23:00与周末空两格) */}
          <div className="mt-2.5 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 space-y-2.5 text-xs font-light transition-colors">
            <div className="flex items-center">
              <div className="flex items-center gap-1.5 shrink-0 text-neutral-400 font-mono">
                <Shirt className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-400 shrink-0" />
                <span className="text-neutral-400 dark:text-neutral-400 font-mono">OUTFITS:</span>
              </div>
              <div className="flex-1 text-center text-neutral-700 dark:text-neutral-200 font-light whitespace-pre tracking-wide">
                0号书虫 蝙蝠斗or二级白
              </div>
            </div>

            <div className="flex items-center pt-2 border-t border-neutral-200 dark:border-neutral-700/80 transition-colors">
              <div className="flex items-center gap-1.5 shrink-0 text-neutral-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-400" />
                <span>HOURS:</span>
              </div>
              <div className="flex-1 text-center text-neutral-700 dark:text-neutral-200 font-light whitespace-pre tracking-wide">
                工作日18:00-23:00  周末随缘
              </div>
            </div>
          </div>
        </div>

        {/* 2. 固定使用第二张图片 (IMG_3685 百合花) */}
        <div className="px-5 sm:px-6 pt-0 pb-4">
          <div className="relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950 shadow-2xs">
            <img
              src={liliesImage}
              alt="White tiger lilies"
              className="w-full h-auto object-cover max-h-[420px] filter contrast-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 3. 专属私语文案：字号和第一页面中的“您抬爱”一样（text-[11px]） */}
        <div className="px-5 sm:px-6 pt-0 pb-6 text-left">
          <p className="text-[11px] font-mono font-light text-neutral-400 dark:text-neutral-400 tracking-widest leading-relaxed">
            小姐，想我就可以来找我<br />
            但我不希望你每天都来找我，我的舌和手会累的
          </p>
        </div>

        {/* 4. 下面的评论数转发量以及点赞量的数字更大、更多 */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-neutral-500 dark:text-neutral-400 font-mono font-light transition-colors">
          <div className="flex items-center gap-6 sm:gap-8">
            <span className="flex items-center gap-1.5 hover:text-neutral-950 dark:hover:text-white cursor-pointer transition-colors group">
              <MessageCircle className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
              <span className="text-xs sm:text-sm font-normal text-neutral-800 dark:text-neutral-200">3,482</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-neutral-950 dark:hover:text-white cursor-pointer transition-colors group">
              <Repeat2 className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
              <span className="text-xs sm:text-sm font-normal text-neutral-800 dark:text-neutral-200">1,829</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-neutral-950 dark:hover:text-white cursor-pointer transition-colors group">
              <Heart className="w-4 h-4 text-neutral-800 dark:text-white fill-neutral-800 dark:fill-white" />
              <span className="text-xs sm:text-sm font-normal text-neutral-900 dark:text-white">42.8k</span>
            </span>
          </div>
          <Share2 className="w-4 h-4 text-neutral-400 hover:text-neutral-950 dark:hover:text-white cursor-pointer transition-colors" />
        </div>

      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-mono font-light text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>PREV / 上一步</span>
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-mono font-light text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer group active:scale-[0.98]"
        >
          <span>NEXT: MY STYLE / 我的风格</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};

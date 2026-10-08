import React, { useRef } from 'react';
import { ProfileData } from '../types';
import { ArrowRight, MapPin, Upload } from 'lucide-react';

interface WelcomeViewProps {
  data: ProfileData;
  onStart: () => void;
  onUpdateBannerImage?: (url: string) => void;
}

const LILY_AVATAR = "/src/assets/images/white_lily_avatar_1791441945185.jpg";
const DEFAULT_CROWS_BANNER = "/src/assets/images/user_two_crows_banner_1791450884732.jpg";

export const WelcomeView: React.FC<WelcomeViewProps> = ({ 
  data, 
  onStart,
  onUpdateBannerImage 
}) => {
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  const bannerSrc = data.bannerUrl || DEFAULT_CROWS_BANNER;

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string' && onUpdateBannerImage) {
          onUpdateBannerImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10 animate-fade-in font-light">
      {/* Editorial Minimalist Card Container - Black / White / Gray */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* Banner with user's picture (Two crows on branch in mist - IMG_3166) */}
        <div className="h-44 sm:h-56 relative overflow-hidden flex items-end p-5 bg-neutral-900 group">
          <img
            src={bannerSrc}
            alt="Two crows perched in mist"
            className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle misty gradient overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-neutral-950/40 via-transparent to-neutral-950/60 pointer-events-none"></div>
          
          {/* Top banner controls: Page status and load original image button */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="text-[10px] font-mono tracking-widest text-white/90 uppercase drop-shadow-xs">
              PAGE 01 · WELCOME
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => bannerFileInputRef.current?.click()}
                className="px-2 py-0.5 rounded-md bg-neutral-900/80 hover:bg-neutral-900 text-white text-[10px] font-mono font-light border border-neutral-700/80 backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                title="若需完全还原本地高清照片，可点击直接选取 IMG_3166 原图"
              >
                <Upload className="w-3 h-3 text-neutral-300" />
                <span>载入本地原图 (IMG_3166)</span>
              </button>
              <input
                ref={bannerFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerFileChange}
              />
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
                src={LILY_AVATAR}
                alt="White lily avatar"
                className="w-24 h-24 sm:w-26 sm:h-26 rounded-full border-4 border-white object-cover bg-neutral-950 shadow-sm ring-1 ring-neutral-200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Name - 犬系痕 (间距缩小一倍 mb-2.5) */}
          <div className="mb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-normal text-neutral-950 tracking-wide font-sans">
                {data.nickname}
              </h1>
              <span className="text-[9px] font-mono font-normal px-2 py-0.5 rounded bg-neutral-900 text-neutral-200 uppercase tracking-widest">
                VERIFIED
              </span>
            </div>
          </div>

          {/* 1. 19 LeH 金牛ENTP（去边框，字号和“您抬爱”一样为text-[11px]） */}
          <div className="text-left mb-1">
            <p className="text-[11px] font-light text-neutral-500 tracking-widest font-mono">
              19 LeH 金牛ENTP。
            </p>
          </div>

          {/* 2. 小姐，这是我的名片（字号和“您抬爱”一样为text-[11px]） */}
          <div className="mb-5 text-left">
            <p className="text-[11px] font-light text-neutral-400 tracking-widest font-mono">
              小姐，这是我的名片。
            </p>
          </div>

          {/* Style Keywords Preview - Thin Monochrome Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {data.styleTags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-light px-2.5 py-1 rounded-md bg-white border border-neutral-300 text-neutral-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 标签下方添加一句“别用风格框住我吧，您该亲自来见我”，字号和您抬爱一样text-[11px] */}
          <div className="text-left mb-8">
            <p className="text-[11px] font-light text-neutral-400 tracking-widest font-mono">
              别用风格框住我吧，您该亲自来见我
            </p>
          </div>

          {/* 最下方的常驻墓土改成ip属地：雾山影。旁边还有一行小字是“小姐，想见我的话别走错地方啊” */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 text-xs text-left">
              <span className="font-normal text-neutral-800 flex items-center gap-1 tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                IP属地：雾山影
              </span>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <span className="text-[11px] font-light text-neutral-400 tracking-wide">
                小姐，想见我的话别走错地方啊
              </span>
            </div>

            <button
              onClick={onStart}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-light text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <span className="font-mono tracking-widest text-xs">START / 开始了解</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      <p className="text-center text-[10px] font-mono font-light text-neutral-400 mt-4 tracking-widest uppercase">
        STEP 01 OF 04 · PROCEED TO PERSONAL INFORMATION
      </p>
    </div>
  );
};

import React, { useRef } from 'react';
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
  Share2,
  Upload
} from 'lucide-react';

interface IntroViewProps {
  data: ProfileData;
  onNext: () => void;
  onPrev: () => void;
  onImageClick?: (url: string, caption: string) => void;
  onUpdateInfoImage?: (url: string) => void;
}

const DEFAULT_LILIES_IMAGE = "./lilies_black_background_1791443257214.jpg";

export const IntroView: React.FC<IntroViewProps> = ({
  data,
  onNext,
  onPrev,
  onUpdateInfoImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentInfoImage = data.infoImageUrl || DEFAULT_LILIES_IMAGE;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string' && onUpdateInfoImage) {
          onUpdateInfoImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 animate-fade-in space-y-5 font-light">
      
      {/* Top Navigation Control bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 text-xs font-mono font-light text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK / 返回欢迎页</span>
        </button>

        <span className="text-xs font-mono text-neutral-400 font-light">
          STEP 02 / 04 · PERSONAL INFO
        </span>
      </div>

      {/* Main Card: PERSONAL INFORMATION */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xs overflow-hidden">
        
        {/* Page Title in English - Thinner Typography */}
        <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-light tracking-widest text-neutral-400 uppercase">
              PAGE 02
            </span>
            <h1 className="text-lg sm:text-xl font-normal text-neutral-900 tracking-wider uppercase font-sans">
              PERSONAL INFORMATION
            </h1>
          </div>
          <span className="text-[10px] font-mono font-light px-2 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-600">
            PROFILE
          </span>
        </div>

        {/* Post header: Author row */}
        <div className="p-5 sm:px-6 pb-2 flex items-start justify-between gap-3.5">
          <div className="flex items-start gap-3.5">
            <img
              src={data.avatarUrl}
              alt={data.nickname}
              className="w-12 h-12 rounded-full object-cover bg-neutral-950 border border-neutral-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-normal text-neutral-900 text-base">{data.nickname}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>
              </div>
              {/* status: available 字体更小 (text-[9px]) */}
              <p className="text-[9px] font-mono font-light text-neutral-400 mt-0.5 tracking-wider">
                STATUS: AVAILABLE
              </p>
            </div>
          </div>
        </div>

        {/* 1. Sky Dossier 先放置：Server (ios), Outfits, Hours */}
        <div className="p-5 sm:px-6 pt-2 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-light text-neutral-400 uppercase tracking-wider mb-2.5">
            <span>GAME DOSSIER / 档案</span>
          </div>

          {/* Server (ios) */}
          <div className="text-xs font-mono font-light">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-neutral-600" /> SERVER
              </span>
              <span className="font-light text-neutral-800 lowercase font-mono">ios</span>
            </div>
          </div>

          {/* Outfits (无边框、字体变细、居中) and Online hours (字体变细、居中、23:00与周末空两格) */}
          <div className="mt-2.5 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2.5 text-xs font-light">
            <div className="flex items-center">
              <div className="flex items-center gap-1.5 shrink-0 text-neutral-400 font-mono">
                <Shirt className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="text-neutral-400 font-mono">OUTFITS:</span>
              </div>
              <div className="flex-1 text-center text-neutral-700 font-light whitespace-pre tracking-wide">
                0号书虫 蝙蝠斗or二级白
              </div>
            </div>

            <div className="flex items-center pt-2 border-t border-neutral-200">
              <div className="flex items-center gap-1.5 shrink-0 text-neutral-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>HOURS:</span>
              </div>
              <div className="flex-1 text-center text-neutral-700 font-light whitespace-pre tracking-wide">
                工作日18:00-23:00  周末随缘
              </div>
            </div>
          </div>
        </div>

        {/* 2. 把图片换在在线时间(HOURS)的下面 */}
        <div className="px-5 sm:px-6 pt-0 pb-4">
          <div className="relative group rounded-xl overflow-hidden border border-neutral-200 bg-neutral-950 shadow-2xs">
            <img
              src={currentInfoImage}
              alt="White tiger lilies"
              className="w-full h-auto object-cover max-h-[420px] filter contrast-105"
              referrerPolicy="no-referrer"
            />

            {/* 一键更换为本地原图按钮 */}
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-md bg-neutral-900/80 hover:bg-neutral-900 text-white text-[10px] font-mono font-light border border-neutral-700/80 backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                title="若需完全还原本地高清照片，可点击直接选取 IMG_3685 原图"
              >
                <Upload className="w-3 h-3 text-neutral-300" />
                <span>载入本地原图 (IMG_3685)</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        {/* 3. 专属私语文案：字号和第一页面中的“您抬爱”一样（text-[11px]） */}
        <div className="px-5 sm:px-6 pt-0 pb-6 text-left">
          <p className="text-[11px] font-mono font-light text-neutral-400 tracking-widest leading-relaxed">
            小姐，想我就可以来找我<br />
            但我不希望你每天都来找我，我的舌和手会累的
          </p>
        </div>

        {/* 4. 下面的评论数转发量以及点赞量的数字更大、更多 */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-neutral-100 flex items-center justify-between text-neutral-500 font-mono font-light">
          <div className="flex items-center gap-6 sm:gap-8">
            <span className="flex items-center gap-1.5 hover:text-neutral-950 cursor-pointer transition-colors group">
              <MessageCircle className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900" />
              <span className="text-xs sm:text-sm font-normal text-neutral-800">3,482</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-neutral-950 cursor-pointer transition-colors group">
              <Repeat2 className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900" />
              <span className="text-xs sm:text-sm font-normal text-neutral-800">1,829</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-neutral-950 cursor-pointer transition-colors group">
              <Heart className="w-4 h-4 text-neutral-800 fill-neutral-800" />
              <span className="text-xs sm:text-sm font-normal text-neutral-900">42.8k</span>
            </span>
          </div>
          <Share2 className="w-4 h-4 text-neutral-400 hover:text-neutral-950 cursor-pointer" />
        </div>

      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-mono font-light text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>PREV / 上一步</span>
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono font-light text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer group active:scale-[0.98]"
        >
          <span>NEXT: MY STYLE / 我的风格</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};

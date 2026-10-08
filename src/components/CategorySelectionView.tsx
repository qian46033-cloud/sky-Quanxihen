import React from 'react';
import { CategoryKey, ProfileData } from '../types';
import { 
  ArrowLeft, 
  ArrowUpRight 
} from 'lucide-react';

interface CategorySelectionViewProps {
  data: ProfileData;
  onSelectCategory?: (key: CategoryKey) => void;
  onPrev: () => void;
}

export const CategorySelectionView: React.FC<CategorySelectionViewProps> = ({
  onPrev,
}) => {
  const categoryLinks = [
    {
      number: "01",
      titleCn: "须知",
      titleEn: "RULES",
      url: "https://www.kdocs.cn/l/clGFyP5hW5xK",
    },
    {
      number: "02",
      titleCn: "板评",
      titleEn: "BOARD REVIEWS",
      url: "https://www.kdocs.cn/l/cklEgtFvFuaM",
    },
    {
      number: "03",
      titleCn: "话术",
      titleEn: "SCRIPTS",
      url: "https://www.kdocs.cn/l/chswaYX4oDxG",
    },
    {
      number: "04",
      titleCn: "陪评",
      titleEn: "COMPANION",
      url: "https://www.kdocs.cn/l/cnKyGSt2zxjj",
    },
    {
      number: "05",
      titleCn: "排单表",
      titleEn: "SCHEDULE",
      url: "https://www.kdocs.cn/l/cohwiZGiH1x8",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 animate-fade-in space-y-5 font-light">
      
      {/* Top Navigation Control bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 text-xs font-mono font-light text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK / 返回我的风格</span>
        </button>

        <span className="text-xs font-mono font-light text-neutral-400">
          STEP 04 / 04 · CATEGORIES
        </span>
      </div>

      {/* Header Section - 字体较小、纯粹利落 */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-2xs text-left">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-light text-neutral-400 uppercase tracking-widest">
            PAGE 04 · DIRECTORY
          </span>
          <span className="text-[10px] font-mono font-light px-2 py-0.5 rounded bg-neutral-900 text-white uppercase">
            5 SECTIONS
          </span>
        </div>
        <h1 className="text-lg sm:text-xl font-normal text-neutral-950 tracking-wider uppercase font-sans">
          CATEGORIES
        </h1>
      </div>

      {/* 5个独立板块：字体较小更精致，只留标题 */}
      <div className="space-y-2.5">
        {categoryLinks.map((item) => (
          <a
            key={item.number}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl py-3 px-4 sm:px-5 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50/60 shadow-2xs transition-all duration-200 group flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-light text-neutral-400">
                {item.number}
              </span>
              <h2 className="text-sm sm:text-base font-normal text-neutral-900 group-hover:text-neutral-950 transition-colors flex items-center gap-2">
                <span>{item.titleCn}</span>
                <span className="text-[11px] text-neutral-400 font-mono font-light uppercase">
                  / {item.titleEn}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 group-hover:text-neutral-950 transition-colors">
              <span className="hidden sm:inline font-light">VIEW</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ))}
      </div>

      {/* 板块最底下居中文案（字号小，颜色灰色）：要好好操心爱的人啊 / 眼泪为我流尽吧 */}
      <div className="pt-3 pb-1 text-center">
        <p className="text-[11px] font-mono font-light text-neutral-400 tracking-widest leading-relaxed">
          要好好操心爱的人啊<br />
          眼泪为我流尽吧
        </p>
      </div>

      {/* Bottom Back Action */}
      <div className="pt-2 text-center">
        <button
          onClick={onPrev}
          className="px-6 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-mono font-light text-xs sm:text-sm inline-flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK / 返回我的风格</span>
        </button>
      </div>

    </div>
  );
};

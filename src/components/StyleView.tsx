import React from 'react';
import { ProfileData } from '../types';
import { 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck 
} from 'lucide-react';

interface StyleViewProps {
  data: ProfileData;
  onNext: () => void;
  onPrev: () => void;
}

interface ScenarioItem {
  number: string;
  styleName: string;
  tagEn: string;
  quote: string;
}

export const StyleView: React.FC<StyleViewProps> = ({
  data,
  onNext,
  onPrev,
}) => {
  const styleKeywords = [
    '疯狗僭越',
    '媚骨勾引',
    '暧昧缱绻',
    '轻浮牛郎',
    '阴湿艳鬼'
  ];

  const scenarios: ScenarioItem[] = [
    {
      number: "01",
      styleName: "疯狗僭越",
      tagEn: "OVERSTEP & DOMINANCE",
      quote: "这种程度就让您觉得被冒犯了吗，主人？",
    },
    {
      number: "02",
      styleName: "媚骨勾引",
      tagEn: "SEDUCTION & TEASE",
      quote: "眼泪不小心打湿了衣服，想要挡住却弄巧成拙，不小心将衣领又扯开了些…",
    },
    {
      number: "03",
      styleName: "暧昧缱绻",
      tagEn: "INTIMACY & AMBIGUITY",
      quote: "吃独食可不是什么好习惯，劳烦您张张口啊？",
    },
    {
      number: "04",
      styleName: "轻浮牛郎",
      tagEn: "FLIRTATION & ROMANEE",
      quote: "您还是别打趣我了。真的很喜欢我吗？那就为我开一瓶罗曼尼康帝吧",
    },
    {
      number: "05",
      styleName: "阴湿艳鬼",
      tagEn: "OBSESSION & ENTWINED",
      quote: "从背后环住你的感觉真好啊，你该被我的痴缠扰一辈子的",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 animate-fade-in space-y-5 font-light">
      
      {/* Top Navigation Control bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 text-xs font-mono font-light text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK / 返回个人信息</span>
        </button>

        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 font-light">
          STEP 03 / 04 · MY STYLE
        </span>
      </div>

      {/* Main Card: MY STYLE in Minimalist Black/White/Gray */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xs overflow-hidden transition-colors duration-200">
        
        {/* Page Title in English */}
        <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between transition-colors">
          <div>
            <span className="text-[10px] font-mono font-light tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
              PAGE 03
            </span>
            <h1 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-white tracking-wider uppercase font-sans transition-colors">
              MY STYLE
            </h1>
          </div>
          <span className="text-[10px] font-mono font-light px-2 py-0.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 uppercase transition-colors">
            CHARACTERISTICS
          </span>
        </div>

        {/* Style Declaration Chips */}
        <div className="p-5 sm:px-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 text-left transition-colors">
          <div className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 font-light uppercase tracking-widest mb-3">
            CORE ESSENCE / 风格宣言
          </div>

          {/* Style Chips in Pure Monochrome */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {styleKeywords.map((tag, i) => (
              <div
                key={i}
                className="text-xs font-light px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white transition-colors"></span>
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 仅保留场景模拟板块 */}
        <div className="p-5 sm:p-6 space-y-3.5 text-left">
          <div className="text-[10px] font-mono font-light text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">
            SCENARIO SIMULATION / 场景模拟
          </div>

          {scenarios.map((sc) => (
            <div
              key={sc.number}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-3.5 sm:p-4 bg-neutral-50/70 dark:bg-neutral-800/40 space-y-2.5 text-xs font-light text-left transition-colors"
            >
              <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 font-mono">
                <span className="text-neutral-900 dark:text-white font-normal">
                  SCENARIO {sc.number} · {sc.styleName}
                </span>
                <span className="text-[10px] tracking-wider text-neutral-400 dark:text-neutral-500">
                  {sc.tagEn}
                </span>
              </div>

              <div className="flex items-start gap-2.5 pt-0.5">
                <img
                  src={data.avatarUrl}
                  alt={data.nickname}
                  className="w-7 h-7 rounded-full object-cover bg-neutral-950 border border-neutral-200 dark:border-neutral-700 shrink-0 mt-0.5 transition-colors"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-neutral-900 dark:bg-neutral-800 text-white dark:text-neutral-100 border border-transparent dark:border-neutral-700/60 rounded-xl rounded-tl-xs px-3.5 py-2.5 max-w-[92%] leading-relaxed font-light text-xs sm:text-[13px] transition-colors">
                  “{sc.quote}”
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info banner */}
        <div className="px-5 sm:px-6 py-3 bg-neutral-50 dark:bg-neutral-800/40 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono font-light text-neutral-500 dark:text-neutral-400 transition-colors">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
            CLEAR BOUNDARIES & PROTOCOL
          </span>
          <span className="text-neutral-400 dark:text-neutral-500">PROCEED TO CATEGORIES</span>
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
          <span>NEXT: CATEGORIES / 查看栏目</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};

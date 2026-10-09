import React, { useState } from 'react';
import { CategoryKey, ProfileData } from '../types';
import { 
  ChevronLeft, 
  Copy, 
  Check, 
  Heart, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

interface CategoryDetailViewProps {
  category: CategoryKey;
  data: ProfileData;
  onBackToSelection: () => void;
  onSwitchCategory: (key: CategoryKey) => void;
  onImageClick: (url: string, caption: string) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  data,
  onBackToSelection,
  onSwitchCategory,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [contactCopied, setContactCopied] = useState<boolean>(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, number>>({});
  const [activeScriptCategory, setActiveScriptCategory] = useState<string>('all');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyContact = () => {
    navigator.clipboard.writeText(`${data.contactWeChatOrQQ} (${data.contactUid})`);
    setContactCopied(true);
    setTimeout(() => {
      setContactCopied(false);
    }, 2500);
  };

  const handleToggleLike = (id: string, initialLikes: number) => {
    setLikedReviews((prev) => {
      const current = prev[id] !== undefined ? prev[id] : initialLikes;
      const isAlreadyBoosted = current > initialLikes;
      return {
        ...prev,
        [id]: isAlreadyBoosted ? initialLikes : initialLikes + 1,
      };
    });
  };

  const navTabs: { key: CategoryKey; labelEn: string; labelCn: string }[] = [
    { key: 'rules', labelEn: 'RULES', labelCn: '须知' },
    { key: 'board', labelEn: 'BOARD', labelCn: '板评' },
    { key: 'scripts', labelEn: 'SCRIPTS', labelCn: '话术' },
    { key: 'companion', labelEn: 'COMPANION', labelCn: '陪评' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 animate-fade-in space-y-5 font-light">
      
      {/* Top Nav Action: Back to Categories & Quick Tab Switch */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          onClick={onBackToSelection}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 shadow-2xs transition-all cursor-pointer self-start"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
          <span>BACK TO CATEGORIES / 返回栏目选择</span>
        </button>

        {/* Tab row in Pure Monochrome */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700/80 overflow-x-auto text-xs font-mono font-light">
          {navTabs.map((tab) => {
            const isActive = tab.key === category;
            return (
              <button
                key={tab.key}
                onClick={() => onSwitchCategory(tab.key)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-2xs font-normal'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60'
                }`}
              >
                <span>{tab.labelEn}</span>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-sans">({tab.labelCn})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CATEGORY 1: RULES & GUIDELINES (须知) */}
      {category === 'rules' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xs text-left transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-light text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                SECTION 01
              </span>
              <span className="text-[10px] font-mono font-light px-2 py-0.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 uppercase">
                MANDATORY
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-normal text-neutral-950 dark:text-white tracking-wider uppercase font-sans">
              RULES & GUIDELINES
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-mono font-light">
              相处规范与预约边界说明 · 双方尊重与安全底线
            </p>
          </div>

          {/* Sections List */}
          <div className="space-y-3">
            {data.notices.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-2xs text-left transition-colors"
              >
                <h2 className="text-sm sm:text-base font-normal text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center text-[10px] font-mono font-light">
                    0{idx + 1}
                  </span>
                  {sec.title}
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light">
                  {sec.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white mt-2 shrink-0"></span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 text-xs flex items-start gap-3 text-left transition-colors">
            <AlertCircle className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-mono font-light">
              NOTICE: 本服务为纯绿色虚拟情感陪伴，不涉及任何线下违规接触与现实借贷。
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 2: BOARD REVIEWS (板评) */}
      {category === 'board' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xs text-left transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-light text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                SECTION 02
              </span>
              <span className="text-[10px] font-mono font-light px-2 py-0.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 uppercase">
                5.0 RATING
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-normal text-neutral-950 dark:text-white tracking-wider uppercase font-sans">
                  BOARD REVIEWS
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-mono font-light">
                  往期板单真实评价与留言记录
                </p>
              </div>

              <div className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-light text-neutral-900 dark:text-neutral-100 self-start">
                SCORE: [ 5.0 / 5.0 ]
              </div>
            </div>
          </div>

          {/* Review items */}
          <div className="space-y-3">
            {data.boardReviews.map((rev) => {
              const currentLikes = likedReviews[rev.id] !== undefined ? likedReviews[rev.id] : rev.likes;
              const isLiked = currentLikes > rev.likes;

              return (
                <div
                  key={rev.id}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3 text-left transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-mono text-xs font-light">
                        {rev.clientName.slice(0, 1)}
                      </div>
                      <div>
                        <div className="font-normal text-neutral-900 dark:text-white text-sm flex items-center gap-2">
                          {rev.clientName}
                          <span className="text-[10px] font-mono font-light px-2 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                            {rev.tag}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-light text-neutral-400 dark:text-neutral-500">{rev.date}</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-light text-neutral-800 dark:text-neutral-200">
                      ★ ★ ★ ★ ★
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
                    {rev.content}
                  </p>

                  {rev.reply && (
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
                      <div className="font-normal text-neutral-900 dark:text-white flex items-center gap-1 text-[11px] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                        {data.nickname} (REPLY)
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">{rev.reply}</p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 font-mono font-light">
                    <button
                      onClick={() => handleToggleLike(rev.id, rev.likes)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        isLiked
                          ? 'text-neutral-950 dark:text-white bg-neutral-200 dark:bg-neutral-800 font-normal'
                          : 'hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white' : ''}`} />
                      <span>{currentLikes} ENDORSEMENTS</span>
                    </button>

                    <span className="text-[10px]">VERIFIED REVIEW</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CATEGORY 3: SCRIPTS & DIALOGUES (话术) */}
      {category === 'scripts' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xs text-left transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-light text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                SECTION 03
              </span>
              <span className="text-[10px] font-mono font-light px-2 py-0.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 uppercase">
                TONE SAMPLE
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-normal text-neutral-950 dark:text-white tracking-wider uppercase font-sans">
              SCRIPTS & DIALOGUES
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-mono font-light">
              经典话术与日常语境示范 · 直观感知对话张力
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs font-mono font-light">
              {['all', '日常问候', '跑图护航', '治愈安慰', '树屋夜聊'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveScriptCategory(cat)}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    activeScriptCategory === cat
                      ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-normal'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {cat === 'all' ? 'ALL' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Script Cards */}
          <div className="space-y-3">
            {data.scripts
              .filter((s) => activeScriptCategory === 'all' || s.category === activeScriptCategory)
              .map((sc) => {
                const isCopied = copiedId === sc.id;

                return (
                  <div
                    key={sc.id}
                    className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3 text-left transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-light px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700">
                          {sc.category}
                        </span>
                        <h3 className="font-normal text-neutral-900 dark:text-white text-sm">{sc.title}</h3>
                      </div>

                      <span className="text-[10px] font-mono font-light text-neutral-400 dark:text-neutral-500">
                        {sc.tone}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border-l-4 border-l-neutral-900 dark:border-l-white border border-neutral-200 dark:border-neutral-700">
                      <p className="text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm font-light leading-relaxed italic">
                        “{sc.quote}”
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                      <span className="text-neutral-400 dark:text-neutral-500 font-mono font-light text-[11px] flex-1 mr-3">
                        CONTEXT: {sc.context}
                      </span>

                      <button
                        onClick={() => handleCopy(sc.quote, sc.id)}
                        className="flex items-center gap-1 px-3 py-1 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors text-xs font-mono font-light cursor-pointer shrink-0"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* CATEGORY 4: COMPANION REVIEWS (陪评) */}
      {category === 'companion' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xs text-left transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-light text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                SECTION 04
              </span>
              <span className="text-[10px] font-mono font-light px-2 py-0.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 uppercase">
                LONG-TERM
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-normal text-neutral-950 dark:text-white tracking-wider uppercase font-sans">
                  COMPANION REVIEWS
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-mono font-light">
                  包周、包月及深度陪伴光之子的温情长文记录
                </p>
              </div>

              <div className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-mono font-light self-start">
                LONG-TERM PARTNER
              </div>
            </div>
          </div>

          {/* Long form reviews */}
          <div className="space-y-3">
            {data.companionReviews.map((rev) => {
              const currentLikes = likedReviews[rev.id] !== undefined ? likedReviews[rev.id] : rev.likes;
              const isLiked = currentLikes > rev.likes;

              return (
                <div
                  key={rev.id}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3 text-left transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-mono text-xs font-light">
                        {rev.clientName.slice(0, 1)}
                      </div>
                      <div>
                        <div className="font-normal text-neutral-900 dark:text-white text-sm flex items-center gap-2">
                          {rev.clientName}
                          <span className="text-[10px] font-mono font-light px-2 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                            {rev.tag}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-light text-neutral-400 dark:text-neutral-500">{rev.date} · 长期陪伴</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-light text-neutral-800 dark:text-neutral-200">
                      ★ ★ ★ ★ ★
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-light whitespace-pre-line">
                    {rev.content}
                  </p>

                  {rev.reply && (
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
                      <div className="font-normal text-neutral-900 dark:text-white flex items-center gap-1 text-[11px] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                        {data.nickname} (REPLY)
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">{rev.reply}</p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 font-mono font-light">
                    <button
                      onClick={() => handleToggleLike(rev.id, rev.likes)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        isLiked
                          ? 'text-neutral-950 dark:text-white bg-neutral-200 dark:bg-neutral-800 font-normal'
                          : 'hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white' : ''}`} />
                      <span>{currentLikes} RESONANCE</span>
                    </button>

                    <span className="text-[10px]">AUTHORIZED TESTIMONIAL</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Booking / Contact Card in Pure Monochrome */}
      <div className="bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 text-white rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left transition-colors">
        <div>
          <h4 className="font-normal text-base font-mono tracking-wider">
            BOOKING & INQUIRY / 预约方式
          </h4>
          <p className="text-xs text-neutral-400 dark:text-neutral-400 mt-1 font-mono font-light">
            {data.contactWeChatOrQQ} · {data.contactUid}
          </p>
        </div>

        <button
          onClick={handleCopyContact}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-mono font-light text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95"
        >
          {contactCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-normal">COPIED / 已复制！添加备注三恋</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY CONTACT / 复制联系方式</span>
            </>
          )}
        </button>
      </div>

      {/* Return to Category Selection Button */}
      <div className="pt-2 text-center">
        <button
          onClick={onBackToSelection}
          className="px-6 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono font-light text-xs sm:text-sm inline-flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>BACK TO CATEGORIES / 返回四个栏目选择</span>
        </button>
      </div>

    </div>
  );
};

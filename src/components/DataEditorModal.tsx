import React, { useState } from 'react';
import { ProfileData } from '../types';
import { X, Save, RotateCcw, Check } from 'lucide-react';
import { defaultProfileData } from '../data/defaultData';

interface DataEditorModalProps {
  isOpen: boolean;
  data: ProfileData;
  onSave: (newData: ProfileData) => void;
  onClose: () => void;
}

export const DataEditorModal: React.FC<DataEditorModalProps> = ({
  isOpen,
  data,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<ProfileData>(data);
  const [activeTab, setActiveTab] = useState<'basic' | 'intro' | 'style' | 'contact'>('basic');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    if (confirm('确定要恢复为初始预设素材吗？自定义修改的内容将被重置。')) {
      setFormData(defaultProfileData);
    }
  };

  const handleSave = () => {
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs font-mono">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
              EDITOR / 素材自定义
            </span>
            <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
              CUSTOMIZE PROFILE CONTENT
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-neutral-200 bg-white px-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('basic')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'basic' ? 'border-neutral-900 text-neutral-950 font-bold' : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            01. WELCOME
          </button>
          <button
            onClick={() => setActiveTab('intro')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'intro' ? 'border-neutral-900 text-neutral-950 font-bold' : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            02. PERSONAL INFO
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'style' ? 'border-neutral-900 text-neutral-950 font-bold' : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            03. MY STYLE
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'contact' ? 'border-neutral-900 text-neutral-950 font-bold' : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            04. CONTACT
          </button>
        </div>

        {/* Tab Form Bodies */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm font-sans">
          
          {/* TAB 1: Basic */}
          {activeTab === 'basic' && (
            <div className="space-y-3.5 text-left">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">SITE TITLE</label>
                <input
                  type="text"
                  value={formData.siteTitle}
                  onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">SUBTITLE</label>
                <input
                  type="text"
                  value={formData.siteSubtitle}
                  onChange={(e) => setFormData({ ...formData, siteSubtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">WELCOME GREETING</label>
                <input
                  type="text"
                  value={formData.welcomeGreeting}
                  onChange={(e) => setFormData({ ...formData, welcomeGreeting: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">WELCOME INTRO</label>
                <textarea
                  rows={3}
                  value={formData.welcomeIntro}
                  onChange={(e) => setFormData({ ...formData, welcomeIntro: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Intro / Personal Info */}
          {activeTab === 'intro' && (
            <div className="space-y-3.5 text-left">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">NICKNAME</label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">HANDLE (@)</label>
                  <input
                    type="text"
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">
                  STATEMENT (犬系痕，19/H/金牛ENTP。)
                </label>
                <input
                  type="text"
                  value={formData.bioSummary}
                  onChange={(e) => setFormData({ ...formData, bioSummary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">AVATAR URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm font-mono"
                  />
                  <img
                    src={formData.avatarUrl}
                    alt="Preview"
                    className="w-9 h-9 rounded-lg object-cover border border-neutral-300 grayscale shrink-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">SERVER</label>
                  <input
                    type="text"
                    value={formData.skyStats.server}
                    onChange={(e) => setFormData({
                      ...formData,
                      skyStats: { ...formData.skyStats, server: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">WINGS</label>
                  <input
                    type="text"
                    value={formData.skyStats.wings}
                    onChange={(e) => setFormData({
                      ...formData,
                      skyStats: { ...formData.skyStats, wings: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">HEIGHT</label>
                  <input
                    type="text"
                    value={formData.skyStats.height}
                    onChange={(e) => setFormData({
                      ...formData,
                      skyStats: { ...formData.skyStats, height: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">SEASON</label>
                  <input
                    type="text"
                    value={formData.skyStats.entrySeason}
                    onChange={(e) => setFormData({
                      ...formData,
                      skyStats: { ...formData.skyStats, entrySeason: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Style */}
          {activeTab === 'style' && (
            <div className="space-y-3.5 text-left">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">
                  STYLE TAGS (以逗号分隔)
                </label>
                <input
                  type="text"
                  value={formData.styleTags.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    styleTags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">
                  STYLE DESCRIPTION / 核心内容
                </label>
                <textarea
                  rows={4}
                  value={formData.styleDescription}
                  onChange={(e) => setFormData({ ...formData, styleDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm"
                />
              </div>
            </div>
          )}

          {/* TAB 4: Contact */}
          {activeTab === 'contact' && (
            <div className="space-y-3.5 text-left">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">UID</label>
                <input
                  type="text"
                  value={formData.contactUid}
                  onChange={(e) => setFormData({ ...formData, contactUid: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1 font-mono text-xs">CONTACT (QQ / WECHAT)</label>
                <input
                  type="text"
                  value={formData.contactWeChatOrQQ}
                  onChange={(e) => setFormData({ ...formData, contactWeChatOrQQ: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-neutral-900 bg-neutral-50 focus:bg-white text-xs sm:text-sm font-mono"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70 px-3 py-2 rounded-xl border border-neutral-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET / 恢复默认</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>SAVED!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>SAVE / 保存</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

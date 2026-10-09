import React, { useState, useEffect } from 'react';
import { Step, CategoryKey, ProfileData } from './types';
import { defaultProfileData } from './data/defaultData';
import { Header } from './components/Header';
import { WelcomeView } from './components/WelcomeView';
import { IntroView } from './components/IntroView';
import { StyleView } from './components/StyleView';
import { CategorySelectionView } from './components/CategorySelectionView';
import { CategoryDetailView } from './components/CategoryDetailView';
import { DataEditorModal } from './components/DataEditorModal';
import { ImageModal } from './components/ImageModal';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';

const STORAGE_KEY = 'sky_profile_hen_v9';
const THEME_KEY = 'sky_profile_theme_mode';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('rules');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(THEME_KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(THEME_KEY, 'light');
      }
    } catch {
      // Ignore
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const [profileData, setProfileData] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('sky_profile_hen_v8');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.siteTitle || parsed.siteTitle === 'HEN PROFILE ARCHIVE' || parsed.siteTitle === '光遇三恋资料馆') {
          parsed.siteTitle = '犬系痕-您想我了';
        }
        return parsed;
      }
    } catch {
      // Fallback
    }
    return defaultProfileData;
  });

  useEffect(() => {
    document.title = profileData.siteTitle || '犬系痕-您想我了';
  }, [profileData.siteTitle]);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ isOpen: boolean; url: string; caption: string }>({
    isOpen: false,
    url: '',
    caption: '',
  });

  // Save changes to localStorage
  const handleSaveData = (newData: ProfileData) => {
    setProfileData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // Ignore
    }
  };

  // User flow: WELCOME -> PERSONAL INFO -> MY STYLE -> CATEGORIES -> DETAILS
  const handleStartFromWelcome = () => {
    setCurrentStep('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromIntro = () => {
    setCurrentStep('style');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevFromIntro = () => {
    setCurrentStep('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromStyle = () => {
    setCurrentStep('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevFromStyle = () => {
    setCurrentStep('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (key: CategoryKey) => {
    setSelectedCategory(key);
    setCurrentStep('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevFromCategories = () => {
    setCurrentStep('style');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCategoriesFromDetail = () => {
    setCurrentStep('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectNavigation = (step: Step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenImage = (url: string, caption: string) => {
    setPreviewImage({
      isOpen: true,
      url,
      caption,
    });
  };

  const handleCloseImage = () => {
    setPreviewImage((prev) => ({ ...prev, isOpen: false }));
  };

  const handleUpdateBannerImage = (url: string) => {
    const updated = { ...profileData, bannerUrl: url };
    handleSaveData(updated);
  };

  const handleUpdateInfoImage = (url: string) => {
    const updated = { ...profileData, infoImageUrl: url };
    handleSaveData(updated);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'dark bg-[#0c0d0e] text-neutral-100 selection:bg-neutral-200 selection:text-neutral-900' 
        : 'bg-[#f8f9fa] text-neutral-900 selection:bg-neutral-800 selection:text-white'
    }`}>
      {/* Minimalist Monochrome Header */}
      <Header
        currentStep={currentStep}
        onNavigate={handleDirectNavigation}
        onOpenEditor={() => setIsEditorOpen(true)}
        siteTitle={profileData.siteTitle}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area based on current step */}
      <main className="flex-1 pb-16">
        {currentStep === 'welcome' && (
          <WelcomeView
            data={profileData}
            onStart={handleStartFromWelcome}
          />
        )}

        {currentStep === 'intro' && (
          <IntroView
            data={profileData}
            onNext={handleNextFromIntro}
            onPrev={handlePrevFromIntro}
            onImageClick={handleOpenImage}
          />
        )}

        {currentStep === 'style' && (
          <StyleView
            data={profileData}
            onNext={handleNextFromStyle}
            onPrev={handlePrevFromStyle}
          />
        )}

        {currentStep === 'categories' && (
          <CategorySelectionView
            data={profileData}
            onSelectCategory={handleSelectCategory}
            onPrev={handlePrevFromCategories}
          />
        )}

        {currentStep === 'detail' && (
          <CategoryDetailView
            category={selectedCategory}
            data={profileData}
            onBackToSelection={handleBackToCategoriesFromDetail}
            onSwitchCategory={(cat) => setSelectedCategory(cat)}
            onImageClick={handleOpenImage}
          />
        )}
      </main>

      {/* Minimalist Monochrome Footer */}
      <footer className="mt-auto py-6 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/90 text-center text-xs text-neutral-400 dark:text-neutral-500 font-mono transition-colors">
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white transition-colors"></span>
            <span className="text-neutral-700 dark:text-neutral-300">{profileData.siteTitle} · 3L ARCHIVE</span>
          </div>
          <div className="text-[11px] text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">
            BLACK & WHITE MINIMALISM
          </div>
        </div>
      </footer>

      {/* Material Customizer Modal */}
      <DataEditorModal
        isOpen={isEditorOpen}
        data={profileData}
        onSave={handleSaveData}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* Screenshot Preview Modal */}
      <ImageModal
        isOpen={previewImage.isOpen}
        imageUrl={previewImage.url}
        caption={previewImage.caption}
        onClose={handleCloseImage}
      />

      {/* Continuous Loop Background Music Player */}
      <BackgroundMusicPlayer />
    </div>
  );
}

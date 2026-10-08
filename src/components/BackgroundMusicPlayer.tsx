import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Disc } from 'lucide-react';

export const BackgroundMusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Audio source with relative base path handling
  const audioSrc = `${import.meta.env.BASE_URL}audio/late_night_lover.mp3`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    // Attempt autoplay
    const attemptPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {
        // Autoplay blocked by browser policy until user gesture
        setIsPlaying(false);
      });
    };

    attemptPlay();

    // Browser autoplay policy: start on the first user interaction anywhere on the document
    const handleFirstGesture = () => {
      if (!hasInteracted && audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [hasInteracted]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch((err) => {
        console.error('Audio play error:', err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Background persistent audio tag */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Music Player Widget */}
      <div className="fixed bottom-5 right-5 z-50 select-none">
        {/* Expanded Card on Click or Hover */}
        {isExpanded ? (
          <div className="bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl shadow-neutral-900/5 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-all duration-300 max-w-[280px] sm:max-w-[320px]">
            {/* Spinning Disc Cover */}
            <div 
              onClick={togglePlay}
              className="relative w-11 h-11 rounded-full bg-neutral-900 flex items-center justify-center cursor-pointer shadow-sm group shrink-0"
              title={isPlaying ? "点击暂停" : "点击播放"}
            >
              <Disc className={`w-7 h-7 text-neutral-300 transition-transform ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
              </div>
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-xs text-neutral-800 truncate">
                  late night lover
                </span>
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-2.5 shrink-0">
                    <span className="w-0.5 h-full bg-neutral-700 animate-pulse" style={{ animationDuration: '0.6s' }}></span>
                    <span className="w-0.5 h-2/3 bg-neutral-700 animate-pulse" style={{ animationDuration: '0.9s' }}></span>
                    <span className="w-0.5 h-full bg-neutral-700 animate-pulse" style={{ animationDuration: '0.4s' }}></span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 truncate">三棱镜 (午夜恋人)</p>
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "暂停" : "播放"}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "取消静音" : "静音"}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 flex items-center justify-center transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-[10px] text-neutral-400 hover:text-neutral-600 px-1 py-1"
                title="收起"
              >
                收起
              </button>
            </div>
          </div>
        ) : (
          /* Compact Floating Badge */
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-lg shadow-neutral-900/5 hover:shadow-xl rounded-full px-3 py-2 text-neutral-800 hover:border-neutral-400 transition-all duration-200 group cursor-pointer"
            title="点击展开音乐播放器"
          >
            {/* Spinning Disc / Music Icon */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="relative w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Music className={`w-3.5 h-3.5 text-neutral-200 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
            </div>

            <div className="flex items-center gap-1.5 text-left">
              <span className="text-xs font-normal text-neutral-800 hidden xs:inline tracking-tight">
                {isPlaying ? '播放中' : '背景音乐'}
              </span>
              <span className="text-[11px] text-neutral-400 max-w-[80px] sm:max-w-[100px] truncate hidden sm:inline">
                late night lover
              </span>
            </div>

            {/* Audio Wave Bars when playing */}
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3 px-0.5 shrink-0">
                <span className="w-0.5 h-full bg-neutral-900 animate-pulse" style={{ animationDuration: '0.6s' }}></span>
                <span className="w-0.5 h-2/3 bg-neutral-900 animate-pulse" style={{ animationDuration: '0.8s' }}></span>
                <span className="w-0.5 h-full bg-neutral-900 animate-pulse" style={{ animationDuration: '0.5s' }}></span>
              </div>
            ) : (
              <span className="text-[10px] text-neutral-400 px-0.5">▶</span>
            )}
          </button>
        )}
      </div>
    </>
  );
};

import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  caption: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  caption,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in font-mono">
      <div className="relative max-w-3xl w-full bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer border border-neutral-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[75vh] flex items-center justify-center bg-black">
          <img
            src={imageUrl}
            alt={caption}
            className="w-full h-auto max-h-[75vh] object-contain"
          />
        </div>

        {caption && (
          <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium flex items-center justify-between">
            <span>{caption}</span>
            <span className="text-xs text-neutral-500 uppercase">SKY DOSSIER SHOT</span>
          </div>
        )}
      </div>
    </div>
  );
};

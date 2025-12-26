import { useState, useEffect } from 'react';
import type { GalleryImage } from '../data/gallery';

interface ImageViewerProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function ImageViewer({ images, currentIndex, onClose, onIndexChange }: ImageViewerProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentImage = images[currentIndex];
  const hasNext = currentIndex < images.length - 1;
  const hasPrev = currentIndex > 0;

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasNext) {
      onIndexChange(currentIndex + 1);
    }
    if (isRightSwipe && hasPrev) {
      onIndexChange(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onIndexChange(currentIndex + 1);
      if (e.key === 'ArrowLeft' && hasPrev) onIndexChange(currentIndex - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasNext, hasPrev, onClose, onIndexChange]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4">
        <span className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close viewer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image area */}
      <div
        className="flex-1 flex items-center justify-center px-4 relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Previous button (desktop) */}
        {hasPrev && (
          <button
            onClick={() => onIndexChange(currentIndex - 1)}
            className="hidden md:flex absolute left-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Image */}
        <img
          src={currentImage.src}
          alt={currentImage.caption || ''}
          className="max-w-full max-h-full object-contain"
        />

        {/* Next button (desktop) */}
        {hasNext && (
          <button
            onClick={() => onIndexChange(currentIndex + 1)}
            className="hidden md:flex absolute right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <div className="p-4 text-center">
          <p className="text-white text-sm">{currentImage.caption}</p>
        </div>
      )}

      {/* Swipe hint (mobile only) */}
      <div className="md:hidden pb-4 text-center">
        <p className="text-white/50 text-xs">Scorri per navigare</p>
      </div>
    </div>
  );
}

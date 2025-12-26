import { useState } from 'react';
import { galleryImages } from '../data/gallery';
import { ImageViewer } from './ImageViewer';
import { useLanguage } from '../i18n/LanguageContext';
import { ChevronLeftIcon } from './icons';

interface GalleryProps {
  onBack: () => void;
}

export function Gallery({ onBack }: GalleryProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-stone-100 transition-colors"
            aria-label="Back to menu"
          >
            <ChevronLeftIcon className="h-6 w-6 text-stone-600" />
          </button>
          <h1 className="text-lg font-semibold text-[#7B2D34] font-['Cinzel']">
            {t('gallery')}
          </h1>
        </div>
      </header>

      {/* Image Feed */}
      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {galleryImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-500">{t('photosComingSoon')}</p>
          </div>
        ) : (
          galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100"
            >
              <button
                onClick={() => openViewer(index)}
                className="w-full aspect-video relative overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.caption || ''}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </button>
              {image.caption && (
                <div className="p-3">
                  <p className="text-stone-700 text-sm">{image.caption}</p>
                </div>
              )}
            </div>
          ))
        )}
      </main>

      {/* Fullscreen Viewer */}
      {viewerOpen && (
        <ImageViewer
          images={galleryImages}
          currentIndex={currentIndex}
          onClose={() => setViewerOpen(false)}
          onIndexChange={setCurrentIndex}
        />
      )}
    </div>
  );
}

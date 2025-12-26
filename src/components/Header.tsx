import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { LocationIcon, CartIcon, GalleryIcon } from './icons';
import { CONFIG } from '../constants/config';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onGalleryClick: () => void;
}

export function Header({ cartCount, onCartClick, onGalleryClick }: HeaderProps) {
  const { t } = useLanguage();
  const hasItems = cartCount > 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={CONFIG.logoPath} alt={CONFIG.shopName} className="h-10 w-10 object-contain" />
          <div>
            <h1 className="text-lg font-semibold text-[#7B2D34] font-['Cinzel']">{t('shopName')}</h1>
            <p className="text-xs text-stone-500 font-['Cinzel']">{t('shopSubtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <button
            onClick={onGalleryClick}
            className="p-2 rounded-full hover:bg-stone-100 transition-colors"
            aria-label="View gallery"
          >
            <GalleryIcon className="h-6 w-6 text-[#7B2D34]" />
          </button>
          <a
            href={CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-stone-100 transition-colors"
            aria-label="View location on Google Maps"
          >
            <LocationIcon className="h-6 w-6 text-[#7B2D34]" />
          </a>
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full hover:bg-stone-100 transition-colors"
          >
            <CartIcon className="h-6 w-6 text-[#7B2D34]" />
            {hasItems && (
              <span className="absolute -top-1 -right-1 bg-[#7B2D34] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

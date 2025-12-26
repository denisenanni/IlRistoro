import { useLanguage } from '../i18n/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:bg-stone-100 transition-colors text-xl"
      aria-label={`Switch to ${language === 'it' ? 'English' : 'Italian'}`}
    >
      {language === 'it' ? '🇬🇧' : '🇮🇹'}
    </button>
  );
}

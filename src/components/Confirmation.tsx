import { useLanguage } from '../i18n/LanguageContext';

interface ConfirmationProps {
  onNewOrder: () => void;
}

export function Confirmation({ onNewOrder }: ConfirmationProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100 text-center max-w-sm w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">{t('orderSent')}</h1>
        <p className="text-stone-600 mb-6">
          {t('orderConfirmation')}
        </p>
        <button
          onClick={onNewOrder}
          className="w-full py-3 bg-[#7B2D34] text-white font-semibold rounded-xl hover:bg-[#5f2329] transition-colors"
        >
          {t('newOrder')}
        </button>
      </div>
    </div>
  );
}

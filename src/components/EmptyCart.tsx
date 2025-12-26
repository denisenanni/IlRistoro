import { useLanguage } from '../i18n/LanguageContext';
import { EmptyCartIcon } from './icons';

export function EmptyCart() {
  const { t } = useLanguage();

  return (
    <div className="text-center py-12">
      <EmptyCartIcon className="h-16 w-16 mx-auto text-stone-300" />
      <p className="mt-4 text-stone-500">{t('emptyCart')}</p>
    </div>
  );
}

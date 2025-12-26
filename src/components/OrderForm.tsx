import type { CartItem, OrderData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useOrderForm } from '../hooks/useOrderForm';
import { ChevronLeftIcon } from './icons';
import { formatPrice } from '../utils/formatters';

interface OrderFormProps {
  items: CartItem[];
  total: number;
  onBack: () => void;
  onSubmit: (data: OrderData) => Promise<void>;
}

export function OrderForm({ items, total, onBack, onSubmit }: OrderFormProps) {
  const { t } = useLanguage();
  const { formData, isSubmitting, error, updateField, handleSubmit } = useOrderForm();

  // Handle empty cart edge case
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-600 mb-4">Your cart is empty</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-[#7B2D34] text-white font-semibold rounded-xl hover:bg-[#5f2329] transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-stone-100 transition-colors"
            aria-label="Back to menu"
          >
            <ChevronLeftIcon className="h-6 w-6 text-stone-600" />
          </button>
          <h1 className="text-lg font-semibold text-stone-900 font-['Cinzel']">{t('completeOrder')}</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 mb-6">
          <h2 className="font-semibold text-stone-900 mb-3 font-['Cinzel']">{t('orderSummary')}</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-stone-600">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="text-stone-900 font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t border-stone-200 pt-2 mt-2 flex justify-between">
              <span className="font-semibold text-stone-900">{t('total')}</span>
              <span className="font-bold text-[#7B2D34]">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit, t('orderError'))} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
              {t('name')} {t('required')}
            </label>
            <input
              type="text"
              id="name"
              required
              maxLength={100}
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors"
              placeholder={t('namePlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
              {t('phone')} {t('required')}
            </label>
            <input
              type="tel"
              id="phone"
              required
              maxLength={20}
              pattern="[+]?[\d\s()-]{8,20}"
              title="Enter a valid phone number (8-20 characters)"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors"
              placeholder={t('phonePlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="pickupTime" className="block text-sm font-medium text-stone-700 mb-1">
              {t('pickupTime')}
            </label>
            <input
              type="time"
              id="pickupTime"
              value={formData.pickupTime}
              onChange={(e) => updateField('pickupTime', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-stone-700 mb-1">
              {t('notes')} ({t('optional')})
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors resize-none"
              placeholder={t('notesPlaceholder')}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#7B2D34] text-white font-semibold rounded-xl hover:bg-[#5f2329] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('sending') : t('sendOrder')}
          </button>
        </form>
      </main>
    </div>
  );
}
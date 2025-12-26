import type { CartItem as CartItemType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { CloseIcon } from './icons';
import { CartItem } from './CartItem';
import { EmptyCart } from './EmptyCart';
import { formatPrice } from '../utils/formatters';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  total: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export function Cart({
  isOpen,
  onClose,
  items,
  total,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartProps) {
  const { t } = useLanguage();
  const isEmpty = items.length === 0;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 shadow-xl transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900 font-['Cinzel']">{t('cart')}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <CloseIcon className="h-6 w-6 text-stone-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {isEmpty ? (
              <EmptyCart />
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            )}
          </div>

          {!isEmpty && (
            <div className="border-t border-stone-200 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-stone-900">{t('total')}</span>
                <span className="text-xl font-bold text-[#7B2D34]">{formatPrice(total)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3 bg-[#7B2D34] text-white font-semibold rounded-xl hover:bg-[#5f2329] transition-colors"
              >
                {t('checkout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

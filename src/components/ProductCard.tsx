import type { Product } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { PlusIcon } from './icons';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const { t } = useLanguage();
  const isPriceSet = product.price > 0;

  const handleAdd = () => onAdd(product);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 flex justify-between items-start gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-stone-900">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">{product.description}</p>
        )}
        <p className="text-[#7B2D34] font-semibold mt-2">
          {isPriceSet ? formatPrice(product.price) : t('priceNotSet')}
        </p>
      </div>
      <button
        onClick={handleAdd}
        disabled={!isPriceSet}
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          isPriceSet
            ? 'bg-[#7B2D34] text-white hover:bg-[#5f2329]'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
        aria-label={`Add ${product.name} to cart`}
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

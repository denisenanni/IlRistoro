import type { CartItem as CartItemType } from '../types';
import { MinusIcon, PlusIcon, TrashIcon } from './icons';
import { formatPrice } from '../utils/formatters';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleDecrement = () => onUpdateQuantity(item.product.id, item.quantity - 1);
  const handleIncrement = () => onUpdateQuantity(item.product.id, item.quantity + 1);
  const handleRemove = () => onRemove(item.product.id);

  return (
    <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-stone-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-[#7B2D34] font-semibold">
          {formatPrice(item.product.price * item.quantity)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center hover:bg-stone-100 transition-colors"
          aria-label={`Decrease quantity of ${item.product.name}`}
        >
          <MinusIcon />
        </button>
        <span className="w-8 text-center font-medium" aria-label="Quantity">
          {item.quantity}
        </span>
        <button
          onClick={handleIncrement}
          className="w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center hover:bg-stone-100 transition-colors"
          aria-label={`Increase quantity of ${item.product.name}`}
        >
          <PlusIcon />
        </button>
        <button
          onClick={handleRemove}
          className="w-8 h-8 rounded-full text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
          aria-label={`Remove ${item.product.name} from cart`}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

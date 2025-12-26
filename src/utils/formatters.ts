import type { CartItem, OrderData } from '../types';

export function formatPrice(price: number): string {
  return `€${price.toFixed(2)}`;
}

function sanitizeUserInput(text: string, maxLength: number = 500): string {
  // Escape Markdown special characters and limit length
  return text
    .slice(0, maxLength)
    .replace(/([*_`[\]\\])/g, '\\$1');
}

export function formatOrderMessage(items: CartItem[], total: number, data: OrderData): string {
  const itemsList = items
    .map((item) => {
      const productName = sanitizeUserInput(item.product.name, 100);
      return `${item.quantity}x ${productName} - ${formatPrice(item.product.price * item.quantity)}`;
    })
    .join('\n');

  const parts = [
    '🛒 *Nuovo Ordine!*',
    '',
    itemsList,
    '',
    '━━━━━━━━━━━━━━━━',
    `*Totale: ${formatPrice(total)}*`,
    '',
    `👤 *Nome:* ${sanitizeUserInput(data.name, 100)}`,
    `📞 *Telefono:* ${sanitizeUserInput(data.phone, 20)}`,
  ];

  if (data.pickupTime) {
    parts.push(`🕐 *Ritiro:* ${sanitizeUserInput(data.pickupTime, 10)}`);
  }

  if (data.notes) {
    parts.push(`📝 *Note:* ${sanitizeUserInput(data.notes, 500)}`);
  }

  return parts.join('\n').trim();
}

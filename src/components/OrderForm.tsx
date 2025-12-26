import { useState } from 'react';
import type { CartItem, OrderData } from '../types';

interface OrderFormProps {
  items: CartItem[];
  total: number;
  onBack: () => void;
  onSubmit: (data: OrderData) => Promise<void>;
}

export function OrderForm({ items, total, onBack, onSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderData>({
    name: '',
    phone: '',
    pickupTime: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError("Errore nell'invio dell'ordine. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-stone-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-stone-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-stone-900">Completa l'ordine</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Order Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 mb-6">
          <h2 className="font-semibold text-stone-900 mb-3">Riepilogo ordine</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-stone-600">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="text-stone-900 font-medium">
                  €{(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-stone-200 pt-2 mt-2 flex justify-between">
              <span className="font-semibold text-stone-900">Totale</span>
              <span className="font-bold text-[#7B2D34]">€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
              Nome *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors"
              placeholder="Il tuo nome"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
              Telefono *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors"
              placeholder="333 1234567"
            />
          </div>

          <div>
            <label htmlFor="pickupTime" className="block text-sm font-medium text-stone-700 mb-1">
              Orario di ritiro
            </label>
            <input
              type="time"
              id="pickupTime"
              value={formData.pickupTime}
              onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-stone-700 mb-1">
              Note (opzionale)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors resize-none"
              placeholder="Allergie, richieste particolari..."
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
            {isSubmitting ? 'Invio in corso...' : 'Invia ordine'}
          </button>
        </form>
      </main>
    </div>
  );
}
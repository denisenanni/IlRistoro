import { useState } from 'react';
import { useCart } from './hooks/useCart';
import type { OrderData } from './types';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { OrderForm } from './components/OrderForm';
import { Confirmation } from './components/Confirmation';

type View = 'menu' | 'checkout' | 'confirmation';

function AppContent() {
  const [view, setView] = useState<View>('menu');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleSubmitOrder = async (data: OrderData) => {
    // Format order message for Telegram
    const itemsList = cart.items
      .map((item) => `${item.quantity}x ${item.product.name} - €${(item.product.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const message = `🛒 *Nuovo Ordine!*

${itemsList}

━━━━━━━━━━━━━━━━
*Totale: €${cart.total.toFixed(2)}*

👤 *Nome:* ${data.name}
📞 *Telefono:* ${data.phone}
${data.pickupTime ? `🕐 *Ritiro:* ${data.pickupTime}` : ''}
${data.notes ? `📝 *Note:* ${data.notes}` : ''}`.trim();

    // Send to serverless function
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send order');
    }

    cart.clearCart();
    setView('confirmation');
  };

  const handleNewOrder = () => {
    setView('menu');
  };

  if (view === 'confirmation') {
    return <Confirmation onNewOrder={handleNewOrder} />;
  }

  if (view === 'checkout') {
    return (
      <OrderForm
        items={cart.items}
        total={cart.total}
        onBack={() => setView('menu')}
        onSubmit={handleSubmitOrder}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header cartCount={cart.itemCount} onCartClick={() => setIsCartOpen(true)} />
      <Menu onAddToCart={cart.addItem} />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart.items}
        total={cart.total}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
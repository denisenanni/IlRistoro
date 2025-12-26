import { useState } from 'react';
import { useCart } from './hooks/useCart';
import type { OrderData } from './types';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { OrderForm } from './components/OrderForm';
import { Confirmation } from './components/Confirmation';
import { formatOrderMessage } from './utils/formatters';
import { sendOrder } from './utils/api';

type View = 'menu' | 'checkout' | 'confirmation';

function AppContent() {
  const [view, setView] = useState<View>('menu');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();

  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleSubmitOrder = async (data: OrderData) => {
    const message = formatOrderMessage(cart.items, cart.total, data);
    // Don't clear cart or change view until order is successfully sent
    await sendOrder(message);
    // Only clear cart and show confirmation if no error was thrown
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
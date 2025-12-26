export const translations = {
  it: {
    // Header
    shopName: 'Il Ristoro',
    shopSubtitle: 'di Ercole',

    // Categories
    'pinse-bianche': 'Pinse Bianche',
    'pinse-rosse': 'Pinse Rosse',
    'pinse-fredde': 'Pinse Fredde',
    'taglieri': 'Taglieri',
    'fritti': 'Fritti',
    'bevande': 'Bevande',
    'birre': 'Birre',

    // Cart
    cart: 'Il tuo ordine',
    emptyCart: 'Il carrello è vuoto',
    total: 'Totale',
    checkout: "Procedi all'ordine",

    // Order form
    completeOrder: "Completa l'ordine",
    orderSummary: 'Riepilogo ordine',
    name: 'Nome',
    namePlaceholder: 'Il tuo nome',
    phone: 'Telefono',
    phonePlaceholder: '333 1234567',
    pickupTime: 'Orario di ritiro',
    notes: 'Note',
    notesPlaceholder: 'Allergie, richieste particolari...',
    optional: 'opzionale',
    required: '*',
    sendOrder: 'Invia ordine',
    sending: 'Invio in corso...',
    orderError: "Errore nell'invio dell'ordine. Riprova.",

    // Confirmation
    orderSent: 'Ordine inviato!',
    orderConfirmation: "Il tuo ordine è stato ricevuto. Ti aspettiamo all'orario indicato!",
    newOrder: 'Nuovo ordine',

    // Gallery
    gallery: 'Galleria',
    photosComingSoon: 'Foto in arrivo...',
    swipeToNavigate: 'Scorri per navigare',

    // Product
    priceNotSet: 'Prezzo da definire',
  },
  en: {
    // Header
    shopName: 'Il Ristoro',
    shopSubtitle: 'di Ercole',

    // Categories (keep Italian names for food)
    'pinse-bianche': 'White Pinse',
    'pinse-rosse': 'Red Pinse',
    'pinse-fredde': 'Cold Pinse',
    'taglieri': 'Charcuterie Boards',
    'fritti': 'Fried',
    'bevande': 'Drinks',
    'birre': 'Beers',

    // Cart
    cart: 'Your order',
    emptyCart: 'Cart is empty',
    total: 'Total',
    checkout: 'Proceed to order',

    // Order form
    completeOrder: 'Complete order',
    orderSummary: 'Order summary',
    name: 'Name',
    namePlaceholder: 'Your name',
    phone: 'Phone',
    phonePlaceholder: '333 1234567',
    pickupTime: 'Pickup time',
    notes: 'Notes',
    notesPlaceholder: 'Allergies, special requests...',
    optional: 'optional',
    required: '*',
    sendOrder: 'Send order',
    sending: 'Sending...',
    orderError: 'Error sending order. Please try again.',

    // Confirmation
    orderSent: 'Order sent!',
    orderConfirmation: 'Your order has been received. See you at the pickup time!',
    newOrder: 'New order',

    // Gallery
    gallery: 'Gallery',
    photosComingSoon: 'Photos coming soon...',
    swipeToNavigate: 'Swipe to navigate',

    // Product
    priceNotSet: 'Price TBD',
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.it;

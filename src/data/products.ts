import type { Product } from '../types';

export const products: Product[] = [
  // ==================== PINSE BIANCHE ====================
  { id: 'pb-1', name: 'Boscaiola', price: 9, category: 'pinse-bianche' },
  { id: 'pb-2', name: 'Crema di zucca e Guanciale', price: 10, category: 'pinse-bianche' },
  { id: 'pb-3', name: 'Crostino', price: 9, category: 'pinse-bianche' },
  { id: 'pb-4', name: 'Demoralizzata', price: 9, category: 'pinse-bianche' },
  { id: 'pb-5', name: 'Fiori e Alici', price: 9, category: 'pinse-bianche' },
  { id: 'pb-6', name: 'Fiori e Guanciale', price: 9, category: 'pinse-bianche' },
  { id: 'pb-7', name: 'Focaccia', price: 4.5, category: 'pinse-bianche' },
  { id: 'pb-8', name: 'Focaccia con Nutella', price: 7.5, category: 'pinse-bianche' },
  { id: 'pb-9', name: 'Funghi e crudo', price: 9, category: 'pinse-bianche' },
  { id: 'pb-10', name: 'Guanciale cotto al vino', price: 9, category: 'pinse-bianche' },
  { id: 'pb-11', name: "'Nduja e mozzarella", price: 9, category: 'pinse-bianche' },
  { id: 'pb-12', name: 'Noci e gorgonzola', price: 9, category: 'pinse-bianche' },
  { id: 'pb-13', name: 'Patate e mozzarella', price: 9, category: 'pinse-bianche' },
  { id: 'pb-14', name: 'Patate e salsiccia', price: 9, category: 'pinse-bianche' },
  { id: 'pb-15', name: 'Patate, tartufo e salsiccia', price: 10, category: 'pinse-bianche' },
  { id: 'pb-16', name: 'Radicchio, gorgonzola/provola e speck', price: 9, category: 'pinse-bianche' },
  { id: 'pb-17', name: 'Salsiccia e mozzarella', price: 9, category: 'pinse-bianche' },
  { id: 'pb-18', name: 'Wurstel e patatine', price: 9, category: 'pinse-bianche' },
  { id: 'pb-19', name: 'Zucchine e guanciale', price: 9, category: 'pinse-bianche' },
  { id: 'pb-20', name: 'Zucchine e mozzarella', price: 9, category: 'pinse-bianche' },

  // ==================== PINSE ROSSE ====================
  { id: 'pr-1', name: 'Cecio', description: 'Margherita + champignon + salsiccia + salame piccante', price: 10, category: 'pinse-rosse' },
  { id: 'pr-2', name: 'Diavola', price: 9, category: 'pinse-rosse' },
  { id: 'pr-3', name: 'Julia', description: 'Margherita + champignon + \'nduja', price: 10, category: 'pinse-rosse' },
  { id: 'pr-4', name: 'Marinara', description: 'Rossa + aglio + origano', price: 7, category: 'pinse-rosse' },
  { id: 'pr-5', name: 'Margherita', price: 8, category: 'pinse-rosse' },
  { id: 'pr-6', name: 'Margherita con bufala', price: 9, category: 'pinse-rosse' },
  { id: 'pr-7', name: "Margherita + 'nduja", price: 9, category: 'pinse-rosse' },
  { id: 'pr-8', name: 'Napoli', price: 9, category: 'pinse-rosse' },
  { id: 'pr-9', name: 'Rossa', price: 7, category: 'pinse-rosse' },
  { id: 'pr-10', name: 'Rossa con bufala a crudo', price: 9, category: 'pinse-rosse' },

  // ==================== PINSE FREDDE ====================
  { id: 'pf-1', name: 'Caprese', description: 'Base rossa, lattughino, bufala e pomodorini', price: 10, category: 'pinse-fredde' },
  { id: 'pf-2', name: 'S.A.L.M.O.', description: 'Base rossa, rucola, maionese e salmone', price: 10, category: 'pinse-fredde' },
  { id: 'pf-3', name: 'Bresaola e Rucola', description: 'Base rossa, bresaola, rucola e scaglie di parmigiano', price: 10, category: 'pinse-fredde' },
  { id: 'pf-4', name: 'Pistacchiosa', description: 'Base bianca, mortadella, stracciatella di bufala e pistacchi', price: 10, category: 'pinse-fredde' },
  { id: 'pf-5', name: 'Crudella', description: 'Base bianca, rucola, crudo di Bassiano, datterini, stracciatella di bufala e pistacchi', price: 10, category: 'pinse-fredde' },
  { id: 'pf-6', name: 'Romanella', description: 'Base di zucchine, stracciatella di bufala, datterini', price: 10, category: 'pinse-fredde' },

  // ==================== TAGLIERI ====================
  { id: 'tg-1', name: 'Tagliere piccolo', description: 'Supplì, patatine, prosciutto crudo, lonza, mortadella, salame, salsicce secche, mozzarella di bufala, formaggio, olive, bruschette', price: 7, category: 'taglieri' },
  { id: 'tg-2', name: 'Tagliere medio', description: 'Supplì, patatine, prosciutto crudo, lonza, mortadella, salame, salsicce secche, mozzarella di bufala, formaggio, olive, bruschette', price: 14, category: 'taglieri' },
  { id: 'tg-3', name: 'Tagliere grande', description: 'Supplì, patatine, prosciutto crudo, lonza, mortadella, salame, salsicce secche, mozzarella di bufala, formaggio, olive, bruschette', price: 20, category: 'taglieri' },

  // ==================== FRITTI ====================
  { id: 'fr-1', name: 'Supplì', price: 2, category: 'fritti' },
  { id: 'fr-2', name: 'Patatine fritte', price: 3, category: 'fritti' },

  // ==================== BEVANDE ====================
  { id: 'bv-1', name: 'Acqua 50cl', price: 1, category: 'bevande' },
  { id: 'bv-2', name: 'Acqua 100cl', price: 1.8, category: 'bevande' },
  { id: 'bv-3', name: 'Aranciata 275ml', price: 2.5, category: 'bevande' },
  { id: 'bv-4', name: 'Chinotto 275ml', price: 2.5, category: 'bevande' },
  { id: 'bv-5', name: 'Coca-Cola 33cl', price: 1.8, category: 'bevande' },
  { id: 'bv-6', name: 'Coca-Cola Zero 33cl', price: 1.8, category: 'bevande' },
  { id: 'bv-7', name: 'Coca-Cola (vetro)', price: 2.2, category: 'bevande' },
  { id: 'bv-8', name: 'Coca-Cola 1,5L', price: 3, category: 'bevande' },
  { id: 'bv-9', name: 'Fanta 33cl', price: 1.8, category: 'bevande' },
  { id: 'bv-10', name: 'Fanta Lemon 33cl', price: 1.8, category: 'bevande' },
  { id: 'bv-11', name: 'Fanta (vetro)', price: 2.2, category: 'bevande' },
  { id: 'bv-12', name: 'Gazzosa 275ml', price: 2.5, category: 'bevande' },
  { id: 'bv-13', name: 'Limonata 275ml', price: 2.5, category: 'bevande' },
  { id: 'bv-14', name: 'Redbull', price: 2.5, category: 'bevande' },
  { id: 'bv-15', name: 'Sprite (vetro)', price: 2.5, category: 'bevande' },
  { id: 'bv-16', name: 'Thè al limone', price: 1.8, category: 'bevande' },
  { id: 'bv-17', name: 'Thè alla pesca', price: 1.8, category: 'bevande' },

  // ==================== BIRRE ====================
  { id: 'br-1', name: 'Corona', price: 2.5, category: 'birre' },
  { id: 'br-2', name: 'Desperados', price: 2.5, category: 'birre' },
  { id: 'br-3', name: 'Heineken 33cl', price: 2, category: 'birre' },
  { id: 'br-4', name: 'Heineken 66cl', price: 3, category: 'birre' },
  { id: 'br-5', name: 'Ichnusa 33cl (non filtrata)', price: 2.5, category: 'birre' },
  { id: 'br-6', name: 'Ichnusa 50cl (non filtrata)', price: 3.5, category: 'birre' },
  { id: 'br-7', name: 'Ichnusa 33cl (filtrata)', price: 2.5, category: 'birre' },
  { id: 'br-8', name: 'Ichnusa 66cl (filtrata)', price: 4, category: 'birre' },
  { id: 'br-9', name: 'Leffe Blonde', price: 3, category: 'birre' },
  { id: 'br-10', name: 'Leffe Rogue', price: 3, category: 'birre' },
  { id: 'br-11', name: 'Messina', price: 2.5, category: 'birre' },
  { id: 'br-12', name: 'Moretti', price: 3, category: 'birre' },
  { id: 'br-13', name: 'Nastro Azzurro 33cl', price: 1.8, category: 'birre' },
  { id: 'br-14', name: 'Nastro Azzurro 66cl', price: 3, category: 'birre' },
  { id: 'br-15', name: 'Peroni 66cl', price: 3, category: 'birre' },
  { id: 'br-16', name: 'Peroni 33cl', price: 1.8, category: 'birre' },
  { id: 'br-17', name: "Tennent's", price: 2.5, category: 'birre' },
];

export const categoryLabels: Record<string, string> = {
  'pinse-bianche': 'Pinse Bianche',
  'pinse-rosse': 'Pinse Rosse',
  'pinse-fredde': 'Pinse Fredde',
  'taglieri': 'Taglieri',
  'fritti': 'Fritti',
  'bevande': 'Bevande',
  'birre': 'Birre',
};

export const categories = [
  'pinse-bianche',
  'pinse-rosse',
  'pinse-fredde',
  'taglieri',
  'fritti',
  'bevande',
  'birre',
] as const;

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: Category;
}

export type Category =
  | 'pinse-bianche'
  | 'pinse-rosse'
  | 'pinse-fredde'
  | 'taglieri'
  | 'fritti'
  | 'bevande'
  | 'birre';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderData {
  name: string;
  phone: string;
  pickupTime: string;
  notes?: string;
}

export interface Order extends OrderData {
  items: CartItem[];
  total: number;
}

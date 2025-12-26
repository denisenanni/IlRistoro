import { useState } from 'react';
import type { Product, Category } from '../types';
import { products, categoryLabels } from '../data/products';
import { CategoryTabs } from './CategoryTabs';
import { ProductCard } from './ProductCard';

interface MenuProps {
  onAddToCart: (product: Product) => void;
}

export function Menu({ onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('pinse-bianche');

  const filteredProducts = products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex-1">
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="max-w-lg mx-auto px-4 py-4">
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          {categoryLabels[activeCategory]}
        </h2>
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={onAddToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

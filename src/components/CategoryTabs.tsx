import type { Category } from '../types';
import { categoryLabels, categories } from '../data/products';

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-[73px] z-40 bg-white border-b border-stone-200">
      <div className="max-w-lg mx-auto">
        <nav className="flex overflow-x-auto scrollbar-hide py-2 px-4 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-[#7B2D34] text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

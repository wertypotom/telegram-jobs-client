'use client';

import { useTranslation } from 'react-i18next';

interface Category {
  id: string;
  name: string;
  subtext: string;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  activeFilterCount: number;
  onClearAll: () => void;
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  activeFilterCount,
  onClearAll,
}: CategorySidebarProps) {
  const { t } = useTranslation('dashboard');

  return (
    <div className="w-full h-full bg-gray-50 border-r overflow-y-auto">
      <div className="py-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-6 py-4 cursor-pointer border-l-4 transition-colors ${
              selectedCategory === cat.id
                ? 'bg-white border-cyan-500'
                : 'border-transparent hover:bg-gray-100'
            }`}
          >
            <h3
              className={`font-semibold text-sm ${
                selectedCategory === cat.id ? 'text-black' : 'text-gray-700'
              }`}
            >
              {cat.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1 truncate">{cat.subtext}</p>
          </div>
        ))}

        {/* Clear All Button */}
        {activeFilterCount > 0 && (
          <div className="mx-6 mt-8">
            <button
              onClick={onClearAll}
              className="w-full px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 font-medium text-sm transition-colors"
            >
              {t('filters.clearAll')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

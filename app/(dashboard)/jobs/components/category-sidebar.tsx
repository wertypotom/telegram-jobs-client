'use client';

interface Category {
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
  return (
    <div className="w-1/3 bg-gray-50 border-r overflow-y-auto">
      <div className="py-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`px-6 py-4 cursor-pointer border-l-4 transition-colors ${
              selectedCategory === cat.name
                ? 'bg-white border-emerald-500'
                : 'border-transparent hover:bg-gray-100'
            }`}
          >
            <h3
              className={`font-semibold text-sm ${
                selectedCategory === cat.name ? 'text-black' : 'text-gray-700'
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
              className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 font-medium text-sm transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

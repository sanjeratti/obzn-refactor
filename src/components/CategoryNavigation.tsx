import * as Icons from 'lucide-react';
import { categories } from '@/lib/data';
import { useI18n } from '@/lib/i18n';

interface CategoryNavigationProps {
  activeCategory?: string | null;
  onCategoryClick?: (categoryId: string) => void;
  variant?: 'bar' | 'grid';
}

export function CategoryNavigation({
  activeCategory = null,
  onCategoryClick,
  variant = 'bar',
}: CategoryNavigationProps) {
  const { t } = useI18n();

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
        {categories.map((cat) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.icon] ?? Icons.Tag;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryClick?.(cat.id)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                isActive
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <Icon size={22} />
              <span className="text-xs font-medium text-center leading-tight">{t(`cat.${cat.id}`)}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
      {categories.map((cat) => {
        const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.icon] ?? Icons.Tag;
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryClick?.(cat.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-brand-50 text-brand-700'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Icon size={16} />
            {t(`cat.${cat.id}`)}
          </button>
        );
      })}
    </div>
  );
}

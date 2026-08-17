import { Heart, Search as SearchIcon } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useFavorites } from '@/lib/favorites';
import { useI18n } from '@/lib/i18n';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';

export function FavoritesPage() {
  const { navigate } = useRouter();
  const { favorites } = useFavorites();
  const { t } = useI18n();

  const favProducts = favorites
    .map((id) => products.find((p) => p.id === id))
    .filter((p) => p !== undefined)
    .map((p) => p!);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">{t('favorites.title')}</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {favProducts.length === 0
            ? t('favorites.empty')
            : `${favProducts.length} ${favProducts.length === 1 ? t('favorites.count.singular') : t('favorites.count.plural')}`}
        </p>
      </div>

      {favProducts.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <Heart size={28} className="text-neutral-300" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-neutral-900">{t('favorites.empty.title')}</h2>
          <p className="mt-1 max-w-sm text-sm text-neutral-500">
            {t('favorites.empty.desc')}
          </p>
          <button onClick={() => navigate({ name: 'search', params: {} })} className="btn-primary mt-6">
            <SearchIcon size={16} />
            {t('favorites.discover')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

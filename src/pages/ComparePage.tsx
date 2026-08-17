import { useRouter } from '@/lib/router';
import { useFavorites } from '@/lib/favorites';
import { useI18n } from '@/lib/i18n';
import { products } from '@/lib/data';
import { ProductComparison } from '@/components/ProductComparison';

export function ComparePage() {
  const { navigate } = useRouter();
  const { favorites, toggleFavorite } = useFavorites();
  const { t } = useI18n();

  const compareItems = favorites
    .map((id) => products.find((p) => p.id === id))
    .filter((p) => p !== undefined)
    .map((p) => p!.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{t('compare.title')}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {t('compare.subtitle')}
          </p>
        </div>
        {compareItems.length > 0 && (
          <button
            onClick={() => navigate({ name: 'search', params: {} })}
            className="btn-secondary"
          >
            {t('compare.findMore')}
          </button>
        )}
      </div>

      {compareItems.length > 4 && (
        <div className="mb-4 rounded-lg bg-warning-50 border border-warning-200 px-4 py-3 text-sm text-warning-800">
          {t('compare.maxWarning')}
        </div>
      )}

      <ProductComparison productIds={compareItems.slice(0, 4)} onRemove={toggleFavorite} />

      {compareItems.length > 0 && (
        <p className="mt-6 text-center text-sm text-neutral-400">
          {t('compare.addHint')}
        </p>
      )}
    </div>
  );
}

import { Heart, X } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useFavorites } from '@/lib/favorites';
import { useI18n } from '@/lib/i18n';
import { products, offersForProduct, sellerName } from '@/lib/data';
import { formatKGS, lowestPrice, offerCount, type Product } from '@/lib/types';
import { StarRating } from './StarRating';

interface ProductComparisonProps {
  productIds: string[];
  onRemove: (id: string) => void;
}

export function ProductComparison({ productIds, onRemove }: ProductComparisonProps) {
  const { navigate } = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useI18n();

  const items: Product[] = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  if (items.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-neutral-500">{t('compare.empty')}</p>
        <button onClick={() => navigate({ name: 'home' })} className="btn-primary mt-4">
          {t('compare.discover')}
        </button>
      </div>
    );
  }

  const allSpecLabels = [...new Set(items.flatMap((p) => p.specs.map((s) => s.label)))];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full inline-block">
        {/* Product headers */}
        <div
          className="grid gap-3 mb-4"
          style={{ gridTemplateColumns: `140px repeat(${items.length}, minmax(220px, 1fr))` }}
        >
          <div></div>
          {items.map((product) => {
            const fav = isFavorite(product.id);
            const productOffers = offersForProduct(product.id);
            return (
              <div key={product.id} className="card p-4">
                <div className="relative">
                  <button
                    onClick={() => onRemove(product.id)}
                    className="absolute -right-1 -top-1 rounded-full bg-white p-1.5 shadow-card hover:bg-neutral-50"
                    aria-label={t('compare.remove')}
                  >
                    <X size={14} className="text-neutral-500" />
                  </button>
                  <div
                    className="mb-3 cursor-pointer overflow-hidden rounded-lg bg-neutral-100"
                    onClick={() => navigate({ name: 'product', params: { id: product.id } })}
                  >
                    <img
                      src={product.image}
                      alt={product.productName}
                      loading="lazy"
                      className="h-32 w-full object-cover"
                    />
                  </div>
                  <h3
                    className="text-sm font-semibold text-neutral-900 line-clamp-2 cursor-pointer hover:text-brand-600"
                    onClick={() => navigate({ name: 'product', params: { id: product.id } })}
                  >
                    {product.productName}
                  </h3>
                  <div className="mt-1.5">
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} size={12} />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-xs text-neutral-500">{t('product.from')}</span>
                    <span className="text-lg font-bold text-neutral-900">{formatKGS(lowestPrice(productOffers))}</span>
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">{offerCount(productOffers)} {t('product.offers')}</div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => navigate({ name: 'product', params: { id: product.id } })}
                      className="flex-1 rounded-lg bg-brand-600 py-2 text-xs font-semibold text-white hover:bg-brand-700 transition-colors"
                    >
                      {t('compare.viewOffers')}
                    </button>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="rounded-lg border border-neutral-200 p-2 hover:bg-neutral-50"
                      aria-label={t('detail.favorite')}
                    >
                      <Heart size={14} className={fav ? 'fill-error-500 text-error-500' : 'text-neutral-400'} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison rows */}
        <div className="card divide-y divide-neutral-100">
          <CompareRow label={t('compare.row.price')} items={items} getValue={(p) => formatKGS(lowestPrice(offersForProduct(p.id)))} highlight />
          <CompareRow label={t('compare.row.rating')} items={items} getValue={(p) => `${p.rating.toFixed(1)} / 5`} />
          <CompareRow label={t('compare.row.reviews')} items={items} getValue={(p) => p.reviewCount.toLocaleString()} />
          <CompareRow label={t('compare.row.category')} items={items} getValue={(p) => t(`cat.${p.categoryId}`)} />
          <CompareRow label={t('compare.row.brand')} items={items} getValue={(p) => p.brand} />
          <CompareRow label={t('compare.row.offers')} items={items} getValue={(p) => `${offerCount(offersForProduct(p.id))} ${t('product.offers')}`} />
          <CompareRow label={t('compare.row.bestSeller')} items={items} getValue={(p) => {
            const best = [...offersForProduct(p.id)].sort((a, b) => a.price + a.shippingCost - (b.price + b.shippingCost))[0];
            return sellerName(best.sellerId);
          }} />

          {allSpecLabels.map((specLabel) => (
            <CompareRow
              key={specLabel}
              label={specLabel}
              items={items}
              getValue={(p) => p.specs.find((s) => s.label === specLabel)?.value ?? '—'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CompareRow({
  label,
  items,
  getValue,
  highlight = false,
}: {
  label: string;
  items: Product[];
  getValue: (p: Product) => string;
  highlight?: boolean;
}) {
  return (
    <div
      className="grid gap-3 px-4 py-3"
      style={{ gridTemplateColumns: `140px repeat(${items.length}, minmax(220px, 1fr))` }}
    >
      <span className="text-xs font-bold uppercase tracking-wide text-neutral-400 self-center">{label}</span>
      {items.map((product) => {
        const value = getValue(product);
        return (
          <span
            key={product.id}
            className={`text-sm self-center ${highlight ? 'font-bold text-brand-700' : 'text-neutral-700'}`}
          >
            {value}
          </span>
        );
      })}
    </div>
  );
}

export function ComparisonBar() {
  const { navigate } = useRouter();
  const { favorites } = useFavorites();
  const { t } = useI18n();

  const compareIds = favorites.slice(0, 4);

  if (compareIds.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-floating">
        <span className="text-sm font-medium text-neutral-700">
          {compareIds.length} {t('compare.forCompare')}
        </span>
        <button
          onClick={() => navigate({ name: 'compare' })}
          className="btn-primary"
        >
          {t('compare.compare')}
        </button>
      </div>
    </div>
  );
}

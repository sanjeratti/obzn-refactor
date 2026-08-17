import { Heart, Tag } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useFavorites } from '@/lib/favorites';
import { useI18n } from '@/lib/i18n';
import { offersForProduct } from '@/lib/data';
import { lowestPrice, offerCount, formatKGS } from '@/lib/types';
import type { Product } from '@/lib/types';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { navigate } = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useI18n();
  const fav = isFavorite(product.id);
  const productOffers = offersForProduct(product.id);
  const price = lowestPrice(productOffers);
  const offers = offerCount(productOffers);

  const handleClick = () => navigate({ name: 'product', params: { id: product.id } });

  return (
    <div className="group card overflow-hidden transition-shadow hover:shadow-card-hover cursor-pointer" onClick={handleClick}>
      <div className="flex gap-4 p-3">
        {/* Image */}
        <div className="relative shrink-0">
          <div className="h-28 w-28 overflow-hidden rounded-lg bg-neutral-100 sm:h-32 sm:w-32">
            <img
              src={product.image}
              alt={product.productName}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="absolute -right-1 -top-1 rounded-full bg-white p-1.5 shadow-card hover:shadow-card-hover transition-shadow"
            aria-label={fav ? t('product.favRemove') : t('product.favAdd')}
          >
            <Heart
              size={16}
              className={fav ? 'fill-error-500 text-error-500' : 'text-neutral-400'}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug">
              {product.productName}
            </h3>
          </div>

          <p className="mt-1 text-xs text-neutral-500 line-clamp-1">
            {product.specs.map((s) => s.value).join(' · ')}
          </p>

          <div className="mt-1.5">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size={13} />
          </div>

          <div className="mt-auto flex items-end justify-between gap-2 pt-2">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-neutral-500">{t('product.from')}</span>
                <span className="text-xl font-bold text-neutral-900">{formatKGS(price)}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-2xs font-semibold text-brand-700">
                  <Tag size={11} />
                  {offers} {t('product.offers')}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="shrink-0 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              {t('product.compareOffers')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, Check, Heart, Info, Share2 } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useFavorites } from '@/lib/favorites';
import { useI18n } from '@/lib/i18n';
import { productById, sellerName, offersForProduct } from '@/lib/data';
import { formatKGS, lowestPrice, offerCount, type Offer } from '@/lib/types';
import { StarRating } from '@/components/StarRating';
import { PriceOfferTable } from '@/components/PriceOffer';

interface ProductDetailPageProps {
  productId: string;
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const { navigate } = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useI18n();
  const [shareNotice, setShareNotice] = useState(false);

  const product = productById(productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">{t('detail.notFound.title')}</h1>
        <p className="mt-2 text-neutral-500">{t('detail.notFound.desc')}</p>
        <button onClick={() => navigate({ name: 'home' })} className="btn-primary mt-6">
          {t('detail.backHome')}
        </button>
      </div>
    );
  }

  const fav = isFavorite(product.id);
  const productOffers = offersForProduct(product.id);
  const bestOffer = [...productOffers].sort((a, b) => a.price + a.shippingCost - (b.price + b.shippingCost))[0];
  const price = lowestPrice(productOffers);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.productName, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShareNotice(true);
      setTimeout(() => setShareNotice(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Back link */}
      <button
        onClick={() => navigate({ name: 'search', params: {} })}
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        {t('detail.backToOverview')}
      </button>

      {/* Product header */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Image */}
        <div className="card overflow-hidden">
          <div className="aspect-square bg-neutral-100">
            <img src={product.image} alt={product.productName} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                {t(`cat.${product.categoryId}`)} · {product.brand}
              </span>
              <h1 className="mt-1 text-2xl font-bold text-neutral-900 leading-tight">{product.productName}</h1>
            </div>
          </div>

          <div className="mt-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size={16} />
          </div>

          {/* Specs */}
          <div className="mt-5">
            <h2 className="text-sm font-bold text-neutral-900 mb-2">{t('detail.specs')}</h2>
            <div className="grid grid-cols-2 gap-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="rounded-lg bg-neutral-50 px-3 py-2">
                  <dt className="text-xs text-neutral-400">{spec.label}</dt>
                  <dd className="text-sm font-semibold text-neutral-800">{spec.value}</dd>
                </div>
              ))}
            </div>
          </div>

          {/* Price highlight */}
          <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/50 p-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-medium text-neutral-500">{t('detail.bestPrice')}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-brand-700">{formatKGS(price)}</span>
                </div>
                <span className="text-sm text-neutral-500">
                  {t('detail.atSeller')} {sellerName(bestOffer.sellerId)} · {offerCount(productOffers)} {t('detail.offersTotal')}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="rounded-lg border border-neutral-200 bg-white p-2.5 text-neutral-600 hover:bg-neutral-50"
                  aria-label={t('detail.share')}
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`rounded-lg border p-2.5 transition-colors ${
                    fav
                      ? 'border-error-200 bg-error-50 text-error-500'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                  aria-label={t('detail.favorite')}
                >
                  <Heart size={18} className={fav ? 'fill-error-500' : ''} />
                </button>
              </div>
            </div>
          </div>

          {shareNotice && (
            <div className="mt-3 flex items-center gap-1.5 text-sm text-success-600 animate-fade-in">
              <Check size={16} /> {t('detail.shareCopied')}
            </div>
          )}
        </div>
      </div>

      {/* Price comparison table */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900">{t('detail.compareOffers')}</h2>
          <span className="text-sm text-neutral-500">{offerCount(productOffers)} {t('detail.sellers')}</span>
        </div>
        <div className="card p-4 md:p-5">
          <PriceOfferTable offers={productOffers} />
        </div>
      </section>

      {/* Platform disclaimer */}
      <section className="mt-6">
        <div className="flex items-start gap-2.5 rounded-lg bg-neutral-50 border border-neutral-200 px-4 py-3">
          <Info size={18} className="mt-0.5 shrink-0 text-neutral-400" />
          <p className="text-sm text-neutral-600">{t('platform.disclaimer')}</p>
        </div>
      </section>
    </div>
  );
}

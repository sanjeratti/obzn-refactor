import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, ExternalLink, Truck, X } from 'lucide-react';
import { sellerById } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import { formatKGS, totalCost, type Offer } from '@/lib/types';
import { StarRating } from './StarRating';
import { SellerInfo } from './SellerInfo';

interface PriceOfferRowProps {
  offer: Offer;
  isBest: boolean;
}

export function PriceOfferRow({ offer, isBest }: PriceOfferRowProps) {
  const { t } = useI18n();
  const seller = sellerById(offer.sellerId);
  const total = totalCost(offer);
  const freeShipping = offer.shippingCost === 0;
  const [expanded, setExpanded] = useState(false);

  const availabilityLabel =
    offer.availability === 'in_stock'
      ? t('offer.inStock')
      : offer.availability === 'preorder'
      ? t('offer.preorder')
      : t('offer.outOfStock');

  const availabilityColor =
    offer.availability === 'in_stock'
      ? 'text-success-600'
      : offer.availability === 'preorder'
      ? 'text-warning-600'
      : 'text-neutral-400';

  const AvailabilityIcon = offer.availability === 'in_stock' ? Check : X;

  return (
    <div
      className={`rounded-lg border transition-colors ${
        isBest
          ? 'border-brand-300 bg-brand-50/50 ring-1 ring-brand-200'
          : 'border-neutral-200 bg-white hover:bg-neutral-50'
      }`}
    >
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1.2fr_auto] items-center gap-3 px-4 py-3 md:grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr_auto]">
        {/* Seller */}
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
              isBest ? 'bg-brand-600 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {seller?.storeName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-neutral-900 truncate">{seller?.storeName}</span>
              {isBest && (
                <span className="shrink-0 rounded-full bg-brand-600 px-1.5 py-0.5 text-2xs font-bold text-white">
                  {t('offer.bestPrice')}
                </span>
              )}
            </div>
            <div className={`flex items-center gap-0.5 text-xs ${availabilityColor}`}>
              <AvailabilityIcon size={12} /> {availabilityLabel}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <span className={`text-base font-bold ${isBest ? 'text-brand-700' : 'text-neutral-900'}`}>
            {formatKGS(offer.price)}
          </span>
        </div>

        {/* Shipping */}
        <div className="hidden text-right text-sm md:block">
          {freeShipping ? (
            <span className="font-medium text-success-600">{t('offer.freeShipping')}</span>
          ) : (
            <span className="text-neutral-600">{formatKGS(offer.shippingCost)}</span>
          )}
        </div>

        {/* Total */}
        <div className="text-right">
          <span className="text-sm font-semibold text-neutral-900">{formatKGS(total)}</span>
        </div>

        {/* Rating */}
        <div className="hidden justify-end md:flex">
          {seller && <StarRating rating={seller.sellerRating} showNumber={true} size={12} />}
        </div>

        {/* Action */}
        <div className="flex items-center gap-1">
          <a
            href={offer.sellerProductUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              isBest
                ? 'bg-brand-600 text-white hover:bg-brand-700'
                : 'bg-neutral-800 text-white hover:bg-neutral-900'
            }`}
          >
            {t('offer.goToStore')}
            <ExternalLink size={12} />
          </a>
          {seller && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="shrink-0 rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
              aria-label={t('seller.details')}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile shipping row */}
      <div className="flex items-center justify-between px-4 pb-2 text-xs md:hidden">
        <span className="text-neutral-500 flex items-center gap-1">
          <Truck size={12} /> {t('offer.shipping')}:
          {freeShipping ? (
            <span className="font-medium text-success-600 ml-1">{t('offer.freeShipping')}</span>
          ) : (
            <span className="text-neutral-600 ml-1">{formatKGS(offer.shippingCost)}</span>
          )}
        </span>
        {seller && (
          <StarRating rating={seller.sellerRating} showNumber={true} size={11} />
        )}
      </div>

      {/* Expanded seller info */}
      {expanded && seller && (
        <div className="border-t border-neutral-100 px-4 py-3 animate-fade-in">
          <SellerInfo seller={seller} variant="inline" />
        </div>
      )}
    </div>
  );
}

export function PriceOfferTable({ offers }: { offers: Offer[] }) {
  const { t } = useI18n();
  const [showAll, setShowAll] = useState(false);
  const sorted = [...offers].sort((a, b) => totalCost(a) - totalCost(b));
  const bestId = sorted[0]?.id;
  const visible = showAll ? sorted : sorted.slice(0, 3);

  return (
    <div className="space-y-2">
      {/* Header row — desktop only */}
      <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr_auto] gap-3 px-4 text-xs font-bold uppercase tracking-wide text-neutral-400">
        <span>{t('offer.seller')}</span>
        <span className="text-right">{t('offer.price')}</span>
        <span className="text-right">{t('offer.shipping')}</span>
        <span className="text-right">{t('offer.total')}</span>
        <span className="text-right">{t('offer.rating')}</span>
        <span></span>
      </div>
      {visible.map((offer) => (
        <PriceOfferRow key={offer.id} offer={offer} isBest={offer.id === bestId} />
      ))}
      {sorted.length > 3 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="w-full rounded-lg border border-neutral-200 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} /> {t('seller.hide')}
            </>
          ) : (
            <>
              <ChevronDown size={16} /> {t('offer.showAllOffers')} ({sorted.length})
            </>
          )}
        </button>
      )}
    </div>
  );
}

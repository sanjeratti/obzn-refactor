import { MapPin, Phone, Globe, Instagram, Store } from 'lucide-react';
import type { Seller } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { StarRating } from './StarRating';

interface SellerInfoProps {
  seller: Seller;
  variant?: 'card' | 'inline';
}

export function SellerInfo({ seller, variant = 'card' }: SellerInfoProps) {
  const { t } = useI18n();

  const fields = [
    { icon: MapPin, label: t('seller.address'), value: seller.address },
    { icon: Phone, label: t('seller.phone'), value: seller.phone, href: `tel:${seller.phone.replace(/\s/g, '')}` },
    { icon: Globe, label: t('seller.website'), value: seller.website, href: seller.website },
    { icon: Instagram, label: t('seller.instagram'), value: seller.instagram, href: `https://instagram.com/${seller.instagram.replace('@', '')}` },
  ];

  if (variant === 'inline') {
    return (
      <div className="space-y-1.5 text-xs text-neutral-600">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-2">
            <f.icon size={12} className="shrink-0 text-neutral-400" />
            {f.href ? (
              <a href={f.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">
                {f.value}
              </a>
            ) : (
              <span>{f.value}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
          <Store size={18} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-neutral-900">{seller.storeName}</h4>
          <div className="flex items-center gap-1.5">
            <StarRating rating={seller.sellerRating} showNumber={true} size={12} />
            <span className="text-xs text-neutral-500">({seller.reviewCount.toLocaleString()} {t('seller.reviews')})</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {fields.map((f) => (
          <div key={f.label} className="flex items-start gap-2.5">
            <f.icon size={14} className="mt-0.5 shrink-0 text-neutral-400" />
            <div className="min-w-0">
              <span className="text-xs text-neutral-400">{f.label}</span>
              {f.href ? (
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-neutral-700 hover:text-brand-600 transition-colors break-words"
                >
                  {f.value}
                </a>
              ) : (
                <p className="text-sm text-neutral-700 break-words">{f.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

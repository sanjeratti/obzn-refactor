import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { allBrands, sellers, categories } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import type { Filters } from '@/lib/types';
import { StarRating } from './StarRating';

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount?: number;
}

export function FilterSidebar({ filters, onChange, resultCount }: FilterSidebarProps) {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  const reset = () =>
    onChange({
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
      minRating: null,
      seller: null,
      inStockOnly: false,
    });

  const brands = allBrands();

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Category */}
      <FilterSection title={t('filter.category')}>
        <div className="space-y-1">
          <FilterRadio
            label={t('filter.allCategories')}
            checked={filters.category === null}
            onChange={() => update({ category: null })}
          />
          {categories.map((cat) => (
            <FilterRadio
              key={cat.id}
              label={t(`cat.${cat.id}`)}
              checked={filters.category === cat.id}
              onChange={() => update({ category: cat.id })}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title={t('filter.price')}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice ?? ''}
            onChange={(e) => update({ minPrice: e.target.value ? Number(e.target.value) : null })}
            className="input py-2 text-xs"
            min={0}
          />
          <span className="text-neutral-400">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice ?? ''}
            onChange={(e) => update({ maxPrice: e.target.value ? Number(e.target.value) : null })}
            className="input py-2 text-xs"
            min={0}
          />
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title={t('filter.brand')}>
        <div className="space-y-1">
          <FilterRadio
            label={t('filter.allBrands')}
            checked={filters.brand === null}
            onChange={() => update({ brand: null })}
          />
          {brands.map((brand) => (
            <FilterRadio
              key={brand}
              label={brand}
              checked={filters.brand === brand}
              onChange={() => update({ brand })}
            />
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title={t('filter.rating')}>
        <div className="space-y-1.5">
          <FilterRadio
            label={t('filter.allRatings')}
            checked={filters.minRating === null}
            onChange={() => update({ minRating: null })}
          />
          {[4.5, 4.0, 3.5].map((r) => (
            <button
              key={r}
              onClick={() => update({ minRating: r })}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                filters.minRating === r ? 'bg-brand-50 text-brand-700' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <span>{r.toFixed(1)} {t('filter.andUp')}</span>
              <StarRating rating={r} showNumber={false} size={12} />
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Seller */}
      <FilterSection title={t('filter.seller')}>
        <div className="space-y-1">
          <FilterRadio
            label={t('filter.allSellers')}
            checked={filters.seller === null}
            onChange={() => update({ seller: null })}
          />
          {sellers.map((seller) => (
            <FilterRadio
              key={seller.id}
              label={seller.storeName}
              checked={filters.seller === seller.id}
              onChange={() => update({ seller: seller.id })}
            />
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title={t('filter.availability')}>
        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => update({ inStockOnly: e.target.checked })}
            className="h-4 w-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-400"
          />
          {t('filter.inStockOnly')}
        </label>
      </FilterSection>

      <button
        onClick={reset}
        className="w-full rounded-lg border border-neutral-200 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
      >
        {t('filter.resetAll')}
      </button>
    </div>
  );

  const activeFilterCount = [
    filters.category,
    filters.brand,
    filters.minPrice,
    filters.maxPrice,
    filters.minRating,
    filters.seller,
    filters.inStockOnly,
  ].filter((v) => v !== null && v !== false && v !== '').length;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-20">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">{t('filter.title')}</h2>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-2xs font-semibold text-brand-700">
                {activeFilterCount} {t('filter.active')}
              </span>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile filter button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          <SlidersHorizontal size={16} />
          {t('filter.title')}
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-2xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 animate-slide-down">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900">{t('filter.title')}</h2>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100">
                <X size={20} />
              </button>
            </div>
            <FilterContent />
            <div className="sticky bottom-0 mt-5 -mx-5 bg-white px-5 pb-4 pt-3 border-t border-neutral-200">
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                {resultCount !== undefined
                  ? `${resultCount} ${t('filter.showResults')}`
                  : t('filter.results')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">{title}</h3>
      {children}
    </div>
  );
}

function FilterRadio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
        checked ? 'bg-brand-50 font-medium text-brand-700' : 'text-neutral-600 hover:bg-neutral-100'
      }`}
    >
      <span
        className={`h-3.5 w-3.5 rounded-full border-2 ${
          checked ? 'border-brand-600 bg-brand-600' : 'border-neutral-300'
        } flex items-center justify-center shrink-0`}
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      {label}
    </button>
  );
}

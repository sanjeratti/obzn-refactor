import { useMemo, useState } from 'react';
import { ChevronDown, Search as SearchIcon } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useI18n } from '@/lib/i18n';
import { products, offersForProduct } from '@/lib/data';
import { lowestPrice, type Filters, type SortOption, type Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { CategoryNavigation } from '@/components/CategoryNavigation';

export function SearchPage() {
  const { route, navigate } = useRouter();
  const { t } = useI18n();
  const params = route.name === 'search' ? route.params : {};

  const query = params.q ?? '';
  const categoryFromUrl = params.category ?? null;

  const [filters, setFilters] = useState<Filters>({
    category: categoryFromUrl,
    brand: null,
    minPrice: null,
    maxPrice: null,
    minRating: null,
    seller: null,
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortOption>('relevance');

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: t('search.sort.relevance') },
    { value: 'price_asc', label: t('search.sort.priceAsc') },
    { value: 'price_desc', label: t('search.sort.priceDesc') },
    { value: 'rating', label: t('search.sort.rating') },
  ];

  const handleCategoryNav = (catId: string) => {
    setFilters((prev) => ({ ...prev, category: prev.category === catId ? null : catId }));
  };

  const filtered = useMemo(() => {
    let result: Product[] = products.slice();

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.productName.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.categoryId === filters.category);
    }
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }
    if (filters.minPrice !== null) {
      result = result.filter((p) => lowestPrice(offersForProduct(p.id)) >= (filters.minPrice as number));
    }
    if (filters.maxPrice !== null) {
      result = result.filter((p) => lowestPrice(offersForProduct(p.id)) <= (filters.maxPrice as number));
    }
    if (filters.minRating !== null) {
      result = result.filter((p) => p.rating >= (filters.minRating as number));
    }
    if (filters.seller) {
      result = result.filter((p) => offersForProduct(p.id).some((o) => o.sellerId === filters.seller));
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => offersForProduct(p.id).some((o) => o.availability === 'in_stock'));
    }

    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => lowestPrice(offersForProduct(a.id)) - lowestPrice(offersForProduct(b.id)));
        break;
      case 'price_desc':
        result.sort((a, b) => lowestPrice(offersForProduct(b.id)) - lowestPrice(offersForProduct(a.id)));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [query, filters, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Top: query + count + sort */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-neutral-900">
          {query ? `"${query}"` : t(`cat.${filters.category ?? ''}`) !== `cat.${filters.category ?? ''}` ? t(`cat.${filters.category}`) : t('search.allProducts')}
        </h1>
        <div className="mt-1 flex items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            {filtered.length} {filtered.length === 1 ? t('search.results.singular') : t('search.results.plural')}
          </p>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none rounded-lg border border-neutral-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand-100 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="mb-5 border-b border-neutral-200 pb-3">
        <CategoryNavigation variant="bar" activeCategory={filters.category} onCategoryClick={handleCategoryNav} />
      </div>

      {/* Layout: sidebar + results */}
      <div className="flex gap-6">
        <FilterSidebar filters={filters} onChange={setFilters} resultCount={filtered.length} />

        <div className="min-w-0 flex-1">
          {filtered.length === 0 ? (
            <div className="card flex flex-col items-center justify-center p-16 text-center">
              <SearchIcon size={40} className="text-neutral-300" />
              <h2 className="mt-4 text-lg font-semibold text-neutral-900">{t('search.noResults.title')}</h2>
              <p className="mt-1 text-sm text-neutral-500">
                {t('search.noResults.desc')}
              </p>
              <button
                onClick={() => {
                  setFilters({
                    category: null,
                    brand: null,
                    minPrice: null,
                    maxPrice: null,
                    minRating: null,
                    seller: null,
                    inStockOnly: false,
                  });
                  navigate({ name: 'search', params: {} });
                }}
                className="btn-secondary mt-4"
              >
                {t('search.resetFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

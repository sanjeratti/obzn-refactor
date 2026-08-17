import { TrendingUp, ShieldCheck, Tags } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useI18n } from '@/lib/i18n';
import { products } from '@/lib/data';
import { SearchBar } from '@/components/SearchBar';
import { CategoryNavigation } from '@/components/CategoryNavigation';
import { ProductCard } from '@/components/ProductCard';

export function HomePage() {
  const { navigate } = useRouter();
  const { t } = useI18n();

  const handleSearch = (query: string) => {
    if (query) navigate({ name: 'search', params: { q: query } });
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate({ name: 'search', params: { category: categoryId } });
  };

  const popularProducts = products
    .slice()
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-gradient-to-b from-brand-50/40 to-neutral-50">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-neutral-900 md:text-5xl tracking-tight">
            {t('home.hero.title1')} <span className="text-brand-600">{t('home.hero.title2')}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 md:text-lg">
            {t('home.hero.subtitle')}
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar onSearch={handleSearch} variant="hero" autoFocus />
          </div>

          {/* Trust badges */}
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Tags size={16} className="text-brand-600" />
              {products.length}+ {t('home.badge.products')}
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp size={16} className="text-brand-600" />
              {t('home.badge.live')}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-brand-600" />
              {t('home.badge.verified')}
            </span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">{t('home.categories.title')}</h2>
            <p className="mt-1 text-sm text-neutral-500">{t('home.categories.subtitle')}</p>
          </div>
        </div>
        <CategoryNavigation variant="grid" onCategoryClick={handleCategoryClick} />
      </section>

      {/* Popular products */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">{t('home.popular.title')}</h2>
            <p className="mt-1 text-sm text-neutral-500">{t('home.popular.subtitle')}</p>
          </div>
          <button
            onClick={() => navigate({ name: 'search', params: {} })}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            {t('home.popular.viewAll')} →
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-center text-xl font-bold text-neutral-900">{t('home.howitworks.title')}</h2>
          <p className="mt-2 text-center text-sm text-neutral-500">{t('home.howitworks.subtitle')}</p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { num: '1', title: t('home.step1.title'), desc: t('home.step1.desc') },
              { num: '2', title: t('home.step2.title'), desc: t('home.step2.desc') },
              { num: '3', title: t('home.step3.title'), desc: t('home.step3.desc') },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                  {step.num}
                </div>
                <h3 className="mt-4 text-base font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

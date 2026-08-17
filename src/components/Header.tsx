import { useState } from 'react';
import { Heart, Menu, Search as SearchIcon, User, X } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useFavorites } from '@/lib/favorites';
import { useI18n } from '@/lib/i18n';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { navigate, route } = useRouter();
  const { favorites } = useFavorites();
  const { t } = useI18n();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    if (query) {
      navigate({ name: 'search', params: { q: query } });
      setMobileSearchOpen(false);
    }
  };

  const navItems = [
    { label: t('nav.categories'), action: () => navigate({ name: 'home' }) },
    { label: t('nav.compare'), action: () => navigate({ name: 'compare' }) },
    { label: t('nav.favorites'), action: () => navigate({ name: 'favorites' }) },
  ];

  const isActive = (name: string) => route.name === name;
  const favLabel = t('nav.favorites');

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      {/* Desktop header */}
      <div className="hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
          <button onClick={() => navigate({ name: 'home' })} className="shrink-0">
            <Logo />
          </button>
          <div className="flex-1 max-w-2xl">
            <SearchBar onSearch={handleSearch} initialQuery={route.name === 'search' ? route.params.q ?? '' : ''} />
          </div>
          <nav className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => navigate({ name: 'home' })}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive('home') ? 'text-brand-600' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              {t('nav.categories')}
            </button>
            <button
              onClick={() => navigate({ name: 'compare' })}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive('compare') ? 'text-brand-600' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              {t('nav.compare')}
            </button>
            <button
              onClick={() => navigate({ name: 'favorites' })}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive('favorites') ? 'text-brand-600' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Heart size={16} />
              {t('nav.favorites')}
              {favorites.length > 0 && (
                <span className="ml-0.5 rounded-full bg-brand-600 px-1.5 py-0.5 text-2xs font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </button>
            <LanguageSwitcher />
            <button
              className="ml-0.5 rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              aria-label={t('nav.account')}
            >
              <User size={20} />
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate({ name: 'home' })}>
            <Logo />
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setMobileSearchOpen((v) => !v);
                setMobileMenuOpen(false);
              }}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
              aria-label={t('header.search')}
            >
              {mobileSearchOpen ? <X size={20} /> : <SearchIcon size={20} />}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen((v) => !v);
                setMobileSearchOpen(false);
              }}
              className="relative rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
              aria-label={t('header.menu')}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              {favorites.length > 0 && !mobileMenuOpen && (
                <span className="absolute right-0.5 top-0.5 h-4 min-w-4 rounded-full bg-brand-600 px-1 text-2xs font-bold text-white flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search dropdown */}
        {mobileSearchOpen && (
          <div className="border-t border-neutral-200 px-4 py-3 animate-slide-down">
            <SearchBar onSearch={handleSearch} variant="header" autoFocus />
          </div>
        )}

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-neutral-200 px-4 py-2 animate-slide-down">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                {item.label === favLabel && <Heart size={18} />}
                {item.label}
                {item.label === favLabel && favorites.length > 0 && (
                  <span className="ml-auto rounded-full bg-brand-600 px-2 py-0.5 text-2xs font-bold text-white">
                    {favorites.length}
                  </span>
                )}
              </button>
            ))}
            <div className="flex items-center justify-between rounded-lg px-3 py-3">
              <span className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                <User size={18} />
                {t('nav.account')}
              </span>
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

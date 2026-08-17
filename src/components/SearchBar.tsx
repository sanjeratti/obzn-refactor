import { useState, type FormEvent } from 'react';
import { Search, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  variant?: 'hero' | 'header';
  autoFocus?: boolean;
}

export function SearchBar({ onSearch, initialQuery = '', variant = 'header', autoFocus = false }: SearchBarProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`relative flex items-center ${
          isHero
            ? 'bg-white rounded-xl shadow-floating border border-neutral-200'
            : 'bg-neutral-100 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors'
        }`}
      >
        <Search
          size={isHero ? 22 : 18}
          className={`absolute left-3.5 ${isHero ? 'text-neutral-400' : 'text-neutral-500'}`}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          autoFocus={autoFocus}
          className={`w-full bg-transparent pl-10 ${
            isHero ? 'pr-32 py-3.5 text-base' : 'pr-20 py-2.5 text-sm'
          } text-neutral-900 placeholder:text-neutral-400 focus:outline-none`}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-20 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label={t('search.clear')}
          >
            <X size={isHero ? 20 : 16} />
          </button>
        )}
        <button
          type="submit"
          className={`absolute right-1.5 ${
            isHero
              ? 'bg-brand-600 text-white hover:bg-brand-700 px-6 py-2.5 text-sm font-semibold rounded-lg'
              : 'bg-neutral-800 text-white hover:bg-neutral-900 px-4 py-1.5 text-sm font-semibold rounded-md'
          } transition-colors`}
        >
          {t('search.button')}
        </button>
      </div>
    </form>
  );
}

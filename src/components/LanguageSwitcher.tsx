import { useState, useRef, useEffect } from 'react';
import { Check, Globe } from 'lucide-react';
import { useI18n, languages, type Language } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === lang);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
        aria-label="Language"
      >
        <Globe size={18} />
        <span className="hidden lg:inline">{current?.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 rounded-lg border border-neutral-200 bg-white py-1 shadow-floating animate-scale-in z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as Language);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                l.code === lang
                  ? 'bg-brand-50 font-medium text-brand-700'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <span className="flex-1 text-left">{l.label}</span>
              {l.code === lang && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

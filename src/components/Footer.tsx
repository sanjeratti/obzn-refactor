import { useRouter } from '@/lib/router';
import { useI18n } from '@/lib/i18n';
import { Logo } from './Logo';
import { categories } from '@/lib/data';

export function Footer() {
  const { navigate } = useRouter();
  const { t } = useI18n();

  return (
    <footer className="mt-12 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-neutral-500 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-neutral-900">{t('footer.categories')}</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate({ name: 'search', params: { category: cat.id } })}
                    className="text-sm text-neutral-500 hover:text-brand-600 transition-colors"
                  >
                    {t(`cat.${cat.id}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-neutral-900">{t('footer.service')}</h3>
            <ul className="space-y-2">
              {[
                { key: 'footer.about', label: t('footer.about') },
                { key: 'footer.howItWorks', label: t('footer.howItWorks') },
                { key: 'footer.help', label: t('footer.help') },
                { key: 'footer.contact', label: t('footer.contact') },
              ].map((item) => (
                <li key={item.key}>
                  <span className="text-sm text-neutral-500 hover:text-brand-600 cursor-pointer transition-colors">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-neutral-900">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              {[
                { key: 'footer.imprint', label: t('footer.imprint') },
                { key: 'footer.privacy', label: t('footer.privacy') },
                { key: 'footer.terms', label: t('footer.terms') },
                { key: 'footer.cookies', label: t('footer.cookies') },
              ].map((item) => (
                <li key={item.key}>
                  <span className="text-sm text-neutral-500 hover:text-brand-600 cursor-pointer transition-colors">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-100 pt-6">
          <p className="text-center text-xs text-neutral-400">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

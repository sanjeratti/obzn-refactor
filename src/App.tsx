import { RouterProvider, useRouter } from '@/lib/router';
import { FavoritesProvider } from '@/lib/favorites';
import { I18nProvider } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { SearchPage } from '@/pages/SearchPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ComparePage } from '@/pages/ComparePage';
import { FavoritesPage } from '@/pages/FavoritesPage';

function RouteOutlet() {
  const { route } = useRouter();

  const renderPage = () => {
    switch (route.name) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchPage />;
      case 'product':
        return <ProductDetailPage productId={route.params.id} />;
      case 'compare':
        return <ComparePage />;
      case 'favorites':
        return <FavoritesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <FavoritesProvider>
        <RouterProvider>
          <RouteOutlet />
        </RouterProvider>
      </FavoritesProvider>
    </I18nProvider>
  );
}

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

type Route =
  | { name: 'home' }
  | { name: 'search'; params: Record<string, string> }
  | { name: 'product'; params: { id: string } }
  | { name: 'compare' }
  | { name: 'favorites' };

interface RouterContextValue {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#/, '');
  const [path, queryStr] = hash.split('?');
  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) return { name: 'home' };
  if (segments[0] === 'search') {
    const params: Record<string, string> = {};
    if (queryStr) {
      new URLSearchParams(queryStr).forEach((v, k) => (params[k] = v));
    }
    return { name: 'search', params };
  }
  if (segments[0] === 'product' && segments[1]) return { name: 'product', params: { id: segments[1] } };
  if (segments[0] === 'compare') return { name: 'compare' };
  if (segments[0] === 'favorites') return { name: 'favorites' };
  return { name: 'home' };
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'search': {
      const qs = new URLSearchParams(route.params).toString();
      return `#/search${qs ? '?' + qs : ''}`;
    }
    case 'product':
      return `#/product/${route.params.id}`;
    case 'compare':
      return '#/compare';
    case 'favorites':
      return '#/favorites';
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((newRoute: Route) => {
    window.location.hash = routeToHash(newRoute);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

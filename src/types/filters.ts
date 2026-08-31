export interface Filters {
  category: string | null;
  brand: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  seller: string | null;
  inStockOnly: boolean;
}

export type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating';

export interface Category {
  id: string;
  name: string;
  icon: string;
  parentId: string | null;
}

export interface Seller {
  id: string;
  storeName: string;
  address: string;
  phone: string;
  website: string;
  instagram: string;
  sellerRating: number;
  reviewCount: number;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  brand: string;
  model: string;
  productName: string;
  categoryId: string;
  image: string;
  rating: number;
  reviewCount: number;
  specs: Spec[];
  ean?: string;
}

export type Currency = 'KGS';

export interface Offer {
  id: string;
  productId: string;
  sellerId: string;
  price: number;
  currency: Currency;
  shippingCost: number;
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  sellerProductUrl: string;
  lastUpdated: string;
}

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

export function lowestPrice(offers: Offer[]): number {
  if (offers.length === 0) return Infinity;
  return Math.min(...offers.map((o) => o.price));
}

export function totalCost(offer: Offer): number {
  return offer.price + offer.shippingCost;
}

export function formatKGS(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' сом';
}

export function offerCount(offers: Offer[]): number {
  return offers.length;
}

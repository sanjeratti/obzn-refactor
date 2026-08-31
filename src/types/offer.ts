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

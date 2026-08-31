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

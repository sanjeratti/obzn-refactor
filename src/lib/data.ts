import type { Category, Product, Seller, Offer } from './types';

export const categories: Category[] = [
  { id: 'elektronik', name: 'Elektronik', icon: 'Smartphone', parentId: null },
  { id: 'computer', name: 'Computer', icon: 'Laptop', parentId: null },
  { id: 'tv-audio', name: 'TV & Audio', icon: 'Tv', parentId: null },
  { id: 'haushalt', name: 'Haushalt', icon: 'Refrigerator', parentId: null },
  { id: 'kueche', name: 'Küche', icon: 'CookingPot', parentId: null },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', parentId: null },
  { id: 'sport', name: 'Sport', icon: 'Dumbbell', parentId: null },
  { id: 'garten', name: 'Garten', icon: 'Trees', parentId: null },
  { id: 'auto', name: 'Auto', icon: 'Car', parentId: null },
  { id: 'mode', name: 'Mode', icon: 'Shirt', parentId: null },
  { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone', parentId: 'elektronik' },
];

export function categoryName(id: string, t: (key: string) => string): string {
  return t(`cat.${id}`);
}

export function categoryNameById(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? id;
}

export function childCategories(parentId: string): Category[] {
  return categories.filter((c) => c.parentId === parentId);
}

export const sellers: Seller[] = [
  {
    id: 'techstore',
    storeName: 'TechStore',
    address: 'Bishkek, Kyrgyzstan, Chui Ave 123',
    phone: '+996 550 12 34 56',
    website: 'https://techstore-demo.kg',
    instagram: '@techstore_kg',
    sellerRating: 4.8,
    reviewCount: 12450,
  },
  {
    id: 'mobileshop',
    storeName: 'MobileShop',
    address: 'Bishkek, Kyrgyzstan, Sovietskaya 45',
    phone: '+996 551 23 45 67',
    website: 'https://mobileshop-demo.kg',
    instagram: '@mobileshop.kg',
    sellerRating: 4.7,
    reviewCount: 8920,
  },
  {
    id: 'smartmarket',
    storeName: 'SmartMarket',
    address: 'Osh, Kyrgyzstan, Kurmanjan Datka 78',
    phone: '+996 552 34 56 78',
    website: 'https://smartmarket-demo.kg',
    instagram: '@smartmarket_osh',
    sellerRating: 4.5,
    reviewCount: 5670,
  },
  {
    id: 'electroworld',
    storeName: 'ElectroWorld',
    address: 'Bishkek, Kyrgyzstan, Manas Ave 90',
    phone: '+996 553 45 67 89',
    website: 'https://electroworld-demo.kg',
    instagram: '@electroworld.kg',
    sellerRating: 4.7,
    reviewCount: 15300,
  },
  {
    id: 'digitalbazaar',
    storeName: 'DigitalBazaar',
    address: 'Bishkek, Kyrgyzstan, Moskovskaya 12',
    phone: '+996 554 56 78 90',
    website: 'https://digitalbazaar-demo.kg',
    instagram: '@digitalbazaar',
    sellerRating: 4.4,
    reviewCount: 4210,
  },
  {
    id: 'gadgethub',
    storeName: 'GadgetHub',
    address: 'Bishkek, Kyrgyzstan, Erkindik 34',
    phone: '+996 555 67 89 01',
    website: 'https://gadgethub-demo.kg',
    instagram: '@gadgethub.kg',
    sellerRating: 4.6,
    reviewCount: 7340,
  },
];

export function sellerName(sellerId: string): string {
  return sellerById(sellerId)?.storeName ?? sellerId;
}

export function sellerById(sellerId: string): Seller | undefined {
  return sellers.find((s) => s.id === sellerId);
}

export const products: Product[] = [
  {
    id: 'apple-iphone-15-128',
    brand: 'Apple',
    model: 'iPhone 15',
    productName: 'Apple iPhone 15 128GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/3945672/pexels-photo-3945672.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    reviewCount: 3421,
    specs: [
      { label: 'Display', value: '6,1" OLED' },
      { label: 'Speicher', value: '128 GB' },
      { label: 'Kamera', value: '48 MP' },
      { label: 'Akku', value: '3.349 mAh' },
    ],
  },
  {
    id: 'apple-iphone-15-pro-256',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    productName: 'Apple iPhone 15 Pro 256GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/3945691/pexels-photo-3945691.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    reviewCount: 2156,
    specs: [
      { label: 'Display', value: '6,1" ProMotion' },
      { label: 'Speicher', value: '256 GB' },
      { label: 'Kamera', value: '48 MP Triple' },
      { label: 'Material', value: 'Titan' },
    ],
  },
  {
    id: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    productName: 'Samsung Galaxy S24 Ultra 256GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    reviewCount: 1879,
    specs: [
      { label: 'Display', value: '6,8" AMOLED' },
      { label: 'Speicher', value: '256 GB' },
      { label: 'Kamera', value: '200 MP' },
      { label: 'S Pen', value: 'Ja' },
    ],
  },
  {
    id: 'samsung-galaxy-a55',
    brand: 'Samsung',
    model: 'Galaxy A55 5G',
    productName: 'Samsung Galaxy A55 5G 128GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/30466740/pexels-photo-30466740.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.4,
    reviewCount: 743,
    specs: [
      { label: 'Display', value: '6,6" AMOLED' },
      { label: 'Speicher', value: '128 GB' },
      { label: 'Kamera', value: '50 MP Triple' },
      { label: 'Akku', value: '5.000 mAh' },
    ],
  },
  {
    id: 'xiaomi-redmi-note-13-pro',
    brand: 'Xiaomi',
    model: 'Redmi Note 13 Pro',
    productName: 'Xiaomi Redmi Note 13 Pro 256GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    reviewCount: 1567,
    specs: [
      { label: 'Display', value: '6,67" AMOLED' },
      { label: 'Speicher', value: '256 GB' },
      { label: 'Kamera', value: '200 MP' },
      { label: 'Akku', value: '5.100 mAh' },
    ],
  },
  {
    id: 'xiaomi-14',
    brand: 'Xiaomi',
    model: 'Xiaomi 14',
    productName: 'Xiaomi 14 512GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    reviewCount: 984,
    specs: [
      { label: 'Display', value: '6,36" AMOLED' },
      { label: 'Speicher', value: '512 GB' },
      { label: 'Kamera', value: '50 MP Leica' },
      { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
    ],
  },
  {
    id: 'motorola-edge-50-pro',
    brand: 'Motorola',
    model: 'Edge 50 Pro',
    productName: 'Motorola Edge 50 Pro 256GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.3,
    reviewCount: 612,
    specs: [
      { label: 'Display', value: '6,7" pOLED' },
      { label: 'Speicher', value: '256 GB' },
      { label: 'Kamera', value: '50 MP' },
      { label: 'Akku', value: '4.500 mAh' },
    ],
  },
  {
    id: 'google-pixel-8-pro',
    brand: 'Google',
    model: 'Pixel 8 Pro',
    productName: 'Google Pixel 8 Pro 256GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    reviewCount: 1102,
    specs: [
      { label: 'Display', value: '6,7" LTPO OLED' },
      { label: 'Speicher', value: '256 GB' },
      { label: 'Kamera', value: '50 MP Triple' },
      { label: 'Chip', value: 'Tensor G3' },
    ],
  },
  {
    id: 'honor-magic-6-pro',
    brand: 'Honor',
    model: 'Magic 6 Pro',
    productName: 'Honor Magic 6 Pro 512GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.4,
    reviewCount: 487,
    specs: [
      { label: 'Display', value: '6,8" LTPO OLED' },
      { label: 'Speicher', value: '512 GB' },
      { label: 'Kamera', value: '180 MP' },
      { label: 'Akku', value: '5.600 mAh' },
    ],
  },
  {
    id: 'oneplus-12',
    brand: 'OnePlus',
    model: 'OnePlus 12',
    productName: 'OnePlus 12 256GB',
    categoryId: 'smartphones',
    image: 'https://images.pexels.com/photos/3348248/pexels-photo-3348248.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    reviewCount: 823,
    specs: [
      { label: 'Display', value: '6,82" LTPO AMOLED' },
      { label: 'Speicher', value: '256 GB' },
      { label: 'Kamera', value: '50 MP Hasselblad' },
      { label: 'Akku', value: '5.400 mAh' },
    ],
  },
];

function makeOffer(
  id: string,
  productId: string,
  sellerId: string,
  price: number,
  shippingCost: number,
  availability: 'in_stock' | 'out_of_stock' | 'preorder',
): Offer {
  return {
    id,
    productId,
    sellerId,
    price,
    currency: 'KGS',
    shippingCost,
    availability,
    sellerProductUrl: `https://example-store.kg/product/${productId}`,
    lastUpdated: new Date().toISOString(),
  };
}

export const offers: Offer[] = [
  // iPhone 15 128GB
  makeOffer('of-iph15-1', 'apple-iphone-15-128', 'techstore', 72000, 0, 'in_stock'),
  makeOffer('of-iph15-2', 'apple-iphone-15-128', 'mobileshop', 73500, 500, 'in_stock'),
  makeOffer('of-iph15-3', 'apple-iphone-15-128', 'electroworld', 74000, 0, 'in_stock'),
  makeOffer('of-iph15-4', 'apple-iphone-15-128', 'gadgethub', 71500, 300, 'in_stock'),

  // iPhone 15 Pro 256GB
  makeOffer('of-iph15p-1', 'apple-iphone-15-pro-256', 'electroworld', 110000, 0, 'in_stock'),
  makeOffer('of-iph15p-2', 'apple-iphone-15-pro-256', 'techstore', 112000, 0, 'in_stock'),
  makeOffer('of-iph15p-3', 'apple-iphone-15-pro-256', 'mobileshop', 113500, 0, 'in_stock'),
  makeOffer('of-iph15p-4', 'apple-iphone-15-pro-256', 'digitalbazaar', 109000, 500, 'in_stock'),

  // Galaxy S24 Ultra 256GB
  makeOffer('of-s24u-1', 'samsung-galaxy-s24-ultra', 'smartmarket', 86000, 0, 'in_stock'),
  makeOffer('of-s24u-2', 'samsung-galaxy-s24-ultra', 'electroworld', 87500, 0, 'in_stock'),
  makeOffer('of-s24u-3', 'samsung-galaxy-s24-ultra', 'techstore', 88000, 400, 'in_stock'),
  makeOffer('of-s24u-4', 'samsung-galaxy-s24-ultra', 'gadgethub', 86500, 0, 'in_stock'),

  // Galaxy A55 5G 128GB
  makeOffer('of-a55-1', 'samsung-galaxy-a55', 'mobileshop', 38000, 0, 'in_stock'),
  makeOffer('of-a55-2', 'samsung-galaxy-a55', 'smartmarket', 39000, 300, 'in_stock'),
  makeOffer('of-a55-3', 'samsung-galaxy-a55', 'digitalbazaar', 37500, 500, 'in_stock'),

  // Redmi Note 13 Pro 256GB
  makeOffer('of-rn13-1', 'xiaomi-redmi-note-13-pro', 'smartmarket', 22000, 0, 'in_stock'),
  makeOffer('of-rn13-2', 'xiaomi-redmi-note-13-pro', 'gadgethub', 23000, 200, 'in_stock'),
  makeOffer('of-rn13-3', 'xiaomi-redmi-note-13-pro', 'digitalbazaar', 21500, 300, 'in_stock'),
  makeOffer('of-rn13-4', 'xiaomi-redmi-note-13-pro', 'mobileshop', 22800, 0, 'in_stock'),

  // Xiaomi 14 512GB
  makeOffer('of-x14-1', 'xiaomi-14', 'techstore', 52000, 0, 'in_stock'),
  makeOffer('of-x14-2', 'xiaomi-14', 'gadgethub', 53500, 0, 'in_stock'),
  makeOffer('of-x14-3', 'xiaomi-14', 'smartmarket', 51000, 400, 'in_stock'),

  // Motorola Edge 50 Pro 256GB
  makeOffer('of-me50-1', 'motorola-edge-50-pro', 'mobileshop', 34000, 0, 'in_stock'),
  makeOffer('of-me50-2', 'motorola-edge-50-pro', 'digitalbazaar', 35000, 300, 'in_stock'),
  makeOffer('of-me50-3', 'motorola-edge-50-pro', 'gadgethub', 33500, 0, 'out_of_stock'),

  // Pixel 8 Pro 256GB
  makeOffer('of-p8p-1', 'google-pixel-8-pro', 'electroworld', 62000, 0, 'in_stock'),
  makeOffer('of-p8p-2', 'google-pixel-8-pro', 'techstore', 63000, 0, 'in_stock'),
  makeOffer('of-p8p-3', 'google-pixel-8-pro', 'smartmarket', 61500, 500, 'in_stock'),

  // Honor Magic 6 Pro 512GB
  makeOffer('of-hm6-1', 'honor-magic-6-pro', 'gadgethub', 58000, 0, 'in_stock'),
  makeOffer('of-hm6-2', 'honor-magic-6-pro', 'digitalbazaar', 59500, 400, 'in_stock'),
  makeOffer('of-hm6-3', 'honor-magic-6-pro', 'mobileshop', 58500, 0, 'out_of_stock'),

  // OnePlus 12 256GB
  makeOffer('of-op12-1', 'oneplus-12', 'techstore', 56000, 0, 'in_stock'),
  makeOffer('of-op12-2', 'oneplus-12', 'gadgethub', 57000, 0, 'in_stock'),
  makeOffer('of-op12-3', 'oneplus-12', 'smartmarket', 55500, 300, 'in_stock'),
  makeOffer('of-op12-4', 'oneplus-12', 'digitalbazaar', 56500, 0, 'preorder'),
];

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function offersForProduct(productId: string): Offer[] {
  return offers.filter((o) => o.productId === productId);
}

export function allBrands(): string[] {
  return [...new Set(products.map((p) => p.brand))].sort();
}

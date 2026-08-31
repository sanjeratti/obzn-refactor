import type { Offer } from "../types/offer";

export function lowestPrice(offers: Offer[]): number {
  if (offers.length === 0) return Infinity;
  return Math.min(...offers.map((o) => o.price));
}

export function totalCost(offer: Offer): number {
  return offer.price + offer.shippingCost;
}

export function offerCount(offers: Offer[]): number {
  return offers.length;
}

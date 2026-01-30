import type { SearchPageFilters } from "@/store/guest/pages/search-page/searchPage.types";

export interface PropertySearchRequest {
    city: string | null;
    type: string | null;
    minPrice: number;
    maxPrice: number;
    maxGuest: number | null;
    bathroomCount: number;
    bedroomCount: number;
    cotsOffered: boolean | null;
    breakFastServed: boolean | null;
    amenities: string[];
    checkIn: string | null;
    checkOut: string | null;
    pets: boolean;
    page: number;
    size: number;
}

export function filtersToRequest(filters: SearchPageFilters, page: number, size: number): PropertySearchRequest {
    const [minPrice, maxPrice] = filters.price;

  return {
    city: filters.city,
    type: filters.type,
    minPrice,
    maxPrice,
    maxGuest: filters.maxGuest,
    bathroomCount: filters.bathroomCount,
    bedroomCount: filters.bedroomCount,
    cotsOffered: filters.cotsOffered,
    breakFastServed: filters.breakFastServed,
    amenities: filters.amenities,
    checkIn: filters.checkIn,
    checkOut: filters.checkOut,
    pets: filters.pets,
    page,
    size,
  };
}
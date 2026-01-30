export interface SearchPageFilters {
    city: string | null;
    type: string | null;
    price: [number, number];
    maxGuest: number | null;
    bathroomCount: number;
    bedroomCount: number;
    cotsOffered: boolean | null;
    breakFastServed: boolean | null;
    amenities: string[];
    checkIn: string | null;
    checkOut: string | null;
    pets: boolean;
}

export interface SearchPageState {
    filters: SearchPageFilters;
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    loading: boolean;
    error: string | null;
}

export const toYmd = (d: Date) => d.toISOString().slice(0, 10);
export const fromYmd = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d); // local midnight
};
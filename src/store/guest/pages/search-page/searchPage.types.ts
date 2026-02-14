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

export const toYmd = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const fromYmd = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d); // local midnight
};

// "2026-02-01" -> Date at UTC midnight
const parseYmdUtc = (ymd: string) => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

export const nightsBetween = (checkIn: string | null, checkOut: string | null) => {
    if (checkIn === null || checkOut === null) return;
  const inDate = parseYmdUtc(checkIn);
  const outDate = parseYmdUtc(checkOut);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.round((outDate.getTime() - inDate.getTime()) / msPerDay));
};
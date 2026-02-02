import type { Amenity } from "@/store/dictionaries/dictionary.types"
import type { AddressType } from "@/types/request/apartment/addApartmentRequest.types"

export interface ReviewSummary {
    averageRating: number;
    reviewCount: number;
}

export interface PropertyShort {
    id: number;
    propertyAmenities: Amenity[];
    address: AddressType;
    type: string;
    status: string;
    name: string;
    pricePerNight: number;
    currency: string;
    sizeSqm: number;
    maxGuests: number;
    bathrooms: number;
    livingRoomCount: number;
    bedroomCount: number;
    bedSummary: string;
    mainPhotoUrl: string;
    reviewSummary: ReviewSummary;
}

export interface PropertyDetails {
    id: number;
    propertyAmenities: Amenity[];
    address: AddressType;
    type: string;
    name: string;
    pricePerNight: number;
    currency: string;
    sizeSqm: number;
    maxGuests: number;
    bathrooms: number;
    livingRoomCount: number;
    bedroomCount: number;
    bedSummary: string;
    photoUrls: string[];
    mainPhotoUrl: string;
    reviewSummary: ReviewSummary;

    checkInFrom?: string | null;     // "15:00"
    checkInUntil?: string | null;    // "23:30"
    checkOutFrom?: string | null;    // "08:00"
    checkOutUntil?: string | null;   // "11:00"
    childrenAllowed: boolean;
    cotsOffered: boolean;
    smokingAllowed: boolean;
    partiesAllowed: boolean;
    petsPolicy: "NO" | "YES" | "UPON_REQUEST";
}

export interface GuestPropertyState {
    searchResults: PropertyShort[];
    selectedProperty: PropertyDetails | null;
    loading: boolean;
    error: string | null;
}
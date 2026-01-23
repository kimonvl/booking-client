import type { Amenity } from "@/store/dictionaries/dictionary.types"
import type { AddressType } from "@/types/request/apartment/addApartmentRequest.types"

export interface PropertyShort {
    id: number,
    propertyAmenities: Amenity[],
    address: AddressType,
    type: string,
    status: string,
    name: string,
    pricePerNight: number,
    currency: string,
    sizeSqm: number,
    maxGuests: number,
    bathrooms: number,
    livingRoomCount: number,
    bedroomCount: number,
    bedSummary: string,
    mainPhotoUrl: string
}

export interface GuestPropertyState {
    searchResults: PropertyShort[];
    loading: boolean;
    error: string | null;
}
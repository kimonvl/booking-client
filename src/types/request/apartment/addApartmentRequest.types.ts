export type AddressType = {
  country: string;
  city: string;
  postCode: string;
  street: string;
  streetNumber: string;
  floorNumber: string;
}
export type BedroomBedType = "single" | "double" | "king_size";
export type LivingroomBedType = "single_sofa" | "double_sofa";
export type BedroomType = {
  beds: Record<BedroomBedType, number>;
}
export type LivingroomType = {
  beds: Record<LivingroomBedType, number>;
}
export type SleepingAreasType = {
  bedrooms: BedroomType[];
  livingroom: LivingroomType;
}

export type IsParkingAvailableType = "free" | "paid" | "no";

export type PetsAllowedType = "Yes" | "Upon request" | "No";
export type TimeType = "00:00" |
  "01:00" |
  "02:00" |
  "03:00" |
  "04:00" |
  "05:00" |
  "06:00" |
  "07:00" |
  "08:00" |
  "09:00" |
  "10:00" |
  "11:00" |
  "12:00" |
  "13:00" |
  "14:00" |
  "15:00" |
  "16:00" |
  "17:00" |
  "18:00" |
  "19:00" |
  "20:00" |
  "21:00" |
  "22:00" |
  "23:00";

export type PhotoItem = {
  id: string;
  file: File;
  url: string;
};

export interface AddApartmentRequest {
    propertyName: string;
    address: AddressType;
    sleepingAreas: SleepingAreasType;
    guestCount: number;
    bathroomCount: number;
    allowChildren: boolean;
    offerCots: boolean;
    aptSize: string;
    amenities: string[];
    serveBreakfast: boolean;
    isParkingAvailable: IsParkingAvailableType;
    languages: string[];
    smokingAllowed: boolean;
    partiesAllowed: boolean;
    petsAllowed: PetsAllowedType;
    checkInFrom: TimeType;
    checkInUntil: TimeType;
    checkOutFrom: TimeType;
    checkOutUntil: TimeType;
    photosCount: number;
    mainPhotoId: string | null;
    pricePerNight: number;
    photos: PhotoItem[],
}
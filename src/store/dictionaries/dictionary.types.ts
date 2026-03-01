export interface Amenity {
    code: string;
    label: string;
    groupName: string;
}

export interface AmenityDictionaryItem {
    code: string;
    title: string;
    items: Amenity[];
}

export interface LanguageDictionaryItem {
    id: number;
    code: string;
    label: string;
}

export interface CountryDictionaryItem {
    code: string;
    name: string;
}

export type RoleCode = "GUEST" | "PARTNER";

export interface RoleDictionaryItem {
    id: number;
    name: RoleCode;
}

export interface DictionaryState {
    amenityDictionary: AmenityDictionaryItem[];
    languageDictionary: LanguageDictionaryItem[];
    countryDictionary: CountryDictionaryItem[];
    roleDictionary: RoleDictionaryItem[];
    loading: boolean;
    error: string | null;
}
export interface Amenity {
    code: string;
    label: string;
    groupName: string;
}

export interface AmenitiesDictionaryItem {
    title: string;
    items: Amenity[];
}

export interface DictionaryState {
    amenitiesDictionary: AmenitiesDictionaryItem[];
    loading: boolean;
    error: string | null;
}
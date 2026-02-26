import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toYmd, type SearchPageState } from "./searchPage.types";
import { resetGuestState } from "../../guest.actions";



const initialState: SearchPageState = {
    filters: {
        city: null,
        type: null,
        price: [20, 200],
        maxGuest: null,
        bathroomCount: 0,
        bedroomCount: 0,
        cotsOffered: null,
        breakFastServed: null,
        amenities: [],
        checkIn: toYmd(new Date()),
        checkOut: toYmd(new Date(new Date().setDate(new Date().getDate() + 1))), //tomorrow date as initial state
        pets: false,
    },
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
    last: false,
    loading: false,
    error: null,
}

export const searchPageSlice = createSlice({
    name: 'searchPage',
    initialState,
    reducers: {
        setBasicFilters: (state, action: PayloadAction<{
            city: string,
            checkIn: string,
            checkOut: string,
            maxGuest: number,
            pets: boolean
        }>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        toggleAmenity: (state, action: PayloadAction<string>) => {
            const index = state.filters.amenities.indexOf(action.payload);
            if (index < 0) {
                state.filters.amenities.push(action.payload);
            } else {
                state.filters.amenities = state.filters.amenities.filter((amenity) => amenity != action.payload);
            }
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.filters.city = action.payload;
        },
        setGuestCount: (state, action: PayloadAction<number>) => {
            state.filters.maxGuest = action.payload;
        },
        setPrice: (state, action: PayloadAction<[number, number]>) => {
            state.filters.price = action.payload;
        },
        setBedrooms: (state, action: PayloadAction<number>) => {
            state.filters.bedroomCount = action.payload;
        },
        setBathrooms: (state, action: PayloadAction<number>) => {
            state.filters.bathroomCount = action.payload;
        },
        setPaginationMetadata: (state, action: PayloadAction<{ page: number, totalPages: number, totalElements: number, last: boolean }>) => {
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
            state.last = action.payload.last;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(resetGuestState, () => initialState);
    },
});

const searchPageReducer = searchPageSlice.reducer;
export const {
    setBasicFilters,
    toggleAmenity,
    setCity,
    setGuestCount,
    setPrice,
    setBedrooms,
    setBathrooms,
    setPaginationMetadata,
} = searchPageSlice.actions;

export default searchPageReducer;
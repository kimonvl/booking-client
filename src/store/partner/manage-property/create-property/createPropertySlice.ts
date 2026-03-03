import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CreatePropertyErrors, CreatePropertyForm, CreatePropertyState } from "./createProperty.types";
import type { CreatePropertyRequest } from "@/types/request/apartment/addApartmentRequest.types";

const initialState: CreatePropertyState = {
    createPropertyForm: {
        propertyName: "",
        address: {
            street: "",
            streetNumber: "",
            floorNumber: "",
            country: "",
            city: "",
            postCode: ""
        },
        sleepingAreas: {
            bedrooms: [{ beds: { single: 1, double: 0, king_size: 0 } }],
            livingRoom: { beds: { single_sofa: 0, double_sofa: 0 } }
        },
        guestCount: 0,
        bathroomCount: 0,
        allowChildren: false,
        offerCots: false,
        aptSize: "",
        amenities: null,
        serveBreakfast: false,
        isParkingAvailable: "no",
        languages: null,
        additionalLanguages: null,
        smokingAllowed: false,
        partiesAllowed: false,
        petsAllowed: "No",
        checkInFrom: "13:00",
        checkInUntil: "16:00",
        checkOutFrom: "13:00",
        checkOutUntil: "16:00",
        photos: [],
        mainPhotoId: null,
        pricePerNight: 0,
    },
    createPropertyLoading: false,
    createPropertyErrors: null,
    hasFieldErrors: false,
    error: null,
}

export const createPropertySlice = createSlice({
    name: 'createProperty',
    initialState,
    reducers: {
        sendCreatePropertyStart: (state, _action: PayloadAction<CreatePropertyRequest>) => {
            state.createPropertyLoading = true;
            state.createPropertyErrors = null;
            state.hasFieldErrors = false;
        },
        sendCreatePropertySuccess: (state) => {
            state.createPropertyLoading = false;
            state.createPropertyErrors = null;
            state.hasFieldErrors = false;
        },
        sendCreatePropertyFailure: (state, action: PayloadAction<{ error: string, fieldErrors: CreatePropertyErrors }>) => {
            state.createPropertyLoading = false;
            state.createPropertyErrors = action.payload.fieldErrors;
            state.hasFieldErrors = true;
            state.error = action.payload.error;
        },
        setCreatePropertyForm: (state, action: PayloadAction<CreatePropertyForm>) => {
            state.createPropertyForm = action.payload;
        },
    }
});

const createPropertyReducer = createPropertySlice.reducer;
export const {
    sendCreatePropertyStart,
    sendCreatePropertySuccess,
    sendCreatePropertyFailure,
    setCreatePropertyForm,
} = createPropertySlice.actions;

export default createPropertyReducer;
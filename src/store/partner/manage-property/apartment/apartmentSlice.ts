import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppartmentState, AddApartmentErrors, AddApartmentForm } from "./apartment.types";
import type { AddApartmentRequest } from "@/types/request/apartment/addApartmentRequest.types";

const initialState: AppartmentState = {
    apartmentForm: {
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
    addApartmentLoading: false,
    addApartmentErrors: null,
    hasFieldErrors: false,
    error: null,
}

export const apartmentSlice = createSlice({
    name: 'apartment',
    initialState,
    reducers: {
        sendAddApartmentStart: (state, _action: PayloadAction<AddApartmentRequest>) => {
            state.addApartmentLoading = true;
            state.addApartmentErrors = null;
            state.hasFieldErrors = false;
        },
        sendAddApartmentSuccess: (state) => {
            state.addApartmentLoading = false;
            state.addApartmentErrors = null;
            state.hasFieldErrors = false;
        },
        sendAddApartmentFailure: (state, action: PayloadAction<{ error: string, fieldErrors: AddApartmentErrors }>) => {
            state.addApartmentLoading = false;
            state.addApartmentErrors = action.payload.fieldErrors;
            state.hasFieldErrors = true;
            state.error = action.payload.error;
        },
        setAddApartmentForm: (state, action: PayloadAction<AddApartmentForm>) => {
            state.apartmentForm = action.payload;
        },
    }
});

const apartmentReducer = apartmentSlice.reducer;
export const {
    sendAddApartmentStart,
    sendAddApartmentSuccess,
    sendAddApartmentFailure,
    setAddApartmentForm,
} = apartmentSlice.actions;

export default apartmentReducer;
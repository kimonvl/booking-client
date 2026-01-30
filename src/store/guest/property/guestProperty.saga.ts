import type { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { getPropertiesByCityFailure, getPropertiesByCityStart, getPropertiesByCitySuccess, searchFailure, searchSuccess } from "./guestPropertySlice";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { PropertyShort } from "./guestProperty.types";
import { callApiWithRefresh } from "@/store/refreshSagaWraper";
import { sendGet, sendPostJson } from "@/utils/axios.utils";
import type { CountryDictionaryItem } from "@/store/dictionaries/dictionary.types";
import { toast } from "sonner";
import type { PayloadAction } from "@reduxjs/toolkit";
import { filtersToRequest, type PropertySearchRequest } from "@/types/request/guest/PropertySearchRequest";
import { selectSearchPageFilters, selectSearchPageSize } from "../pages/search-page/searchPage.selector";
import type { Page } from "@/types/response/page";
import { setBasicFilters, setBathrooms, setBedrooms, setCity, setGuestCount, setPaginationMetadata, setPrice, toggleAmenity } from "../pages/search-page/searchPageSlice";

export function* getPropertiesByCity(action: PayloadAction<string>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<PropertyShort[]>> = yield call(callApiWithRefresh, () => 
            sendGet<ApiResponse<CountryDictionaryItem[]>>(`/guest/properties/getPropertiesByCity?city=${action.payload}`)
        );
        if (res && res.data.success) {
            yield put(getPropertiesByCitySuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        yield put(getPropertiesByCityFailure(errorMessage));
    }
}

export function* search(): SagaIterator {
    try {
        const filters = yield select(selectSearchPageFilters);
        const pageSize = yield select(selectSearchPageSize)
        const filtersReq = filtersToRequest(filters, 0, pageSize);
        console.log(filtersReq);
        
        const res: AxiosResponse<ApiResponse<Page<PropertyShort>>> = yield call(callApiWithRefresh, () => 
            sendPostJson<ApiResponse<Page<PropertyShort>>, PropertySearchRequest>(`/guest/properties/search`, filtersReq)
        );
        if (res && res.data.success) {
            yield put(searchSuccess(res.data.data.content));
            yield put(setPaginationMetadata({page: res.data.data.number, totalPages: res.data.data.totalPages, totalElements: res.data.data.totalElements, last: res.data.data.last}));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        yield put(searchFailure(errorMessage));
    }
}

export function* onGetPropertiesByCityStart(): SagaIterator {
    yield takeLatest(getPropertiesByCityStart.type, getPropertiesByCity);
}

export function* onSearchStart(): SagaIterator {
    yield takeLatest([
        setBasicFilters.type,
        toggleAmenity.type,
        setCity.type,
        setGuestCount.type,
        setPrice.type,
        setBedrooms.type,
        setBathrooms.type,
    ], search);
}

export function* guestPropertySaga(): SagaIterator {
    yield all([
        call(onGetPropertiesByCityStart),
        call(onSearchStart),
    ]);
}
import type { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { getSelectedPropertyFailure, getSelectedPropertyStart, getSelectedPropertySuccess, loadMoreFailure, loadMoreStart, loadMoreSuccess, searchFailure, searchSuccess } from "./guestPropertySlice";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { PropertyDetails, PropertyShort } from "./guestProperty.types";
import { callApiWithRefresh } from "@/store/refreshSagaWraper";
import { sendGet, sendPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";
import type { PayloadAction } from "@reduxjs/toolkit";
import { filtersToRequest, type PropertySearchRequest } from "@/types/request/guest/PropertySearchRequest";
import { selectSearchPageFilters, selectSearchPagePage, selectSearchPageSize } from "../pages/search-page/searchPage.selector";
import type { Page } from "@/types/response/page";
import { setBasicFilters, setBathrooms, setBedrooms, setCity, setGuestCount, setPaginationMetadata, setPrice, toggleAmenity } from "../pages/search-page/searchPageSlice";



export function* search(): SagaIterator {
    try {
        const filters = yield select(selectSearchPageFilters);
        const pageSize = yield select(selectSearchPageSize)
        const filtersReq = filtersToRequest(filters, 0, pageSize);
        
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

export function* loadMore(): SagaIterator {
    try {
        const filters = yield select(selectSearchPageFilters);
        const pageSize = yield select(selectSearchPageSize);
        const pageNumber = yield select(selectSearchPagePage);
        const filtersReq = filtersToRequest(filters, pageNumber + 1, pageSize);
        
        const res: AxiosResponse<ApiResponse<Page<PropertyShort>>> = yield call(callApiWithRefresh, () => 
            sendPostJson<ApiResponse<Page<PropertyShort>>, PropertySearchRequest>(`/guest/properties/search`, filtersReq)
        );
        if (res && res.data.success) {
            yield put(loadMoreSuccess(res.data.data.content));
            yield put(setPaginationMetadata({page: res.data.data.number, totalPages: res.data.data.totalPages, totalElements: res.data.data.totalElements, last: res.data.data.last}));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        yield put(loadMoreFailure(errorMessage));
    }
}

export function* getSelectedProperty(action: PayloadAction<string>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<PropertyDetails>> = yield call(callApiWithRefresh, () => 
            sendGet<ApiResponse<PropertyDetails>>(`/guest/properties/getPropertyDetails/${action.payload}`)
        );
        if (res && res.data.success) {
            yield put(getSelectedPropertySuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        yield put(getSelectedPropertyFailure(errorMessage));
    }
}

export function* onSearchStart(): SagaIterator {
    // TODO: fix this, stop sending requests if consecutive actions fired
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

export function* onLoadMoreStart(): SagaIterator {
    yield takeLatest(loadMoreStart.type, loadMore);
}

export function* onGetSelectedPropertyStart(): SagaIterator {
    yield takeLatest(getSelectedPropertyStart.type, getSelectedProperty);
}

export function* guestPropertySaga(): SagaIterator {
    yield all([
        call(onSearchStart),
        call(onLoadMoreStart),
        call(onGetSelectedPropertyStart),
    ]);
}
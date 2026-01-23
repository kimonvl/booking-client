import type { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getPropertiesByCityFailure, getPropertiesByCityStart, getPropertiesByCitySuccess } from "./guestPropertySlice";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { PropertyShort } from "./guestProperty.types";
import { callApiWithRefresh } from "@/store/refreshSagaWraper";
import { sendGet } from "@/utils/axios.utils";
import type { CountryDictionaryItem } from "@/store/dictionaries/dictionary.types";
import { toast } from "sonner";
import type { PayloadAction } from "@reduxjs/toolkit";

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

export function* onGetPropertiesByCityStart(): SagaIterator {
    yield takeLatest(getPropertiesByCityStart.type, getPropertiesByCity);
}

export function* guestPropertySaga(): SagaIterator {
    yield all([
        call(onGetPropertiesByCityStart),
    ]);
}
import type { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getAmenitiesDictionaryFailure, getAmenitiesDictionaryStart, getAmenitiesDictionarySuccess, getLanguageDictionaryFailure, getLanguageDictionaryStart, getLanguageDictionarySuccess } from "./dictionarySlice";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { AmenityDictionaryItem, LanguageDictionaryItem } from "./dictionary.types";
import { callApiWithRefresh } from "../refreshSagaWraper";
import { sendGet } from "@/utils/axios.utils";
import { toast } from "sonner";

export function* getAmenitiesDictionary(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<AmenityDictionaryItem[]>> = yield call(callApiWithRefresh, () => 
            sendGet<ApiResponse<AmenityDictionaryItem[]>>("/dictionary/getAmenities")
        );
        if (res && res.data.success) {
            yield put(getAmenitiesDictionarySuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        yield put(getAmenitiesDictionaryFailure(errorMessage));
    }
}

export function* getLanguageDictionary(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<LanguageDictionaryItem[]>> = yield call(callApiWithRefresh, () => 
            sendGet<ApiResponse<LanguageDictionaryItem[]>>("/dictionary/getLanguages")
        );
        if (res && res.data.success) {
            yield put(getLanguageDictionarySuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        yield put(getLanguageDictionaryFailure(errorMessage));
    }
}

export function* onGetAmenitiesDictionaryStart(): SagaIterator {
    yield takeLatest(getAmenitiesDictionaryStart.type, getAmenitiesDictionary);
}

export function* onGetLanguageDictionaryStart(): SagaIterator {
    yield takeLatest(getLanguageDictionaryStart.type, getLanguageDictionary);
}

export function* dictionarySaga(): SagaIterator {
    yield all([
        call(onGetAmenitiesDictionaryStart),
        call(onGetLanguageDictionaryStart),
    ]);
}
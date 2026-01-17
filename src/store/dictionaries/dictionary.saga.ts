import type { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getAmenitiesDictionaryFailure, getAmenitiesDictionaryStart, getAmenitiesDictionarySuccess, getCountryDictionaryFailure, getCountryDictionaryStart, getCountryDictionarySuccess, getLanguageDictionaryFailure, getLanguageDictionaryStart, getLanguageDictionarySuccess } from "./dictionarySlice";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { AmenityDictionaryItem, CountryDictionaryItem, LanguageDictionaryItem } from "./dictionary.types";
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

export function* getCountryDictionary(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<CountryDictionaryItem[]>> = yield call(callApiWithRefresh, () => 
            sendGet<ApiResponse<CountryDictionaryItem[]>>("/dictionary/getCountries")
        );
        if (res && res.data.success) {
            yield put(getCountryDictionarySuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        yield put(getCountryDictionaryFailure(errorMessage));
    }
}

export function* onGetAmenitiesDictionaryStart(): SagaIterator {
    yield takeLatest(getAmenitiesDictionaryStart.type, getAmenitiesDictionary);
}

export function* onGetLanguageDictionaryStart(): SagaIterator {
    yield takeLatest(getLanguageDictionaryStart.type, getLanguageDictionary);
}

export function* onGetCountryDictionaryStart(): SagaIterator {
    yield takeLatest(getCountryDictionaryStart.type, getCountryDictionary);
}

export function* dictionarySaga(): SagaIterator {
    yield all([
        call(onGetAmenitiesDictionaryStart),
        call(onGetLanguageDictionaryStart),
        call(onGetCountryDictionaryStart),
    ]);
}
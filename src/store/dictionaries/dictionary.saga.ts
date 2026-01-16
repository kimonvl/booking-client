import type { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getAmenitiesDictionaryFailure, getAmenitiesDictionaryStart, getAmenitiesDictionarySuccess } from "./dictionarySlice";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { AmenitiesDictionaryItem } from "./dictionary.types";
import { callApiWithRefresh } from "../refreshSagaWraper";
import { sendGet } from "@/utils/axios.utils";
import { toast } from "sonner";

export function* getAmenitiesDictionary(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<AmenitiesDictionaryItem[]>> = yield call(callApiWithRefresh, () => 
            sendGet<ApiResponse<AmenitiesDictionaryItem[]>>("/dictionary/getAmenities")
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

export function* onGetAmenitiesDictionaryStart(): SagaIterator {
    yield takeLatest(getAmenitiesDictionaryStart.type, getAmenitiesDictionary);
}

export function* dictionarySaga(): SagaIterator {
    yield all([
        call(onGetAmenitiesDictionaryStart),
    ]);
}
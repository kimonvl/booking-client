import { all, call, put, takeLatest } from "redux-saga/effects";
import { getOperationsTableFailure, getOperationsTableStart, getOperationsTableSuccess, getSummaryTilesFailure, getSummaryTilesStart, getSummaryTilesSuccess } from "./groupHomeSlice";
import type { SagaIterator } from "redux-saga";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { PropertyOperationsRow, SummaryTile } from "./groupHome.types";
import { callApiWithRefresh } from "@/store/refreshSagaWraper";
import { sendGet } from "@/utils/axios.utils";
import { toast } from "sonner";

export function* getOperationsTable(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<PropertyOperationsRow[]>> = yield call(callApiWithRefresh, () => 
            sendGet<ApiResponse<PropertyOperationsRow[]>>("/partner/primaryAccount/getOperationsTable")
        );
        if (res && res.data.success) {
            yield put(getOperationsTableSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        yield put(getOperationsTableFailure(errorMessage));
    }
}

export function* getSummaryTiles(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<SummaryTile[]>> = yield call(callApiWithRefresh, () => 
            sendGet<ApiResponse<SummaryTile[]>>("/partner/primaryAccount/getSummaryTiles")
        );
        if (res && res.data.success) {
            yield put(getSummaryTilesSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        yield put(getSummaryTilesFailure(errorMessage));
    }
}

export function* onGetOperationsTableStart() {
    yield takeLatest(getOperationsTableStart.type, getOperationsTable);
}

export function* onGetSummaryTilesStart() {
    yield takeLatest(getSummaryTilesStart.type, getSummaryTiles);
}

export function* groupHomeSaga() {
    yield all([
        call(onGetOperationsTableStart),
        call(onGetSummaryTilesStart),
    ])
}
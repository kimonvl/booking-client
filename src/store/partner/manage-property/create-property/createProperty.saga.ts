import type { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import { sendPostFormData } from "@/utils/axios.utils";
import { callApiWithRefresh } from "@/store/refreshSagaWraper";
import { toast } from "sonner";
import { sendCreatePropertyFailure, sendCreatePropertyStart, sendCreatePropertySuccess } from "./createPropertySlice";
import type { CreatePropertyRequest } from "@/types/request/apartment/addApartmentRequest.types";

export function* sendAddApartment(action: PayloadAction<CreatePropertyRequest>): SagaIterator {
    try {
        const {
            photos,
            mainPhotoId,
            ...jsonData // 👈 EVERYTHING ELSE IS JSON
        } = action.payload;
        console.log(action.payload);
        
        const fd = new FormData();
        fd.append(
            "data",
            new Blob(
                [JSON.stringify(jsonData)],
                { type: "application/json" })
        );
        photos.forEach((photo) => {
            fd.append("photos", photo.file, photo.file.name);
        })
        const mainIndex =
            mainPhotoId != null
                ? Math.max(0, photos.findIndex((p) => p.id === mainPhotoId))
                : 0;
        fd.append("mainIndex", String(mainIndex));
        
        const res: AxiosResponse<ApiResponse<null>> = yield call(callApiWithRefresh, () =>
            sendPostFormData<ApiResponse<null>>("/partner/properties/create", fd), {allowRetry: true}
        );
        if (res && res.data.success) {
            console.log(res.data.data);
            
            yield put(sendCreatePropertySuccess());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast.warning(errorMessage);
        yield put(sendCreatePropertyFailure({error: errorMessage, fieldErrors: error.response?.data?.data}));
    }
}

export function* onSendCreatePropertyStart() {
    yield takeLatest(sendCreatePropertyStart.type, sendAddApartment);
}

export function* createPropertySaga(): SagaIterator {
    yield all([
        call(onSendCreatePropertyStart),
    ])
}
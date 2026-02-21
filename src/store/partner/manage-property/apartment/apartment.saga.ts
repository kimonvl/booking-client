import type { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { sendAddApartmentFailure, sendAddApartmentStart, sendAddApartmentSuccess } from "./apartmentSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AddApartmentRequest } from "@/types/request/apartment/addApartmentRequest.types";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import { sendPostFormData } from "@/utils/axios.utils";
import { callApiWithRefresh } from "@/store/refreshSagaWraper";
import { toast } from "sonner";

export function* sendAddApartment(action: PayloadAction<AddApartmentRequest>): SagaIterator {
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
            sendPostFormData<ApiResponse<null>>("/partner/apartment/addApartment", fd), {allowRetry: true}
        );
        if (res && res.data.success) {
            console.log(res.data.data);
            
            yield put(sendAddApartmentSuccess());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast.warning(errorMessage);
        yield put(sendAddApartmentFailure({error: errorMessage, fieldErrors: error.response?.data?.data}));
    }
}

export function* onSendAddApartmentStart() {
    yield takeLatest(sendAddApartmentStart.type, sendAddApartment);
}

export function* apartmentSaga(): SagaIterator {
    yield all([
        call(onSendAddApartmentStart),
    ])
}
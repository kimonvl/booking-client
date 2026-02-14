import type { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { sendPostJson } from "@/utils/axios.utils";
import { callApiWithRefresh } from "@/store/refreshSagaWraper";
import type { ApiResponse } from "@/types/response/apiResponse";

import {
  createPaymentIntentStart,
  createPaymentIntentSuccess,
  createPaymentIntentFailure,
} from "./paymentSlice";
import { selectCreatedBookingId } from "../booking/booking.selector";

function* createPaymentIntent(): SagaIterator {
  const bookingId = yield select(selectCreatedBookingId);  
  try {
    const res: AxiosResponse<ApiResponse<string>> = yield call(callApiWithRefresh, () =>
      sendPostJson<ApiResponse<string>, number>(`/payments/create-intent`, bookingId)
    );

    if (res.data.success) {
      yield put(createPaymentIntentSuccess(res.data.data));
      return;
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message || "Payment intent failed";
    yield put(createPaymentIntentFailure(msg));
    toast.error(msg);
  }
}

export function* onCreatePaymentIntentStart(): SagaIterator {
  yield takeLatest(createPaymentIntentStart.type, createPaymentIntent);
}

export function* paymentSaga(): SagaIterator {
  yield all([
    call(onCreatePaymentIntentStart),
  ]);
}

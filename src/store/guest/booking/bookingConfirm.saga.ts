import type { SagaIterator } from "redux-saga";
import { call, put, takeLatest, delay, cancelled, all } from "redux-saga/effects";
import type { AxiosResponse } from "axios";

import { sendGet } from "@/utils/axios.utils";
import { callApiWithRefresh } from "@/store/refreshSagaWraper";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { BookingStatusResponse } from "@/types/response/booking/bookingStatus.types";

import {
  startPollingBooking,
  pollingUpdate,
  pollingConfirmed,
  pollingFailed,
  stopPolling,
} from "./bookingConfirmSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

function* pollBookingStatus(action: PayloadAction<number>): SagaIterator {
  try {
    // Poll up to ~30 seconds (20 * 1500ms)
    for (let i = 0; i < 20; i++) {
      const res: AxiosResponse<ApiResponse<BookingStatusResponse>> = yield call(
        callApiWithRefresh,
        () => sendGet<ApiResponse<BookingStatusResponse>>(`/bookings/${action.payload}/status`)
      );

      if (!res.data.success) {
        yield put(pollingFailed(res.data.message || "Failed to fetch booking status"));
        return;
      }

      const data = res.data.data;
      yield put(pollingUpdate(data));

      if (data.status === "CONFIRMED" && data.paymentStatus === "SUCCEEDED") {
        yield put(pollingConfirmed(data));
        return;
      }

      if (data.paymentStatus === "FAILED" || data.status === "CANCELLED") {
        yield put(pollingFailed("Payment failed or booking cancelled"));
        return;
      }

      yield delay(1500);
    }

    yield put(pollingFailed("Still processing payment. Please refresh in a moment."));
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message || "Polling failed";
    yield put(pollingFailed(msg));
  } finally {
    if (yield cancelled()) {
      yield put(stopPolling());
    }
  }
}

export function* onPollingStart(): SagaIterator {
  yield takeLatest(startPollingBooking.type, pollBookingStatus);
}

export function* bookingConfirmSaga(): SagaIterator {
  yield all([
    call(onPollingStart),
  ]);
}


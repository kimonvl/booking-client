import type { SagaIterator } from "redux-saga";
import { call, put, takeLatest, delay, cancelled, all, select } from "redux-saga/effects";
import type { AxiosResponse } from "axios";

import { sendGet, sendPostJson } from "@/utils/axios.utils";
import { callApiWithRefresh } from "@/store/refreshSagaWraper";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { BookingStatusResponse } from "@/types/response/booking/bookingStatus.types";

import {
  startPollingBooking,
  pollingUpdate,
  pollingConfirmed,
  pollingFailed,
  stopPolling,
  createBookingPendingStart,
  createBookingPendingSuccess,
  createBookingPendingFailure,
  cancelPendingBookingStart,
  cancelPendingBookingSuccess,
  cancelPendingBookingFailed,
} from "./bookingSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { selectSelectedPropertyId } from "../property/guestProperty.selector";
import { selectSearchPageCheckIn, selectSearchPageCheckout, selectSearchPageGuests } from "../pages/search-page/searchPage.selector";
import { selectCheckoutPageDetailsForm } from "../pages/checkout-page/checkoutPage.selector";
import type { CheckoutDetailsFormState } from "../pages/checkout-page/checkoutPage.types";
import { toast } from "sonner";

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


type CheckOutDetails = {
  travelingForWork: boolean,
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneCountryCode: string,
  phoneNumber: string,
  specialRequest: string
};
type CreateBookingReq = {
  propertyId: number,
  checkIn: string,
  checkOut: string,
  guestCount: number,
  checkOutDetails: CheckOutDetails
}

const constructCreateIntentReq = (
  propertyId: number, 
  checkIn: string, 
  checkOut: string, 
  guestCount: number, 
  checkoutDetailForm: CheckoutDetailsFormState
): CreateBookingReq => {
  return {
    propertyId,
    checkIn,
    checkOut,
    guestCount,
    checkOutDetails: {
      travelingForWork: checkoutDetailForm.travelingForWork === "no" ? false : true,
      title: checkoutDetailForm.title,
      firstName: checkoutDetailForm.firstName,
      lastName: checkoutDetailForm.lastName,
      email: checkoutDetailForm.email,
      phoneCountryCode: checkoutDetailForm.phoneCountryCode,
      phoneNumber: checkoutDetailForm.phoneNumber,
      specialRequest: checkoutDetailForm.specialRequest
    }
  }
}

export function* createBookingPending(): SagaIterator {
  const propertyId = yield select(selectSelectedPropertyId);
  const checkIn = yield select(selectSearchPageCheckIn);
  const checkout = yield select(selectSearchPageCheckout);
  const guestCount = yield select(selectSearchPageGuests);
  const checkoutDetailForm = yield select(selectCheckoutPageDetailsForm);
  const req = constructCreateIntentReq(propertyId, checkIn, checkout, guestCount, checkoutDetailForm);
  
  try {
    const res: AxiosResponse<ApiResponse<number>> = yield call(callApiWithRefresh, () =>
      sendPostJson<ApiResponse<number>, CreateBookingReq>(`/bookings/create`, req)
    );

    if (res.data.success) {
      yield put(createBookingPendingSuccess(res.data.data));
      return;
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message || "Payment intent failed";
    yield put(createBookingPendingFailure({message: msg, createBookingErrors: error.response?.data?.data}));
    toast.error(msg);
  }
}

export function* cancelPendingBooking(action: PayloadAction<number>): SagaIterator {
  try {
    const res: AxiosResponse<ApiResponse<null>> = yield call(callApiWithRefresh, () =>
      sendPostJson<ApiResponse<null>, {bookingId: number}>(`/bookings/cancel/${action.payload}`)
    );

    if (res.data.success) {
      yield put(cancelPendingBookingSuccess());
      return;
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message || "Payment intent failed";
    yield put(cancelPendingBookingFailed(msg));
    toast.error(msg);
  }
}

export function* onPollingStart(): SagaIterator {
  yield takeLatest(startPollingBooking.type, pollBookingStatus);
}

export function* onCreateBookingPendingStart(): SagaIterator {
  yield takeLatest(createBookingPendingStart.type, createBookingPending);
}

export function* onCancelPendingBookingStart(): SagaIterator {
  yield takeLatest(cancelPendingBookingStart.type, cancelPendingBooking);
}

export function* bookingConfirmSaga(): SagaIterator {
  yield all([
    call(onPollingStart),
    call(onCreateBookingPendingStart),
    call(onCancelPendingBookingStart),
  ]);
}


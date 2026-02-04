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
import { selectSelectedPropertyId } from "../property/guestProperty.selector";
import { selectSearchPageCheckIn, selectSearchPageCheckout, selectSearchPageGuests } from "../pages/search-page/searchPage.selector";
import type { CheckoutDetailsFormState } from "../pages/checkout-page/checkoutPage.types";
import { selectCheckoutPageDetailsForm } from "../pages/checkout-page/checkoutPage.selector";

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
type CreateIntentRes = { bookingId: number, clientSecret: string };
type CreateIntentReq = {
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
): CreateIntentReq => {
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

function* createPaymentIntent(): SagaIterator {
  const proprtyId = yield select(selectSelectedPropertyId);
  const checkIn = yield select(selectSearchPageCheckIn);
  const checkout = yield select(selectSearchPageCheckout);
  const guestCount = yield select(selectSearchPageGuests);
  const checkoutDetailForm = yield select(selectCheckoutPageDetailsForm);
  const req = constructCreateIntentReq(proprtyId, checkIn, checkout, guestCount, checkoutDetailForm);
  try {
    const res: AxiosResponse<ApiResponse<CreateIntentRes>> = yield call(callApiWithRefresh, () =>
      sendPostJson<ApiResponse<CreateIntentRes>, CreateIntentReq>(`/payments/create-intent`, req)
    );

    if (res.data.success) {
      yield put(createPaymentIntentSuccess(res.data.data));
      return;
    }

    yield put(createPaymentIntentFailure(res.data.message || "Payment intent failed"));
    toast.error(res.data.message || "Payment intent failed");
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

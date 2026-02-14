import type { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth/auth.saga";
import { dictionarySaga } from "./dictionaries/dictionary.saga";
import { groupHomeSaga } from "./partner/primary-account/group-home/groupHome.saga";
import { apartmentSaga } from "./partner/manage-property/apartment/apartment.saga";
import { guestPropertySaga } from "./guest/property/guestProperty.saga";
import { bookingConfirmSaga } from "./guest/booking/booking.saga";
import { paymentSaga } from "./guest/payment/payment.saga";

export function* rootSaga(): SagaIterator {
    yield all([
        fork(authSaga),
        fork(dictionarySaga),
        fork(apartmentSaga),
        fork(groupHomeSaga),
        fork(guestPropertySaga),
        fork(bookingConfirmSaga),
        fork(paymentSaga),
    ]);
}
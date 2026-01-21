import type { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth/auth.saga";
import { dictionarySaga } from "./dictionaries/dictionary.saga";
import { apartmentSaga } from "./partner/add-property/apartment/apartment.saga";
import { groupHomeSaga } from "./partner/primary-account/group-home/groupHome.saga";

export function* rootSaga(): SagaIterator {
    yield all([
        fork(authSaga),
        fork(dictionarySaga),
        fork(apartmentSaga),
        fork(groupHomeSaga),
    ]);
}
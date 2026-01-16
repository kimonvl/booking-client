import type { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth/auth.saga";
import { dictionarySaga } from "./dictionaries/dictionary.saga";

export function* rootSaga(): SagaIterator {
    yield all([
        fork(authSaga),
        fork(dictionarySaga),
    ]);
}
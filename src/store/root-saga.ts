import type { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth/auth.saga";

export function* rootSaga(): SagaIterator {
    yield all([
        fork(authSaga),
    ]);
}
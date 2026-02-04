import { createSelector } from "reselect";
import type { RootState } from "@/store/store";

const selectConfirm = (s: RootState) => s.bookingConfirm;

export const selectConfirmStatus = createSelector([selectConfirm], (x) => x.status);
export const selectConfirmLatest = createSelector([selectConfirm], (x) => x.latest);
export const selectConfirmError = createSelector([selectConfirm], (x) => x.error);
export const selectIsPolling = createSelector([selectConfirm], (x) => x.polling);

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";
export type PaymentStatus = "REQUIRES_PAYMENT" | "PROCESSING" | "SUCCEEDED" | "FAILED";

export interface BookingStatusResponse {
  id: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
}

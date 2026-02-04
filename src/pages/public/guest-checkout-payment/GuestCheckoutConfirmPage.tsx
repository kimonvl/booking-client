import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { selectConfirmError, selectConfirmLatest, selectConfirmStatus } from "@/store/guest/booking/bookingConfirm.selector";
import { resetConfirm, startPollingBooking } from "@/store/guest/booking/bookingConfirmSlice";
import { selectPaymentBookingId } from "@/store/guest/payment/payment.selector";

export default function GuestCheckoutConfirmPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const bookingId = useAppSelector(selectPaymentBookingId);
  const status = useAppSelector(selectConfirmStatus);
  const latest = useAppSelector(selectConfirmLatest);
  const error = useAppSelector(selectConfirmError);

  useEffect(() => {
    if (!bookingId || Number.isNaN(bookingId)) {
      navigate("/", { replace: true });
      return;
    }

    dispatch(resetConfirm());
    dispatch(startPollingBooking(bookingId));

    return () => {
      dispatch(resetConfirm());
    };
  }, [bookingId, dispatch, navigate]);

  // When confirmed -> go to success page
  useEffect(() => {
    if (status === "confirmed") {
      navigate(`/checkout/success?bookingId=${bookingId}`, { replace: true });
    }
  }, [status, bookingId, navigate]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold">Confirming your reservation</h1>

      <div className="mt-4 rounded-md border p-4">
        <div className="font-semibold">Status</div>

        <div className="mt-2 text-sm">
          {status === "loading" && "Processing payment… Please wait."}
          {status === "failed" && "Something went wrong."}
        </div>

        {latest && (
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <div>Booking: <b>#{latest.id}</b></div>
            <div>Booking status: <b>{latest.status}</b></div>
            <div>Payment status: <b>{latest.paymentStatus}</b></div>
          </div>
        )}

        {status === "failed" && (
          <div className="mt-3 text-sm text-red-600">
            {error ?? "Failed to confirm booking"}
          </div>
        )}

        {status === "failed" && (
          <div className="mt-5 flex gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={() => dispatch(startPollingBooking({ bookingId }))}>
              Retry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

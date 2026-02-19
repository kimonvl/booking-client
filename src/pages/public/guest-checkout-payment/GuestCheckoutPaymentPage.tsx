import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectClientSecret,
  selectPaymentStatus,
} from "@/store/guest/payment/payment.selector";
import {
  createPaymentIntentStart,
  resetPaymentState,
} from "@/store/guest/payment/paymentSlice";
import { selectCreatedBookingId } from "@/store/guest/booking/booking.selector";
import { cancelPendingBookingStart } from "@/store/guest/booking/bookingSlice";

export default function GuestCheckoutPaymentPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const status = useAppSelector(selectPaymentStatus);
  const clientSecret = useAppSelector(selectClientSecret);
  const bookingId = useAppSelector(selectCreatedBookingId);

  const [confirming, setConfirming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const finishedRef = useRef(false);
  const bookingIdRef = useRef<number | null>(null);

  useEffect(() => {
    bookingIdRef.current = bookingId ?? null;
  }, [bookingId]);

  useEffect(() => {
    return () => {
      const id = bookingIdRef.current;
      if (!finishedRef.current && id) {
        dispatch(cancelPendingBookingStart(id));
      }
    };
  }, [dispatch]);

  const onCompleteBooking = () => {
    setErrorMsg(null);
    dispatch(resetPaymentState());
    dispatch(createPaymentIntentStart());
  };

  // When clientSecret arrives -> confirm card payment
  useEffect(() => {
    const confirm = async () => {
      if (!clientSecret) return;
      if (!stripe || !elements) return;

      setConfirming(true);
      setErrorMsg(null);

      console.log("client secret before sending to stripe ", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      setConfirming(false);

      if (result.error) {
        setErrorMsg(result.error.message ?? "Payment failed");
        return;
      }

      finishedRef.current = true;

      // Payment succeeded client-side.
      // Booking will be confirmed by webhook.
      navigate(`/checkout/confirm?bookingId=${bookingId}`, { replace: true });
    };

    confirm();
  }, [clientSecret, stripe, elements, navigate, bookingId]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Payment</h1>

      <div className="rounded-lg border p-4">
        <div className="font-semibold mb-2">Card details</div>
        <CardElement />
      </div>

      {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}

      <Button
        className="bg-[#0071c2] hover:bg-[#005fa3]"
        onClick={onCompleteBooking}
        disabled={!stripe || status === "loading" || confirming}
      >
        {status === "loading" || confirming ? "Processing..." : "Complete booking"}
      </Button>
    </div>
  );
}

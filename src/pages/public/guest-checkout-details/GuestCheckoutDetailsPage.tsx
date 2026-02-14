import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import LeftSummaryCard from "./LeftSummaryCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectIsAuthenticated } from "@/store/auth/auth.selector";
import GuestCheckoutForm from "./GuestCheckoutForm";
import type { CheckoutDetailsFormState } from "@/store/guest/pages/checkout-page/checkoutPage.types";
import { selectCheckoutPageDetailsForm } from "@/store/guest/pages/checkout-page/checkoutPage.selector";
import { populateFromAuthenticatedUser } from "@/store/guest/pages/checkout-page/checkoutPageSlice";
import { useNavigate } from "react-router-dom";
import SignInToContinueModal from "./SignInToContinueModal";
import { createBookingPendingStart, resetCreateBookingCompleted } from "@/store/guest/booking/bookingSlice";
import { selectCreateBookingCompleted } from "@/store/guest/booking/booking.selector";


function Stepper() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[#0071c2] text-white flex items-center justify-center font-bold">
            <Check className="h-4 w-4" />
          </div>
          <span className="font-semibold">Your Selection</span>
        </div>

        <div className="flex-1 mx-4 h-[2px] bg-gray-200" />

        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[#0071c2] text-white flex items-center justify-center font-bold">
            2
          </div>
          <span className="font-semibold">Enter your details</span>
        </div>

        <div className="flex-1 mx-4 h-[2px] bg-gray-200" />

        <div className="flex items-center gap-2 opacity-70">
          <div className="h-7 w-7 rounded-full border border-gray-300 bg-white flex items-center justify-center font-bold">
            3
          </div>
          <span className="font-semibold">Confirm your reservation</span>
        </div>
      </div>

      <div className="mt-3 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-center text-sm font-semibold text-green-800">
        Great choice! You&apos;re almost done.
      </div>
    </div>
  );
}



export default function GuestCheckoutDetailsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const checkoutDetailsForm = useAppSelector(selectCheckoutPageDetailsForm);
  const showGate = !isAuthenticated;
  const createBookingCompleted = useAppSelector(selectCreateBookingCompleted);

  useEffect(() => {
    if (createBookingCompleted) {
      dispatch(resetCreateBookingCompleted());
      navigate(`/checkout/payment`);
    }
  }, [createBookingCompleted])

  useEffect(() => {
    if (currentUser === null)
      return;
    dispatch(populateFromAuthenticatedUser(currentUser))
  }, [dispatch, currentUser]);

  useEffect(() => {
    setFormInput(checkoutDetailsForm);
  }, [checkoutDetailsForm]);

  const [formInput, setFormInput] = useState<CheckoutDetailsFormState>(checkoutDetailsForm);

  const isValid = useMemo(() => {
    if (!formInput.firstName.trim()) return false;
    if (!formInput.lastName.trim()) return false;
    if (!formInput.email.trim()) return false;
    if (formInput.email !== formInput.confirmEmail) return false;
    if (!formInput.phoneNumber.trim()) return false;
    return true;
  }, [formInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createBookingPendingStart());
  };



  return (
    <div className="bg-white relative">
      {/* Modal */}
      <SignInToContinueModal
        open={showGate}
        onBack={() => navigate(-1)}
      />
      <div className={showGate ? "pointer-events-none blur-[2px]" : ""}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Stepper />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
            {/* LEFT */}
            <LeftSummaryCard />

            {/* RIGHT */}
            <div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded bg-green-600 text-white font-bold flex items-center justify-center">
                  K
                </div>
                <div className="text-sm font-semibold text-[#1a1a1a]">Vloutis Kimon</div>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold text-[#1a1a1a]">Enter your details</h1>

              {/* Signed in card */}
              <Card className="mt-4">
                <CardContent className="p-4 flex items-center gap-4">
                  {isAuthenticated && <div className="h-12 w-12 rounded-full border-2 border-[#febb02] flex items-center justify-center">
                    <div className="h-10 w-10 rounded-full bg-[#1f5aa6] text-white font-bold flex items-center justify-center">
                      K
                    </div>
                  </div>}
                  <div>
                    <div className="font-semibold text-[#1a1a1a]">{isAuthenticated ? "You are signed in" : "Sign in to continue"}</div>
                    <div className="text-sm text-gray-600">{currentUser?.email}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Form card */}
              <GuestCheckoutForm formInput={formInput} setFormInput={setFormInput} handleSubmit={handleSubmit} isValid={isValid} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

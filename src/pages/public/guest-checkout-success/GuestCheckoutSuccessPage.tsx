import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GuestCheckoutSuccessPage() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const bookingId = sp.get("bookingId");

  // If someone hits success directly without bookingId -> send home
  useEffect(() => {
    if (!bookingId) {
      navigate("/", { replace: true });
    }
  }, [bookingId, navigate]);

  // Back-button trap: pressing Back keeps user on this page
  useEffect(() => {
    // Push a state so "Back" triggers popstate
    window.history.pushState(null, "", window.location.href);

    const onPopState = () => {
      // Keep them here (effectively disables Back from this page)
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold">
            Booking confirmed 🎉
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Your reservation has been successfully completed.
          </div>

          {bookingId && (
            <div className="text-sm">
              Booking ID: <b>#{bookingId}</b>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button onClick={() => navigate("/", { replace: true })}>
              Go to homepage
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate(`/bookings/${bookingId ?? ""}`, { replace: true })}
              disabled={!bookingId}
            >
              View booking
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

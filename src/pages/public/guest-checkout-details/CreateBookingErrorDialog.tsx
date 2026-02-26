import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { CreateBookingErrors } from "@/store/guest/booking/booking.types";

function humanizeKey(key: string) {
  return key
    .replace(/^_global$/, "General")
    .replaceAll(".", " · ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export default function CreateBookingErrorDialog({
  open,
  errors,
  onBackHome,
}: {
  open: boolean;
  errors: CreateBookingErrors;
  onBackHome: () => void;
}) {
  const entries = React.useMemo(
    () =>
      Object.entries(errors)
        .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
        .map(([k, v]) => ({ key: k, message: v as string })),
    [errors]
  );

  return (
    <Dialog open={open}>
      <DialogContent
        // prevent overlay click close
        onInteractOutside={(e) => e.preventDefault()}
        // prevent ESC close
        onEscapeKeyDown={(e) => e.preventDefault()}
        // hide the X button if your component includes it
        className="max-w-xl [&>button]:hidden"
      >
        <DialogHeader>
          <DialogTitle>We couldn’t complete your reservation</DialogTitle>
          <DialogDescription>
            Please review the issues below, then go back to the home page and try again.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 rounded-md border bg-muted/20 p-3">
          {entries.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              Something went wrong, but we couldn’t extract specific error messages.
            </div>
          ) : (
            <ul className="space-y-2">
              {entries.map((e) => (
                <li key={e.key} className="text-sm">
                  <div className="font-semibold">{humanizeKey(e.key)}</div>
                  <div className="text-muted-foreground">{e.message}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={onBackHome}>Back to home</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}